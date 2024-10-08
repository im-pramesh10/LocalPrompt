import StateManager from "./statemanager.js";

export const globalState = new StateManager({
    activePage: 'home',
    modelProvider: 'ollama',
    systemPrompt: 'You are a helpful assistant',
    model: '',
    showAPIKey: false,
    groqApiKey: localStorage.getItem('groqApiKey') || '',
});