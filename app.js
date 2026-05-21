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
    { kanji: "聞く", roma: "kiku", type: 1, base: "聞", end: "く", translation: "聽/問" },
    { kanji: "しかる", roma: "shikaru", type: 1, base: "しか", end: "る", translation: "責備" },
    { kanji: "盗む", roma: "nusumu", type: 1, base: "盗", end: "む", translation: "偷竊" },
    { kanji: "破る", roma: "yaburu", type: 1, base: "破", end: "る", translation: "撕毀" },
    { kanji: "降る", roma: "furu", type: 1, base: "降", end: "る", translation: "下(雨/雪)" },
    { kanji: "誘う", roma: "sasou", type: 1, base: "誘", end: "う", translation: "邀請" },
    { kanji: "壊す", roma: "kowasu", type: 1, base: "壊", end: "す", translation: "破壞" },
    { kanji: "受け取る", roma: "uketoru", type: 1, base: "受け取", end: "る", translation: "接受/領取" },
    { kanji: "断る", roma: "kotowaru", type: 1, base: "断", end: "る", translation: "拒絕" },
    { kanji: "決まる", roma: "kimaru", type: 1, base: "決ま", end: "る", translation: "決定(自動)" },
    { kanji: "集まる", roma: "atsumaru", type: 1, base: "集ま", end: "る", translation: "聚集" },
    { kanji: "しまる", roma: "shimaru", type: 1, base: "しま", end: "る", translation: "關閉(自動)" },
    { kanji: "泣く", roma: "naku", type: 1, base: "泣", end: "く", translation: "哭泣" },
    { kanji: "笑う", roma: "warau", type: 1, base: "笑", end: "う", translation: "笑" },
    { kanji: "怒る", roma: "okoru", type: 1, base: "怒", end: "る", translation: "生氣" },
    { kanji: "驚く", roma: "odoroku", type: 1, base: "驚", end: "く", translation: "驚訝" },
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
    { kanji: "閉める", roma: "shimeru", type: 2, base: "閉め", end: "る", translation: "關閉(他動)" },
    { kanji: "忘れる", roma: "wasureru", type: 2, base: "忘れ", end: "る", translation: "忘記" },
    { kanji: "決める", roma: "kimeru", type: 2, base: "決め", end: "る", translation: "決定(他動)" },
    // Group 3
    { kanji: "する", roma: "suru", type: 3, base: "", end: "する", translation: "做" },
    { kanji: "来る", roma: "kuru", type: 3, base: "", end: "来る", translation: "來" },
    { kanji: "予約する", roma: "yoyakusuru", type: 3, base: "予約", end: "する", translation: "預約" },
    { kanji: "質問する", roma: "shitsumonsuru", type: 3, base: "質問", end: "する", translation: "提問" },
    { kanji: "感動する", roma: "kandousuru", type: 3, base: "感動", end: "する", translation: "感動" }
];

// Quiz Categories Databases (L19小測驗, L21-22綜合挑戰, 土鍋閱讀測驗)
const quizCategories = {
    l19: [
        {
            type: "radio",
            question: "わたしは夏休みに______北海道へ行こうと思っています。",
            options: ["なれば", "なったら", "なるなら"],
            answer: 1,
            explanation: "「なったら」表示等到了那個時間點之後。夏天是一定會到來的（時間的推移/確定條件），在口語中最常用「～たら」表示前後動作的順序關係（當...之後）。"
        },
        {
            type: "radio",
            question: "かにを______やはり北海道ですね。",
            options: ["食べたら", "食べるなら"],
            answer: 1,
            explanation: "「～なら」表示針對對方提出的事情，給予建議或判斷。意思是「如果是要吃螃蟹的話，那當然是北海道囉」。"
        },
        {
            type: "radio",
            question: "這裡按下去的話，蓋子就會打開：<br>ここを______ふたが開きます。",
            options: ["押すと", "押すなら"],
            answer: 0,
            explanation: "「～と」表示機器操作、物理自然現象等必然引起的結果。翻譯為「一按這裡，蓋子就會打開」。"
        },
        {
            type: "radio",
            question: "来年アメリカへ行くそうですね。アメリカへ______その前に車の運転を習っておいたほうがいいです。",
            options: ["行けば", "行ったら", "行くなら"],
            answer: 2,
            explanation: "針對要去美國（未發生的動作）之前先學開車，這種提供建議、對策的用法必須使用「～なら」（如果是要去的話...）。"
        },
        {
            type: "radio",
            question: "A：「日本語を習いたいですが」<br>B：「日本語を______東呉の推広班のほうがいいですよ。」",
            options: ["習うなら", "習えば"],
            answer: 0,
            explanation: "根據對方提出的意願，給予建議，應使用「普通形 + なら」。"
        },
        {
            type: "radio",
            question: "這個字就算查了字典，大概還是不懂吧：<br>このことばは辞書を______分からないでしょう。",
            options: ["見れば", "見ても", "見るなら"],
            answer: 1,
            explanation: "後半句為「不懂吧」，表示縱使做了查字典的動作也無效，這屬於逆接假定（即使...也），應使用「Vても」（見ても）。"
        },
        {
            type: "radio",
            question: "来週東京へ出張しますから、東京へ______友達に会いたいです。",
            options: ["行けば", "行ったら"],
            answer: 1,
            explanation: "「友達に会いたい」表示說話者的個人希望。假定句中，只有「～たら」後句可以接意志、命令或希望的表達。「行ったら」意為「到了東京之後，我想去見朋友」。"
        },
        {
            type: "radio",
            question: "明天如果天氣晴朗的話，我就去海邊：<br>あした______海へ行きます。",
            options: ["晴れると", "晴れれば"],
            answer: 1,
            explanation: "「海へ行きます」是意志表達，不能接在表示自然規律、一...就...的「～と」後面；而「晴れれば」後句可以跟隨意志行為。"
        },
        {
            type: "radio",
            question: "急げば 9 時の高鉄に______。",
            options: ["乗れます", "乗ります"],
            answer: 0,
            explanation: "「急げば」（如果趕快的話）後面搭配「能搭上」的可能形動詞「乗れます」最符合邏輯。"
        },
        {
            type: "radio",
            question: "這是必要的東西，所以即使很貴也必須買：<br>これは必要なものですから、______買わなければなりません。",
            options: ["高ければ", "高くても"],
            answer: 1,
            explanation: "「即使貴也必須買」是讓步/逆接條件，應使用形容詞去 `い` 加上 `くても` $\rightarrow$ `高くても`。"
        },
        {
            type: "radio",
            question: "便宜的話大家都會買吧：<br>安いと______。",
            options: ["買いましょう", "みんなが買うでしょう"],
            answer: 1,
            explanation: "「～と」的前後句有客觀因果關係，後句絕對不能接說話者的主觀意志、命令、勸誘（如「買いましょう」），因此只能接客觀推測「みんなが買うでしょう」。"
        },
        {
            type: "radio",
            question: "______相談に来てください。",
            options: ["困ったら", "困ると"],
            answer: 0,
            explanation: "「相談に来てください」（請來商量）是請求、要求。句尾為要求/請求時，前句的假定條件只能用「～たら」，不能用「～と」。"
        },
        {
            type: "radio",
            question: "錄音聽聽看自己的聲音，聽起來會像別人的聲音所以會嚇一跳：<br>自分の声を録音して______ほかの人の声のように聞こえるのでびっくりします。",
            options: ["聞いてみると", "聞いてみるなら"],
            answer: 0,
            explanation: "表示一做某動作，就隨之發現了後續的客觀現象或結果，應使用「Vてみると」（一試聽，就...）。"
        },
        {
            type: "radio",
            question: "收到信的話，最好馬上寫回信比較好：<br>手紙を______すぐ返事を書いたほうがいい。",
            options: ["もらうなら", "もらったら", "もらえば"],
            answer: 1,
            explanation: "表示事情發生之後（收到信之後），最廣泛使用的條件句是「～たら」 $\rightarrow$ 「もらったら」。"
        },
        {
            type: "radio",
            question: "練習的話就會變厲害，所以請一定要參加看看：<br>練習を______上手になるから、ぜひ出てみてください。",
            options: ["するなら", "すれば"],
            answer: 1,
            explanation: "「練習すれば上手になる」是一般的規律與自然因果（只要練習就會進步），使用「～ば」最恰當。"
        },
        // Particle Fill-in-the-blank questions (from test paper Part 2)
        {
            type: "radio",
            question: "（助詞題）夜遅く 1 人で外______歩くのは危ないです。",
            options: ["を", "が", "に"],
            answer: 0,
            explanation: "「歩く」表示移動的動作，移動的空間場所（在外面走）助詞使用「を」。"
        },
        {
            type: "radio",
            question: "（助詞題）予定______変わったら、知らせてください。",
            options: ["を", "が", "に"],
            answer: 1,
            explanation: "「変わる」是自動詞（改變），其主語（計畫）後面應使用主格助詞「が」。"
        },
        {
            type: "radio",
            question: "（助詞題）来年の 4 月______妹が日本へ来ます。",
            options: ["を", "が", "に"],
            answer: 2,
            explanation: "具體時間（4月）後面要加上表示時間點的助詞「に」。"
        },
        {
            type: "radio",
            question: "（助詞題）そうしたら私は大学の寮______出て、妹と二人で住むつもりです。",
            options: ["を", "が", "に"],
            answer: 0,
            explanation: "「出る」表示離開的地點，離開、出發的場所後面助詞使用「を」。"
        },
        {
            type: "radio",
            question: "（助詞題）北海道へ旅行に行くつもりです。林さんにどんな行き方がある______聞いてみた。",
            options: ["を", "か", "に"],
            answer: 1,
            explanation: "「どんな行き方があるか」是嵌入句（間接疑問句，去哪裡、有什麼方法），結尾使用疑問助詞「か」。"
        },
        {
            type: "radio",
            question: "（助詞題）家族______台湾へ来たら、どこへ連れて行きたいんですか。",
            options: ["が", "を", "に"],
            answer: 0,
            explanation: "在假定子句「家族が台灣へ来たら」中，子句的主語（家人）助詞使用「が」，不能用「は」。"
        },
        {
            type: "radio",
            question: "（助詞題）「このエアコン、修理に 3 万円はかかりますよ。」<br>「えっ！3 万円______かかるんですか。高いですね。」",
            options: ["を", "も", "に"],
            answer: 1,
            explanation: "「も」接在數量詞後面，表示驚訝於數量之多（竟然要花到三萬日幣啊！）。"
        },
        {
            type: "radio",
            question: "（助詞題）パソコンを買う______ノート型が軽くて便利です。",
            options: ["が", "なら", "に"],
            answer: 1,
            explanation: "「～なら」表示針對前面提到的話題（如果要買電腦的話）提出建議。「電腦的話，筆記型很輕很方便喔」。"
        },
        {
            type: "radio",
            question: "（助詞題）ホテル______着いたら、すぐ電話を掛けます。",
            options: ["を", "が", "に"],
            answer: 2,
            explanation: "「着く」是到達動詞，到達的目的地後面助詞使用「に」。"
        },
        {
            type: "radio",
            question: "（助詞題）急げば 8 時 10 分の授業______間に合うでしょう。",
            options: ["を", "g", "に"],
            answer: 2,
            explanation: "「間に合う」表示來得及，來得及的對象/目標（課堂、班車等）助詞固定搭配「に」。"
        }
    ],
    l21: [
        {
            type: "arrange",
            question: "（課文對話重組）請重組卡片拼出 L21 對話：<br>『上週五早上我把車停在車站前，可是回來看的時候就不見了。』",
            chips: ["先週の金曜日の朝、", "駅の前に", "止めておいたんですが、", "帰りに見たら、", "なかったんです。"],
            answer: "先週の金曜日の朝、 駅の前に 止めておいたんですが、 帰りに見たら、 なかったんです。",
            explanation: "這句包含了「Vておく」（事先做好準備）的過去式「止めておいた」，以及「見たら、なかった」（一看發現不見了的「たら」發現與意外用法）。"
        },
        {
            type: "radio",
            question: "（課文對話）接續前句，對方推測說『應該是有人把鎖弄壞，把車騎走了吧。』，日文是：",
            options: [
                "だれかがかぎを壊して、乗って行ってしまったんでしょう。",
                "だれかにかぎを壊されて、乗って行かれました。",
                "だれかがかぎを壊して、乗って行きました。"
            ],
            answer: 0,
            explanation: "「Vてしまう」表示遺憾、不好的結果；「～んでしょう」表示帶有依據的推論（因為車子不見了）。"
        },
        {
            type: "arrange",
            question: "（課文對話重組）請重組卡片拼出對話：<br>『最好先去報警比較好，因為他們可能會幫你找。』",
            chips: ["警察に", "届けを出しておいた", "方がいいですよ。", "探してくれる", "かもしれませんから。"],
            answer: "警察に 届けを出しておいた 方がいいですよ。 探してくれる かもしれませんから。",
            explanation: "「～たほうがいい」表示強烈建議，「～ておく」表示事先做好準備；「～かもしれません」表示不確定推測，「から」在句尾倒裝表示理由。"
        },
        {
            type: "radio",
            question: "（課文對話）『昨天被中川太太你這麼一說，所以我馬上去警察局試試看。』，日文是：",
            options: [
                "昨日中川さんに言わせたので、さっそく警察へ行きました。",
                "昨日中川さんに言われたので、さっそく警察へ行ってみました。",
                "昨日中川さんは私に言ったので、さっそく警察へ行きました。"
            ],
            answer: 1,
            explanation: "「中川さんに言われた」是被動形，表示被中川太太勸告（動作發出者 + に + 被動動詞）。「行ってみました」表示嘗試做某事。"
        },
        {
            type: "radio",
            question: "（被動被害）我的 T 恤被弟弟弄髒了（2萬元買的，很心痛），以下說法哪句**最自然、最符合日文習慣**？",
            options: [
                "私のTシャツは弟に汚されました。",
                "私は弟にTシャツを汚されました。",
                "弟は私のTシャツを汚されました。"
            ],
            answer: 1,
            explanation: "日語在表示「自己所有的物件被他人做出某動作，而自己感到困擾」時（間接被害被動），主語必須是「我」（被害者），即「私は行為者に物品を被動動詞」。中文直譯的「我的T恤被弄髒了」在日文聽起來極度不自然。"
        },
        {
            type: "radio",
            question: "（自動詞被動）深夜被小孩一直哭，結果我沒能睡好（感到困擾無奈）：",
            options: [
                "夜中に子供は泣かれて寝られませんでした。",
                "夜中に子供に泣かれて寝られませんでした。",
                "私は夜中に子供を泣かせて寝ませんでした。"
            ],
            answer: 1,
            explanation: "日文特有的「自動詞被害被動」：別人做出某動作（哭泣），對我產生困擾影響。句型為：`私は子供に泣かれた`（我被小孩哭了）。"
        },
        {
            type: "radio",
            question: "（使役被動）我是被媽媽逼著去買菜的（覺得超麻煩很不甘願）：",
            options: [
                "私は母に買い物に行かせられました。",
                "私は母に買い物に行かされました。",
                "I was made to go shopping by mother."
            ],
            answer: 1,
            explanation: "被動＋使役（被逼著做某事）的「使役被動形」。一類動詞 `行く` 變形為 `行かされる`。(`行かせられる` 雖然語法也通，但口語一般縮約為 `行かされる`。)"
        },
        {
            type: "radio",
            question: "（使役助詞）『老師讓學生寫作文。』由於『寫作文』的他動詞屬性，學生的助詞應是：",
            options: [
                "先生は学生を作文を書かせました。",
                "先生は学生に作文を書かせました。",
                "先生は学生が作文を書かせました。"
            ],
            answer: 1,
            explanation: "使役句助詞規則：後方動詞若是「他動詞」（有 `を` 賓語，如 `作文を書く`），被使役者（學生）後面必須用 `に`，絕對不能在一個句子中出現兩個 `を`（雙を禁忌）！"
        },
        {
            type: "radio",
            question: "（使役助詞）『媽媽讓小孩去睡覺。』由於『睡覺 (寝る)』是自動詞，小孩的助詞應是：",
            options: [
                "母は子どもを寝させました。",
                "母は子どもに寝させました。",
                "母は子どもが寝させました。"
            ],
            answer: 0,
            explanation: "使役句助詞規則：後方動詞若是「自動詞」（無 `を`，如 `寝る`、`行く`），被使役者後面使用 `を`。因此是 `子どもを寝させる`。"
        },
        {
            type: "radio",
            question: "（使役與恩惠）要表達『父母（成全我、讓我心存感激地）讓我學鋼琴。』：",
            options: [
                "両親は私にピアノを習わせました。",
                "両親は私にピアノを習わせてくれました。",
                "私は両親にピアノを習わせてもらいました。"
            ],
            answer: 1,
            explanation: "將「使役 (習わせる - 讓我學)」結合「恩惠/授受 (てくれる - 為我做)」，即 `習わせてくれた`，完美表達了父母的允許/成全與說話者滿滿的感激之情。"
        }
    ],
    reading: [
        {
            type: "radio",
            question: "（土鍋煮飯閱讀題）關於煮飯時的「水」，文章中敘述正確的是：",
            options: [
                "水的量大約是米量的2倍。",
                "洗完米後，必須把水濾乾瀝乾（30分鐘）。",
                "米放在水裡泡的時候，不要蓋蓋子。",
                "水的量和飯的軟硬度完全沒有關係。"
            ],
            answer: 1,
            explanation: "原文為：「まず、米２合を洗い、ざるに入れて、水が切れるまで 30 分待ちます。」（首先洗兩合米，放進篩子裡，等待濾乾30分鐘）。因此濾乾是正確步驟。"
        },
        {
            type: "radio",
            question: "（土鍋煮飯閱讀題）從在土鍋裡放入米和水，到飯煮好為止，大約需要花多少時間？",
            options: [
                "大約 35 分鐘",
                "大約 55 分鐘",
                "大約 20 分鐘",
                "大約 15 分鐘"
            ],
            answer: 1,
            explanation: "根據文章步驟：米水入鍋後靜置 20 分鐘，然後開火煮 15 分鐘，關火後再悶 20 分鐘。20 + 15 + 20 = 55 分鐘左右。因此是 55 分鐘。"
        },
        {
            type: "radio",
            question: "（土鍋煮飯閱讀題）以下關於土鍋煮飯的敘述，哪一項與文章內容**不符合 (合わない)**？",
            options: [
                "開火煮的時候，火候調整為普通的強強火（中火）。",
                "用土鍋煮出來的飯，比用一般的電子鍋（電氣釜）煮出來的更好吃。",
                "飯煮好之後，可以一直把飯放在土鍋裡面不管它。",
                "火熄滅之後，要維持蓋著蓋子的狀態放置 20 分鐘。"
            ],
            answer: 2,
            explanation: "原文為：「できあがったら、ほかの入れ物に移しましょう。」（煮好之後，移到別的容器中吧）。因此「一直放在土鍋裡」是不符合文章敘述的。"
        }
    ]
};

// App State
let currentTab = "grammar";
let currentVerbIndex = 0;
let currentCategory = "l19";
let quizQuestions = quizCategories[currentCategory];
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
        adviceNeg: "",
        causative: "",
        causativePassive: ""
    };

    if (type === 1) {
        // Group 1 verbs
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

        // Special case: 行く (iku) -> te/ta is 行った/行って
        if (kanji === "行く" || kanji.endsWith("行く")) {
            tForm = "った";
        }

        result.ba = base + eRow + "ば";
        result.tara = base + tForm + "ら";
        result.passive = base + aRow + "れる";
        result.neg = base + aRow + "ない";
        result.ta = base + tForm;
        
        let teForm = tForm;
        if (tForm.endsWith("た")) {
            teForm = tForm.slice(0, -1) + "て";
        } else if (tForm.endsWith("だ")) {
            teForm = tForm.slice(0, -1) + "de";
        }
        // fix te mapping for standard display
        if (baseChar === "ぐ") { teForm = "いだ"; }
        if (teForm.endsWith("た")) {
            teForm = teForm.slice(0, -1) + "て";
        } else if (teForm.endsWith("だ")) {
            teForm = teForm.slice(0, -1) + "で";
        }
        result.te = base + teForm;
        
        result.advicePos = result.ta + "ほうがいい";
        result.adviceNeg = result.neg + "ほうがいい";
        
        result.causative = base + aRow + "せる";
        if (baseChar === "す") {
            result.causativePassive = base + "させられる";
        } else {
            result.causativePassive = base + aRow + "される";
        }

    } else if (type === 2) {
        // Group 2 verbs
        result.ba = base + "れば";
        result.tara = base + "たら";
        result.passive = base + "られる";
        result.neg = base + "ない";
        result.ta = base + "た";
        result.te = base + "て";
        
        result.advicePos = result.ta + "ほうがいい";
        result.adviceNeg = result.neg + "ほうがいい";

        result.causative = base + "させる";
        result.causativePassive = base + "させられる";

    } else if (type === 3) {
        // Group 3 irregular verbs
        if (kanji === "する" || kanji.endsWith("する")) {
            result.ba = base + "すれば";
            result.tara = base + "したら";
            result.passive = base + "される";
            result.neg = base + "しない";
            result.ta = base + "した";
            result.te = base + "して";
            
            result.causative = base + "させる";
            result.causativePassive = base + "させられる";
        } else if (kanji === "来る" || kanji.endsWith("来る")) {
            result.ba = base + "くれば";
            result.tara = base + "きたら";
            result.passive = base + "こられる";
            result.neg = base + "こない";
            result.ta = base + "きた";
            result.te = base + "きて";
            
            result.causative = base + "こさせる";
            result.causativePassive = base + "こさせられる";
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
function speakJapanese(text, btnElement = null) {
    document.querySelectorAll(".play-btn, .conj-voice-btn").forEach(btn => btn.classList.remove("playing"));
    const cleanText = text.replace(/<[^>]*>/g, "").trim();
    if (!cleanText) return;

    if (voiceEngine === "browser") {
        speakWithBrowser(cleanText, btnElement);
    } else {
        speakWithGoogle(cleanText, btnElement);
    }
}

// Fallback to Browser Speech Synthesis
function speakWithBrowser(text, btnElement = null) {
    if (!('speechSynthesis' in window)) {
        alert("很抱歉，您的瀏覽器不支援發音功能。");
        return;
    }
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.includes('ja'));
    if (jaVoice) {
        utterance.voice = jaVoice;
    }
    
    if (btnElement) {
        utterance.onstart = () => { btnElement.classList.add("playing"); };
        utterance.onend = utterance.onerror = () => { btnElement.classList.remove("playing"); };
    }
    window.speechSynthesis.speak(utterance);
}

// Speak using Google TTS for natural Pitch Accent
function speakWithGoogle(text, btnElement = null) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=${encodeURIComponent(text)}`;
    currentAudio = new Audio(audioUrl);
    
    if (btnElement) {
        currentAudio.addEventListener("play", () => { btnElement.classList.add("playing"); });
        currentAudio.addEventListener("ended", () => { btnElement.classList.remove("playing"); });
        currentAudio.addEventListener("pause", () => { btnElement.classList.remove("playing"); });
        currentAudio.addEventListener("error", () => { btnElement.classList.remove("playing"); });
    }

    const playPromise = currentAudio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.warn("Google TTS 播放失敗，自動降級使用瀏覽器語音: ", error);
            if (btnElement) btnElement.classList.remove("playing");
            speakWithBrowser(text, btnElement);
        });
    }
}

// Update voice engine selection
function setVoiceEngine(engine) {
    voiceEngine = engine;
    localStorage.setItem("jpsite_voice_engine", engine);
    
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
    document.querySelectorAll(".tab-btn").forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    document.querySelectorAll(".panel").forEach(panel => {
        if (panel.id === `${tabId}-panel`) {
            panel.classList.add("active");
        } else {
            panel.classList.remove("active");
        }
    });

    if (tabId === 'grammar') {
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

    const selectedVerb = verbsDB[currentVerbIndex];
    const conjugations = conjugateVerb(selectedVerb);

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
    
    // Causative rendering
    document.getElementById("val-causative").innerText = conjugations.causative;
    document.getElementById("val-causative-passive").innerText = conjugations.causativePassive;
}

// Custom verb input handler
function handleCustomVerbInput() {
    const input = document.getElementById("custom-verb-input").value.trim();
    if (!input) return;

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
        let type = 1;
        if (lastChar === "る") {
            const secondToLast = input.slice(-2, -1);
            const Group2Vowels = ["い", "き", "し", "ち", "に", "ひ", "み", "り", "え", "け", "せ", "て", "ね", "へ", "め", "れ", "得", "食", "見", "寝", "調", "覚", "開", "閉", "忘", "起", "決"];
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

// Select Quiz Category Tab
function selectQuizCategory(category) {
    currentCategory = category;
    quizQuestions = quizCategories[category];
    
    // update category switcher UI buttons
    document.querySelectorAll(".quiz-theme-switcher .engine-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    const activeBtn = document.getElementById(`quiz-btn-${category}`);
    if (activeBtn) activeBtn.classList.add("active");
    
    resetQuiz();
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
        optBox.className = "";

        assembledSentence = [];
        const poolBox = document.getElementById("word-chips-pool-box");
        const chipsCopy = [...q.chips].sort(() => 0.5 - Math.random());
        
        chipsCopy.forEach((chip, index) => {
            const chipBtn = document.createElement("button");
            chipBtn.className = "word-chip";
            chipBtn.innerText = chip;
            chipBtn.id = `chip-${index}`;
            chipBtn.addEventListener("click", () => {
                if (chipBtn.classList.contains("used")) return;
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
            assembledSentence.splice(index, 1);
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

        const optionBtns = document.querySelectorAll(".option-btn");
        optionBtns.forEach((btn, idx) => {
            btn.style.pointerEvents = "none";
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
        
        userAnswers[currentQuestionIndex] = userSentence;
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
// Note: Quiz now calculates scores relative to the current category length
function showQuizResults() {
    const qBox = document.getElementById("quiz-question-container");
    const optBox = document.getElementById("quiz-options-container");
    const feedbackBox = document.getElementById("quiz-feedback");
    const nextBtn = document.getElementById("quiz-next-btn");
    const submitBtn = document.getElementById("quiz-submit-btn");

    feedbackBox.style.display = "none";
    submitBtn.style.display = "none";
    nextBtn.style.display = "none";

    document.getElementById("quiz-progress-text").innerText = "測驗結束！";
    document.getElementById("quiz-progress-fill").style.width = "100%";

    const correctPct = Math.round((quizScore / quizQuestions.length) * 100);
    
    let evaluation = "";
    if (correctPct === 100) {
        evaluation = "完美無瑕！您已完全熟練掌握了該單元所有文法與題目！💯";
    } else if (correctPct >= 80) {
        evaluation = "優秀！對教材中的條件假定、被動與使役有極深厚的理解！🌟";
    } else if (correctPct >= 60) {
        evaluation = "及格了，建議您多閱讀「避雷指南」中的痛點對決，釐清細節觀念。👍";
    } else {
        evaluation = "還需努力！請重新閱讀課堂文法卡片並利用變形操作台多加練習！📚";
    }

    localStorage.setItem(`jpsite_score_${currentCategory}`, `${quizScore}/${quizQuestions.length} (${correctPct}%)`);

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
            speakJapanese(textToSpeak, btn);
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
    setVoiceEngine(voiceEngine);
    document.getElementById("engine-btn-google").addEventListener("click", () => setVoiceEngine("google"));
    document.getElementById("engine-btn-browser").addEventListener("click", () => setVoiceEngine("browser"));
    
    document.getElementById("ojad-search-btn").addEventListener("click", handleOJADSearch);
    document.getElementById("ojad-search-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleOJADSearch();
        }
    });
    
    document.getElementById("assistant-toggle").addEventListener("click", toggleAssistantPanel);
    
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
                if (textToSpeak && textToSpeak !== "---") {
                    speakJapanese(textToSpeak, btn);
                }
            }
        });
    });

    // 7. Setup interactive tooltip click toggles
    document.querySelectorAll(".jp-word").forEach(word => {
        word.addEventListener("click", (e) => {
            e.stopPropagation();
            const isActive = word.classList.contains("active");
            document.querySelectorAll(".jp-word").forEach(w => w.classList.remove("active"));
            if (!isActive) {
                word.classList.add("active");
            }
        });
    });
    
    document.addEventListener("click", () => {
        document.querySelectorAll(".jp-word").forEach(w => w.classList.remove("active"));
    });

    // 8. Initialize renderers
    renderConjugator();
    // Default select category L19
    selectQuizCategory("l19");
});
