async function handleClick() {
    const prompt = document.getElementById('prompt').value
    const spinner = document.getElementById('spinner')
    spinner.classList.add('spinner')
    try {
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
        if (data.error) {
            alert(data.error)
        } else {
            document.getElementById('response').textContent = data.response
        }

    } catch (error) {
        console.log(error)
        alert(error)
    }
    spinner.classList.remove('spinner')
}
