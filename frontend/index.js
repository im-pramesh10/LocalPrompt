import {expand, closeModal} from "./expand.js";
import {globalState} from "./stateManager/globalState.js";
import ChatComponent from "./webComponents/chat.js";
import HeaderComponent from "./webComponents/header.js";
import SinglePrompt from "./webComponents/singlePrompt.js";
import RightContainer from "./webComponents/RightContainer.js";

customElements.define('header-component', HeaderComponent);
customElements.define('single-prompt', SinglePrompt);
customElements.define('chat-component', ChatComponent);
customElements.define('right-container', RightContainer);

globalState.subscribe('activePage', (newState) => {
    let content = document.getElementsByClassName('content')[0];

    switch(newState) {
        case 'home':
            updateContentForHome(content);
            break;
        case 'chat':
            updateContentForChat(content);
            break;
        default:
            console.warn(`Unknown state: ${newState}`);
            return;
    }
});

function updateContentForHome(content) {
    content.innerHTML = `
        <div class="empty-div"></div>
        <single-prompt></single-prompt>
        <right-container></right-container>
    `;
}

function updateContentForChat(content) {
    content.innerHTML = `
        <div class="empty-div"></div>
        <chat-component></chat-component>
        <right-container></right-container>
    `;
}



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('expand-ok-button').addEventListener('click', closeModal);
    document.getElementById('expand-button').addEventListener('click', expand);
})
