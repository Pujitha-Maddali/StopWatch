let startPauseBtn = document.getElementById("startPause");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let minutesEl = document.getElementById("minutes");
let secondsEl = document.getElementById("seconds");
let millisecondsEl = document.getElementById("milliseconds");
let lapsList = document.getElementById("laps");

let timer;
let isRunning = false;
let minutes = 0,
    seconds = 0,
    milliseconds = 0;

function startPauseTimer() {
    if (!isRunning) {
        isRunning = true;
        startPauseBtn.textContent = "Pause";
        startPauseBtn.style.background = "#ff3b3b";
        timer = setInterval(updateTimer, 10);
    } else {
        isRunning = false;
        startPauseBtn.textContent = "Start";
        startPauseBtn.style.background = "#ffcc00";
        clearInterval(timer);
    }
}

function updateTimer() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
    millisecondsEl.textContent = (milliseconds / 10).toString().padStart(2, "0");
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    millisecondsEl.textContent = "00";
    startPauseBtn.textContent = "Start";
    startPauseBtn.style.background = "#ffcc00";
    lapsList.innerHTML = "";
}

function addLap() {
    if (!isRunning) return;
    let lapTime = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
    let lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);