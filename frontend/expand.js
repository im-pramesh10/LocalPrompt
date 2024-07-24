function expand() {
    const hiddenElement = document.querySelector('.hidden-radio-select');
    hiddenElement.style.display = 'flex';
}
function closeModal(e) {
    e.preventDefault();
    const hiddenElement = document.querySelector('.hidden-radio-select');
    hiddenElement.style.display = 'none';
}