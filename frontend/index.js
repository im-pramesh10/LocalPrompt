import {expand, closeModal} from "./expand.js";
import {globalState} from "./stateManager/globalState.js";
import ChatComponent from "./webComponents/chat.js";
import HeaderComponent from "./webComponents/header.js";
import SinglePrompt from "./webComponents/singlePrompt.js";


customElements.define('header-component', HeaderComponent);
customElements.define('single-prompt', SinglePrompt);
customElements.define('chat-component', ChatComponent);


globalState.subscribe('activePage', (newState) => {
    if (newState === 'home') {
        const content = document.getElementsByClassName('content')[0];
        const chatComponent = document.querySelector('chat-component');
        const singlePrompt = document.createElement('single-prompt');
        content.replaceChild(singlePrompt, chatComponent);
    } else if (newState === 'chat') {
        const content = document.getElementsByClassName('content')[0];
        const singlePrompt = document.querySelector('single-prompt');
        const chatComponent = document.createElement('chat-component');
        content.replaceChild(chatComponent, singlePrompt);
    }
})


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('expand-ok-button').addEventListener('click', closeModal);
    document.getElementById('expand-button').addEventListener('click', expand);
})
