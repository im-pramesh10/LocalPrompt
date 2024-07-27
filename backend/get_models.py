import aiohttp

async def get_models(type, api_key=None):
    if type == "ollama":
        base_url = "http://localhost:11434/api/tags"
        headers = {}
    elif type == "groq":
        if not api_key:
            return {
                "error": "API key is required for groq type",
                "status": 400,
            }
        base_url = "https://api.groq.com/openai/v1/models"
        headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    else:
        return {
            "error": "Invalid type provided",
            "status": 400,
        }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(base_url, headers=headers) as response:
                if response.status == 200:
                    response_data = await response.json()
                    if type == "groq":
                        # Filter out the list of model IDs for groq type
                        model_ids = [model['id'] for model in response_data['data']]
                        return {
                            "data": model_ids,
                            "status": 200
                        }
                    elif type == "ollama":
                        # Filter out the list of model names for ollama type
                        model_names = [model['name'] for model in response_data['models']]
                        return {
                            "data": model_names,
                            "status": 200
                        }
                else:
                    return {
                        "error": f"Failed to get models. Status code: {response.status}",
                        "status": response.status,
                    }
    except aiohttp.ClientError as e:
        return {
            "error": f"Request failed with error: {str(e)}",
            "status": 500,
        }
