# LocalPrompt

## Description
This project demonstrates a simple and lightweight client-server program for interfacing with local Language Model Machines (LLMs), using Ollama as an example. The frontend is built with basic HTML, CSS, and vanilla JavaScript, while the backend is an asynchronous web server created using asyncio and aiohttp in python.

![LocalPrompt Screenshot](readme-images/image.png)

## Prerequisites
- Python 3.7+
- aiohttp library
- ollama installed in the system

## Installation
### Clone the Repository

```
git clone https://github.com/im-pramesh10/LocalPrompt.git
cd LocalPrompt/backend
```
### Create python virtual environment
```
python -m venv venv
```
else
```
python3 -m venv venv
```
or
```
virtualenv venv
```

### Activate venv
- For Windows
```
.\venv\Scripts\activate
```
- For Linux and MacOs
```
source venv/bin/activate
```
### Install from requirements.txt
```
pip install -r requirements.txt
```

## Usage
- cd into backend folder
- Activate the virtual environment and run the following command:
```
python simple_async_server.py
```
- navigate to http://localhost:8000 to use the program
- Ensure Ollama is running in the background and the Phi model is pulled. This example uses the Phi model.

## Modifying for Other LLMs
To connect the client-server setup with a different LLM or your own model's API, you can modify the api_call function inside the api_call.py file.

The api_call function:
```
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

```