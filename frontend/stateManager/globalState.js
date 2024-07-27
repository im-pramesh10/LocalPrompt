import StateManager from "./statemanager.js";

export const globalState = new StateManager({
    activePage: 'home',
    modelProvider: 'ollama',
});