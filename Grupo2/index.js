let publicoX = [];
let publicoY = [];
let modo = "atardecer";

let imgAtardecer, imgDia, imgNoche;
let imgPasarelaAtardecer, imgPasarelaDia, imgPasarelaNoche;
let consolaVJ, consolaDJ;
let switzer;
let imgDiscoCruel;
let imgDiscoReputation;
let anguloCruel = 0;
let anguloReputation = 0;
let scratchActivo = 0;

let cancionCruel, cancionGetaway;
let fxAirhorn, fxReadyForIt, fxScratch, fxEras, fxCrowd;

let crossfade = 0.5;
let reproduciendoCruel = false;
let reproduciendoGetaway = false;

let vistaActual = "vj";

let progresoAnillos = [
  0, 0.083, 0.166, 0.25, 0.33, 0.416, 0.5, 0.583, 0.66, 0.75, 0.83, 0.916,
];
let angulosPulso = [0, 60, 120, 180, 240, 300];

let colorPublico = "#c5a6ce";

let amplitud;
let fft;
let visualAnimado = "triangular";
let bassEnergy = 0;

let fftCruel;
let fftGetaway;
let mezclador;
let reverb;

let particulasHumo = [];
let humoActivo = false;

let flickerActivo = false;
let glitchActivo = false;
let estrellas = [];

let balladActivo = false;
let hypeActivo = false;

function preload() {
  imgAtardecer = loadImage("Assets/Atardecer.png");
  imgDia = loadImage("Assets/Dia.png");
  imgNoche = loadImage("Assets/Noche.png");

  imgPasarelaAtardecer = loadImage("Assets/PasarelaAtardecer.png");
  imgPasarelaDia = loadImage("Assets/PasarelaDia.png");
  imgPasarelaNoche = loadImage("Assets/PasarelaNoche.png");

  consolaVJ = loadImage("Assets/vj.png");
  consolaDJ = loadImage("Assets/dj.png");

  imgDiscoCruel = loadImage("Assets/discoCruel.png");
  imgDiscoReputation = loadImage("Assets/discoReputation.png");

  switzer = loadFont("Assets/Switzer-Medium.otf");

  cancionCruel = loadSound("Assets/CruelSummer.mp3");
  cancionGetaway = loadSound("Assets/GetawayCar.mp3");

  fxAirhorn = loadSound("Assets/Airhorn.mp3");
  fxReadyForIt = loadSound("Assets/ReadyForIt.mp3");
  fxScratch = loadSound("Assets/Scratch.mp3");
  fxEras = loadSound("Assets/ErasTour.mp3");
  fxCrowd = loadSound("Assets/Crowd.mp3");
}

function setup() {
  createCanvas(1200, 800);

  for (let i = 0; i < 2500; i++) {
    publicoX.push(random(0, 1200));
    publicoY.push(random(380, 800));
  }

  angleMode(DEGREES);
  textAlign(CENTER);
  rectMode(CENTER);
  textFont(switzer);

  actualizarVolumenes();

  fxEras.setVolume(2);
  fxReadyForIt.setVolume(2);
  fxScratch.setVolume(2);

  mezclador = new p5.Gain();
  mezclador.connect();

  cancionCruel.disconnect();
  cancionCruel.connect(mezclador);

  cancionGetaway.disconnect();
  cancionGetaway.connect(mezclador);

  fft = new p5.FFT();
  fft.setInput(mezclador);
  reverb = new p5.Reverb();

  amplitud = new p5.Amplitude();
  amplitud.setInput(mezclador);

  for (let i = 0; i < 30; i++) {
    particulasHumo.push(crearParticulaHumo(520));
    particulasHumo.push(crearParticulaHumo(680));
  }
}

function draw() {
  background(0);

  // Público
  noStroke();
  fill(colorPublico);
  for (let i = 0; i < publicoX.length; i++) {
    let x = publicoX[i];
    let y;
    if (reproduciendoCruel || reproduciendoGetaway) {
      if ((frameCount + i) % 20 < 10) {
        y = publicoY[i] - 3;
      } else {
        y = publicoY[i] + 3;
      }
    } else {
      y = publicoY[i];
    }

    let tamano;
    if (y > 700) {
      tamano = 3;
    }
    if (y > 600 && y < 700) {
      tamano = 2.5;
    }
    if (y > 500 && y < 600) {
      tamano = 2;
    }
    if (y > 400 && y < 500) {
      tamano = 1.5;
    }
    if (y > 300 && y < 400) {
      tamano = 1;
    }
    circle(x, y, tamano);
  }

  // Cambio de vistas
  if (vistaActual == "vj") {
    mostrarVistaVJ();
  }

  if (vistaActual == "dj") {
    mostrarVistaDJ();
  }

  push();
  fill(0);
  if (dist(mouseX, mouseY, 1130, 735) < 60) {
    stroke("#db86bf");
    strokeWeight(2);
  } else {
    stroke("#6d4661");
    strokeWeight(1);
  }
  circle(1130, 735, 60);
  pop();

  push();
  noStroke();
  fill("#db86bf");
  textSize(15);

  if (vistaActual == "vj") {
    text("DJ", 1130, 740);
  } else {
    text("VJ", 1130, 740);
  }
  pop();

  // Scratch
  if (scratchActivo > 0) {
    scratchActivo--;
  }

  // Bajos
  bassEnergy = fft.getEnergy("bass");
}

// Pantallas
function dibujarPantallaCentral() {
  let espectro = fft.analyze();

  push();
  rectMode(CORNER);

  let x = 490;
  let y = 530;
  let ancho = 300;
  let alto = 235;

  noFill();
  stroke(255, 150);
  strokeWeight(2);

  beginShape();
  for (let i = 0; i <= ancho; i += 5) {
    let indice = floor(map(i, 0, ancho, 0, espectro.length));
    let valor = espectro[indice];
    let alturaOnda = map(valor, 0, 255, 0, alto / 2);
    vertex(x + i, y + alto / 2 - alturaOnda);
  }
  endShape();

  pop();
}

// Vista VJ
function mostrarVistaVJ() {
  let imgFondo;
  let imgPasarela;

  if (modo == "atardecer") {
    imgFondo = imgAtardecer;
    imgPasarela = imgPasarelaAtardecer;
  }

  if (modo == "dia") {
    imgFondo = imgDia;
    imgPasarela = imgPasarelaDia;
  }

  if (modo == "noche") {
    imgFondo = imgNoche;
    imgPasarela = imgPasarelaNoche;
  }

  fill(0);
  rect(0, 0, 1200, 380);
  image(imgPasarela, 470, 335, 260, 200);
  push();
  scale(0.3);
  image(imgFondo, 38, 25);
  pop();

  push();
  image(consolaVJ, width / 2 - 333, height - 310);
  pop();

  // Botones VJ
  fill(255);
  dibujarBoton(511, 720, "", 50, 24, false);
  dibujarBoton(572, 720, "", 50, 24, glitchActivo);
  dibujarBoton(634, 720, "", 50, 24, false);
  dibujarBoton(698, 720, "", 50, 24, flickerActivo);
  dibujarBoton(760, 720, "", 50, 24, humoActivo);

  dibujarBoton(375, 558, "", 143, 42, visualAnimado == "triangular");
  dibujarBoton(375, 605, "", 143, 42, visualAnimado == "circular");
  dibujarBoton(374.5, 656, "", 143, 42, visualAnimado == "fft");

  dibujarBotonModo(327, 722, "dia");
  dibujarBotonModo(376, 722, "atardecer");
  dibujarBotonModo(422, 722, "noche");

  if (visualAnimado == "triangular") {
    dibujarAnimacionAmplitud(271 / 2, 10 + 382 / 2);
    dibujarAnimacionAmplitud(1047, 202);
  }

  if (visualAnimado == "circular") {
    dibujarAnimacionCircular(271 / 2, 10 + 382 / 2);
    dibujarAnimacionCircular(1047, 202);
  }

  if (visualAnimado == "fft") {
    dibujarAnimacionFFT(13, 10);
    dibujarAnimacionFFT(927, 10);
  }

  dibujarFlicker();
  dibujarHumo();
  dibujarGlitch();
  dibujarEstrellas();
  dibujarPantallaCentral();
}

// Vista DJ
function mostrarVistaDJ() {
  push();
  image(consolaDJ, width / 2 - 580, height / 2 - 300);
  imageMode(CORNER);
  pop();

  push();
  imageMode(CENTER);
  translate(242, 434);
  if (reproduciendoCruel) {
    if (scratchActivo > 0 && crossfade < 1) {
      anguloCruel += random(-15, 15);
    } else {
      anguloCruel += 1;
    }
  }
  rotate(anguloCruel);
  image(imgDiscoCruel, 0, 0);
  pop();

  push();
  imageMode(CENTER);
  translate(962, 434);
  if (reproduciendoGetaway) {
    if (scratchActivo > 0 && crossfade > 0) {
      anguloReputation += random(-15, 15);
    } else {
      anguloReputation += 1;
    }
  }
  rotate(anguloReputation);
  image(imgDiscoReputation, 0, 0);
  pop();

  imageMode(CORNER);

  // Botones DJ
  dibujarCrossfade();

  dibujarBoton(480, 305, "AIRHORN", 70, 35, false);
  dibujarBoton(563, 305, "READY", 70, 35, false);
  dibujarBoton(647, 305, "SCRATCH", 70, 35, false);
  dibujarBoton(731, 305, "ERAS", 70, 35, false);

  dibujarBotonPlayPause(287, 640, 65, 35);
  dibujarBotonPlayPause(1006, 640, 65, 35);

  dibujarBotonPlayModo(215, 206, 275, 238, reproduciendoCruel);
  dibujarBotonPlayModo(930, 206, 993, 240, reproduciendoGetaway);

  dibujarBotonCue(198, 640, 65, 35);
  dibujarBotonCue(918, 640, 65, 35);

  dibujarBoton(488.5, 570.5, "BALLAD", 93, 33, balladActivo);
  dibujarBoton(604.5, 570.5, "HYPE", 93, 33, hypeActivo);
  dibujarBoton(717.5, 570.5, "CHEERS", 93, 33, false);

  // Crossfade
  let volCruel = 1 - crossfade;
  let volGetaway = crossfade;

  if (fftCruel && fftGetaway) {
    dibujarOndaFFT(fftCruel, 443, 364, 320, 100, "#db86bf", 1);
    dibujarOndaFFT(fftGetaway, 443, 454, 320, 100, "#ffffff", 1);
  } else {
    dibujarOndaFFT(fft, 443, 364, 320, 100, "#db86bf", volCruel);
    dibujarOndaFFT(fft, 443, 454, 320, 100, "#ffffff", volGetaway);
  }
}

function actualizarVolumenes() {
  let volCruel = 1 - crossfade;
  let volGetaway = crossfade;

  cancionCruel.setVolume(volCruel);
  cancionGetaway.setVolume(volGetaway);
}

function dibujarCrossfade() {
  let xIzq = 450;
  let xDer = 755;
  let y = 225;

  if (mouseIsPressed) {
    if (mouseY > y - 15 && mouseY < y + 15) {
      if (mouseX > xIzq - 10 && mouseX < xDer + 10) {
        crossfade = (mouseX - xIzq) / (xDer - xIzq);

        if (crossfade < 0) {
          crossfade = 0;
        }
        if (crossfade > 1) {
          crossfade = 1;
        }

        actualizarVolumenes();
      }
    }
  }

  let xPerilla = xIzq + crossfade * (xDer - xIzq);

  noStroke();
  fill("#db86bf");
  circle(xPerilla, y, 12);
}

// Creación de botones con hover
function dibujarBoton(cx, cy, etiqueta, ancho, alto, activo) {
  let hover = false;

  if (mouseX > cx - ancho / 2 && mouseX < cx + ancho / 2) {
    if (mouseY > cy - alto / 2 && mouseY < cy + alto / 2) {
      hover = true;
    }
  }

  noFill();
  if (hover || activo) {
    stroke(219, 134, 191, 255);
    strokeWeight(2);
  } else {
    stroke("#6d4661");
    strokeWeight(1);
  }
  rect(cx, cy, ancho, alto);

  noStroke();
  fill(255);
  textSize(8);
  text(etiqueta, cx, cy);
}

function dibujarBotonPlayPause(cx, cy, ancho, alto) {
  let hover = false;

  if (mouseX > cx - ancho / 2 && mouseX < cx + ancho / 2) {
    if (mouseY > cy - alto / 2 && mouseY < cy + alto / 2) {
      hover = true;
    }
  }

  noFill();
  if (hover) {
    stroke(219, 134, 191, 255);
    strokeWeight(2);
  } else {
    stroke("#6d4661");
    strokeWeight(1);
  }
  rect(cx, cy, ancho, alto);

  noStroke();
  fill(255);
  textSize(8);
  text("RESET", cx, cy);
}

function dibujarBotonCue(cx, cy, ancho, alto) {
  let hover = false;

  if (mouseX > cx - ancho / 2 && mouseX < cx + ancho / 2) {
    if (mouseY > cy - alto / 2 && mouseY < cy + alto / 2) {
      hover = true;
    }
  }

  noFill();
  if (hover) {
    stroke(219, 134, 191, 255);
    strokeWeight(2);
  } else {
    stroke("#6d4661");
    strokeWeight(1);
  }
  rect(cx, cy, ancho, alto);

  noStroke();
  fill(255);
  textSize(8);
  text("CHORUS", cx, cy);
}

function dibujarBotonModo(cx, cy, nuevoModo) {
  let hover = false;

  if (mouseX > cx - 15 && mouseX < cx + 15) {
    if (mouseY > cy - 10 && mouseY < cy + 10) {
      hover = true;
    }
  }

  if (hover || modo == nuevoModo) {
    push();
    blendMode(MULTIPLY);
    noStroke();
    fill(219, 134, 191, 255);
    rect(cx, cy, 30, 20);
    blendMode(BLEND);
    pop();
  }
}

function dibujarBotonPlayModo(x1, y1, x2, y2, estaReproduciendo) {
  let hover = mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2;

  push();
  blendMode(MULTIPLY);
  noStroke();
  rectMode(CORNER);

  if (estaReproduciendo || hover) {
    fill(219, 134, 191, 255);
    rect(x1, y1, x2 - x1, y2 - y1);
  }

  blendMode(BLEND);
  rectMode(CENTER);
  pop();
}

function mousePressed() {
  // Activación de FFT
  if (!fftCruel) {
    fftCruel = new p5.FFT();
    fftCruel.setInput(cancionCruel);
    fftGetaway = new p5.FFT();
    fftGetaway.setInput(cancionGetaway);
  }

  if (dist(mouseX, mouseY, 1130, 735) < 60) {
    if (vistaActual == "vj") {
      vistaActual = "dj";
    } else {
      vistaActual = "vj";
    }
  }

  if (dentroDe(mouseX, mouseY, 245, 222, 60, 32)) {
    if (!reproduciendoCruel) {
      cancionCruel.play();
      actualizarVolumenes();
      reproduciendoCruel = true;
    } else {
      cancionCruel.pause();
      reproduciendoCruel = false;
    }
  }

  if (dentroDe(mouseX, mouseY, 961.5, 223, 63, 34)) {
    if (!reproduciendoGetaway) {
      cancionGetaway.play();
      actualizarVolumenes();
      reproduciendoGetaway = true;
    } else {
      cancionGetaway.pause();
      reproduciendoGetaway = false;
    }
  }

  if (vistaActual == "vj") {
    if (dentroDe(mouseX, mouseY, 511, 720, 50, 24)) {
      estrellas.push(crearEstrella());
    }
    if (dentroDe(mouseX, mouseY, 572, 720, 50, 24)) {
      glitchActivo = !glitchActivo;
    }
    if (dentroDe(mouseX, mouseY, 634, 720, 50, 24)) {
      if (colorPublico == "#0041c2") {
        colorPublico = "#db86bf";
      } else if (colorPublico == "#db86bf") {
        colorPublico = "#ffffff";
      } else {
        colorPublico = "#0041c2";
      }
    }
    if (dentroDe(mouseX, mouseY, 698, 720, 50, 24)) {
      flickerActivo = !flickerActivo;
    }
    if (dentroDe(mouseX, mouseY, 760, 720, 50, 24)) {
      particulasHumo = [];
      for (let i = 0; i < 30; i++) {
        particulasHumo.push(crearParticulaHumo(520));
        particulasHumo.push(crearParticulaHumo(680));
      }
      humoActivo = true;
    }
    if (dentroDe(mouseX, mouseY, 327, 722, 30, 20)) {
      modo = "dia";
    }
    if (dentroDe(mouseX, mouseY, 376, 722, 30, 20)) {
      modo = "atardecer";
    }
    if (dentroDe(mouseX, mouseY, 422, 722, 30, 20)) {
      modo = "noche";
    }
    if (dentroDe(mouseX, mouseY, 375, 558, 143, 42)) {
      visualAnimado = "triangular";
    }
    if (dentroDe(mouseX, mouseY, 375, 605, 143, 42)) {
      visualAnimado = "circular";
    }
    if (dentroDe(mouseX, mouseY, 374.5, 656, 143, 42)) {
      visualAnimado = "fft";
    }
  }

  if (vistaActual == "dj") {
    if (dentroDe(mouseX, mouseY, 480, 305, 70, 35)) {
      fxAirhorn.play();
    }
    if (dentroDe(mouseX, mouseY, 563, 305, 70, 35)) {
      fxReadyForIt.play();
    }
    if (dentroDe(mouseX, mouseY, 647, 305, 70, 35)) {
      fxScratch.play();
      scratchActivo = 40;
    }
    if (dentroDe(mouseX, mouseY, 731, 305, 70, 35)) {
      fxEras.play();
    }

    if (dentroDe(mouseX, mouseY, 287, 640, 110, 35)) {
      cancionCruel.stop();
      anguloCruel = 0;
      if (reproduciendoCruel) {
        cancionCruel.play();
        actualizarVolumenes();
      }
    }
    if (dentroDe(mouseX, mouseY, 1006, 640, 110, 35)) {
      cancionGetaway.stop();
      anguloReputation = 0;
      if (reproduciendoGetaway) {
        cancionGetaway.play();
        actualizarVolumenes();
      }
    }

    if (dentroDe(mouseX, mouseY, 198, 640, 90, 35)) {
      if (reproduciendoCruel) {
        cancionCruel.jump(28);
      }
    }
    if (dentroDe(mouseX, mouseY, 918, 640, 90, 35)) {
      if (reproduciendoGetaway) {
        cancionGetaway.jump(37);
      }
    }

    // Modo Ballad
    if (dentroDe(mouseX, mouseY, 488.5, 570.5, 93, 33)) {
      balladActivo = !balladActivo;
      hypeActivo = false;
      if (balladActivo) {
        cancionCruel.rate(0.8);
        cancionGetaway.rate(0.8);
        glitchActivo = false;
        flickerActivo = false;
        humoActivo = false;
        modo = "noche";
        colorPublico = "#0041c2";
        visualAnimado = "circular";
        reverb.process(cancionCruel, 4, 2);
        reverb.process(cancionGetaway, 4, 2);
      } else {
        cancionCruel.rate(1);
        cancionGetaway.rate(1);
        colorPublico = "#c5a6ce";
        reverb.disconnect();
        cancionCruel.disconnect();
        cancionCruel.connect(mezclador);
        cancionGetaway.disconnect();
        cancionGetaway.connect(mezclador);
      }
    }

    // Modo Hype
    if (dentroDe(mouseX, mouseY, 604.5, 570.5, 93, 33)) {
      hypeActivo = !hypeActivo;
      balladActivo = false;
      if (hypeActivo) {
        cancionCruel.rate(1);
        cancionGetaway.rate(1);
        if (reproduciendoCruel) {
          cancionCruel.jump(28);
        }
        if (reproduciendoGetaway) {
          cancionGetaway.jump(37);
        }
        actualizarVolumenes();
        glitchActivo = true;
        flickerActivo = true;
        modo = "atardecer";
        fxAirhorn.play();
        estrellas.push(crearEstrella());
        particulasHumo.push(crearParticulaHumo(520));
        particulasHumo.push(crearParticulaHumo(680));
        humoActivo = true;
        colorPublico = "#db86bf";
      } else {
        glitchActivo = false;
        flickerActivo = false;
        humoActivo = false;
        colorPublico = "#c5a6ce";
      }
    }

    if (dentroDe(mouseX, mouseY, 717.5, 570.5, 93, 33)) {
      fxCrowd.play();
    }
  }
}

function dentroDe(px, py, cx, cy, ancho, alto) {
  if (px > cx - ancho / 2 && px < cx + ancho / 2) {
    if (py > cy - alto / 2 && py < cy + alto / 2) {
      return true;
    }
  }
  return false;
}

// Animaciones responsive
function dibujarAnimacionAmplitud(vjx, vjy) {
  let nivel = map(bassEnergy, 0, 600, 0, 1);

  push();
  translate(vjx, vjy);
  noFill();
  angleMode(DEGREES);

  let radioBase = 2;
  let cantidadAnillos = 4;

  for (let i = 0; i < cantidadAnillos; i++) {
    angulosPulso[i] += 1.5;

    if (angulosPulso[i] > 360) {
      angulosPulso[i] = 0;
    }

    let radio = radioBase + i * 22 + nivel * 100;

    let opacidad = map(i, 0, cantidadAnillos - 1, 255, 60);

    stroke(255, opacidad);
    strokeWeight(2);
    circle(0, 0, radio * 2);
  }

  let brilloCentral = map(nivel, 0, 0.5, 0, 255);

  noStroke();
  fill(255, brilloCentral);
  circle(0, 0, 5 + nivel * 60);

  pop();
}

function dibujarAnimacionCircular(cx, cy) {
  let nivel = amplitud.getLevel();

  push();
  translate(cx, cy);
  noStroke();
  fill(255);
  angleMode(DEGREES);

  let radioMaximo = 80;
  let puntosPorAnillo = 24;

  for (let a = 0; a < progresoAnillos.length; a++) {
    let velocidad = nivel * 0.08;
    progresoAnillos[a] += velocidad;

    if (progresoAnillos[a] > 1) {
      progresoAnillos[a] = 0;
    }

    let radioBase = progresoAnillos[a] * radioMaximo;
    let extra = nivel * 80;
    let radio = radioBase + extra;

    let opacidad = map(progresoAnillos[a], 0, 1, 255, 0);

    fill(255, opacidad);

    for (let p = 0; p < puntosPorAnillo; p++) {
      let angulo = (360 / puntosPorAnillo) * p;
      let x = cos(angulo) * radio;
      let y = sin(angulo) * radio;
      circle(x, y, 2);
    }
  }

  pop();
}

function dibujarAnimacionFFT(cx, cy) {
  let espectro = fft.analyze();

  push();
  rectMode(CORNER);
  translate(cx, cy);
  noStroke();
  fill(255);
  blendMode(OVERLAY);

  let anchoZona = 255;
  let altoZona = 370;
  let cantidadBarras = 25;
  let anchoBarra = anchoZona / cantidadBarras;

  for (let i = 0; i < cantidadBarras; i++) {
    let indiceEspectro = floor(map(i, 0, cantidadBarras, 0, espectro.length));
    let valorFrecuencia = espectro[indiceEspectro];

    let altoBarra = map(valorFrecuencia, 0, 255, 0, altoZona);

    let x = i * anchoBarra;
    let y = altoZona - altoBarra;

    rect(x, y, anchoBarra - 1, altoBarra);
  }
  blendMode(BLEND);
  pop();
}

// Efectos visuales
function crearParticulaHumo(xBase) {
  return {
    x: xBase,
    y: 380,
    tamano: random(10, 30),
    velocidad: random(0.3, 1),
  };
}

function dibujarHumo() {
  if (!humoActivo) {
    return;
  }

  noStroke();

  for (let i = particulasHumo.length - 1; i >= 0; i--) {
    let p = particulasHumo[i];

    p.y -= p.velocidad;

    let opacidad = map(p.y, 380, 280, 100, 0);
    fill(255, 255, 255, opacidad);
    circle(p.x, p.y, p.tamano);

    if (p.y < 280) {
      particulasHumo.splice(i, 1);
    }
  }

  if (particulasHumo.length == 0) {
    humoActivo = false;
  }
}

function dibujarFlicker() {
  if (!flickerActivo) {
    return;
  }

  if (frameCount % 6 < 3) {
    fill(0);
    noStroke();
    rectMode(CORNER);
    rect(0, 0, 1200, 380);
    rectMode(CENTER);
  }
}

function crearEstrella() {
  return {
    x: random(287, 912),
    y: random(0, 383),
    vx: random(-3, 3),
    vy: random(-3, 3),
    estela: [],
  };
}

function dibujarEstrellas() {
  noStroke();

  for (let i = 0; i < estrellas.length; i++) {
    let e = estrellas[i];

    e.estela.push({ x: e.x, y: e.y });

    if (e.estela.length > 30) {
      e.estela.splice(0, 1);
    }

    e.x += e.vx;
    e.y += e.vy;

    if (e.x < 290 || e.x > 908) {
      e.vx = e.vx * -1;
    }
    if (e.y < 10 || e.y > 378) {
      e.vy = e.vy * -1;
    }

    noStroke();
    for (let j = 0; j < e.estela.length; j++) {
      let punto = e.estela[j];
      let opacidad = map(j, 0, e.estela.length, 0, 255);
      fill(255, 255, 255, opacidad);
      circle(punto.x, punto.y, 2);
    }

    fill(255);
    circle(e.x, e.y, 3);
  }
}

function dibujarGlitch() {
  push();
  if (!glitchActivo) {
    return;
  }
  fill(random(0, 255), random(0, 255), random(0, 255));
  translate(random(0, width), random(0, 360));
  shearX(random(0, 15));
  rect(15, 20, random(5, 200), 20);
  pop();
}

function dibujarOndaFFT(fftObjetivo, x, y, ancho, alto, colorStroke, volumen) {
  let espectro = fftObjetivo.analyze();

  push();
  rectMode(CORNER);
  noFill();
  stroke(colorStroke);
  strokeWeight(2);

  beginShape();
  for (let i = 0; i <= ancho; i += 5) {
    let indice = floor(map(i, 0, ancho, 0, espectro.length));
    let valor = espectro[indice] * volumen;
    let alturaOnda = map(valor, 0, 255, 0, alto / 2);
    vertex(x + i, y + alto / 2 - alturaOnda);
  }
  endShape();

  pop();
}
