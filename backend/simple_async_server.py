import asyncio
from aiohttp import web

async def post_prompt(request):
    incoming_data = await request.json()
    print(incoming_data)
    response_data = {
        "message": "Hello, world!",
    }
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

# Create the app and add routes
app = web.Application(middlewares=[cors_middleware])
app.add_routes([web.post("/prompt", post_prompt)])

if __name__ == "__main__":
    web.run_app(app, port=8000)
