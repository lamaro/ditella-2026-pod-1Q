let faderIzqY;
let faderDerY;
let moviendoFaderIzq = false;
let moviendoFaderDer = false;
let marchaPrendida = false;
let orquestaPrendida = false;

let cabezaVader, mano, playImg, pauseImg, disco, fondo, loopImg;
let sfxMarcha, sfxOrquesta;
let dataSFX;

let botonesSFX = [];
let tamanioArray = 64;

let velocidadMarcha = 1;
let velocidadOrquesta = 1;

let rotacionCdMarcha = 0;
let rotacionCdOrquesta = 0;

let crossfaderX = 600;
let moviendoCrossfader = false;

function preloadDJ() {
  cabezaVader = loadImage("assets/img/cabeza.png");
  playImg = loadImage("assets/img/play.png");
  pauseImg = loadImage("assets/img/pause.png");
  disco = loadImage("assets/img/disco.png");
  fondo = loadImage("assets/img/fondo.png");
  loopImg = loadImage("assets/img/loop.png");
  mano = loadImage("assets/img/mano.png");

  dataSFX = loadJSON("data/sfx.json", function (data) {
    for (let i = 0; i < data.sfx.length; i++) {
      data.sfx[i].sonido = loadSound(data.sfx[i].archivo);
    }
  });

}

function setupDJ() {
  analizadorAmp = new p5.Amplitude();
  analizadorFFT = new p5.FFT();

  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  faderIzqY = 500;
  faderDerY = 500;

  botonesSFX = [];

  for (let i = 0; i < dataSFX.sfx.length; i++) {
    botonesSFX.push({
      nombre: dataSFX.sfx[i].nombre,
      sonido: dataSFX.sfx[i].sonido,
      activo: false,
      fft: new p5.FFT(0.8, tamanioArray),
      loopActivo: false,
    });
  }

  sfxMarcha = botonesSFX[4].sonido;
  sfxOrquesta = botonesSFX[5].sonido;

  analizadorAmp.setInput();
  analizadorFFT.setInput();

  for (let i = 0; i < botonesSFX.length; i++) {
    botonesSFX[i].sonido.onended(function () {
      botonesSFX[i].activo = false;
    });

    botonesSFX[i].fft.setInput();
  }
}

function drawDJ() {
  if (marchaPrendida == true) {
    rotacionCdMarcha += 0.07 * velocidadMarcha;
  }

  if (orquestaPrendida == true) {
    rotacionCdOrquesta += 0.07 * velocidadOrquesta;
  }

  background(60);
  consola();

  if (viaje == true) {
    efectoHyperDJ();
  }

  if (chill == true) {
    efectoLowLightsDJ();
  }
  
  push()
  scale(0.8)
  translate (width / 2 +580, height +100)
  image(mano, 0, 0);
  pop()
  image(cabezaVader, width / 2, height - 100);

}

function consola() {
  fill(60);
  stroke(10);
  strokeWeight(5);
  image(fondo, width / 2, height / 2);

  zonaIzquierda();
  zonaDerecha();

  pantallaBarras(width / 2, 145);
  mixerCentral();
}

function zonaIzquierda() {
  jogPrendido(width / 2 - 350, height / 2 - 130, 300, rotacionCdMarcha);

  deckIzquierdo(width / 2 - 350, height / 2 + 160);
}

function zonaDerecha() {
  jogPrendido(width / 2 + 350, height / 2 - 130, 300, rotacionCdOrquesta);

  deckDerecho(width / 2 + 350, height / 2 + 160);
}

function jogPrendido(x, y, d, rotacion) {
  push();

  translate(x, y);
  rotate(rotacion);

  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color(255, 0, 0);

  image(disco, 0, 0, d, d);

  pop();
}

function pantallaBarras(x, y) {
  fill(5);
  stroke(10);
  strokeWeight(5);
  rect(x, y, 330, 110, 6);

  for (let i = 0; i < botonesSFX.length; i++) {
    if (botonesSFX[i].activo == true && botonesSFX[i].sonido.isLoaded()) {
      botonesSFX[i].fft.analyze();
      let listaDeVolumenes = botonesSFX[i].fft.waveform();

      for (let j = 0; j < listaDeVolumenes.length; j++) {
        let alto = map(listaDeVolumenes[j], -1, 1, 5, 110);
        let separacionX = 300 / listaDeVolumenes.length;
        let posX = x - 148 + separacionX * j;

        stroke(random(60, 255), 0, 0);
        strokeWeight(5);
        line(posX, y + 40, posX, y + 40 - alto);
      }
    }
  }
}

function mixerCentral() {
  let x = width / 2;
  let y = height / 2 + 80;

  stroke(40);
  strokeWeight(2);
  line(x - 150, y - 210, x - 150, y + 280);
  line(x + 150, y - 210, x + 150, y + 280);

  dibujarFader(x - 100, y + 40, faderIzqY, "PITCH A");
  dibujarFader(x + 100, y + 40, faderDerY, "PITCH B");

  botonCentral(x, y + 35, "LOW\nLIGHTS", chill);
  botonCentral(x, y + 95, "HYPER\nMODE", viaje);

  crossfader();
}

function dibujarFader(x, y, posicionFader, textoFader) {
  stroke(35);
  strokeWeight(18);
  line(x, y - 100, x, y + 120);

  push();
  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = color(255, 0, 0);

  fill(0);
  stroke(235, 33, 46);
  strokeWeight(2);
  rect(x, posicionFader, 65, 25, 6);

  pop();

  fill(255);
  noStroke();
  textFont(normal);
  textSize(10);
  text(textoFader, x, posicionFader - 1);
}

function crossfader() {
  stroke(35);
  strokeWeight(18);
  line(510, 355, 690, 355);

  push();
  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = color(255, 0, 0);

  fill(0);
  stroke(235, 33, 46);
  strokeWeight(2);
  rect(crossfaderX, 355, 50, 25, 6);

  pop();

  fill(255);
  noStroke();
  textSize(10);
  textFont(normal);
  text("MIX", 600, 385);
}

function botonCentral(x, y, txt, activo) {
  push();

  if (activo) {
    drawingContext.shadowBlur = 6;
    drawingContext.shadowColor = color(120, 0, 0);
    fill(20);
    stroke(120, 0, 0);
  } else {
    drawingContext.shadowBlur = 12;
    drawingContext.shadowColor = color(255, 0, 0);
    fill(35);
    stroke(235, 33, 46);
  }

  strokeWeight(3);
  rect(x, y, 95, 48, 8);

  pop();

  fill(255);
  noStroke();
  textSize(12);
  textFont(normal);
  text(txt, x, y - 2);
}

function deckIzquierdo(x, y) {
  stroke(35);
  strokeWeight(3);
  line(x - 185, y - 25, x + 185, y - 25);

  for (let i = 0; i < 4; i++) {
    botonSFX(x - 135 + i * 90, y + 45, i);
  }

  for (let i = 0; i < 4; i++) {
    miniBotonLoop(x - 135 + i * 90, y + 115, i);
  }

  botonPlayTrack(x + 140, y - 80, marchaPrendida);
}

function deckDerecho(x, y) {
  stroke(35);
  strokeWeight(3);
  line(x - 185, y - 25, x + 185, y - 25);

  for (let i = 0; i < 4; i++) {
    botonDecorativo(x - 135 + i * 90, y + 45);
  }

  for (let i = 0; i < 4; i++) {
    miniBotonDecorativo(x - 135 + i * 90, y + 115);
  }

  botonPlayTrack(x - 140, y - 80, orquestaPrendida);
}

function botonSFX(x, y, numero) {
  let estaSonando = botonesSFX[numero].activo;

  push();

  if (estaSonando == true) {
    drawingContext.shadowBlur = 6;
    drawingContext.shadowColor = color(120, 0, 0);
    fill(20);
    stroke(120, 0, 0);
  } else {
    drawingContext.shadowBlur = 12;
    drawingContext.shadowColor = color(255, 0, 0);
    fill(35);
    stroke(235, 33, 46);
  }

  strokeWeight(2);
  rect(x, y, 70, 70, 5);

  pop();

  fill(255);
  noStroke();
  textSize(12);
  textFont(normal);
  text(botonesSFX[numero].nombre, x, y - 2);
}

function botonDecorativo(x, y) {
  fill(35);
  stroke(25);
  strokeWeight(4);
  rect(x, y, 70, 70, 5);
}

function botonPlayTrack(x, y, estaPrendido) {
  push();

  if (estaPrendido == false) {
    drawingContext.shadowBlur = 12;
    drawingContext.shadowColor = color(255, 0, 0);
    fill(35);
    stroke(235, 33, 46);
  } else {
    drawingContext.shadowBlur = 6;
    drawingContext.shadowColor = color(120, 0, 0);
    fill(20);
    stroke(120, 0, 0);
  }

  strokeWeight(3);
  circle(x, y, 45);

  if (estaPrendido == false) {
    image(playImg, x, y, 40, 40);
  } else {
    image(pauseImg, x, y, 40, 40);
  }

  pop();
}

function miniBotonLoop(x, y, numero) {
  push();

  if (botonesSFX[numero].loopActivo == true) {
    drawingContext.shadowBlur = 16;
    drawingContext.shadowColor = color(255, 0, 0);
    fill(20);
    stroke(255, 0, 0);
  } else {
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(255, 0, 0);
    fill(35);
    stroke(235, 33, 46);
  }

  strokeWeight(3);
  circle(x, y, 38);

  fill(70);
  stroke(40);
  strokeWeight(3);
  circle(x, y, 23);

  image(loopImg, x, y, 22, 22);

  pop();

  fill(255);
  noStroke();
  textSize(12);
  text("Loop", x, y + 35);
}

function miniBotonDecorativo(x, y) {
  fill(35);
  stroke(20);
  strokeWeight(5);
  circle(x, y, 38);

  fill(60);
  stroke(35);
  strokeWeight(3);
  circle(x, y, 23);
}

function mousePressedDJ() {
  tocarBotonesSFX();
  tocarBotonesLoop();

  agarrarFaderIzq();
  agarrarFaderDer();
  agarrarCrossfader();

  tocarPlayMarcha();
  tocarPlayOrquesta();

  tocarModosDJ();
}

function mouseDraggedDJ() {
  moverFaderIzq();
  moverFaderDer();
  moverCrossfader();
}

function mouseReleasedDJ() {
  moviendoFaderIzq = false;
  moviendoFaderDer = false;
  moviendoCrossfader = false;
}

function tocarBotonesSFX() {
  let xDeck = width / 2 - 350;
  let yDeck = height / 2 + 160;

  for (let i = 0; i < 4; i++) {
    let bx = xDeck - 135 + i * 90;
    let by = yDeck + 45;

    if (
      mouseX > bx - 35 &&
      mouseX < bx + 35 &&
      mouseY > by - 35 &&
      mouseY < by + 35
    ) {
      if (botonesSFX[i].activo == false) {
        botonesSFX[i].sonido.play();
        botonesSFX[i].activo = true;
        botonesSFX[i].loopActivo = false;
      }
    }
  }
}

function tocarBotonesLoop() {
  let xDeck = width / 2 - 350;
  let yDeck = height / 2 + 160;

  for (let i = 0; i < 4; i++) {
    let bx = xDeck - 135 + i * 90;
    let by = yDeck + 115;

    if (dist(mouseX, mouseY, bx, by) < 19) {
      if (botonesSFX[i].loopActivo == false) {
        botonesSFX[i].sonido.stop();
        botonesSFX[i].sonido.loop();

        botonesSFX[i].loopActivo = true;
        botonesSFX[i].activo = true;
      } else {
        botonesSFX[i].sonido.stop();

        botonesSFX[i].loopActivo = false;
        botonesSFX[i].activo = false;
      }
    }
  }
}

function tocarPlayMarcha() {
  let x = 390;
  let y = 460;

  if (dist(mouseX, mouseY, x, y) < 22) {
    if (marchaPrendida == false) {
      sfxMarcha.play();
      marchaPrendida = true;
      botonesSFX[4].activo = true;
    } else {
      sfxMarcha.pause();
      marchaPrendida = false;
      botonesSFX[4].activo = false;
    }
  }
}

function tocarPlayOrquesta() {
  let x = 810;
  let y = 460;

  if (dist(mouseX, mouseY, x, y) < 22) {
    if (orquestaPrendida == false) {
      sfxOrquesta.play();
      orquestaPrendida = true;
      botonesSFX[5].activo = true;
    } else {
      sfxOrquesta.pause();
      orquestaPrendida = false;
      botonesSFX[5].activo = false;
    }
  }
}

function agarrarFaderIzq() {
  if (
    mouseX > 467 - 35 &&
    mouseX < 467 + 35 &&
    mouseY > faderIzqY - 15 &&
    mouseY < faderIzqY + 15
  ) {
    moviendoFaderIzq = true;
  }
}

function moverFaderIzq() {
  if (moviendoFaderIzq == true) {
    faderIzqY = mouseY;

    if (faderIzqY < 420) {
      faderIzqY = 420;
    }

    if (faderIzqY > 640) {
      faderIzqY = 640;
    }

    velocidadMarcha = map(faderIzqY, 640, 420, 0.8, 1.2);
    actualizarAudioModos();
  }
}

function agarrarFaderDer() {
  if (
    mouseX > 733 - 35 &&
    mouseX < 733 + 35 &&
    mouseY > faderDerY - 15 &&
    mouseY < faderDerY + 15
  ) {
    moviendoFaderDer = true;
  }
}

function moverFaderDer() {
  if (moviendoFaderDer == true) {
    faderDerY = mouseY;

    if (faderDerY < 420) {
      faderDerY = 420;
    }

    if (faderDerY > 640) {
      faderDerY = 640;
    }

    velocidadOrquesta = map(faderDerY, 640, 420, 0.8, 1.2);
    actualizarAudioModos();
  }
}

function agarrarCrossfader() {
  if (
    mouseX > crossfaderX - 25 &&
    mouseX < crossfaderX + 25 &&
    mouseY > 355 - 15 &&
    mouseY < 355 + 15
  ) {
    moviendoCrossfader = true;
  }
}

function moverCrossfader() {
  if (moviendoCrossfader == true) {
    crossfaderX = mouseX;

    if (crossfaderX < 510) {
      crossfaderX = 510;
    }

    if (crossfaderX > 690) {
      crossfaderX = 690;
    }

    actualizarCrossfader();
  }
}

function actualizarCrossfader() {
  let volumenMarcha = map(crossfaderX, 510, 690, 1, 0);
  let volumenOrquesta = map(crossfaderX, 510, 690, 0, 1);

  sfxMarcha.setVolume(volumenMarcha);
  sfxOrquesta.setVolume(volumenOrquesta);
}

function tocarModosDJ() {
  if (clickRect(600, 515, 95, 48)) {
    activarChill();
  }

  if (clickRect(600, 575, 95, 48)) {
    activarViaje();
  }
}

function efectoHyperDJ() {
  let parpadeo = random(40, 180);

  noStroke();
  fill(255, 0, 0, parpadeo);
  rect(width / 2, height / 2, width, height);
}
function efectoLowLightsDJ() {
  let parpadeo = random(20, 70);

  noStroke();

  fill(80, 0, 120, parpadeo);
  rect(width / 2, height / 2, width, height);

  fill(180, 120, 255, 20);
  rect(width / 2, height / 2, width, height);
}
