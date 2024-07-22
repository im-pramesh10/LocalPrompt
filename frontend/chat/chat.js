function handleEnter(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault()
        // const prompt = document.getElementById('message')
        // prompt.blur()
        handleClick()
    }
}
function handleClick() {
    const message = document.getElementById('message').value
    if (! message) {
        alert('Please enter a message')
        return
    }
    showMessage(message, true)
}

function showMessage(message, myMessage) {
    const messageBubble = document.createElement('div')
    messageBubble.classList.add('message-bubble-container')
    if (myMessage) {
        messageBubble.classList.add('my-message-bubble-container')
        messageBubble.innerHTML = `<p class="message-bubble my-message-bubble">${message}</p>`
    }
    else{
        messageBubble.innerHTML = `<p class="message-bubble">${message}</p>`
    }
    const messagesList = document.getElementById('messages-list')
    messagesList.insertBefore(messageBubble, messagesList.firstChild)
    document.getElementById('message').value = ''
    document.getElementById('message').focus()
}