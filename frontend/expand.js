export function expand() {
    const hiddenElement = document.querySelector('.hidden-radio-select');
    const hiddenElementContentContainer = document.getElementById('hidden-radio-select-content');
    const radioSelectContent = document.getElementById('radio-select-content');

    const htmlToSet = radioSelectContent.innerHTML;
    radioSelectContent.innerHTML = '';
    hiddenElementContentContainer.innerHTML = htmlToSet;
    hiddenElement.style.display = 'flex';
}
export function closeModal(event) {
    event.preventDefault();
    const hiddenElement = document.querySelector('.hidden-radio-select');
    const hiddenElementContentContainer = document.getElementById('hidden-radio-select-content');
    const radioSelectContent = document.getElementById('radio-select-content');

    radioSelectContent.innerHTML = hiddenElementContentContainer.innerHTML;
    hiddenElementContentContainer.innerHTML = '';
    hiddenElement.style.display = 'none';
}
