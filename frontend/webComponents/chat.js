class ChatComponent extends HTMLElement {
    constructor() {
        super();
        this.loading = false;
        this.conversation_history = [
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
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
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

    handleEnter(e) {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleClick();
        }
    }

    async handleClick() {
        const message = this.shadowRoot.getElementById('message').value;
        const spinner = this.shadowRoot.getElementById('spinner');
        if (!message) {
            return;
        }
        if (loading) {
            return;
        }
        addMessage(message, true); // myMessage = true
        this.conversation_history.push({ "role": "user", "content": message });
        spinner.classList.add('spinner');
        this.loading = true;
        const api_response = await getResponse(this.conversation_history);
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
                addMessage("Something Went Wrong with ollama model. Make sure it is running and try again", false); // myMessage = false
            } else {
                addMessage(data?.message?.content, false); // myMessage = false
                return data?.message?.content;
            }
    
        } catch (error) {
            alert(error);
            addMessage("Something Went Wrong with ollama model. Make sure it is running and try again", false); // myMessage = false
        }
    }

}

export default ChatComponent;