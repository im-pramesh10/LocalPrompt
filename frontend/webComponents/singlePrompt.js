import { globalState } from "../stateManager/globalState.js";
class SinglePrompt extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.loading = false;
        this.render();
    }   

    handleEnter(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            const prompt = this.shadowRoot.getElementById('prompt');
            prompt.blur();
            this.handleClick();
        }
    }

    connectedCallback() {
        this.shadowRoot.getElementById('prompt').addEventListener('keypress', this.handleEnter.bind(this));
        this.shadowRoot.getElementById('send-button').addEventListener('click', this.handleClick.bind(this));
    }

    async handleClick() {
        const prompt = this.shadowRoot.getElementById('prompt').value;
        const spinner = this.shadowRoot.getElementById('spinner');
        if (!prompt) {
            alert('Please enter a prompt');
            return;
        }
        if (this.loading) {
            return;
        }
        spinner.classList.add('spinner');
        this.loading = true;
        try {
            const response = await fetch('/prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"prompt": prompt, "type":globalState.getState('modelProvider') })
            });
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                console.log(data.response)
                this.shadowRoot.getElementById('response').textContent = data.response;
            }
        } catch (error) {
            alert(error);
        }
        spinner.classList.remove('spinner');
        this.loading = false;
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                margin: auto;
                width: 600px;
                text-align: center;
            }
            @media screen and (max-width: 768px) {
                :host {
                    width: 90%; /* Adjust container width for smaller screens */
                }
            }
            textarea {
                background-color: #2f2f2f;
                color: rgb(216, 214, 214);
                font-size: 16px;
                padding: 10px;
                border-radius: 10px;
                border: none;
                outline: none;
                height: 150px;
                width: 100%;
                box-sizing: border-box;
                /* overflow-y: auto; */
                resize: vertical;
            }
            textarea:focus {
                border: #dadada 2px solid;
            }
            #send-button {
                background-color: #4e4e4e;
                color: rgb(216, 214, 214);
                font-size: 18px;
                width: auto;
                height: auto;
                padding: 10px;
                border-radius: 10px;
                border: none;
                outline: none;
                cursor: pointer;
                transition: background-color 0.3s ease-in-out;
            }
            #send-button:hover {
                background-color: #2f2f2f;
            }
            .spinner {
                display: inline-block;
                border: 0.3rem solid white;
                border-top: 0.3rem solid #000000;
                border-radius: 50%;
                width: 0.5rem;
                height: 0.5rem;
                animation: spin 2s linear infinite;
            }
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
            .response-container {
                /* border: white 0.5px solid; */
                height: 14rem;
                resize: vertical;
                overflow-y: auto;
                background-color: #1f1f1f;
                text-align: left;
            }
            .response-container-toolbar {
                background-color: rgb(255, 255, 255);
                width: 100%;
                height: 1rem;
                color: black;
                text-align: left;
            }
            .response-toolbar-text,
            .response {
                padding-left: 0.5rem;
                color: black;
                font-weight: bolder;
            }
            .response {
                white-space: pre-wrap;
                word-wrap: break-word;
                color: #dfdfdf;
                font-weight: lighter;
            }
        </style>   
        <textarea
            id="prompt"
            name="prompt" 
            placeholder="your prompt here..."></textarea>
        </br>
        </br>
        <button id="send-button">
            Send 
            <div id="spinner">
            </div>
        </button>
        </br>
        </br>
        <div class="response-container-toolbar">
            <span class='response-toolbar-text'>    
                Response Box-[Prompt Response]
            </span>
        </div>
        <div class="response-container" id="response-container">
        <p class="response" id="response">Your prompt's response will appear here...</p>
        </div>`;
    }
}

export default SinglePrompt;