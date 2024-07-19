import asyncio
from aiohttp import web

async def post_prompt(request):
    incoming_data = await request.json()
    print(incoming_data)
    response_data = {
        "message": "Hello, world!",
    }
    return web.json_response(response_data)

app = web.Application()
app.add_routes([
    web.post('/prompt', post_prompt)
])

if __name__ == '__main__':
    web.run_app(app, port=8000)
