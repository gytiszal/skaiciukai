const numbers = document.querySelector(".numbers");
const messageElement = document.querySelector(".message");

const bomb = document.querySelector('.theBomb');
const bombTimer = document.querySelector('.bombTimer');
const bombLightning = document.querySelector('.lightning');
const bombLightningOverlay = document.querySelector('.lightningOverlay');

const cloud = document.querySelector('.mushroomCloud');
const cloudWrapper = document.querySelector('.cloudWrapper');

const timerAudio = new Audio('sound/timer.mp3');
const explosionAudio = new Audio('sound/nuke.mp3');

const cloudParts = {
    top: [
        ['300px', '300px', 'left', '0', 'top', '0'],
        ['300px', '300px', 'right', '0', 'top', '0'],
        ['200px', '200px', 'left', '200px', 'bottom', '20px'],
        ['300px', '300px', 'left', '150px', 'top', '-90px']
    ],

    mid: [
        ['200px', '200px', 'left', '0', 'top', '-90px'],
        ['240px', '240px', 'left', '-20px', 'bottom', '0'],
        ['200px', '200px', 'left', '-15px', 'top', '30px'],
        ['150px', '150px', 'right', '-10px', 'top', '40px'],
        ['150px', '150px', 'left', '-25px', 'bottom', '0'],
        ['170px', '170px', 'right', '-20px', 'bottom', '-10px']
    ],

    bot: [
        ['120px', '120px', 'left', '-50px', 'bottom', '-20px'],
        ['170px', '170px', 'left', '0', 'bottom', '-10px'],
        ['170px', '170px', 'left', '80px', 'bottom', '-30px'],
        ['170px', '170px', 'right', '25px', 'bottom', '-10px'],
        ['140px', '140px', 'right', '0', 'bottom', '-10px'],
        ['120px', '120px', 'right', '-50px', 'bottom', '-20px']
    ]
};

const data = {
    timerTime: 15,
    paused: false
};

function generateButtons() {
    numbers.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor((Math.random() * 100) + 1);
        numbers.innerHTML += `<button onclick="onButtonClick(this)">${randomNumber}</button>`;
    }
}

function setBombTimer(time) {
    time >= 10 ? bombTimer.innerHTML = `00:${time}` : bombTimer.innerHTML = `00:0${time}`;
}

function disableButtons(toDisable) {
    for (let n of numbers.children) {
        if (toDisable) {
            n.disabled = true;
            n.style.backgroundColor = 'red';
            n.style.cursor = 'not-allowed';
        } else {
            n.disabled = false;
            n.style.backgroundColor = '#f1c40f';
            n.style.cursor = 'pointer';
        }
    }
}

function bombExplode() {
    explosionAudio.play();
    disableButtons(true);

    bombLightningOverlay.style.display = 'block'
    bombLightning.style.display = 'block';

    setTimeout(() => {
        cloudWrapper.style.display = 'flex';
        bomb.style.display = 'none';
    }, 1500);
}

function resetBomb(timerTime) {
    explosionAudio.pause();
    explosionAudio.currentTime = 0;
    bomb.style.display = 'flex';
    cloudWrapper.style.display = 'none';
    data.timerTime = timerTime;

    setBombTimer(data.timerTime);
    data.paused = true;

    setTimeout(() => { data.paused = false; }, 1000);
}

function drawCloudBubble(cloudPart, arrayOfBubbleData) {
    const newBubble = document.createElement('div');
    const widthNumber = Number(arrayOfBubbleData[0].substring(0, arrayOfBubbleData[0].length - 2));

    if (widthNumber > 200) {
        newBubble.classList.add('largeCircle');
    } else if (widthNumber < 200 && widthNumber > 150) {
        newBubble.classList.add('mediumCircle');
    } else {
        newBubble.classList.add('smallCircle');
    }

    newBubble.style.position = 'absolute';
    newBubble.style.borderRadius = '50%';
    newBubble.style.width = arrayOfBubbleData[0];
    newBubble.style.height = arrayOfBubbleData[1];

    arrayOfBubbleData[2] === 'left' ? newBubble.style.left = arrayOfBubbleData[3] : newBubble.style.right = arrayOfBubbleData[3];
    arrayOfBubbleData[4] === 'top' ? newBubble.style.top = arrayOfBubbleData[5] : newBubble.style.bottom = arrayOfBubbleData[5];
    
    cloudPart.appendChild(newBubble);
}

function drawCloudTop() {
    for (let i = 0; i < cloudParts.top.length; i++)
        drawCloudBubble(cloud.children[0], cloudParts.top[i]);
}

function drawCloudMid() {
    for (let i = 0; i < cloudParts.mid.length; i++)
        drawCloudBubble(cloud.children[1], cloudParts.mid[i]);
}

function drawCloudBot() {
    for (let i = 0; i < cloudParts.bot.length; i++)
        drawCloudBubble(cloud.children[2], cloudParts.bot[i]);
}

function playerLost() {
    // data.paused = true;
    bombExplode();

    setTimeout(() => {
        bombLightningOverlay.style.display = 'none'
        bombLightning.style.display = 'none';
    }, 4000);

    setTimeout(() => {
        setMessage("Jūs pralaimėjote! Žaiskite iš naujo!");
        disableButtons(false);
        generateButtons();
        resetBomb(15);
    }, 8000);
}

drawCloudTop();
drawCloudMid();
drawCloudBot();

generateButtons();
setBombTimer(data.timerTime);

function onButtonClick(button) {
    const currentNumber = Number(button.innerHTML);

    for (let number of numbers.children) {
        if (currentNumber < Number(number.innerHTML)) {
            playerLost();
            return;
        }
    }

    button.remove();

    if (!numbers.children.length) {
        setMessage("Jūs laimėjote! Žaiskite iš naujo!");
        generateButtons();
        resetBomb(15);
    }
}

function setMessage(message) {
    messageElement.innerHTML = message;

    setTimeout(() => { messageElement.innerHTML = ""; }, 3000);
}

setInterval(() => {
    if (!data.paused && data.timerTime > 1) {
        timerAudio.play();
    }

    if (!data.paused && data.timerTime > 0)
        data.timerTime -= 1;
    
    if (!data.paused && data.timerTime === 0 && !numbers.children[0].disabled) {
        playerLost();

        data.timerTime = 15;
    }
    
    setBombTimer(data.timerTime);
}, 1000);
