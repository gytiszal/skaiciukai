
const UI = {
    numbers: document.querySelector(".numbers"),
    messageElement: document.querySelector(".message"),
    startButton: document.querySelector(".startButton"),
    gameOptions: document.querySelector(".gameOptions"),
    displayHours: document.querySelector("#displayHours"),
    displayMinutes: document.querySelector("#displayMinutes"),
    displaySeconds: document.querySelector("#displaySeconds")

};


function generateButtonsEasy() {
    UI.numbers.innerHTML = "";
    UI.gameOptions.style.display = "none";
    
    
    

    for (let i = 0; i < 4; i++) {
        let randomNumber = Math.floor((Math.random() * 100) + 1);
        UI.numbers.innerHTML += `<button onclick="onButtonClick(this)">${randomNumber}</button>`;
    }
}

function generateButtonsMedium() {
    UI.numbers.innerHTML = "";
    UI.gameOptions.style.display = "none";

    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor((Math.random() * 100) + 1);
        UI.numbers.innerHTML += `<button onclick="onButtonClick(this)">${randomNumber}</button>`;
    }
}

function generateButtonsHard() {
    UI.numbers.innerHTML = "";
    UI.gameOptions.style.display = "none";

    for (let i = 0; i < 22; i++) {
        let randomNumber = Math.floor((Math.random() * 100) + 1);
        UI.numbers.innerHTML += `<button onclick="onButtonClick(this)">${randomNumber}</button>`;
    }
}


function onButtonClick(button) {
 
  
  
     
   
  const currentNumber = Number(button.innerHTML);
    for (let number of UI.numbers.children) {
        if (currentNumber < Number(number.innerHTML)) {
            setMessage("Jūs pralaimėjote! Žaiskite iš naujo!");
            callStartMenu();
            UI.numbers.innerHTML = "";
            return;
        }
    }

    button.remove();

    

    if (!UI.numbers.children.length) {
        
        setMessage("Jūs laimėjote! Žaiskite iš naujo!");
        callStartMenu();
    }
}

function setMessage(message) {
    UI.messageElement.innerHTML = message;

    setTimeout(() => {
        UI.messageElement.innerHTML = "";
    }, 3000);
}

function choseYourDifficulty() {
    UI.gameOptions.innerHTML = `
    <div onclick="generateButtonsEasy()">Easy</div>
    <div onclick="generateButtonsMedium()">Medium</div>
    <div onclick="generateButtonsHard()">I love pain</div>`;
}

function callStartMenu() {
UI.gameOptions.innerHTML = `
<div onclick="choseYourDifficulty()" class="startButton">Start</div>`;
UI.gameOptions.style.display = "flex";
}


function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
   
    let fixedHh = hh - 446170;

    let formattedHH = fixedHh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    // setInterval(function(){ 
    //     UI.displayHours.innerHTML = `${formattedHH}`;
    //     UI.displayMinutes.innerHTML = `${formattedMM}`;
    //     UI.displaySeconds.innerHTML = `${formattedSS}`;
    //  }, 1000);
    
  
    return `${formattedHH}:${formattedMM}:${formattedSS}`;
    
}

// timeToString(Date.now());
  


