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

let index = 0;

// перемешивание массива
function shuffle(arr){ return arr.sort(()=>Math.random()-0.5); }

// функция озвучки с отменой предыдущей
function speak(word){
  if('speechSynthesis' in window){
    window.speechSynthesis.cancel(); // отменяем предыдущие
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
  }
}

document.addEventListener("DOMContentLoaded", ()=>{

  // =================== RU → EN ===================
  function showCard(){
    const item = VOCAB[index];
    document.getElementById("t1Prompt").textContent = item.ru;

    // варианты
    let options = shuffle(VOCAB.filter(o => o.en !== item.en)).slice(0,3);
    options.push(item);
    options = shuffle(options);

    const box = document.getElementById("t1Options");
    box.innerHTML = "";
    options.forEach(o=>{
      const btn = document.createElement("button");
      btn.textContent = o.en;
      btn.onclick = ()=>{
        document.getElementById("t1Feedback").textContent = (o.en===item.en)?"✅ правильно":"❌ ошибка";
        if(o.en===item.en) speak(item.en);
      };
      box.appendChild(btn);
    });

    // озвучка слова при показе карточки
    speak(item.en);
  }

  document.getElementById("btnT1Next").onclick = ()=>{
    index = (index+1)%VOCAB.length;
    showCard();
    document.getElementById("t1Feedback").textContent="";
  }

  showCard();

  // =================== MCQ ===================
  let mcqIndex=0;
  function showMcq(){
    const item = VOCAB[mcqIndex];
    document.getElementById("mcqWord").textContent = item.en;

    let options = shuffle(VOCAB.filter(o=>o.ru!==item.ru)).slice(0,3);
    options.push(item);
    options = shuffle(options);

    const box = document.getElementById("mcqOptions");
    box.innerHTML="";
    options.forEach(o=>{
      const btn=document.createElement("button");
      btn.textContent=o.ru;
      btn.onclick=()=>{
        document.getElementById("mcqFeedback").textContent = (o.ru===item.ru)?"✅ правильно":"❌ ошибка";
      };
      box.appendChild(btn);
    });

    // озвучка слова
    speak(item.en);
  }

  document.getElementById("btnMcqNext").onclick=()=>{
    mcqIndex=(mcqIndex+1)%VOCAB.length;
    showMcq();
    document.getElementById("mcqFeedback").textContent="";
  }

  showMcq();

  // =================== Ввод ===================
  let typeIndex=0;
  function showTyping(){
    const item=VOCAB[typeIndex];
    document.getElementById("typePrompt").textContent=item.ru;
    document.getElementById("typeInput").value="";
    document.getElementById("typeFeedback").textContent="";

    speak(item.en);
  }

  document.getElementById("btnCheckType").onclick=()=>{
    const item=VOCAB[typeIndex];
    const input=document.getElementById("typeInput").value.trim();
    document.getElementById("typeFeedback").textContent=
      (input.toLowerCase()===item.en.toLowerCase())?"✅ правильно":`❌ ошибка, правильный ответ: ${item.en}`;
  }

  document.getElementById("btnTypeNext").onclick=()=>{
    typeIndex=(typeIndex+1)%VOCAB.length;
    showTyping();
  }

  showTyping();

  // =================== Соответствия ===================
  function showMatch(){
    const shuffled = shuffle([...VOCAB]);
    const left = shuffle(shuffled.map(o=>o.en));
    const right = shuffle(shuffled.map(o=>o.ru));

    const leftDiv = document.getElementById("matchLeft");
    const rightDiv = document.getElementById("matchRight");
    leftDiv.innerHTML=""; rightDiv.innerHTML="";

    left.forEach((word,i)=>{
      const btn=document.createElement("button");
      btn.textContent=word; btn.dataset.index=i;
      leftDiv.appendChild(btn);
    });

    right.forEach((word,i)=>{
      const btn=document.createElement("button");
      btn.textContent=word; btn.dataset.index=i;
      rightDiv.appendChild(btn);
    });

    let selectedLeft=null;
    leftDiv.querySelectorAll("button").forEach(btn=>{
      btn.onclick=()=>{selectedLeft=btn.textContent;}
    });
    rightDiv.querySelectorAll("button").forEach(btn=>{
      btn.onclick=()=>{
        if(selectedLeft){
          const correct=VOCAB.find(o=>o.en===selectedLeft).ru;
          document.getElementById("matchFeedback").textContent=(btn.textContent===correct)?"✅ правильно":"❌ ошибка";
          selectedLeft=null;
        }
      }
    });
  }

  showMatch();

  // =================== Вкладки ===================
  document.querySelectorAll(".tab").forEach(tab=>{
    tab.onclick=()=>{
      document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
      document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    }
  });

});
