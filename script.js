
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const hoursCircle = document.getElementById("hours-circle");
const minutesCircle = document.getElementById("minutes-circle");
const secondsCircle = document.getElementById("seconds-circle");


const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");


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

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}


function getTimeParts(totalSeconds) {
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}


function updateCircleProgress(circle, value, max) {
  const progress = (value / max) * circumference;
  circle.style.strokeDasharray = `${progress} ${circumference}`;
}


function updateDisplay() {
  const { hours, minutes, seconds } = getTimeParts(elapsedTime);


  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");


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
  timer = null;
  isRunning = false;

  startBtn.disabled = false;
  stopBtn.disabled = true;
  lapBtn.disabled = true;
}


function recordLap() {
  if (!isRunning) return;

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

updateDisplay();
