class headerClass extends HTMLElement {

    constructor() {
        super();

        const navElements = location.pathname === '/'? `<a class="active-nav-button" href="/">Home</a>
                    <a class="nav-button-class" href="/chat">Chat</a>`: 
                    `<a class="nav-button-class" href="/">Home</a>
                    <a class="active-nav-button" href="/chat">Chat</a>`
        this.innerHTML = `
            <header>
                <label id="label" class="label header-item">LocalPrompt</label></br></br>
                <nav class="header-item">
                    ${navElements}
                </nav>
                <div class="header-item">
                    <div id="radio-select-content" class='large-screen-last-header'>
                    <div class="using-radio-container">
                        <label><input type="radio" name="using" value="ollama" checked>Ollama</label>
                        <label><input type="radio" name="using" value="ollama">Groq</label>
                        <label><input type="radio" name="using" value="ollama">Custom</label>
                    </div>
                    <div class="model-select-container">
                        <select id="models" name="models">
                            <!--TODO: Fetch data from url and populate it here-->
                            <option value="1">llama3.1 80b</option>
                            <option value="2">phi2:latest</option>
                            <option value="3">mixtral-dolphin</option>
                        </select>
                    </div>
                </div>
                    <div class="small-screen-last-header" onClick='expand()'>Expand +</div>
                </div>
            </header>
        `;
    }
}

customElements.define('header-component', headerClass)