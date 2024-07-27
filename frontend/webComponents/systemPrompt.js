import { globalState } from "../stateManager/globalState.js";

class SystemPrompt extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
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
            textarea {
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
            textarea:focus {
                border: #dadada 2px solid;
            }
            @media screen and (max-width: 1280px) {
                :host {
                    display: none;
                }
            }
        </style>
        <label for="systemPrompt"><strong>System Prompt</strong></label>
        </br>
        </br>
        <textarea id="systemPrompt" placeholder="Enter your system prompt here..." name="systemPrompt">${globalState.getState('systemPrompt')}</textarea>
        `

        this.shadowRoot.getElementById('systemPrompt').addEventListener('blur', this.onTextAreaBlur.bind(this));
    }
    onTextAreaBlur () {
        globalState.setState('systemPrompt', this.shadowRoot.getElementById('systemPrompt').value);
    }
}

export default SystemPrompt;