class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const navElements = this.getNavElements();
        this.innerHTML = `
            <header>
                <label id="label" class="label header-item">LocalPrompt</label></br></br>
                <nav class="header-item">
                    ${navElements}
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
                    <div class="small-screen-last-header" onClick='expand()'>Expand +</div>
                </div>
            </header>
        `;
    }

    getNavElements() {
        const homeClass = location.pathname === '/' ? 'active-nav-button' : 'nav-button-class';
        const chatClass = location.pathname === '/chat' ? 'active-nav-button' : 'nav-button-class';

        return `
            <a class="${homeClass}" href="/">Home</a>
            <a class="${chatClass}" href="/chat">Chat</a>
        `;
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

customElements.define('header-component', HeaderComponent);
