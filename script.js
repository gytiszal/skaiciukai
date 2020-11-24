function generateButtons() {
    const numbers = document.querySelector(".numbers");
    
    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor((Math.random() * 100) + 1);
        numbers.innerHTML += `<button onclick="onButtonClick(this)">${randomNumber}</button>`;
    }
}

generateButtons();

function onButtonClick(button) {
    button.remove();
}