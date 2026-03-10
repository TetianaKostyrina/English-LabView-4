const words = [
  {ru:"кот", en:"cat", pron:"[kæt]"},
  {ru:"собака", en:"dog", pron:"[dɔg]"},
  {ru:"яблоко", en:"apple", pron:"[ˈæp.əl]"},
  {ru:"мост", en:"bridge", pron:"[brɪdʒ]"},
  {ru:"река", en:"river", pron:"[ˈrɪv.ər]"}
];

let currentIndex = 0;

function shuffleArray(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}}

function speak(text){new SpeechSynthesisUtterance(text);window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));}

function showCard(){
  const t1Prompt=document.getElementById("t1Prompt");
  const t1Pron=document.getElementById("t1Pron");
  const t1Options=document.getElementById("t1Options");
  const feedback=document.getElementById("t1Feedback");

  const word = words[currentIndex];
  t1Prompt.textContent = word.ru;
  t1Pron.textContent = word.pron;
  feedback.textContent = "";
  
  t1Options.innerHTML = "";
  let options = [...words].sort(()=>0.5-Math.random()).slice(0,3);
  if(!options.includes(word)) options[Math.floor(Math.random()*3)] = word;
  options.forEach(w=>{
    const btn = document.createElement("button");
    btn.textContent = w.en;
    btn.onclick = ()=>{feedback.textContent = (w===word?"✔ Верно!":"❌ Неверно"); feedback.className="feedback "+(w===word?"ok":"bad");};
    t1Options.appendChild(btn);
  });
  document.getElementById("t1Index").textContent=`Слово ${currentIndex+1} из ${words.length}`;
}

document.getElementById("btnT1Next").onclick = ()=>{
  currentIndex = (currentIndex+1)%words.length;
  showCard();
};

document.getElementById("btnSpeakT1").onclick = ()=>speak(words[currentIndex].en);

document.querySelectorAll(".tab").forEach(tab=>{
  tab.onclick = ()=>{
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  };
});

showCard();
