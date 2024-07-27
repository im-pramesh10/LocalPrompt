import { expand, closeModal } from "./expand.js";
import HeaderComponent from "./webComponents/header.js";
import SinglePrompt from "./webComponents/singlePrompt.js";

// Ensure that HeaderComponent is registered
customElements.define('header-component', HeaderComponent);
customElements.define('single-prompt', SinglePrompt);

let loading = false; // loading state for prompt

function handleEnter(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        const prompt = document.getElementById('prompt');
        prompt.blur();
        handleClick();
    }
}

async function handleClick() {
    const prompt = document.getElementById('prompt').value;
    const spinner = document.getElementById('spinner');
    if (!prompt) {
        alert('Please enter a prompt');
        return;
    }
    if (loading) {
        return;
    }
    spinner.classList.add('spinner');
    loading = true;
    try {
        const response = await fetch('/prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"prompt": prompt})
        });
        const data = await response.json();
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('response').textContent = data.response;
        }
    } catch (error) {
        alert(error);
    }
    spinner.classList.remove('spinner');
    loading = false;
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('prompt').addEventListener('keypress', handleEnter);
    document.getElementById('send-button').addEventListener('click', handleClick);
    document.getElementById('expand-ok-button').addEventListener('click', closeModal);
    document.getElementById('expand-button').addEventListener('click', expand);
})