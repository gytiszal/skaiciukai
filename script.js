const numbers = document.querySelector(".numbers");
const messageElement = document.querySelector(".message");

function generateButtons() {
    numbers.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor((Math.random() * 100) + 1);
        numbers.innerHTML += `<button onclick="onButtonClick(this)">${randomNumber}</button>`;
    }
}

generateButtons();

function onButtonClick(button) {
    const currentNumber = Number(button.innerHTML);
    for (let number of numbers.children) {
        if (currentNumber < Number(number.innerHTML)) {
            console.log("Radome didesnį skaičių");
            setMessage("Jūs pralaimėjote! Žaiskite iš naujo!");
            generateButtons();
            return;
        }
    }

    button.remove();

    if (!numbers.children.length) {
        setMessage("Jūs laimėjote! Žaiskite iš naujo!");
        generateButtons();
    }
}

function setMessage(message) {
    messageElement.innerHTML = message;

    setTimeout(() => {
        messageElement.innerHTML = "";
    }, 3000);
}