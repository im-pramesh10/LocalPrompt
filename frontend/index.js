async function handleClick() {
    const prompt = document.getElementById('prompt').value
    prompt && console.log(prompt)
    const response = await fetch('http://localhost:8000/prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt: prompt}),
    })
    const data = await response.json()
    console.log(data)
    document.getElementById('response').textContent = data.message
}