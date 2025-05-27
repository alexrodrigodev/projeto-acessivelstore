
const synth = window.speechSynthesis;
let recognition;

function falar(texto) {
  if (synth.speaking) synth.cancel();
  const utter = new SpeechSynthesisUtterance(texto);
  synth.speak(utter);
}

function ativarComandosPorVoz() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("Seu navegador não suporta comandos de voz.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const comando = event.results[event.results.length - 1][0].transcript.toLowerCase();
    processarComando(comando);
  };

  recognition.start();
  falar("Comando de voz ativado. Pode falar, como abrir categoria tênis ou adicionar camisa polo ao carrinho.");
}

function processarComando(comando) {
  if (comando.includes("abrir categoria camisas")) {
    document.getElementById("filtroCategoria").value = "camisas";
    filtrarProdutos();
    falar("Abrindo categoria camisas.");
  } else if (comando.includes("abrir categoria calças")) {
    document.getElementById("filtroCategoria").value = "calcas";
    filtrarProdutos();
    falar("Abrindo categoria calças.");
  } else if (comando.includes("abrir categoria tênis") || comando.includes("abrir categoria tenis")) {
    document.getElementById("filtroCategoria").value = "tenis";
    filtrarProdutos();
    falar("Abrindo categoria tênis.");
  } else if (comando.includes("abrir categoria óculos") || comando.includes("abrir categoria oculos")) {
    document.getElementById("filtroCategoria").value = "oculos";
    filtrarProdutos();
    falar("Abrindo categoria óculos.");
  } else if (comando.includes("conferir carrinho")) {
    alert("Você possui " + carrinho.length + " item(ns) no carrinho.");
    falar("Você possui " + carrinho.length + " item(s) no carrinho.");
  } else if (comando.includes("finalizar compra")) {
    carrinho = [];
    alert("Compra finalizada.");
    falar("Compra finalizada com sucesso.");
  } else if (comando.includes("adicionar")) {
    const produto = comando.replace("adicionar", "").replace("ao carrinho", "").trim();
    carrinho.push(produto);
    falar(produto + " adicionado ao carrinho.");
  }
}

let carrinho = [];

function adicionarAoCarrinho(nome) {
  carrinho.push(nome);
  alert(nome + " adicionado ao carrinho.");
  falar(nome + " adicionado ao carrinho.");
}

function ouvirComandos() {
  const comandos = "Comandos disponíveis: abrir categoria camisas, abrir categoria calças, abrir categoria tênis, abrir categoria óculos, adicionar ao carrinho, conferir carrinho, finalizar compra.";
  falar(comandos);
}

function toggleContraste() {
  document.body.classList.toggle("contraste");
}

function aumentarFonte() {
  document.body.style.fontSize = "larger";
}

function reduzirFonte() {
  document.body.style.fontSize = "medium";
}

function filtrarProdutos() {
  const categoria = document.getElementById("filtroCategoria").value;
  const sexo = document.getElementById("filtroSexo").value;
  document.querySelectorAll(".grid").forEach(grupo => {
    const grupoCategoria = grupo.getAttribute("data-categoria");
    const grupoSexo = grupo.getAttribute("data-sexo");
    const visivelCategoria = (categoria === "todos" || grupoCategoria === categoria);
    const visivelSexo = (sexo === "todos" || grupoSexo === sexo);
    grupo.style.display = (visivelCategoria && visivelSexo) ? "grid" : "none";
  });
}
