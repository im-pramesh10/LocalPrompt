import { globalState } from "../stateManager/globalState.js";

class ChatComponent extends HTMLElement {
    constructor() {
        super();
        this.loading = false;
        this.conversation_history = [
            {
                "role": "system",
                "content": globalState.getState('systemPrompt')
            }
            // saved in this format and sent to ollama models to give them context
            // {
            // "role": "user",
            // "content": "why is the sky blue?"
            // },
            // {
            // "role": "assistant",
            // "content": "due to rayleigh scattering."
            // },
            // {
            // "role": "user",
            // "content": "how is that different than mie scattering?"
            // }
        ];
        globalState.subscribe('systemPrompt', (newState)=> this.onSystemPromptChange(newState));
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                margin: auto;
                width: 800px;
                height: 100%;
                // border: 1px solid red;
            }
            #messages-list {
                width: 100%;
                height: 80%;
                overflow-y: auto;
                display: flex;
                flex-direction: column-reverse;
            }
            #message-box {
                /* border: 1px solid green; */
                width: 100%;
                height: 20%;
                position: relative;
            }
            #message {
                height: 100%;
                width: 100%;
                resize: none;
            }
            #send-button {
                position: absolute;
                bottom: 3px;
                right: 3px;
                background-color: rgb(129, 129, 129);
                color: rgb(0, 0, 0);
                font-size: 18px;
                width: 30px;
                height: 30px;
                padding-top: 6px;
                padding-left: 8px;
                border-radius: 50%;
                border: none;
                outline: none;
                cursor: pointer;
                transition: background-color 0.5s ease-in-out;
            }
            #send-button:hover {
                background-color: #c5c5c5;
            }
            .message-bubble-container {
                width: 100%;
                display: flex;
                flex-direction: row;
            }
            .message-bubble {
                border-radius: 10px;
                padding: 10px;
                margin-bottom: 0.4rem;
                color: white;
                width: fit-content;
                max-width: 90%;
                word-wrap: break-word;
                white-space: pre-wrap; /* Preserve whitespace and newlines */
                /* background-color: #2b2b2b; */
            }
            .my-message-bubble {
                background-color: #2f2f2f
                /* color: black; */
            }
            .my-message-bubble-container {
                flex-direction: row-reverse;
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
            @media screen and (max-width: 900px) {
                :host {
                    width: 90%; /* Adjust container width for smaller screens */
                }
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

        </style>
                <div id="messages-list"></div>
                <div id="spinner"></div>
                <div id="message-box">
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Enter your message..."
                    ></textarea>
                    <button id="send-button">
                        <img
                            src="static/chat/icons/send.png"
                            alt="Send"
                            width="20"
                            height="20"                         
                        />
                    </button>
                </div>
        `;

        this.shadowRoot.getElementById('message').addEventListener('keypress', this.handleEnter.bind(this));
        this.shadowRoot.getElementById('send-button').addEventListener('click', this.handleClick.bind(this));
    }

    disconnectedCallback() {
        this.shadowRoot.getElementById('message').removeEventListener('keypress', this.handleEnter.bind(this));
        this.shadowRoot.getElementById('send-button').removeEventListener('click', this.handleClick.bind(this));
        globalState.unsubscribe('systemPrompt', this.onSystemPromptChange.bind(this));
    }

    onSystemPromptChange(newState) {
        this.conversation_history[0].content = newState;
    }

    handleEnter(e) {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.handleClick();
        }
    }

    async handleClick() {
        const message = this.shadowRoot.getElementById('message').value;
        const spinner = this.shadowRoot.getElementById('spinner');
        if (!message) {
            return;
        }
        if (this.loading) {
            return;
        }
        this.addMessage(message, true); // myMessage = true
        this.conversation_history.push({ "role": "user", "content": message });
        spinner.classList.add('spinner');
        this.loading = true;
        const api_response = await this.getResponse(this.conversation_history);
        this.conversation_history.push({ "role": "assistant", "content": api_response });
        this.loading = false;
        spinner.classList.remove('spinner');
    }

    addMessage(message, myMessage) {
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble-container');
        if (myMessage) {
            messageBubble.classList.add('my-message-bubble-container');
            messageBubble.innerHTML = `<div class="message-bubble my-message-bubble">${message}</div>`;
        } else {
            messageBubble.innerHTML = `<div class="message-bubble">${message}</div>`;
        }
        const messagesList = this.shadowRoot.getElementById('messages-list');
        messagesList.insertBefore(messageBubble, messagesList.firstChild);
        this.shadowRoot.getElementById('message').value = '';
        this.shadowRoot.getElementById('message').focus();
    }

    async getResponse(conversation_history) {
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "messages": conversation_history })
            });
            const data = await response.json();
            if (data.error) {
                alert(data.error);
                this.addMessage("Something Went Wrong with ollama model. Make sure it is running and try again", false); // myMessage = false
            } else {
                this.addMessage(data?.message?.content, false); // myMessage = false
                return data?.message?.content;
            }
    
        } catch (error) {
            alert(error);
            this.addMessage("Something Went Wrong with ollama model. Make sure it is running and try again", false); // myMessage = false
        }
    }

}

export default ChatComponent;