const VOCAB = [

{en:"approach",ru:"подход"},
{en:"to approach",ru:"подходить"},
{en:"highlighting",ru:"выделение"},
{en:"undefined",ru:"неопределенный"},
{en:"trace",ru:"отслеживать"},
{en:"desktop",ru:"рабочий стол"},
{en:"disabled",ru:"отключенный"},
{en:"enabled",ru:"включенный"},
{en:"valid",ru:"валидный"},
{en:"managing",ru:"управление"},
{en:"source",ru:"источник"},
{en:"met",ru:"условие выполнено"},
{en:"current",ru:"текущий"},
{en:"available",ru:"доступный"},
{en:"quotient",ru:"частное"},
{en:"remainder",ru:"остаток"},
{en:"introduction",ru:"введение"},
{en:"cases",ru:"случаи"},
{en:"each",ru:"каждый"},
{en:"of",ru:"из"},
{en:"from",ru:"от / из"}

];

let index=0;

function shuffle(arr){
return arr.sort(()=>Math.random()-0.5);
}

function showCard(){

const item=VOCAB[index];
document.getElementById("t1Prompt").textContent=item.ru;

let options=shuffle([...VOCAB]).slice(0,4);

if(!options.includes(item)){
options[0]=item;
}

const box=document.getElementById("t1Options");
box.innerHTML="";

options.forEach(o=>{

const btn=document.createElement("button");
btn.textContent=o.en;

btn.onclick=()=>{
if(o.en===item.en){
document.getElementById("t1Feedback").textContent="✅ правильно";
}else{
document.getElementById("t1Feedback").textContent="❌ ошибка";
}
};

box.appendChild(btn);

});

}

document.getElementById("btnT1Next").onclick=()=>{

index++;

if(index>=VOCAB.length){
index=0;
}

showCard();

};

showCard();

document.querySelectorAll(".tab").forEach(tab=>{

tab.onclick=()=>{

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));

tab.classList.add("active");
document.getElementById(tab.dataset.tab).classList.add("active");

};

});
