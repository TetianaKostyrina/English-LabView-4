const vocabulary = [
    { w: "An approach", t: "подход" }, { w: "To approach", t: "подходить" },
    { w: "Highlighting", t: "выделение" }, { w: "Undefined", t: "неопределенный" },
    { w: "Trace", t: "отслеживать" }, { w: "Desktop", t: "рабочий стол" },
    { w: "Disabled", t: "отключенный" }, { w: "Enabled", t: "включенный" },
    { w: "Valid", t: "действительный" }, { w: "Managing", t: "управление" },
    { w: "Source", t: "источник" }, { w: "Met", t: "удовлетворенный" },
    { w: "Current", t: "текущий" }, { w: "Available", t: "доступный" },
    { w: "Quotient", t: "частное" }, { w: "Remainder", t: "остаток" },
    { w: "Introduction", t: "введение" }, { w: "Cases", t: "случаи" },
    { w: "Each", t: "каждый" }, { w: "Of", t: "из" }, { w: "From", t: "от" }
];

// Функция для озвучки (использует системный синтезатор речи)
function playSound(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
}

function startMode(mode) {
    document.getElementById('menu').classList.add('hidden');
    const area = document.getElementById('game-area');
    const content = document.getElementById('content');
    area.classList.remove('hidden');

    if (mode === 'learn') {
        const item = vocabulary[Math.floor(Math.random() * vocabulary.length)];
        content.innerHTML = `
            <div onclick="playSound('${item.w}')" style="cursor:pointer">
                <h2>${item.w} 🔊</h2>
                <p>${item.t}</p>
            </div>
            <button onclick="startMode('learn')" style="margin-top:10px">Следующее</button>
        `;
    } else {
        content.innerHTML = `<h3>Режим ${mode} активирован!</h3>`;
    }
}
