// ====== Firebase ======
const firebaseConfig = {
  apiKey: "AIzaSyAf3B96GadnhlUrwux0MOAOix0BMFCSm_I",
  authDomain: "biofungi-5826e.firebaseapp.com",
  databaseURL: "https://biofungi-5826e-default-rtdb.firebaseio.com",
  projectId: "biofungi-5826e",
  storageBucket: "biofungi-5826e.firebasestorage.app",
  messagingSenderId: "264011891465",
  appId: "1:264011891465:web:6ae206fe1247a5df25c9d8"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ====== Perguntas ======
const quizQuestions = [
  { pergunta: "Os fungos são organismos essenciais para os ecossistemas terrestres. Uma de suas principais funções é:", opcoes: ["Aumentar a temperatura do solo","Produzir oxigênio pela fotossíntese","Decompor matéria orgânica e reciclar nutrientes","Fixar carbono atmosférico"], resposta: 2 },
  { pergunta: "Em relação à estrutura dos fungos, as hifas são:", opcoes: ["Células isoladas que realizam fotossíntese","Filamentos que formam o corpo do fungo","Sacos reprodutivos que produzem esporos","Estruturas responsáveis pela respiração"], resposta: 1 },
  { pergunta: "O conjunto de várias hifas entrelaçadas que formam o corpo principal de um fungo é chamado de:", opcoes: ["Esporângio","Asco","Micélio","Basídio"], resposta: 2 },
  { pergunta: "Os fungos do filo Chytridiomycota são considerados os mais primitivos. Uma característica que os diferencia dos demais é:", opcoes: ["Produzirem esporos flagelados capazes de nadar","Viverem exclusivamente no solo","Possuírem micélio septado","Formarem cogumelos visíveis"], resposta: 0 },
  { pergunta: "O fungo Batrachochytrium dendrobatidis, pertencente aos quitrídios, é conhecido por:", opcoes: ["Ser usado na fabricação de antibióticos","Causar doenças em anfíbios e ameaçar populações de sapos","Formar liquens com algas","Atuar na fermentação alcoólica"], resposta: 1 },
  { pergunta: "O grupo Zygomycota inclui fungos como o gênero Rhizopus, comum no pão embolorado. Esses fungos se destacam por:", opcoes: ["Possuírem hifas sem divisões internas, chamadas cenocíticas","Produzirem cogumelos grandes e visíveis","Viverem em simbiose com plantas","Serem todos unicelulares"], resposta: 0 },
  { pergunta: "O filo Ascomycota é o maior grupo de fungos conhecidos. Seu nome deriva de uma estrutura característica chamada:", opcoes: ["Asco, um 'saco' onde são formados os esporos","Basídio, célula produtora de esporos","Hifa, responsável pela nutrição","Esporângio, que libera toxinas"], resposta: 0 },
  { pergunta: "A levedura Saccharomyces cerevisiae é importante porque:", opcoes: ["Atua como fungo parasita de plantas","Participa da fermentação de pães, vinhos e cervejas","Produz glomalina no solo","É utilizada na cura de queijos"], resposta: 1 },
  { pergunta: "Os Basidiomycota são conhecidos por produzirem estruturas reprodutivas visíveis chamadas:", opcoes: ["Ascos","Esporângios","Basidiocarpos","Micorrizas"], resposta: 2 },
  { pergunta: "Os fungos do filo Glomeromycota são famosos por formar relações simbióticas com plantas conhecidas como:", opcoes: ["Micorrizas arbusculares","Liquens","Rizomas simbióticos","Cianobactérias mutualísticas"], resposta: 0 }
];

let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];

// ====== Elementos ======
const startBtn = document.getElementById("start-quiz");
const quizContainer = document.getElementById("quiz-container");
const quizCard = document.getElementById("quiz-card");
const quizResult = document.getElementById("quiz-result");
const quizScore = document.getElementById("quiz-score");
const saveBtn = document.getElementById("save-quiz-score");
const playerNameInput = document.getElementById("player-name-quiz");

// ====== Funções ======
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  quizCard.innerHTML = "";
  const q = shuffledQuestions[currentQuestion];

  const questionText = document.createElement("p");
  questionText.textContent = `(${currentQuestion + 1}/10) ${q.pergunta}`;
  questionText.classList.add("fw-bold", "mb-3");
  questionText.style.color = "#2b5a2e";
  questionText.style.fontSize = "1.2rem";
  quizCard.appendChild(questionText);

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("d-grid", "gap-2");

  const shuffledOptions = shuffleArray([...q.opcoes]);
  shuffledOptions.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-success";
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.opcoes[q.resposta]) score++;
      currentQuestion++;
      if (currentQuestion < shuffledQuestions.length) {
        showQuestion();
      } else {
        finishQuiz();
      }
    };
    optionsDiv.appendChild(btn);
  });
  quizCard.appendChild(optionsDiv);
}

function finishQuiz() {
  quizCard.style.display = "none";
  quizResult.style.display = "block";
  quizScore.textContent = `${score}/10`;

  let leaderboardDiv = document.getElementById("leaderboard");
  if (!leaderboardDiv) {
    leaderboardDiv = document.createElement("div");
    leaderboardDiv.id = "leaderboard";
    leaderboardDiv.className = "mt-4 text-start p-3 rounded shadow-sm";
    leaderboardDiv.style.backgroundColor = "#e8f5e9";
    quizResult.appendChild(leaderboardDiv);
  }
  showLeaderboard();
}

function showLeaderboard() {
  const div = document.getElementById("leaderboard");
  div.innerHTML = "<h5 class='text-success mb-2'>Placar Geral</h5>";

  db.ref("placar").orderByChild("pontos").once("value", snapshot => {
    const data = snapshot.val();
    if (data) {
      const list = document.createElement("ol");
      list.classList.add("mb-0");
      Object.values(data)
        .sort((a, b) => b.pontos - a.pontos)
        .forEach(item => {
          const li = document.createElement("li");
          li.textContent = `${item.nome} - ${item.pontos} pontos`;
          list.appendChild(li);
        });
      div.appendChild(list);
    } else {
      div.innerHTML += "<p>Nenhuma pontuação registrada ainda.</p>";
    }
  });
}

// ====== Eventos ======
startBtn.addEventListener("click", () => {
  shuffledQuestions = shuffleArray(quizQuestions).slice(0, 10); // agora 10 perguntas
  currentQuestion = 0;
  score = 0;
  startBtn.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
});

saveBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (!name) {
    alert("Digite seu nome!");
    return;
  }
  db.ref("placar")
    .push({ nome: name, pontos: score })
    .then(() => {
      alert("Pontuação salva!");
      playerNameInput.value = "";
      showLeaderboard();
    });
});
