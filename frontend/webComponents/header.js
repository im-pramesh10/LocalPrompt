import { globalState } from "../stateManager/globalState.js";

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        globalState.subscribe('activePage', (newState)=> this.updateNavElements(newState));
        this.render();
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
                                ${this.getModelOptions()}
                            </select>
                        </div>
                    </div>
                    <div id="expand-button" class="small-screen-last-header" onClick='expand()'>Expand +</div>
                </div>
            </header>
        `;

        document.getElementById('nav-home').addEventListener('click', this.onNavHomeClick.bind(this));
        document.getElementById('nav-chat').addEventListener('click', this.onNavChatClick.bind(this));
    }

    onNavHomeClick () {
        globalState.setState('activePage', 'home');
    }
    onNavChatClick () {
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

    getModelOptions() {
        return `
            <option value="1">llama3.1 80b</option>
            <option value="2">phi2:latest</option>
            <option value="3">mixtral-dolphin</option>
        `;
    }
}
export default HeaderComponent;