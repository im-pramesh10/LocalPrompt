async function handleClick() {
    const prompt = document.getElementById('prompt').value
    prompt && console.log(prompt)
    // const response = await fetch('/api', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({prompt: prompt}),
    // })
    // const data = await response.json()
    // document.getElementById('response').textContent = data.response
}