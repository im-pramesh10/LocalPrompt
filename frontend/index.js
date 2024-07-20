async function handleClick() {
    const prompt = document.getElementById('prompt').value
    const spinner = document.getElementById('spinner')
    spinner.classList.add('spinner')
    try {
        const response = await fetch('http://localhost:8000/prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {"prompt": prompt}
            )
        })
        const data = await response.json()
        if (data.error) {
            alert(data.error)
        } else {
            document.getElementById('response').textContent = data.response
        }

    } catch (error) {
        alert(error)
    }
    spinner.classList.remove('spinner')
}
