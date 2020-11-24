const numbers = document.querySelector(".numbers");

function generateButtons() {
    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor((Math.random() * 100) + 1);
        numbers.innerHTML += `<button onclick="onButtonClick(this)">${randomNumber}</button>`;
    }
}

generateButtons();

function onButtonClick(button) {
    const currentNumber = Number(button.innerHTML);
    for (let number of numbers.children){
        if (currentNumber < Number(number.innerHTML))
            return;
    }
    button.remove();
}