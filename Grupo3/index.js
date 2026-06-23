let bitcount;
let robotoMono;
let casco1;
let casco2;
let vista = "bienvenida";
let musicaEntrada;
let sonidoVJ;
let momento = "noche";
let atw;
let omt;
let better;
let faster;
let stronger;
let harder;

// cascos
let xCasco1;
let xCasco2;
let animacionTerminada = false;
let animacionIniciada = false;
let velocidadCascos = 4;

// imagenes VJ
let fondo;
let nubes1;
let nubes2;
let pantallas;

// imagenes DJ
let imagenes = {};
let platoIzq = { x: 285, y: 620, w: 225, h: 95 };
let platoIzqInt = { x: 285, y: 620, w: 100, h: 50 };
let platoDer = { x: 940, y: 620, w: 225, h: 95 };
let platoDerInt = { x: 940, y: 620, w: 100, h: 50 };
let botonSupIzq = { x: 135, y: 550, w: 80, h: 12 };
let botonSupDer = { x: 330, y: 550, w: 80, h: 12 };
let botonSupIzq1 = { x: 800, y: 550, w: 80, h: 12 };
let botonSupDer1 = { x: 920, y: 550, w: 80, h: 12 };
let perillas = [
  { x: 550, y: 565 },
  { x: 550, y: 585 },
  { x: 550, y: 605 },
  { x: 550, y: 625 },
  { x: 550, y: 645 },
  { x: 550, y: 665 },
  { x: 470, y: 565 },
  { x: 470, y: 585 },
  { x: 470, y: 605 },
  { x: 470, y: 625 },
  { x: 470, y: 645 },
  { x: 470, y: 665 },
  { x: 510, y: 565 },
  { x: 510, y: 585 },
  { x: 510, y: 605 },
  { x: 510, y: 625 },
  { x: 510, y: 645 },
  { x: 510, y: 665 },
];

// fondo
let duracion = 120000;
let modoManual = false;

// low lights
let nivelOscuridad = 0;

// hype mode
let velocidadActiva = false;
let multiplicadorVelocidad = 2.5;
let valoresOriginales = {
  velocidadCascos: 4,
  velocidad1: 0.2,
  velocidad2: -0.2,
  velocidadTriangulo: 0.2,
  velCambio1: 0.2,
  velCambio2: -0.15,
  velCambio3: 0.18,
  velCambio4: -0.12,
  velCambio5: 0.16,
  velCambio6: -0.14,
  velCambioAro: 0.15,
};

// VJ
let xNube1 = 180;
let xNube2 = 350;
let velocidad1 = 0.2;
let velocidad2 = -0.2;
let moverCirculos = false;
let mostrarTriangulos = false;
let mostrarLineas = false;
let cambiarPantallaIzq = false;
let cambiarPantallaDer = false;
let cambiarFormasIzq = false;
let cambiarFormasDer = false;
let lineasRojasIzq = false;
let lineasRojasDer = false;
let cambio1 = 0;
let cambio2 = 0;
let cambio3 = 0;
let cambio4 = 0;
let cambio5 = 0;
let cambio6 = 0;
let cambioAro = 0;
let cambioTriangulo = 0;
let velocidadTriangulo = 0.2;
let velCambio1 = 0.2;
let velCambio2 = -0.15;
let velCambio3 = 0.18;
let velCambio4 = -0.12;
let velCambio5 = 0.16;
let velCambio6 = -0.14;
let velCambioAro = 0.15;

let fft;

function preload() {
  bitcount = loadFont("assets/fonts/bitcount.ttf");
  robotoMono = loadFont("assets/fonts/robotomono.ttf");
  casco1 = loadImage("assets/images/casco1.png");
  casco2 = loadImage("assets/images/casco2.png");
  fondo = loadImage("assets/images/fondo.png");
  nubes1 = loadImage("assets/images/nubes1.png");
  nubes2 = loadImage("assets/images/nubes2.png");
  pantallas = loadImage("assets/images/pantallas.png");
  musicaEntrada = loadSound("assets/sounds/Veridis.mp3");
  sonidoVJ = loadSound("assets/sounds/audio.mp3");
  atw = loadSound("assets/sounds/AroundTheWorld.mp3");
  omt = loadSound("assets/sounds/OneMoreTime.mp3");
  better = loadSound("assets/sounds/better.mp3");
  faster = loadSound("assets/sounds/faster.mp3");
  stronger = loadSound("assets/sounds/stronger.mp3");
  harder = loadSound("assets/sounds/harder.mp3");
  imagenes.dj_noche = loadImage("assets/images/cabinasin.png");
  imagenes.noche = loadImage("assets/images/noche.png");
}

function setup() {
  createCanvas(1200, 800);
  xCasco1 = width / 2 - 619;
  xCasco2 = width / 2;
}

function inicializarFFT() {
  if (!fft) {
    fft = new p5.FFT(0.8, 32);
    fft.setInput(sonidoVJ);
  }
}

function dibujarBoton(x, y, w, h, txt, tamTexto) {
  noStroke();
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    fill(220, 215, 180);
  } else {
    fill(240, 235, 200);
  }
  rect(x, y, w, h, 18);
  textFont(bitcount);
  textSize(tamTexto);
  fill(20, 18, 15);
  textAlign(CENTER, CENTER);
  text(txt, x + w / 2, y + h / 2);
}

function dibujarFondo() {
  if (modoManual) {
    if (momento === "noche") {
      image(imagenes.noche, 0, 0, width, height);
    } else {
      image(fondo, 0, 0, width, height);
    }
  } else {
    let progreso =
      (sin((TWO_PI * millis()) / (duracion * 2) - HALF_PI) + 1) / 2;
    image(fondo, 0, 0, width, height);
    tint(255, progreso * 255);
    image(imagenes.noche, 0, 0, width, height);
    noTint();
  }
}

function dibujarHaz(origenX, destinoX, r, g, b) {
  let anchoOrigen = 14;
  let anchoNucleo = anchoOrigen / 2;
  fill(r, g, b, 90);
  triangle(
    origenX - anchoOrigen,
    0,
    origenX + anchoOrigen,
    0,
    destinoX,
    height,
  );
  fill(r + 60, g + 40, b + 70, 160);
  triangle(
    origenX - anchoNucleo,
    0,
    origenX + anchoNucleo,
    0,
    destinoX,
    height,
  );
}

function dibujarEstrobo() {
  if (!velocidadActiva) return;

  noStroke();
  fill(0, 0, 0, 140);
  rect(0, 0, width, height);

  let haces = [
    {
      origen: -40,
      destino: width - 20,
      color: "blanco",
      vel: 2.4,
      fase: 0.0,
      amplitud: 90,
    },
    {
      origen: -20,
      destino: width * 0.95,
      color: "violeta",
      vel: 3.1,
      fase: 1.1,
      amplitud: 80,
    },
    {
      origen: 40,
      destino: width - 60,
      color: "violeta",
      vel: 2.7,
      fase: 2.3,
      amplitud: 100,
    },
    {
      origen: 100,
      destino: width * 0.85,
      color: "blanco",
      vel: 3.4,
      fase: 0.6,
      amplitud: 70,
    },
    {
      origen: 160,
      destino: width * 0.78,
      color: "blanco",
      vel: 2.9,
      fase: 3.0,
      amplitud: 90,
    },
    {
      origen: 320,
      destino: width * 0.62,
      color: "violeta",
      vel: 3.6,
      fase: 1.7,
      amplitud: 80,
    },
    {
      origen: width / 2 - 100,
      destino: width / 2 + 200,
      color: "violeta",
      vel: 4.0,
      fase: 0.4,
      amplitud: 110,
    },
    {
      origen: width / 2 - 60,
      destino: width / 2 + 140,
      color: "blanco",
      vel: 3.2,
      fase: 2.0,
      amplitud: 90,
    },
    {
      origen: width / 2 + 60,
      destino: width / 2 - 140,
      color: "violeta",
      vel: 3.3,
      fase: 2.8,
      amplitud: 90,
    },
    {
      origen: width / 2 + 100,
      destino: width / 2 - 200,
      color: "blanco",
      vel: 2.6,
      fase: 1.4,
      amplitud: 110,
    },
    {
      origen: width - 320,
      destino: width * 0.38,
      color: "blanco",
      vel: 3.8,
      fase: 0.9,
      amplitud: 80,
    },
    {
      origen: width - 160,
      destino: width * 0.22,
      color: "violeta",
      vel: 2.5,
      fase: 3.4,
      amplitud: 90,
    },
    {
      origen: width - 100,
      destino: width * 0.15,
      color: "violeta",
      vel: 3.7,
      fase: 1.9,
      amplitud: 70,
    },
    {
      origen: width - 40,
      destino: 60,
      color: "blanco",
      vel: 3.0,
      fase: 0.2,
      amplitud: 100,
    },
    {
      origen: width + 20,
      destino: 20,
      color: "violeta",
      vel: 2.8,
      fase: 2.6,
      amplitud: 80,
    },
    {
      origen: width + 40,
      destino: width * 0.05,
      color: "blanco",
      vel: 3.5,
      fase: 1.2,
      amplitud: 90,
    },
  ];

  for (let h of haces) {
    let intensidad = random(0.5, 1);
    let r, g, b;
    if (h.color === "violeta") {
      r = 120 * intensidad + 40;
      g = 30 * intensidad;
      b = 200 * intensidad + 40;
    } else {
      let gris = 160 + intensidad * 95;
      r = gris;
      g = gris;
      b = gris;
    }
    let destinoMovido =
      h.destino + sin(millis() * 0.001 * h.vel + h.fase) * h.amplitud;
    dibujarHaz(h.origen, destinoMovido, r, g, b);
  }
}

function dibujarVisualizador(cx, cy, radio, r, g, b) {
  if (!fft) return;
  let espectro = fft.analyze();
  noFill();
  noStroke();
  let cantidadBarras = espectro.length;
  let anguloPaso = TWO_PI / cantidadBarras;
  blendMode(MULTIPLY);
  for (let i = 0; i < cantidadBarras; i++) {
    let nivel = espectro[i] / 255;
    let radioInterno = radio * 0.15;
    let radioExterno = radioInterno + nivel * (radio * 1.8);
    let angulo = i * anguloPaso - HALF_PI;
    let x1 = cx + cos(angulo) * radioInterno;
    let y1 = cy + sin(angulo) * radioInterno;
    let x2 = cx + cos(angulo) * radioExterno;
    let y2 = cy + sin(angulo) * radioExterno;
    stroke(80, 30, 70, 120);
    strokeWeight(5);
    line(x1, y1, x2, y2);
  }
  noStroke();
  fill(80, 30, 70, 90);
  ellipse(cx, cy, radio * 0.65, radio * 0.65);
  blendMode(BLEND);
}

function dibujarVisualizadorRect(cx, cy, ancho, alto, anguloGrados, r, g, b) {
  if (!fft) return;
  let espectro = fft.analyze();
  push();
  translate(cx, cy);
  rotate(radians(anguloGrados));
  let cantidadBarras = 10;
  let espacio = ancho / cantidadBarras;
  let anchoBarra = espacio * 0.6;
  noStroke();
  for (let i = 0; i < cantidadBarras; i++) {
    let indice = floor(map(i, 0, cantidadBarras - 1, 0, espectro.length - 1));
    let nivel = espectro[indice] / 255;
    let alturaBarra = min(alto, max(4, nivel * alto));
    let x = -ancho / 2 + espacio * i + espacio / 2 - anchoBarra / 2;
    let y = alto / 2 - alturaBarra;
    fill(r, g, b, 230);
    rect(x, y, anchoBarra, alturaBarra, 2);
  }
  pop();
}

function draw() {
  if (vista === "bienvenida") {
    drawPantallaBienvenida();
  } else if (vista === "reglas") {
    drawPantallaReglas();
  } else if (vista === "dj") {
    drawVistaDJ();
  } else if (vista === "vj") {
    drawVistaVJ();
  }
}

function drawPantallaBienvenida() {
  background(0);

  fill(240, 235, 200);
  noStroke();
  textAlign(LEFT, TOP);

  textFont(bitcount);
  textSize(100);
  text("BIENVENIDO", 330, 170);

  textFont(robotoMono);
  textSize(22);
  text("A LA EXPERIENCIA DAFT PUNK SUNSET 2026. VAS A", 330, 270);
  text("PODER VISITAR LAS CABINAS DJ Y VJ E INTERACTUAR.", 330, 300);

  dibujarBoton(330, 420, 110, 110, ">>", 40);

  textFont(robotoMono);
  textSize(18);
  fill(240, 235, 200);
  textAlign(LEFT, TOP);
  text("para entrar, presioná", 330, 545);
  text("en tu teclado o clickeá", 330, 568);

  if (animacionIniciada) {
    if (xCasco1 > -300) xCasco1 = xCasco1 - velocidadCascos;
    if (xCasco2 < width - 250) xCasco2 = xCasco2 + velocidadCascos;
    if (xCasco1 <= -280 && xCasco2 >= width - 250) {
      animacionTerminada = true;
    }
  }

  image(casco1, xCasco1, 0, 619, 800);
  image(casco2, xCasco2, 0, 579, 800);
}

function drawPantallaReglas() {
  background(0);

  textFont(bitcount);
  textSize(100);
  fill(240, 235, 200);
  noStroke();
  textAlign(LEFT, TOP);
  text("DISCOVERY", 330, 170);

  textFont(robotoMono);
  textSize(22);
  fill(240, 235, 200);
  text("PARA MOVERTE POR LAS CABINAS DEBERÁS", 330, 270);
  text("PRESIONAR LAS TECLAS INDICADAS ABAJO.", 330, 300);

  let b1x = 330;
  let by = 380;
  let bw = 110;
  let bh = 110;

  dibujarBoton(b1x, by, bw, bh, "D", 60);
  textFont(robotoMono);
  textSize(18);
  fill(240, 235, 200);
  textAlign(LEFT, TOP);
  text("VISTA DJ", b1x, by + bh + 10);

  let b2x = 560;
  dibujarBoton(b2x, by, bw, bh, "V", 60);
  textFont(robotoMono);
  textSize(18);
  fill(240, 235, 200);
  textAlign(LEFT, TOP);
  text("VISTA VJ", b2x, by + bh + 10);

  let bsy = by + bh + 60;
  let bsw = 55;
  let bsh = 55;

  dibujarBoton(b1x, bsy, bsw, bsh, "H/S", 28);
  textFont(robotoMono);
  textSize(14);
  fill(240, 235, 200);
  textAlign(LEFT, TOP);
  text("HYPE MODE", b1x, bsy + bsh + 8);

  dibujarBoton(b2x, bsy, bsw, bsh, "L/K", 28);
  textFont(robotoMono);
  textSize(14);
  fill(240, 235, 200);
  textAlign(LEFT, TOP);
  text("LOW LIGHTS", b2x, bsy + bsh + 8);

  image(casco1, xCasco1, 0, 619, 800);
  image(casco2, xCasco2, 0, 579, 800);
}

function drawVistaDJ() {
  background(0);
  dibujarFondo();

  xNube1 = xNube1 + velocidad1;
  if (xNube1 > 200) velocidad1 = -0.2;
  if (xNube1 < 160) velocidad1 = 0.2;

  xNube2 = xNube2 + velocidad2;
  if (xNube2 > 370) velocidad2 = -0.2;
  if (xNube2 < 330) velocidad2 = 0.2;

  image(nubes1, xNube1 - 400, -150, 900, 560);
  image(nubes2, xNube2 + 150, -150, 900, 560);

  dibujarEstrobo();

  image(imagenes.dj_noche, 0, 0, width, height);

  strokeWeight(2);
  stroke("#ffffff");
  if (
    mouseX > platoIzq.x - platoIzq.w / 2 &&
    mouseX < platoIzq.x + platoIzq.w / 2 &&
    mouseY > platoIzq.y - platoIzq.h / 2 &&
    mouseY < platoIzq.y + platoIzq.h / 2
  ) {
    fill("#a877ae");
  } else {
    fill("#88668c");
  }
  ellipse(platoIzq.x, platoIzq.y, platoIzq.w, platoIzq.h);

  if (
    mouseX > botonSupIzq.x &&
    mouseX < botonSupIzq.x + botonSupIzq.w &&
    mouseY > botonSupIzq.y &&
    mouseY < botonSupIzq.y + botonSupIzq.h
  ) {
    fill(180, 150, 200, 220);
  } else {
    fill(145, 120, 165, 180);
  }
  rect(botonSupIzq.x, botonSupIzq.y, botonSupIzq.w, botonSupIzq.h, 6);

  if (
    mouseX > botonSupDer.x &&
    mouseX < botonSupDer.x + botonSupDer.w &&
    mouseY > botonSupDer.y &&
    mouseY < botonSupDer.y + botonSupDer.h
  ) {
    fill(180, 150, 200, 220);
  } else {
    fill(145, 120, 165, 180);
  }
  rect(botonSupDer.x, botonSupDer.y, botonSupDer.w, botonSupDer.h, 6);

  strokeWeight(2);
  stroke("#ffffff");
  if (
    mouseX > platoDer.x - platoDer.w / 2 &&
    mouseX < platoDer.x + platoDer.w / 2 &&
    mouseY > platoDer.y - platoDer.h / 2 &&
    mouseY < platoDer.y + platoDer.h / 2
  ) {
    fill("#ffd876");
  } else {
    fill("#ffe8b0");
  }
  ellipse(platoDer.x, platoDer.y, platoDer.w, platoDer.h);

  if (
    mouseX > platoDerInt.x - platoDerInt.w / 2 &&
    mouseX < platoDerInt.x + platoDerInt.w / 2 &&
    mouseY > platoDerInt.y - platoDerInt.h / 2 &&
    mouseY < platoDerInt.y + platoDerInt.h / 2
  ) {
    fill("#a877ae");
  } else {
    fill("#88668c");
  }
  ellipse(platoDerInt.x, platoDerInt.y, platoDerInt.w, platoDerInt.h);

  if (
    mouseX > platoIzqInt.x - platoIzqInt.w / 2 &&
    mouseX < platoIzqInt.x + platoIzqInt.w / 2 &&
    mouseY > platoIzqInt.y - platoIzqInt.h / 2 &&
    mouseY < platoIzqInt.y + platoIzqInt.h / 2
  ) {
    fill("#ffd876");
  } else {
    fill("#ffe8b0");
  }
  ellipse(platoIzqInt.x, platoIzqInt.y, platoIzqInt.w, platoIzqInt.h);

  if (
    mouseX > botonSupIzq1.x &&
    mouseX < botonSupIzq1.x + botonSupIzq1.w &&
    mouseY > botonSupIzq1.y &&
    mouseY < botonSupIzq1.y + botonSupIzq1.h
  ) {
    fill("#ffe070");
  } else {
    fill("#fbe9ae");
  }
  rect(botonSupIzq1.x, botonSupIzq1.y, botonSupIzq1.w, botonSupIzq1.h, 6);

  if (
    mouseX > botonSupDer1.x &&
    mouseX < botonSupDer1.x + botonSupDer1.w &&
    mouseY > botonSupDer1.y &&
    mouseY < botonSupDer1.y + botonSupDer1.h
  ) {
    fill("#ffe070");
  } else {
    fill("#fbe9ae");
  }
  rect(botonSupDer1.x, botonSupDer1.y, botonSupDer1.w, botonSupDer1.h, 6);

  for (let i = 0; i < perillas.length; i++) {
    let p = perillas[i];
    let esSampler = i === 6 || i === 12 || i === 0 || i === 7;
    if (esSampler && dist(mouseX, mouseY, p.x, p.y) < 10) {
      fill("#e9ddb3");
      stroke("#2a3565");
    } else if (esSampler) {
      fill("#2a3565");
      stroke("#e9ddb3");
    } else {
      fill("#2a3565");
      stroke("#e9ddb3");
    }
    strokeWeight(2);
    ellipse(p.x, p.y, 12, 12);
  }

  if (haySonidoActivo()) {
    noStroke();
    textFont(robotoMono);
    textSize(14);
    fill(240, 235, 200);
    textAlign(CENTER, CENTER);
    text("NOW PLAYING: " + getNombreSonando(), 600, 755);
  }
}

function drawVistaVJ() {
  background(0);
  dibujarFondo();

  xNube1 = xNube1 + velocidad1;
  if (xNube1 > 200) velocidad1 = -0.2;
  if (xNube1 < 160) velocidad1 = 0.2;

  xNube2 = xNube2 + velocidad2;
  if (xNube2 > 370) velocidad2 = -0.2;
  if (xNube2 < 330) velocidad2 = 0.2;

  image(nubes1, xNube1, -70, 700, 440);
  image(nubes2, xNube2, 20, 700, 440);

  dibujarEstrobo();

  image(pantallas, 0, 0, 1200, 800);

  if (sonidoVJ.isPlaying()) {
    dibujarVisualizadorRect(55, 390, 55, 90, 0, 124, 88, 125);
    dibujarVisualizadorRect(125, 390, 55, 90, 0, 124, 88, 125);
    dibujarVisualizadorRect(195, 390, 55, 90, 0, 124, 88, 125);
    dibujarVisualizadorRect(265, 390, 55, 90, 0, 124, 88, 125);
    dibujarVisualizadorRect(935, 390, 55, 90, 0, 124, 88, 125);
    dibujarVisualizadorRect(1005, 390, 55, 90, 0, 124, 88, 125);
    dibujarVisualizadorRect(1075, 390, 55, 90, 0, 124, 88, 125);
    dibujarVisualizadorRect(1145, 390, 55, 90, 0, 124, 88, 125);
  }

  if (cambiarPantallaIzq == true) {
    stroke(255);
    strokeWeight(3);
    fill(245, 150, 70, 160);
    quad(0, 0, 520, 60, 315, 430, 0, 430);
  }

  if (cambiarPantallaDer == true) {
    stroke(255);
    strokeWeight(3);
    fill(245, 150, 70, 160);
    quad(680, 60, 1200, 0, 1200, 430, 885, 430);
  }

  if (mouseX > 555 && mouseX < 635 && mouseY > 616 && mouseY < 642) {
    stroke(245, 150, 70);
    strokeWeight(3);
    fill(235, 95, 105);
    rect(551, 614, 88, 30);
  } else {
    stroke(255);
    strokeWeight(2);
    fill(235, 95, 105);
    rect(555, 616, 80, 26);
  }

  noStroke();
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("GIORGIO!", 595, 629);

  stroke(255);
  strokeWeight(2);
  fill(235, 235, 210);
  rect(391, 663, 22, 24);

  if (mouseX > 421 && mouseX < 443 && mouseY > 663 && mouseY < 687) {
    fill(210, 80, 40);
    rect(418, 660, 28, 30);
  } else {
    fill(235, 95, 90);
    rect(421, 663, 22, 24);
  }

  fill(235, 235, 210);
  rect(451, 663, 22, 24);

  if (mouseX > 391 && mouseX < 413 && mouseY > 705 && mouseY < 729) {
    fill(210, 80, 40);
    rect(388, 702, 28, 30);
  } else {
    fill(235, 95, 90);
    rect(391, 705, 22, 24);
  }

  fill(235, 235, 210);
  rect(421, 705, 22, 24);

  if (mouseX > 451 && mouseX < 473 && mouseY > 705 && mouseY < 729) {
    fill(210, 80, 40);
    rect(448, 702, 28, 30);
  } else {
    fill(235, 95, 90);
    rect(451, 705, 22, 24);
  }

  fill(235, 235, 210);
  rect(700, 663, 22, 24);

  if (mouseX > 730 && mouseX < 752 && mouseY > 663 && mouseY < 687) {
    fill(210, 80, 40);
    rect(727, 660, 28, 30);
  } else {
    fill(235, 95, 90);
    rect(730, 663, 22, 24);
  }

  fill(235, 235, 210);
  rect(760, 663, 22, 24);

  if (mouseX > 700 && mouseX < 722 && mouseY > 705 && mouseY < 729) {
    fill(210, 80, 40);
    rect(697, 702, 28, 30);
  } else {
    fill(235, 95, 90);
    rect(700, 705, 22, 24);
  }

  fill(235, 235, 210);
  rect(730, 705, 22, 24);

  if (mouseX > 760 && mouseX < 782 && mouseY > 705 && mouseY < 729) {
    fill(210, 80, 40);
    rect(757, 702, 30, 30);
  } else {
    fill(235, 95, 90);
    rect(760, 705, 22, 24);
  }

  stroke(255);
  strokeWeight(1.5);

  if (mouseX > 557 && mouseX < 579 && mouseY > 652 && mouseY < 674) {
    fill(245, 150, 70);
    ellipse(568, 663, 28, 28);
  } else {
    fill(245, 230, 155);
    ellipse(568, 663, 22, 22);
  }

  fill(245, 230, 155);
  ellipse(600, 663, 22, 22);

  if (mouseX > 621 && mouseX < 643 && mouseY > 652 && mouseY < 674) {
    fill(245, 150, 70);
    ellipse(632, 663, 28, 28);
  } else {
    fill(245, 230, 155);
    ellipse(632, 663, 22, 22);
  }

  fill(245, 230, 155);
  ellipse(568, 696, 22, 22);

  if (mouseX > 589 && mouseX < 611 && mouseY > 685 && mouseY < 707) {
    fill(245, 150, 70);
    ellipse(600, 696, 28, 28);
  } else {
    fill(245, 230, 155);
    ellipse(600, 696, 22, 22);
  }

  fill(245, 230, 155);
  ellipse(632, 696, 22, 22);
  ellipse(568, 728, 22, 22);
  ellipse(600, 728, 22, 22);
  ellipse(632, 728, 22, 22);

  if (moverCirculos == true) {
    cambio1 = cambio1 + velCambio1;
    cambio2 = cambio2 + velCambio2;
    cambio3 = cambio3 + velCambio3;
    cambio4 = cambio4 + velCambio4;
    cambio5 = cambio5 + velCambio5;
    cambio6 = cambio6 + velCambio6;
    cambioAro = cambioAro + velCambioAro;
  }

  if (cambio1 > 15 || cambio1 < -15) velCambio1 = velCambio1 * -1;
  if (cambio2 > 12 || cambio2 < -12) velCambio2 = velCambio2 * -1;
  if (cambio3 > 8 || cambio3 < -8) velCambio3 = velCambio3 * -1;
  if (cambio4 > 6 || cambio4 < -6) velCambio4 = velCambio4 * -1;
  if (cambio5 > 10 || cambio5 < -10) velCambio5 = velCambio5 * -1;
  if (cambio6 > 6 || cambio6 < -6) velCambio6 = velCambio6 * -1;
  if (cambioAro > 12 || cambioAro < -12) velCambioAro = velCambioAro * -1;

  if (mostrarTriangulos == true) {
    cambioTriangulo = cambioTriangulo + velocidadTriangulo;
    if (cambioTriangulo > 15) velocidadTriangulo = -0.2;
    if (cambioTriangulo < -15) velocidadTriangulo = 0.2;
  }

  noStroke();

  if (cambiarFormasIzq == true) {
    fill(245, 150, 70, 180);
  } else {
    fill(124, 88, 125, 180);
  }
  ellipse(165, 285, 255 + cambio1, 255 + cambio1);
  ellipse(315, 145, 165 + cambio2, 165 + cambio2);
  ellipse(45, 145, 90 + cambio3, 90 + cambio3);
  ellipse(160, 70, 55 + cambio4, 55 + cambio4);

  if (cambiarFormasIzq == true) {
    fill(80, 30, 70, 230);
  } else {
    fill(15, 19, 39, 230);
  }
  ellipse(165, 285, 170 + cambio1, 170 + cambio1);
  ellipse(315, 145, 105 + cambio2, 105 + cambio2);
  ellipse(45, 145, 55 + cambio3, 55 + cambio3);
  ellipse(160, 70, 35 + cambio4, 35 + cambio4);

  if (cambiarFormasIzq == true) {
    fill(255, 220, 120);
  } else {
    fill(220, 225, 220);
  }
  ellipse(165, 290, 85 + cambio1, 85 + cambio1);

  if (sonidoVJ.isPlaying()) {
    dibujarVisualizador(165, 290, 65, 80, 30, 70);
  }

  if (mostrarTriangulos == true) {
    if (cambiarFormasIzq == true) {
      fill(255, 90, 90, 180 + cambioTriangulo * 4);
    } else {
      fill(12, 14, 32, 180 + cambioTriangulo * 4);
    }
    triangle(
      285,
      190,
      200 - cambioTriangulo,
      325 + cambioTriangulo,
      370 + cambioTriangulo,
      325 + cambioTriangulo,
    );
  }

  if (cambiarFormasDer == true) {
    fill(245, 150, 70, 180);
  } else {
    fill(124, 88, 125, 180);
  }
  ellipse(1035, 285, 255 + cambio1, 255 + cambio1);
  ellipse(885, 145, 165 + cambio2, 165 + cambio2);
  ellipse(1155, 145, 90 + cambio3, 90 + cambio3);
  ellipse(1040, 70, 55 + cambio4, 55 + cambio4);

  if (cambiarFormasDer == true) {
    fill(80, 30, 70, 230);
  } else {
    fill(15, 19, 39, 230);
  }
  ellipse(1035, 285, 170 + cambio1, 170 + cambio1);
  ellipse(885, 145, 105 + cambio2, 105 + cambio2);
  ellipse(1155, 145, 55 + cambio3, 55 + cambio3);
  ellipse(1040, 70, 35 + cambio4, 35 + cambio4);

  if (cambiarFormasDer == true) {
    fill(255, 220, 120);
  } else {
    fill(220, 225, 220);
  }
  ellipse(1035, 290, 85 + cambio1, 85 + cambio1);

  if (sonidoVJ.isPlaying()) {
    dibujarVisualizador(1035, 290, 65, 80, 30, 70);
  }

  if (cambiarFormasDer == true) {
    fill(255, 90, 90);
  } else {
    fill(12, 14, 32);
  }
  ellipse(1120, 95, 125 + cambio5, 125 + cambio5);

  if (cambiarFormasDer == true) {
    fill(245, 150, 70, 180);
  } else {
    fill(124, 88, 125, 180);
  }
  ellipse(805, 95, 55 + cambio6, 55 + cambio6);

  if (cambiarFormasDer == true) {
    fill(80, 30, 70, 230);
  } else {
    fill(15, 19, 39, 230);
  }
  ellipse(805, 95, 35 + cambio6, 35 + cambio6);

  if (mostrarTriangulos == true) {
    if (cambiarFormasDer == true) {
      fill(255, 90, 90, 180 + cambioTriangulo * 4);
    } else {
      fill(12, 14, 32, 180 + cambioTriangulo * 4);
    }
    triangle(
      870 - cambioTriangulo,
      170,
      1100 + cambioTriangulo,
      170,
      985,
      330 + cambioTriangulo,
    );
  }

  if (mostrarLineas == true) {
    strokeWeight(2);
    if (lineasRojasIzq == true) {
      stroke(255, 60, 60, 180);
    } else {
      stroke(255, 180);
    }
    line(0, 0, random(360, 520), random(420, 560));
    line(0, 0, random(390, 550), random(430, 570));
    line(0, 0, random(420, 570), random(440, 580));

    if (lineasRojasDer == true) {
      stroke(255, 60, 60, 180);
    } else {
      stroke(255, 180);
    }
    line(1200, 0, random(650, 820), random(420, 560));
    line(1200, 0, random(620, 790), random(430, 570));
    line(1200, 0, random(600, 760), random(440, 580));
  }

  if (nivelOscuridad > 0) {
    blendMode(MULTIPLY);
    noStroke();
    fill(255 - nivelOscuridad);
    rect(0, 0, width, height);
    blendMode(BLEND);
  }
}

function haySonidoActivo() {
  return atw.isPlaying() || omt.isPlaying() || sonidoVJ.isPlaying();
}

function getNombreSonando() {
  if (atw.isPlaying()) return "AROUND THE WORLD";
  if (omt.isPlaying()) return "ONE MORE TIME";
  if (sonidoVJ.isPlaying()) return "GIORGIO BY MORODER";
  return "";
}

function mousePressed() {
  userStartAudio();
  inicializarFFT();

  if (vista === "bienvenida") {
    if (!animacionIniciada) {
      animacionIniciada = true;
      musicaEntrada.play();
    } else if (animacionTerminada) {
      if (mouseX > 330 && mouseX < 440 && mouseY > 420 && mouseY < 530) {
        vista = "reglas";
      }
    }
  }

  if (vista === "vj") {
    if (mouseX > 535 && mouseX < 645 && mouseY > 616 && mouseY < 642) {
      if (sonidoVJ.isPlaying()) {
        sonidoVJ.stop();
      } else {
        sonidoVJ.play();
      }
    }
    if (mouseX > 557 && mouseX < 579 && mouseY > 652 && mouseY < 674) {
      moverCirculos = !moverCirculos;
    }
    if (mouseX > 621 && mouseX < 643 && mouseY > 652 && mouseY < 674) {
      mostrarTriangulos = !mostrarTriangulos;
    }
    if (mouseX > 589 && mouseX < 611 && mouseY > 685 && mouseY < 707) {
      mostrarLineas = !mostrarLineas;
    }
    if (mouseX > 421 && mouseX < 443 && mouseY > 663 && mouseY < 687) {
      cambiarPantallaIzq = !cambiarPantallaIzq;
    }
    if (mouseX > 730 && mouseX < 752 && mouseY > 663 && mouseY < 687) {
      cambiarPantallaDer = !cambiarPantallaDer;
    }
    if (mouseX > 391 && mouseX < 413 && mouseY > 705 && mouseY < 729) {
      cambiarFormasIzq = !cambiarFormasIzq;
    }
    if (mouseX > 700 && mouseX < 722 && mouseY > 705 && mouseY < 729) {
      cambiarFormasDer = !cambiarFormasDer;
    }
    if (mouseX > 451 && mouseX < 473 && mouseY > 705 && mouseY < 729) {
      lineasRojasIzq = !lineasRojasIzq;
    }
    if (mouseX > 760 && mouseX < 782 && mouseY > 705 && mouseY < 729) {
      lineasRojasDer = !lineasRojasDer;
    }
  }

  if (vista === "dj") {
    let dentroIzq = dist(mouseX, mouseY, platoIzq.x, platoIzq.y) < 45;
    let dentroDer = dist(mouseX, mouseY, platoDer.x, platoDer.y) < 45;

    if (dentroIzq) {
      if (atw.isPlaying()) {
        atw.pause();
      } else {
        atw.play();
      }
    }

    if (dentroDer) {
      if (omt.isPlaying()) {
        omt.pause();
      } else {
        omt.play();
      }
    }

    if (dist(mouseX, mouseY, 470, 565) < 10) harder.play();
    if (dist(mouseX, mouseY, 510, 565) < 10) better.play();
    if (dist(mouseX, mouseY, 550, 565) < 10) faster.play();
    if (dist(mouseX, mouseY, 470, 585) < 10) stronger.play();

    if (
      mouseX > botonSupIzq.x &&
      mouseX < botonSupIzq.x + botonSupIzq.w &&
      mouseY > botonSupIzq.y &&
      mouseY < botonSupIzq.y + botonSupIzq.h
    ) {
      atw.rate(0.5);
    }
    if (
      mouseX > botonSupDer.x &&
      mouseX < botonSupDer.x + botonSupDer.w &&
      mouseY > botonSupDer.y &&
      mouseY < botonSupDer.y + botonSupDer.h
    ) {
      atw.rate(1);
    }
    if (
      mouseX > botonSupIzq1.x &&
      mouseX < botonSupIzq1.x + botonSupIzq1.w &&
      mouseY > botonSupIzq1.y &&
      mouseY < botonSupIzq1.y + botonSupIzq1.h
    ) {
      omt.rate(0.5);
    }
    if (
      mouseX > botonSupDer1.x &&
      mouseX < botonSupDer1.x + botonSupDer1.w &&
      mouseY > botonSupDer1.y &&
      mouseY < botonSupDer1.y + botonSupDer1.h
    ) {
      omt.rate(1);
    }
  }
}

function acelerarTodo() {
  velocidadActiva = true;
  velocidadCascos = valoresOriginales.velocidadCascos * multiplicadorVelocidad;
  velocidad1 = valoresOriginales.velocidad1 * multiplicadorVelocidad;
  velocidad2 = valoresOriginales.velocidad2 * multiplicadorVelocidad;
  velocidadTriangulo =
    valoresOriginales.velocidadTriangulo * multiplicadorVelocidad;
  velCambio1 = valoresOriginales.velCambio1 * multiplicadorVelocidad;
  velCambio2 = valoresOriginales.velCambio2 * multiplicadorVelocidad;
  velCambio3 = valoresOriginales.velCambio3 * multiplicadorVelocidad;
  velCambio4 = valoresOriginales.velCambio4 * multiplicadorVelocidad;
  velCambio5 = valoresOriginales.velCambio5 * multiplicadorVelocidad;
  velCambio6 = valoresOriginales.velCambio6 * multiplicadorVelocidad;
  velCambioAro = valoresOriginales.velCambioAro * multiplicadorVelocidad;

  let sonidos = [
    musicaEntrada,
    sonidoVJ,
    atw,
    omt,
    better,
    faster,
    stronger,
    harder,
  ];
  for (let s of sonidos) {
    if (s && s.rate) s.rate(multiplicadorVelocidad);
  }
}

function restaurarVelocidadOriginal() {
  velocidadActiva = false;
  velocidadCascos = valoresOriginales.velocidadCascos;
  velocidad1 = valoresOriginales.velocidad1;
  velocidad2 = valoresOriginales.velocidad2;
  velocidadTriangulo = valoresOriginales.velocidadTriangulo;
  velCambio1 = valoresOriginales.velCambio1;
  velCambio2 = valoresOriginales.velCambio2;
  velCambio3 = valoresOriginales.velCambio3;
  velCambio4 = valoresOriginales.velCambio4;
  velCambio5 = valoresOriginales.velCambio5;
  velCambio6 = valoresOriginales.velCambio6;
  velCambioAro = valoresOriginales.velCambioAro;

  let sonidos = [
    musicaEntrada,
    sonidoVJ,
    atw,
    omt,
    better,
    faster,
    stronger,
    harder,
  ];
  for (let s of sonidos) {
    if (s && s.rate) s.rate(1);
  }
}

function keyPressed() {
  userStartAudio();
  inicializarFFT();

  if (vista === "bienvenida") {
    if (!animacionIniciada) {
      animacionIniciada = true;
      musicaEntrada.play();
    } else if (animacionTerminada) {
      vista = "reglas";
    }
  } else if (vista === "reglas") {
    if (key === "D" || key === "d") {
      vista = "dj";
      musicaEntrada.stop();
    } else if (key === "V" || key === "v") {
      vista = "vj";
      musicaEntrada.stop();
    }
  } else if (vista === "dj") {
    if (key === "H" || key === "h") acelerarTodo();
    if (key === "S" || key === "s") restaurarVelocidadOriginal();
    if (key === "V" || key === "v") {
      vista = "vj";
      atw.stop();
      omt.stop();
      restaurarVelocidadOriginal();
    }
    if (keyCode === UP_ARROW) {
      modoManual = true;
      momento = "dia";
    }
    if (keyCode === DOWN_ARROW) {
      modoManual = true;
      momento = "noche";
    }
  } else if (vista === "vj") {
    if (key === "D" || key === "d") {
      vista = "dj";
      sonidoVJ.pause();
      restaurarVelocidadOriginal();
    }
    if (keyCode === UP_ARROW) {
      modoManual = true;
      momento = "dia";
    }
    if (keyCode === DOWN_ARROW) {
      modoManual = true;
      momento = "noche";
    }
    if (key === "l" || key === "L") {
      nivelOscuridad = nivelOscuridad + 40;
      if (nivelOscuridad > 200) nivelOscuridad = 200;
    }
    if (key === "k" || key === "K") {
      nivelOscuridad = nivelOscuridad - 40;
      if (nivelOscuridad < 0) nivelOscuridad = 0;
    }
  }
}
