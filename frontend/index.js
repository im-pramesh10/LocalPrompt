async function handleClick() {
    const prompt = document.getElementById('prompt').value
    const spinner = document.getElementById('spinner')
    spinner.classList.add('spinner')
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {"model": "phi", "prompt": prompt, "stream": false}
        )
    })
    const data = await response.json()
    spinner.classList.remove('spinner')
    document.getElementById('response').textContent = data.response
}

