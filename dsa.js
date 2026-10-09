// Текст внутри кругов
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Сами круги (SVG)
const hoursCircle = document.getElementById("hours-circle");
const minutesCircle = document.getElementById("minutes-circle");
const secondsCircle = document.getElementById("seconds-circle");

// Кнопки
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

// Список кругов
const lapsContainer = document.getElementById("lapsContainer");
const lapList = document.getElementById("lapList");

const circumference = 2 * Math.PI * 52;

let elapsedTime = 0;
let timer = null;
let isRunning = false;
let lapCount = 0;

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateCircleProgress(circle, value, max) {
    const progress = (value / max) * circumference;
    circle.style.strokeDasharray = `${progress} ${circumference}`;
}

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");

    updateCircleProgress(hoursCircle, hours, 24);
    updateCircleProgress(minutesCircle, minutes, 60);
    updateCircleProgress(secondsCircle, seconds, 60);
}

function start() {
    if (isRunning) return;

    isRunning = true;
    timer = setInterval(() => {
        elapsedTime++;
        updateDisplay();
    }, 1000);

    startBtn.disabled = true;
    stopBtn.disabled = false;
    lapBtn.disabled = false;
}

function stop() {
    clearInterval(timer);
    isRunning = false;
    timer = null;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        const currentTime = formatTime(elapsedTime);

        const lapItem = document.createElement("div");
        lapItem.className = "lap-item";
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${currentTime}</span>
        `;

        lapList.insertBefore(lapItem, lapList.firstChild);
        lapsContainer.style.display = "block";
    }
}

function reset() {
    stop();
    elapsedTime = 0;
    lapCount = 0;
    updateDisplay();
    lapList.innerHTML = "";
    lapsContainer.style.display = "none";
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", reset);