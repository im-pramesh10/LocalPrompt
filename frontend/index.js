import { expand, closeModal } from "./expand.js";
import HeaderComponent from "./webComponents/header.js";
import SinglePrompt from "./webComponents/singlePrompt.js";
import StateManager from "./stateManager/statemanager.js";

export const globalState = new StateManager({
    activePage: 'home',
    modelProvider: 'ollama',
});
// Ensure that HeaderComponent is registered
customElements.define('header-component', HeaderComponent);
customElements.define('single-prompt', SinglePrompt);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('expand-ok-button').addEventListener('click', closeModal);
    document.getElementById('expand-button').addEventListener('click', expand);
})