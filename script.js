const numbers = document.querySelector(".numbers");
const messageElement = document.querySelector(".message");
const timer = document.getElementById("count");

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
            newInterval();
            return;
        }
    }

    button.remove();

    if (!numbers.children.length) {
        setMessage("Jūs laimėjote! Žaiskite iš naujo!");
        generateButtons();
        newInterval();
    }
}

function setMessage(message) {
    messageElement.innerHTML = message;

    setTimeout(() => {
        messageElement.innerHTML = "";
    }, 3000);
}





    let count = 4;
    let interval = setInterval(function () {
        timer.innerHTML = count;
        count--;
        if (count === 0) {
            clearInterval(interval);
            timer.innerHTML = '';
            setMessage("Jūs pralaimėjote! Žaiskite iš naujo!");
            generateButtons();
            return;
        }
       
    }, 1000);
    

