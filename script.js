const hEl=document.getElementById("hours");
const mEl=document.getElementById("minutes");
const sEl=document.getElementById("seconds");
const hCirc=document.getElementById("hours-circle");
const mCirc=document.getElementById("minutes-circle");
const sCirc=document.getElementById("seconds-circle");
const btnStart=document.getElementById("startBtn");
const btnStop=document.getElementById("stopBtn");
const btnLap=document.getElementById("lapBtn");
const btnReset=document.getElementById("resetBtn");
const wrapLaps=document.getElementById("lapsContainer");
const listLaps=document.getElementById("lapList");
const circLen=2*Math.PI*52;
let timeTotal=0;
let intervalId=null;
let active=false;
let lapIdx=0;
function fmtTime(t){
const h=Math.floor(t/3600);
const m=Math.floor((t%3600)/60);
const s=t%60;
return[h,m,s].map(v=>String(v).padStart(2,"0")).join(":");
}
function getParts(t){
return{h:Math.floor(t/3600),m:Math.floor((t%3600)/60),s:t%60};
}
function setProgress(el,val,max){
const p=(val/max)*circLen;
el.style.strokeDasharray=`${p} ${circLen}`;
}
function render(){
const{h,m,s}=getParts(timeTotal);
hEl.textContent=String(h).padStart(2,"0");
mEl.textContent=String(m).padStart(2,"0");
sEl.textContent=String(s).padStart(2,"0");
setProgress(hCirc,h,24);
setProgress(mCirc,m,60);
setProgress(sCirc,s,60);
}
function doStart(){
if(active)return;
active=true;
intervalId=setInterval(()=>{
timeTotal++;
render();
},1000);
btnStart.disabled=true;
btnStop.disabled=false;
btnLap.disabled=false;
}
function doStop(){
clearInterval(intervalId);
intervalId=null;
active=false;
btnStart.disabled=false;
btnStop.disabled=true;
btnLap.disabled=true;
}
function doLap(){
if(!active)return;
lapIdx++;
const now=fmtTime(timeTotal);
const item=document.createElement("div");
item.className="lap-item";
item.innerHTML=`<span class="lap-number">Lap ${lapIdx}</span><span class="lap-time">${now}</span>`;
listLaps.insertBefore(item,listLaps.firstChild);
wrapLaps.style.display="block";
}
function doReset(){
doStop();
timeTotal=0;
lapIdx=0;
render();
listLaps.innerHTML="";
wrapLaps.style.display="none";
}
btnStart.addEventListener("click",doStart);
btnStop.addEventListener("click",doStop);
btnLap.addEventListener("click",doLap);
btnReset.addEventListener("click",doReset);
render();