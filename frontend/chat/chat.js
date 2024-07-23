let conversation_history = [
    // saved in this format and sent to ollama models to give them context
    // {
    // "role": "user",
    // "content": "why is the sky blue?"
    // },
    // {
    // "role": "assistant",
    // "content": "due to rayleigh scattering."
    // },
    // {
    // "role": "user",
    // "content": "how is that different than mie scattering?"
    // }
]

let loading = false; // loading state for chat
function handleEnter(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault()
        handleClick()
    }
}
async function handleClick() {
    const message = document.getElementById('message').value
    const spinner = document.getElementById('spinner')
    if (! message) {
        return
    }
    if (loading) {
        return
    }
    addMessage(message, true) // myMessage = true
    conversation_history.push({"role": "user", "content": message})
    spinner.classList.add('spinner')
    loading = true
    const api_response = await getResponse(conversation_history)
    conversation_history.push({"role": "assistant", "content": api_response})
    loading = false
    spinner.classList.remove('spinner')
}

function addMessage(message, myMessage) {
    const messageBubble = document.createElement('div')
    messageBubble.classList.add('message-bubble-container')
    if (myMessage) {
        messageBubble.classList.add('my-message-bubble-container')
        messageBubble.innerHTML = `<div class="message-bubble my-message-bubble">${message}</div>`
    } else {
        messageBubble.innerHTML = `<div class="message-bubble">${message}</div>`
    }
    const messagesList = document.getElementById('messages-list')
    messagesList.insertBefore(messageBubble, messagesList.firstChild)
    document.getElementById('message').value = ''
    document.getElementById('message').focus()
}

async function getResponse(conversation_history) {
    try {
        const response = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {"messages": conversation_history}
            )
        })
        const data = await response.json()
        if (data.error) {
            alert(data.error)
            addMessage("Something Went Wrong with ollama model. Make sure it is running and try again", false) // myMessage = false
        } else {
            addMessage(data ?. message ?. content, false) // myMessage = false
            return data ?. message ?. content
        }

    } catch (error) {
        alert(error)
        addMessage("Something Went Wrong with ollama model. Make sure it is running and try again", false) // myMessage = false
    }
}
