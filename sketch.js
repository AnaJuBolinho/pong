// Variáveis da bolinha
let xBolinha;
let yBolinha;
let diametro = 80;
let raio = diametro / 2;
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;
let ultimaPosicaoX = xBolinha;

// Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons do jogo
let trilha;
let ponto;
let raquetada;

function preload(){
  bolinha = loadImage("coelhinho.png");
  trilha = loadSound("som.wav");
  ponto = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  
  // Inicialização da posição da bolinha
  xBolinha = width / 2;
  yBolinha = height / 2;
}

function draw() {
  background(190, 109, 227, 89);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
}

function mostraBolinha() {
  image(bolinha, xBolinha - raio, yBolinha - raio, diametro, diametro);
  line(300, 0, 300, 400);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= 10;
  }
  if (keyIsDown(83)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(x, y) {
  if (xBolinha + raio > x && xBolinha - raio < x + raqueteComprimento &&
      yBolinha + raio > y && yBolinha - raio < y + raqueteAltura) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(110, 127, 250, 98));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(110, 127, 250, 98));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > width && velocidadeXBolinha > 0) {
    meusPontos++;
    ponto.play();
    resetBolinha();
  } else if (xBolinha < 0 && velocidadeXBolinha < 0) {
    pontosDoOponente++;
    ponto.play();
    resetBolinha();
  }
}
function resetBolinha() {
  xBolinha = width / 2;
  yBolinha = height / 2;
  velocidadeXBolinha = abs(velocidadeXBolinha);
  velocidadeYBolinha = random(-5, 5);
}
