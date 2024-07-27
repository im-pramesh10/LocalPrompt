import {expand, closeModal} from "./expand.js";
import {globalState} from "./stateManager/globalState.js";
import ChatComponent from "./webComponents/chat.js";
import HeaderComponent from "./webComponents/header.js";
import SinglePrompt from "./webComponents/singlePrompt.js";
import SystemPrompt from "./webComponents/systemPrompt.js";


customElements.define('header-component', HeaderComponent);
customElements.define('single-prompt', SinglePrompt);
customElements.define('chat-component', ChatComponent);
customElements.define('system-prompt', SystemPrompt);

globalState.subscribe('activePage', (newState) => {
    if (newState === 'home') {
        const content = document.getElementsByClassName('content')[0];
        content.innerHTML = `<div class="empty-div"></div>
  <single-prompt></single-prompt>
    <div class="empty-div"></div>`
    } else if (newState === 'chat') {
        const content = document.getElementsByClassName('content')[0];
        content.innerHTML = `<div class="empty-div"></div>
         <chat-component></chat-component>
        <system-prompt></system-prompt>`
    }
})


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('expand-ok-button').addEventListener('click', closeModal);
    document.getElementById('expand-button').addEventListener('click', expand);
})
