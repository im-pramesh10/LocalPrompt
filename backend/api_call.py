import aiohttp
import asyncio
# from settings import OLLAMA_MODEL


async def ollama_api_call(prompt, model=None):
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(
                "http://localhost:11434/api/generate", json={"model": model, "prompt": prompt, "stream": False}
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


async def ollama_groq_chat_api(type, messages, api_key=None, prompt=None, model=None):
    if type == "groq":
        if prompt:
            messages = [{"role": "user", "content": messages}]
        if not api_key:
            return {
                "error": "API key is required for groq type",
                "status": 400,
            }
        base_url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
        json_body = {"model": model, "messages": messages}

    elif type == "ollama":
        base_url = "http://localhost:11434/api/chat"
        headers = {"Content-Type": "application/json"}
        json_body = {"model": model, "messages": messages, "stream": False}
    else:
        return {
            "error": "Invalid type provided",
            "status": 400,
        }
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(url=base_url, headers=headers, json=json_body) as response:
                response_data = await response.json()
                if prompt:
                    return {
                        "response": response_data["choices"][0]["message"]["content"],
                    }
                if type == "groq":
                    response_data = {
                        "message": {
                            "role": "assistant",
                            "content": response_data["choices"][0]["message"]["content"],
                        }
                    }
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
