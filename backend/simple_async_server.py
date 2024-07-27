import asyncio
from aiohttp import web
from api_call import ollama_api_call, custom_model_api, ollama_groq_chat_api
from get_models import get_models
from settings import USE_CUSTOM_MODEL, DEFAULT_PORT


async def post_prompt(request):
    incoming_data = await request.json()
    if incoming_data.get("type", None) == "custom":
        response_data = await custom_model_api(incoming_data["prompt"])
    elif incoming_data.get("type", None) == "ollama":
        response_data = await ollama_api_call(incoming_data["prompt"])
    elif incoming_data.get("type", None) == "groq":
        response_data = await ollama_groq_chat_api(
            incoming_data["type"], incoming_data["messages"], incoming_data.get("api_key", None), prompt=True
        )
    else:
        response_data = {"response": "bad request", "status": 400}
    return web.json_response(response_data)


async def post_chat(request):
    incoming_data = await request.json()
    if incoming_data.get("type", None) == "groq" or incoming_data.get("type", None) == "ollama":
        response_data = await ollama_groq_chat_api(
            incoming_data["type"], incoming_data["messages"], incoming_data.get("api_key", None)
        )
    else:
        response_data = {"response": "bad request", "status": 400}
    return web.json_response(response_data)


async def get_models_endpoint(request):
    incoming_data = await request.json()
    response_data = {}
    if incoming_data["type"] == "ollama" or incoming_data["type"] == "groq":
        response_data = await get_models(incoming_data["type"], incoming_data.get("api_key", None))
    return web.json_response(response_data)


# Handle OPTIONS requests
async def handle_options(request):
    return web.Response(
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    )


# Middleware to add CORS headers to every response
@web.middleware
async def cors_middleware(request, handler):
    if request.method == "OPTIONS":
        return await handle_options(request)

    response = await handler(request)
    return await add_cors_headers(request, response)


# Add CORS headers to response
async def add_cors_headers(request, response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


async def serve_html(request):
    return web.FileResponse("../frontend/index.html")


# Create the app and add routes
app = web.Application(middlewares=[cors_middleware])
app.router.add_static("/static/", path="../frontend", name="static")

app.add_routes(
    [web.post("/prompt", post_prompt), web.post("/chat", post_chat), web.post("/models", get_models_endpoint)]
)
app.add_routes([web.get("/", serve_html)])

if __name__ == "__main__":
    web.run_app(app, port=DEFAULT_PORT)
