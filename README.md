# LocalPrompt

## Description
This project demonstrates a simple and lightweight client-server program for interfacing with local Language Model Machines (LLMs), using Ollama as an example. The frontend is built with basic HTML, CSS, and vanilla JavaScript, while the backend is an asynchronous web server created using asyncio and aiohttp.


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
### Run the frontend using Live Server or Five Server VSCode extension:

- Open the project folder in VSCode.
- Use the extension to serve index.html.
- Start the backend server:

### For Backend
Activate the virtual environment and run the following command:
```
python simple_async_server.py
```
### Ensure Ollama is running in the background and the Phi model is pulled. This example uses the Phi model.