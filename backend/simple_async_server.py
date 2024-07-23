import asyncio
from aiohttp import web
from api_call import ollama_api_call, custom_model_api, ollama_chat_api
from settings import USE_CUSTOM_MODEL, DEFAULT_PORT


async def post_prompt(request):
    incoming_data = await request.json()
    if USE_CUSTOM_MODEL:
        response_data = await custom_model_api(incoming_data["prompt"])
    else:
        response_data = await ollama_api_call(incoming_data["prompt"])
    return web.json_response(response_data)

async def post_chat(request):
    incoming_data = await request.json()
    response_data = await ollama_chat_api(incoming_data["messages"])
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

async def serve_chat(request):
    return web.FileResponse("../frontend/chat/chat.html")

# Create the app and add routes
app = web.Application(middlewares=[cors_middleware])
app.router.add_static('/static/', path='../frontend', name='static')

app.add_routes([web.post("/prompt", post_prompt), web.post("/chat", post_chat)])
app.add_routes([web.get("/", serve_html), web.get("/chat", serve_chat)])

if __name__ == "__main__":
    web.run_app(app, port=DEFAULT_PORT)