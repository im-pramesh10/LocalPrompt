import aiohttp
import asyncio
from settings import OLLAMA_MODEL


async def ollama_api_call(prompt):
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(
                "http://localhost:11434/api/generate", json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False}
            ) as response:
                response_data = await response.json()
                if response.status != 200:
                    return {
                        "error": "Failed to generate text. Status code: {}".format(response.status),
                        "response": response_data,
                    }
                return response_data
        except Exception as e:
            return {"error": str(e)}


async def ollama_chat_api(messages):
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(
                "http://localhost:11434/api/chat", json={"model": OLLAMA_MODEL, "messages": messages, "stream": False}
            ) as response:
                response_data = await response.json()
                if response.status != 200:
                    return {
                        "error": "Failed to generate text. Status code: {}".format(response.status),
                        "response": response_data,
                    }
                return response_data
        except Exception as e:
            return {
                "error": str(e),
            }


async def custom_model_api(prompt):
    # define your own custom model here api here
    return {"response": "You need to set up your custom model function inside api_call.py file inside backend folder"}
