import { globalState } from "../stateManager/globalState.js";

class RightContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        globalState.subscribe('showAPIKey', (newState)=> this.update(newState));
        // globalState.subscribe('groqApiKey', (newState)=> this.update(newState));
    }

    disconnectedCallback() {
        globalState.unsubscribe('showAPIKey', (newState)=> this.update(newState));
        // globalState.unsubscribe('groqApiKey', (newState)=> this.update(newState));
    }
    update(showAPIKey) {
        const passwordInput = this.shadowRoot.getElementById('api-key');
        passwordInput.type = showAPIKey ? 'text' : 'password';
        const showHideButton = this.shadowRoot.getElementById('show-api-key');
        showHideButton.innerText = showAPIKey ? 'hide' : 'show';
    }
    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                margin: auto;
                height: 90%;
                // border: 1px solid red;
                width: 100%;
                display: flex;
                flex-direction: column;
            }
            textarea, input {
                background-color: #2f2f2f;
                color: rgb(216, 214, 214);
                font-size: 13px;
                padding: 10px;
                border-radius: 10px;
                border: none;
                outline: none;
                height: 2.5rem;
                width: 100%;
                box-sizing: border-box;
                /* overflow-y: auto; */
                resize: vertical;
            }
            button {
                background-color: #4e4e4e;
                color: rgb(216, 214, 214);
                font-size: 14px;
                width: auto;
                // height: auto;
                padding: 5px;
                border-radius: 4px;
                border: none;
                outline: none;
                cursor: pointer;
                transition: background-color 0.3s ease-in-out;
            }
            button:hover {
                background-color: #2f2f2f;
            }
            textarea:focus, input:focus {
                border: #dadada 2px solid;
            }
            @media screen and (max-width: 1280px) {
                :host {
                    display: none;
                }
            }
        </style>
        ${this.getContent()}
        `

        this.shadowRoot.getElementById('systemPrompt')?.addEventListener('blur', this.onTextAreaBlur.bind(this));
        this.shadowRoot.getElementById('show-api-key').addEventListener('click', this.onShowAPIKeyClick.bind(this));
        this.shadowRoot.getElementById('save-button').addEventListener('click',this.save.bind(this));
    }
    onTextAreaBlur () {
        globalState.setState('systemPrompt', this.shadowRoot.getElementById('systemPrompt').value);
    }

    onShowAPIKeyClick () {
        globalState.setState('showAPIKey', !globalState.getState('showAPIKey'));
    }

    save(event) {
        event.preventDefault();
        globalState.setState('groqApiKey', this.shadowRoot.getElementById('api-key').value);
        localStorage.setItem('groqApiKey', this.shadowRoot.getElementById('api-key').value);
    }
    getContent() {
        let content = ''
        if (globalState.getState('activePage') === 'home') {
            content = `
            <div>
            <label for="api-key"><strong>Groq API Key</strong></label>
            </br>
            </br>
            <div style="display: flex; align-items: center; justify-content: space-between">
            <input style="width: 90%" type=${globalState.getState('api-key')?'text':'password'} id="api-key" name="api-key" placeholder="Enter your API key here" value="${globalState.getState('groqApiKey')}"></input>
            <span id="show-api-key" style="cursor: pointer">${globalState.getState('api-key')?'hide':'show'}</span>
            </div>
            </br>
            <button id="save-button">save</button>
            </div>`
        }  
        else if (globalState.getState('activePage') === 'chat') {
            content = `
            <div>
            <label for="api-key"><strong>Groq API Key</strong></label>
            </br>
            </br>
            <div style="display: flex; align-items: center; justify-content: space-between">
            <input style="width: 90%" type=${globalState.getState('api-key')?'text':'password'} id="api-key" name="api-key" placeholder="Enter your API key here" value="${globalState.getState('groqApiKey')}"></input>
            <span id="show-api-key" style="cursor: pointer">${globalState.getState('api-key')?'hide':'show'}</span>
            </div>
            </br>
            <button id="save-button">save</button>
            </div>
            </br>
            <label for="systemPrompt"><strong>System Prompt</strong></label>
            </br>
            <textarea id="systemPrompt" placeholder="Enter your system prompt here">${globalState.getState('systemPrompt')}</textarea>`
        }
        return content;
    }
}

export default RightContainer;