import { expand, closeModal } from "./expand.js";
import HeaderComponent from "./webComponents/header.js";
import SinglePrompt from "./webComponents/singlePrompt.js";

export let state = {
    activePage: 'home',
}

export function setState(stateName, stateValue) {
    if (sateValue !== state[stateName]) {
    state[stateName] = stateValue;
    }
}
// Ensure that HeaderComponent is registered
customElements.define('header-component', HeaderComponent);
customElements.define('single-prompt', SinglePrompt);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('expand-ok-button').addEventListener('click', closeModal);
    document.getElementById('expand-button').addEventListener('click', expand);
})