import { globalState } from "../stateManager/globalState.js";

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        globalState.subscribe('activePage', (newState) => this.updateNavElements(newState));
        globalState.subscribe('modelProvider', (newProvider) => this.handleModelProviderChange(newProvider));
        this.render();
        this.loadModelOptions(); // Fetch model options after initial render
    }

    disconnectedCallback() {
        globalState.unsubscribe('activePage', (newState) => this.updateNavElements(newState));
        globalState.unsubscribe('modelProvider', (newProvider) => this.handleModelProviderChange(newProvider));
    }

    async loadModelOptions() {
        const modelOptionsContainer = this.querySelector('#models');
        modelOptionsContainer.innerHTML = await this.getModelOptions();
    }

    handleModelProviderChange(newProvider) {
        this.loadModelOptions(); // Fetch new model options when modelProvider changes
    }

    render() {
        this.innerHTML = `
        <style>
            #nav-home, #nav-chat {
                cursor: pointer;
            }
        </style>
            <header>
                <label id="label" class="label header-item">LocalPrompt</label></br></br>
                <nav class="header-item">
                    <a id="nav-home" class="active-nav-button">Home</a>
                    <a id="nav-chat" class="nav-button-class">Chat</a>
                </nav>
                <div class="header-item">
                    <div id="radio-select-content" class='large-screen-last-header'>
                        <div class="using-radio-container">
                            ${this.getRadioButtons()}
                        </div>
                        <div class="model-select-container">
                            <select id="models" name="models">
                                <option>Loading...</option>
                            </select>
                        </div>
                    </div>
                    <div id="expand-button" class="small-screen-last-header" onClick='expand()'>Expand +</div>
                </div>
            </header>
        `;

        document.getElementById('nav-home').addEventListener('click', this.onNavHomeClick.bind(this));
        document.getElementById('nav-chat').addEventListener('click', this.onNavChatClick.bind(this));
        this.addRadioEventListeners();
    }

    onNavHomeClick() {
        globalState.setState('activePage', 'home');
    }
    onNavChatClick() {
        globalState.setState('activePage', 'chat');
    }

    updateNavElements(activePage) {
        const homeClass = activePage === 'home' ? 'active-nav-button' : 'nav-button-class';
        const chatClass = activePage === 'chat' ? 'active-nav-button' : 'nav-button-class';
        document.getElementById('nav-home').className = homeClass;
        document.getElementById('nav-chat').className = chatClass;
    }

    getRadioButtons() {
        return `
            <label><input type="radio" name="using" value="ollama" checked>Ollama</label>
            <label><input type="radio" name="using" value="groq">Groq</label>
            <label><input type="radio" name="using" value="custom">Custom</label>
        `;
    }

    addRadioEventListeners() {
        const radios = this.querySelectorAll('input[name="using"]');
        radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                if (event.target.checked) {
                    globalState.setState('modelProvider', event.target.value);
                }
            });
        });
    }

    async getModelOptions() {
        let payload = { type: globalState.getState('modelProvider') }
        if (globalState.getState('modelProvider') === 'groq') {
            payload['api_key'] = globalState.getState('groqApiKey');
        }
        try {
            const response = await fetch('http://localhost:8000/models', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data && data.data) {
                return data.data.map((option) => `<option value="${option}">${option}</option>`).join('');
            } else {
                return `<option>No models available</option>`;
            }
        } catch (error) {
            console.error('Error:', error);
            return `<option>Error loading models</option>`;
        }
    }
}

export default HeaderComponent;
