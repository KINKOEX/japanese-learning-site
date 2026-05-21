// Japanese Interactive Learning Web App logic

// Default verbs database
const verbsDB = [
    // Group 1
    { kanji: "買う", roma: "kau", type: 1, base: "買", end: "う", translation: "買" },
    { kanji: "行く", roma: "iku", type: 1, base: "行", end: "く", translation: "去" },
    { kanji: "泳ぐ", roma: "oyogu", type: 1, base: "泳", end: "ぐ", translation: "游泳" },
    { kanji: "話す", roma: "hanasu", type: 1, base: "話", end: "す", translation: "說話" },
    { kanji: "立つ", roma: "tatsu", type: 1, base: "立", end: "つ", translation: "站立" },
    { kanji: "死ぬ", roma: "shinu", type: 1, base: "死", end: "ぬ", translation: "死亡" },
    { kanji: "遊ぶ", roma: "asobu", type: 1, base: "遊", end: "ぶ", translation: "玩耍" },
    { kanji: "読む", roma: "yomu", type: 1, base: "読", end: "む", translation: "閱讀" },
    { kanji: "帰る", roma: "kaeru", type: 1, base: "帰", end: "る", translation: "回家" },
    { kanji: "のどが渇く", roma: "nodo ga kawaku", type: 1, base: "のどが渇", end: "く", translation: "喉嚨渴" },
    { kanji: "間に合う", roma: "maniau", type: 1, base: "間に合", end: "う", translation: "來得及" },
    { kanji: "飼う", roma: "kau", type: 1, base: "飼", end: "う", translation: "飼養" },
    { kanji: "頼む", roma: "tanomu", type: 1, base: "頼", end: "む", translation: "拜託/請求" },
    { kanji: "冷やす", roma: "hiyasu", type: 1, base: "冷や", end: "す", translation: "冰鎮/冷卻" },
    // Group 2
    { kanji: "食べる", roma: "taberu", type: 2, base: "食べ", end: "る", translation: "吃" },
    { kanji: "寝る", roma: "neru", type: 2, base: "寝", end: "る", translation: "睡覺" },
    { kanji: "見る", roma: "miru", type: 2, base: "見", end: "る", translation: "看" },
    { kanji: "集める", roma: "atsumeru", type: 2, base: "集め", end: "る", translation: "收集" },
    { kanji: "調べる", roma: "shiraberu", type: 2, base: "調べ", end: "る", translation: "調查" },
    { kanji: "覚える", roma: "oboeru", type: 2, base: "覚え", end: "る", translation: "記住/學習" },
    { kanji: "つかれる", roma: "tsukareru", type: 2, base: "つかれ", end: "る", translation: "疲倦" },
    { kanji: "閉める", roma: "shimeru", type: 2, base: "閉め", end: "る", translation: "關閉" },
    { kanji: "忘れる", roma: "wasureru", type: 2, base: "忘れ", end: "る", translation: "忘記" },
    // Group 3
    { kanji: "する", roma: "suru", type: 3, base: "", end: "する", translation: "做" },
    { kanji: "来る", roma: "kuru", type: 3, base: "", end: "来る", translation: "來" },
    { kanji: "予約する", roma: "yoyakusuru", type: 3, base: "予約", end: "する", translation: "預約" },
    { kanji: "質問する", roma: "shitsumonsuru", type: 3, base: "質問", end: "する", translation: "提問" }
];

// Quiz Questions Database (L19 - L21 Content)
const quizQuestions = [
    {
        type: "radio",
        question: "わたしは夏休みに______北海道へ行こうと思っています。",
        options: [
            "なれば",
            "なったら",
            "なるなら"
        ],
        answer: 1, // index 1: なったら (tara is most appropriate for chronological sequence/certain time in future)
        explanation: "「なったら」表示等到了那個時間點之後。夏天是一定會到來的（時間的轉移後果），在口語中最常用「～たら」表示時間的順序關係（當...之後）。"
    },
    {
        type: "radio",
        question: "ここを______ふたが開きます。",
        options: [
            "押すと",
            "押すなら",
            "押せば"
        ],
        answer: 0, // index 0: 押すと (natural/inevitable consequence)
        explanation: "「～と」表示必然的結果（機器操作、自然規律等），翻譯為「一按這裡，蓋子就會打開」。"
    },
    {
        type: "radio",
        question: "来年アメリカへ行くそうですね。アメリカへ______その前に車の運転を習っておいたほうがいいです。",
        options: [
            "行けば",
            "行ったら",
            "行くなら"
        ],
        answer: 2, // index 2: 行くなら (nara is used for giving advice before the action takes place)
        explanation: "在要去美國（未發生的動作）之前先學開車，這種提供建議、對策的用法必須使用「～なら」（如果是要去的話...）。"
    },
    {
        type: "radio",
        question: "A：「日本語を習いたいですが」<br>B：「日本語を______東呉の推広班のほうがいいですよ。」",
        options: [
            "習うなら",
            "習えば",
            "習ったら"
        ],
        answer: 0, // index 0: 習うなら (advice/suggestion)
        explanation: "根據對方剛才說的話（想要學日文），給予建議或提議，應使用「～なら」（如果是要學日文的話...）。"
    },
    {
        type: "radio",
        question: "このことばは辞書を______分からないでしょう。",
        options: [
            "見れば",
            "見ても",
            "見なければ"
        ],
        answer: 2, // index 2: 見なければ (Vなければ...ない)
        explanation: "句尾是「分からないでしょう」（可能不懂吧），表示否定。因此前半句為「如果不查字典的話」 -> 「見なければ」 。"
    },
    {
        type: "radio",
        question: "A：「日本語がもっと上手になりたいな。」<br>B：「日本語が上手になりたい______、たくさんの人と日本語で話すことだ。」",
        options: [
            "なら",
            "たら",
            "ば"
        ],
        answer: 0, // index 0: なら
        explanation: "「なら」常用於針對對方的期望或計劃給予「建議、忠告」。句尾的「話すことだ」是「應該去說...」的建議語氣。"
    },
    {
        type: "radio",
        question: "（失禮避坑題）當你想幫日文老師拿行李時，以下哪句日文是**最得體、最禮貌**的？",
        options: [
            "先生、荷物を持ってあげます。",
            "先生、荷物を持ってくれますか。",
            "先生、荷物をお持ちします。"
        ],
        answer: 2, // index 2: 先生、荷物をお持ちします。(謙讓表現)
        explanation: "「Vてあげる」有由上對下的施恩感，在長輩或老師面前使用極其失禮！最得體的說法是使用謙讓語「お持ちします」或提議「持ちましょうか」。"
    },
    {
        type: "radio",
        question: "（視角分析題）媽媽今天早上幫我做便當，要表達感謝，應該說：",
        options: [
            "母は今朝お弁当を作りました。",
            "母は今朝お弁当を作ってくれました。",
            "わたしは母に今朝お弁当を作ってあげました。"
        ],
        answer: 1, // index 1: 作ってくれました
        explanation: "日文習慣把「恩惠感」表達出來，如果僅用普通的動詞形式（作りました），顯得冷淡。他人為我做事，應使用「Vてくれる」表達感謝之意。"
    },
    {
        type: "radio",
        question: "（受身形應用）我的日記被姐姐偷看了（感到很困擾），日語的說法應該是：",
        options: [
            "姉は日記を読みました。",
            "わたしの日記は姉に読まれました。",
            "私は姉に日記を読まれました。"
        ],
        answer: 2, // index 2: 私は姉に日記を読まれました (Adversative passive structure: Subj は Agent に Obj を Verb-passive)
        explanation: "表示自己所有的東西（日記）被他人做出某動作，而自己感到困擾（間接被害被動），標準結構是「主語（被害者）は＋行為者に入力對象を＋被動動詞」。"
    },
    {
        type: "radio",
        question: "（好的事情 vs 困擾的事情）早上被爸爸早早叫醒（我想多睡一會，覺得很煩），日語應選用哪種說法？",
        options: [
            "わたしは毎朝早く父に起こされました。",
            "私は父に毎朝起こしてもらいました。",
            "父は毎朝早くわたしを起こしてあげました。"
        ],
        answer: 0, // index 0: 起こされました (Passive expresses annoyance / unwanted event)
        explanation: "日語中，受到他人行為時：好的事情（心存感激）使用「～てもらう」，討厭或困擾的事情使用「被動形（起こされる）」。"
    },
    {
        type: "radio",
        question: "醫生叮囑丈夫「不要喝酒」，間接轉述命令的日文是：<br>医者は主人にお酒を______ようにと注意しました。",
        options: [
            "飲まない",
            "飲む",
            "飲まれる"
        ],
        answer: 0, // index 0: 飲まない
        explanation: "「～ように言う/注意する」前接動詞「る形」（要求做某事）或「ない形」（要求不要做某事）。不要喝酒 -> 「飲まないように」。"
    },
    {
        type: "radio",
        question: "陳老師研究室的燈熄了。他「似乎」已經回家了（基於現狀推測）。",
        options: [
            "先生はもう帰るらしいです。",
            "先生はもう帰ったらしいです。",
            "先生はもう帰ったらしくないです。"
        ],
        answer: 1, // index 1: 帰ったらしいです
        explanation: "「らしい」表示推測，前接動詞普通體。此時人已經回家了（過去發生），因此使用過去式「帰った」＋「らしいです」。注意「らしい」用作推論時一般沒有否定形「らしくない」。"
    },
    {
        type: "arrange",
        question: "請重組以下單字卡片，拼出正確的日文句子：<br>『這是看起來便宜，但意外地貴。』",
        chips: ["これは", "安そうに", "見えるが", "案外", "高い"],
        answer: "これは 安そうに 見えるが 案外 高い",
        explanation: "此題出自小測驗的句子重組題。「安そうに見える」（看起來很便宜），「案外高い」（出乎意料地貴）。"
    },
    {
        type: "arrange",
        question: "請重組以下單字卡片，拼出正確的日文句子：<br>『如果是要去參加比賽的話，最好早點開始做準備。』",
        chips: ["コンテストに", "出るなら", "早く", "準備を", "始めたほうが", "いいです"],
        answer: "コンテストに 出るなら 早く 準備を 始めたほうが いいです",
        explanation: "運用了 L19 的「出るなら」（如果是要參加的話 - 提案/建議前置）以及「～たほうがいいです」（最好...比較好 - 強烈建議）。"
    },
    {
        type: "radio",
        question: "（土鍋煮飯閱讀題）關於煮飯時的「水」，文章中敘述正確的是：",
        options: [
            "水的量大約是米量的2倍。",
            "洗完米後，必須把水濾乾瀝乾（30分鐘）。",
            "米放在水裡泡的時候，不要蓋蓋子。",
            "水的量和飯的軟硬度完全沒有關係。"
        ],
        answer: 1, // index 1: 洗完米後，必須濾乾
        explanation: "原文為：「まず、米２合を洗い、ざるに入れて、水が切れるまで 30 分待ちます。」（首先洗兩合米，放進篩子裡，等待濾乾30分鐘）。因此濾乾是正確步驟。"
    }
];

// App State
let currentTab = "grammar";
let currentVerbIndex = 0;
let currentQuestionIndex = 0;
let quizScore = 0;
let userAnswers = []; // record user options
let assembledSentence = []; // store current assembled sentence chips

// Verb conjugation engine logic
function conjugateVerb(verb) {
    const kanji = verb.kanji;
    const type = verb.type;
    const base = verb.base;
    const end = verb.end;

    let result = {
        dict: kanji,
        typeStr: type === 1 ? "一類動詞 (五段)" : type === 2 ? "二類動詞 (一段)" : "三類動詞 (不規則)",
        translation: verb.translation,
        // Conjugations
        ba: "",
        tara: "",
        passive: "",
        neg: "",
        ta: "",
        te: "",
        advicePos: "",
        adviceNeg: ""
    };

    if (type === 1) {
        // Group 1 verbs
        // e.g. 買う base: "買" end: "う"
        // base hiragana/kanji ends in row u -> e for 'ba', a for 'neg' and 'passive'
        const baseChar = end;
        let aRow = "", eRow = "", iRow = "", tForm = "";
        
        switch (baseChar) {
            case "う": aRow = "わ"; eRow = "え"; iRow = "い"; tForm = "った"; break;
            case "く": aRow = "か"; eRow = "け"; iRow = "き"; tForm = "いた"; break;
            case "ぐ": aRow = "が"; eRow = "げ"; iRow = "ぎ"; tForm = "いだ"; break;
            case "す": aRow = "さ"; eRow = "せ"; iRow = "し"; tForm = "した"; break;
            case "つ": aRow = "た"; eRow = "て"; iRow = "ち"; tForm = "った"; break;
            case "ぬ": aRow = "な"; eRow = "ね"; iRow = "に"; tForm = "んだ"; break;
            case "ぶ": aRow = "ば"; eRow = "べ"; iRow = "び"; tForm = "んだ"; break;
            case "む": aRow = "ま"; eRow = "め"; iRow = "み"; tForm = "んだ"; break;
            case "る": aRow = "ら"; eRow = "れ"; iRow = "り"; tForm = "った"; break;
        }

        // Special case: 行く (iku) -> te/ta is 行った/行って (not 行いた)
        if (kanji === "行く" || kanji.endsWith("行く")) {
            tForm = "った";
        }

        result.ba = base + eRow + "ば";
        result.tara = base + tForm + "ら";
        result.passive = base + aRow + "れる";
        result.neg = base + aRow + "ない";
        result.ta = base + tForm;
        
        // te form is just ta form with 'a' -> 'e' or 'da' -> 'de'
        let teForm = tForm;
        if (tForm.endsWith("た")) {
            teForm = tForm.slice(0, -1) + "て";
        } else if (tForm.endsWith("だ")) {
            teForm = tForm.slice(0, -1) + "で";
        }
        result.te = base + teForm;
        
        result.advicePos = result.ta + "ほうがいい";
        result.adviceNeg = result.neg + "ほうがいい";

    } else if (type === 2) {
        // Group 2 verbs (ru -> reba, tara, rareru, nai, ta, te)
        // base: "食べ" end: "る"
        result.ba = base + "れば";
        result.tara = base + "たら";
        result.passive = base + "られる";
        result.neg = base + "ない";
        result.ta = base + "た";
        result.te = base + "て";
        
        result.advicePos = result.ta + "ほうがいい";
        result.adviceNeg = result.neg + "ほうがいい";

    } else if (type === 3) {
        // Group 3 irregular verbs (する, 来る)
        if (kanji === "する" || kanji.endsWith("する")) {
            // base is prefixes like "予約"
            result.ba = base + "すれば";
            result.tara = base + "したら";
            result.passive = base + "される";
            result.neg = base + "しない";
            result.ta = base + "した";
            result.te = base + "して";
        } else if (kanji === "来る" || kanji.endsWith("来る")) {
            result.ba = base + "くれば";
            result.tara = base + "きたら";
            result.passive = base + "こられる";
            result.neg = base + "こない";
            result.ta = base + "きた";
            result.te = base + "きて";
        }
        result.advicePos = result.ta + "ほうがいい";
        result.adviceNeg = result.neg + "ほうがいい";
    }

    return result;
}

// Speech Synthesis Engine States
let voiceEngine = localStorage.getItem("jpsite_voice_engine") || "google";
let currentAudio = null;

// Speak text in Japanese
function speakJapanese(text) {
    // Clean text: remove HTML tags or brackets if any
    const cleanText = text.replace(/<[^>]*>/g, "").trim();
    if (!cleanText) return;

    if (voiceEngine === "browser") {
        speakWithBrowser(cleanText);
    } else {
        speakWithGoogle(cleanText);
    }
}

// Fallback to Browser Speech Synthesis
function speakWithBrowser(text) {
    if (!('speechSynthesis' in window)) {
        alert("很抱歉，您的瀏覽器不支援發音功能。");
        return;
    }
    
    // Cancel any current speaking
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85; // slightly slower for learners
    
    // Try to find a Japanese voice
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.includes('ja'));
    if (jaVoice) {
        utterance.voice = jaVoice;
    }
    
    window.speechSynthesis.speak(utterance);
}

// Speak using Google TTS for natural Pitch Accent
function speakWithGoogle(text) {
    // Stop any ongoing browser synthesis
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    // Stop current audio if playing
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=${encodeURIComponent(text)}`;
    currentAudio = new Audio(audioUrl);
    
    // Fallback in case Google TTS fails (e.g. offline, cors, rate limit)
    const playPromise = currentAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.warn("Google TTS 播放失敗，自動降級使用瀏覽器語音: ", error);
            speakWithBrowser(text);
        });
    }
}

// Update voice engine selection
function setVoiceEngine(engine) {
    voiceEngine = engine;
    localStorage.setItem("jpsite_voice_engine", engine);
    
    // Update UI active state
    const googleBtn = document.getElementById("engine-btn-google");
    const browserBtn = document.getElementById("engine-btn-browser");
    
    if (googleBtn && browserBtn) {
        if (engine === "google") {
            googleBtn.classList.add("active");
            browserBtn.classList.remove("active");
        } else {
            browserBtn.classList.add("active");
            googleBtn.classList.remove("active");
        }
    }
}

// OJAD dictionary search
function handleOJADSearch() {
    const wordInput = document.getElementById("ojad-search-input");
    const word = wordInput.value.trim();
    if (!word) {
        alert("請輸入要查詢聲調的日文單字！");
        return;
    }
    
    const url = `http://www.gavo.t.u-tokyo.ac.jp/ojad/search/index/word:${encodeURIComponent(word)}`;
    window.open(url, "_blank");
}

// Toggle Assistant panel collapse state
function toggleAssistantPanel() {
    const card = document.getElementById("accent-assistant-card");
    const icon = document.getElementById("assistant-toggle-icon");
    if (!card || !icon) return;
    
    const isCollapsed = card.classList.toggle("collapsed");
    localStorage.setItem("jpsite_assistant_collapsed", isCollapsed ? "true" : "false");
    
    if (isCollapsed) {
        icon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
    } else {
        icon.innerHTML = `<i class="fas fa-chevron-up"></i>`;
    }
}

// Tab Switching Control
function switchTab(tabId) {
    currentTab = tabId;
    
    // Update nav-btns
    document.querySelectorAll(".tab-btn").forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    // Update panel visibility
    document.querySelectorAll(".panel").forEach(panel => {
        if (panel.id === `${tabId}-panel`) {
            panel.classList.add("active");
        } else {
            panel.classList.remove("active");
        }
    });

    // Special trigger for speech synthesis voices loading
    if (tabId === 'grammar') {
        // trigger get voices once
        if (typeof window.speechSynthesis !== 'undefined') {
            window.speechSynthesis.getVoices();
        }
    }
}

// Conjugator View Updates
function renderConjugator() {
    const listContainer = document.getElementById("verbs-quick-list");
    listContainer.innerHTML = "";
    
    verbsDB.forEach((v, index) => {
        const btn = document.createElement("button");
        btn.className = `verb-btn ${index === currentVerbIndex ? 'active' : ''}`;
        btn.innerHTML = `<i class="fas fa-arrow-right"></i> ${v.kanji} <span style="font-size: 0.75rem; color: var(--text-muted)">(${v.translation})</span>`;
        btn.addEventListener("click", () => {
            currentVerbIndex = index;
            renderConjugator();
        });
        listContainer.appendChild(btn);
    });

    // Get current verb object
    const selectedVerb = verbsDB[currentVerbIndex];
    const conjugations = conjugateVerb(selectedVerb);

    // Render screen
    document.getElementById("verb-info-name").innerText = conjugations.dict;
    document.getElementById("verb-info-type").innerText = conjugations.typeStr;
    document.getElementById("verb-info-trans").innerText = conjugations.translation;

    document.getElementById("val-dict").innerText = conjugations.dict;
    document.getElementById("val-neg").innerText = conjugations.neg;
    document.getElementById("val-te").innerText = conjugations.te;
    document.getElementById("val-ta").innerText = conjugations.ta;
    document.getElementById("val-ba").innerText = conjugations.ba;
    document.getElementById("val-tara").innerText = conjugations.tara;
    document.getElementById("val-passive").innerText = conjugations.passive;
    document.getElementById("val-adv-pos").innerText = conjugations.advicePos;
    document.getElementById("val-adv-neg").innerText = conjugations.adviceNeg;
}

// Custom verb input handler
function handleCustomVerbInput() {
    const input = document.getElementById("custom-verb-input").value.trim();
    if (!input) return;

    // Check if ending matches Japanese verb endings
    const lastChar = input.slice(-1);
    const validEndings = ["う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む", "る"];
    
    if (input === "する" || input.endsWith("する")) {
        const customVerb = {
            kanji: input,
            roma: "custom",
            type: 3,
            base: input.slice(0, -2),
            end: "する",
            translation: "自訂動詞 (三類)"
        };
        verbsDB.unshift(customVerb);
        currentVerbIndex = 0;
        document.getElementById("custom-verb-input").value = "";
        renderConjugator();
    } else if (input === "来る" || input === "くる" || input.endsWith("来る") || input.endsWith("くる")) {
        const customVerb = {
            kanji: input,
            roma: "custom",
            type: 3,
            base: input.slice(0, -2),
            end: input.slice(-2),
            translation: "自訂動詞 (三類)"
        };
        verbsDB.unshift(customVerb);
        currentVerbIndex = 0;
        document.getElementById("custom-verb-input").value = "";
        renderConjugator();
    } else if (validEndings.includes(lastChar)) {
        // Guess group type
        // Rules of thumb: 
        // - doesn't end in ru -> Group 1
        // - ends in iru/eru -> usually Group 2, but could be Group 1
        let type = 1;
        if (lastChar === "る") {
            // Default to group 2 if ends in iru/eru, else Group 1
            const secondToLast = input.slice(-2, -1);
            const Group2Vowels = ["い", "き", "し", "ち", "に", "ひ", "み", "り", "え", "け", "せ", "て", "ね", "へ", "め", "れ", "得", "食", "見", "寝", "調", "覚", "開", "閉", "忘", "起"];
            if (Group2Vowels.includes(secondToLast)) {
                type = 2;
            }
        }
        
        const customVerb = {
            kanji: input,
            roma: "custom",
            type: type,
            base: input.slice(0, -1),
            end: lastChar,
            translation: "自訂動詞 (" + (type === 1 ? "一類" : "二類") + ")"
        };
        verbsDB.unshift(customVerb);
        currentVerbIndex = 0;
        document.getElementById("custom-verb-input").value = "";
        renderConjugator();
    } else {
        alert("請輸入符合日文原形結束字（う段音，如：買う、食べる、する、来る）的動詞！");
    }
}

// Quiz Rendering & Interaction State
function renderQuiz() {
    const qBox = document.getElementById("quiz-question-container");
    const optBox = document.getElementById("quiz-options-container");
    const feedbackBox = document.getElementById("quiz-feedback");
    const nextBtn = document.getElementById("quiz-next-btn");
    const submitBtn = document.getElementById("quiz-submit-btn");

    feedbackBox.style.display = "none";
    feedbackBox.className = "feedback-box";
    submitBtn.style.display = "inline-flex";
    submitBtn.disabled = true;
    nextBtn.style.display = "none";

    // Update Progress
    const progressText = document.getElementById("quiz-progress-text");
    const progressFill = document.getElementById("quiz-progress-fill");
    
    const percentage = Math.round((currentQuestionIndex / quizQuestions.length) * 100);
    progressText.innerText = `題目: ${currentQuestionIndex + 1} / ${quizQuestions.length}`;
    progressFill.style.width = `${percentage}%`;

    const q = quizQuestions[currentQuestionIndex];
    qBox.innerHTML = `<div class="quiz-question-text">${q.question}</div>`;

    if (q.type === "radio") {
        optBox.innerHTML = "";
        optBox.className = "quiz-options";
        
        q.options.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.innerHTML = `<span style="font-weight:600; color: var(--color-cyan)">${String.fromCharCode(65 + idx)}.</span> ${opt}`;
            btn.addEventListener("click", () => {
                // Select Option
                document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                userAnswers[currentQuestionIndex] = idx;
                submitBtn.disabled = false;
            });
            optBox.appendChild(btn);
        });
    } else if (q.type === "arrange") {
        optBox.innerHTML = `
            <div class="sentence-assembler" id="sentence-assembler-box">
                <span style="color: var(--text-dark); font-size: 0.9rem">點選下方單字卡片拼出句子...</span>
            </div>
            <div class="word-chips-pool" id="word-chips-pool-box"></div>
        `;
        optBox.className = ""; // clear flex column

        assembledSentence = [];
        const poolBox = document.getElementById("word-chips-pool-box");
        
        // Shuffle chips slightly for fun (but stable for quiz)
        const chipsCopy = [...q.chips].sort(() => 0.5 - Math.random());
        
        chipsCopy.forEach((chip, index) => {
            const chipBtn = document.createElement("button");
            chipBtn.className = "word-chip";
            chipBtn.innerText = chip;
            chipBtn.id = `chip-${index}`;
            chipBtn.addEventListener("click", () => {
                if (chipBtn.classList.contains("used")) return;
                
                // Add to assembled
                assembledSentence.push({ text: chip, id: chipBtn.id });
                chipBtn.classList.add("used");
                
                updateAssembledSentenceDisplay(poolBox);
            });
            poolBox.appendChild(chipBtn);
        });
    }
}

function updateAssembledSentenceDisplay(poolBox) {
    const assembler = document.getElementById("sentence-assembler-box");
    const submitBtn = document.getElementById("quiz-submit-btn");

    if (assembledSentence.length === 0) {
        assembler.innerHTML = `<span style="color: var(--text-dark); font-size: 0.9rem">點選下方單字卡片拼出句子...</span>`;
        submitBtn.disabled = true;
        return;
    }

    assembler.innerHTML = "";
    assembledSentence.forEach((chipObj, index) => {
        const span = document.createElement("span");
        span.className = "word-chip";
        span.style.background = "linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(155, 81, 224, 0.2) 100%)";
        span.style.borderColor = "var(--color-cyan)";
        span.innerHTML = `${chipObj.text} <i class="fas fa-times-circle" style="margin-left: 0.35rem; color: var(--color-pink)"></i>`;
        span.addEventListener("click", () => {
            // Remove from assembled
            assembledSentence.splice(index, 1);
            
            // Re-enable in pool
            const origChip = document.getElementById(chipObj.id);
            if (origChip) origChip.classList.remove("used");
            
            updateAssembledSentenceDisplay(poolBox);
        });
        assembler.appendChild(span);
    });

    submitBtn.disabled = assembledSentence.length !== quizQuestions[currentQuestionIndex].chips.length;
}

// Handle answer submission
function submitAnswer() {
    const q = quizQuestions[currentQuestionIndex];
    const feedbackBox = document.getElementById("quiz-feedback");
    const submitBtn = document.getElementById("quiz-submit-btn");
    const nextBtn = document.getElementById("quiz-next-btn");
    
    submitBtn.style.display = "none";
    nextBtn.style.display = "inline-flex";
    
    let isCorrect = false;
    let detailHTML = "";

    if (q.type === "radio") {
        const userChoice = userAnswers[currentQuestionIndex];
        const correctChoice = q.answer;
        isCorrect = userChoice === correctChoice;

        // Visual options correct/wrong
        const optionBtns = document.querySelectorAll(".option-btn");
        optionBtns.forEach((btn, idx) => {
            btn.style.pointerEvents = "none"; // disable clicks
            if (idx === correctChoice) {
                btn.classList.add("correct");
            } else if (idx === userChoice && !isCorrect) {
                btn.classList.add("wrong");
            }
        });

        detailHTML = `
            <h4 style="color: ${isCorrect ? 'var(--color-emerald)' : 'var(--color-pink)'}; font-size: 1.1rem; margin-bottom: 0.5rem">
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
                ${isCorrect ? '回答正確！' : '回答錯誤！'}
            </h4>
            <p style="font-size: 0.9rem; line-height: 1.5">${q.explanation}</p>
        `;
    } else if (q.type === "arrange") {
        const userSentence = assembledSentence.map(c => c.text).join(" ");
        const correctSentence = q.answer;
        isCorrect = userSentence === correctSentence;
        
        userAnswers[currentQuestionIndex] = userSentence; // save state

        // disable pool chips
        document.querySelectorAll(".word-chip").forEach(c => c.style.pointerEvents = "none");

        detailHTML = `
            <h4 style="color: ${isCorrect ? 'var(--color-emerald)' : 'var(--color-pink)'}; font-size: 1.1rem; margin-bottom: 0.5rem">
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
                ${isCorrect ? '句子排序正確！' : '句子排序錯誤！'}
            </h4>
            <div style="margin-bottom: 0.75rem; font-size: 0.95rem">
                <strong style="color: var(--color-emerald)">正確答案：</strong> 
                <span style="font-family: monospace; font-size: 1rem; color: var(--text-primary)">${correctSentence}</span>
            </div>
            <p style="font-size: 0.9rem; line-height: 1.5">${q.explanation}</p>
        `;
    }

    if (isCorrect) {
        quizScore++;
        feedbackBox.classList.add("correct");
    } else {
        feedbackBox.classList.add("wrong");
    }

    feedbackBox.innerHTML = detailHTML;
    feedbackBox.style.display = "block";
}

// Next question or result display
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        renderQuiz();
    } else {
        showQuizResults();
    }
}

// Display Quiz Result
function showQuizResults() {
    const qBox = document.getElementById("quiz-question-container");
    const optBox = document.getElementById("quiz-options-container");
    const feedbackBox = document.getElementById("quiz-feedback");
    const nextBtn = document.getElementById("quiz-next-btn");
    const submitBtn = document.getElementById("quiz-submit-btn");

    feedbackBox.style.display = "none";
    submitBtn.style.display = "none";
    nextBtn.style.display = "none";

    // Progress bar Full
    document.getElementById("quiz-progress-text").innerText = "測驗結束！";
    document.getElementById("quiz-progress-fill").style.width = "100%";

    const correctPct = Math.round((quizScore / quizQuestions.length) * 100);
    
    let evaluation = "";
    if (correctPct === 100) {
        evaluation = "完美無瑕！您已完全熟練掌握了 L19-L21 所有文法考點！💯";
    } else if (correctPct >= 80) {
        evaluation = "優秀！對條件假設、授受表現、被動形有很深厚的理解！🌟";
    } else if (correctPct >= 60) {
        evaluation = "及格了，建議您多閱讀「台灣人常犯錯誤」對決卡片，釐清授受表現的視角細節。👍";
    } else {
        evaluation = "還需努力！請重新閱讀課堂文法卡片並利用動詞變形模擬器多加練習！📚";
    }

    // Save score to localStorage
    localStorage.setItem("jpsite_last_score", `${quizScore}/${quizQuestions.length} (${correctPct}%)`);

    qBox.innerHTML = `
        <div class="quiz-result-screen">
            <div class="result-circle">
                <span class="result-score">${quizScore}</span>
                <span class="result-total">/ ${quizQuestions.length}</span>
            </div>
            <div class="result-comment">${evaluation}</div>
            <div style="font-size: 1.1rem; color: var(--color-cyan); margin-bottom: 2rem">正確率: ${correctPct}%</div>
            <button class="action-btn" onclick="resetQuiz()" style="margin: 0 auto">
                <i class="fas fa-undo"></i> 重新測驗
            </button>
        </div>
    `;
    optBox.innerHTML = "";
}

// Reset Quiz State
function resetQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    userAnswers = [];
    renderQuiz();
}

// Init Setup on Window Load
window.addEventListener("DOMContentLoaded", () => {
    // 1. Setup tab switching event listeners
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");
            switchTab(tabId);
        });
    });

    // 2. Setup Play speech buttons (for grammar page sentences)
    document.querySelectorAll(".play-btn:not(.conj-voice-btn)").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const textToSpeak = btn.getAttribute("data-sentence");
            speakJapanese(textToSpeak);
        });
    });

    // 3. Setup Custom verb conjugation buttons/inputs
    document.getElementById("add-custom-verb-btn").addEventListener("click", handleCustomVerbInput);
    document.getElementById("custom-verb-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleCustomVerbInput();
        }
    });

    // 4. Setup Quiz actions
    document.getElementById("quiz-submit-btn").addEventListener("click", submitAnswer);
    document.getElementById("quiz-next-btn").addEventListener("click", nextQuestion);

    // 5. Setup Voice Assistant panel events
    // Initialize UI active state from state variable
    setVoiceEngine(voiceEngine);
    
    // Bind voice engine switches
    document.getElementById("engine-btn-google").addEventListener("click", () => setVoiceEngine("google"));
    document.getElementById("engine-btn-browser").addEventListener("click", () => setVoiceEngine("browser"));
    
    // Bind OJAD Dictionary search
    document.getElementById("ojad-search-btn").addEventListener("click", handleOJADSearch);
    document.getElementById("ojad-search-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleOJADSearch();
        }
    });
    
    // Bind toggle collapse for assistant card
    document.getElementById("assistant-toggle").addEventListener("click", toggleAssistantPanel);
    
    // Set initial collapse state from preference
    const isAssistantCollapsed = localStorage.getItem("jpsite_assistant_collapsed") === "true";
    if (isAssistantCollapsed) {
        const card = document.getElementById("accent-assistant-card");
        const icon = document.getElementById("assistant-toggle-icon");
        if (card) card.classList.add("collapsed");
        if (icon) icon.innerHTML = `<i class="fas fa-chevron-down"></i>`;
    }

    // 6. Setup Verb Conjugator cell speech play buttons
    document.querySelectorAll(".conj-voice-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const targetId = btn.getAttribute("data-target-id");
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const textToSpeak = targetEl.innerText.trim();
                // Avoid playing empty placeholder state
                if (textToSpeak && textToSpeak !== "---") {
                    speakJapanese(textToSpeak);
                }
            }
        });
    });

    // 7. Initialize renderers
    renderConjugator();
    renderQuiz();
});
