function generateButtons() {
    const numbers = document.querySelector(".numbers");
    for (let i = 0; i < 10; i++) {
        numbers.innerHTML += "<button></button>";
    }
}
generateButtons();