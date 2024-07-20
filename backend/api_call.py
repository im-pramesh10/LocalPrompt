import aiohttp
import asyncio
import json


async def api_call(prompt):
    async with aiohttp.ClientSession() as session:
        async with session.post(
            "http://localhost:11434/api/generate", json={"model": "phi", "prompt": prompt, "stream": False}
        ) as response:
            response_data = await response.json()
            if response.status != 200:
                return {
                    'error': 'Failed to generate text. Status code: {}'.format(response.status),
                    'response': response_data
                }
            return response_data
