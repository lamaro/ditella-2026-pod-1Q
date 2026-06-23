// para poder cambiar de vista entre la del dj o vj
let vistaActual;

let vistaDJ;
let CrossFaderDJ;
let sliderTempoa;
let sliderTempob;

let vistaVJ;

let track1a, track2a, track3a;
let track1b, track2b, track3b;

let fft1a, fft2a, fft3a;
let fft1b, fft2b, fft3b;

let amplitudDJ;

let crossFaderDJPosX = 605;
let crossFaderDJPosY = 590;

let sliderTempoaPosX = 391;
let sliderTempoaPosY = 365;

let sliderTempobPosX = 1030;
let sliderTempobPosY = 365;

let bTrack1a = { x: 150, y: 260, w: 60, h: 30 };
let bTack1b  = { x: 785, y: 260, w: 60, h: 30 };
let bTrack2a = { x: 265, y: 260, w: 60, h: 30 };
let bTrack2b = { x: 900, y: 260, w: 60, h: 30 };
let bTrack3a = { x: 380, y: 260, w: 60, h: 30 };
let bTrack3b = { x: 1010, y: 260, w: 60, h: 30 };

let bStopa = { x: 170, y: 540, w: 70, h: 40 };
let bStopb = { x: 795, y: 540, w: 70, h: 40 };

let bloques = [];
let velocidadVJ = [];
let cantidad = 30;
let anchoBarra;
let altoBloque = 15;
let amplitudVJ;
let valorAmplitud = 0;
let xs = [], ys = [], velX = [], velY = [], tamaños = [];
let offset = 0;
let centroY;
let velocidadCentro = 1.2;
let cantLines = 40;
let escena = 1;

let posXvj = [60, 330, 610, 880];
let posYvj = [620, 515, 515, 620];
let anchoBtn = 270;
let altoBtn  = 160;

let sonidoActual;

let fotoflechas;

function preload() {
  // los tracks estan duplicados para que los dos lados de la consola del dj sean independiendientes
  track1a = loadSound("assets/sonidos/FEMININE ENERGY (Zorza Adrenaline Mix).mp3");
  track2a = loadSound("assets/sonidos/Brutalismus 3000 - Scee (The Dare Remix).mp3");
  track3a = loadSound("assets/sonidos/Panteros666 - Cyberlink 2XL (feat. Zoee)  HARD Recs.mp3");

  track1b = loadSound("assets/sonidos/FEMININE ENERGY (Zorza Adrenaline Mix).mp3");
  track2b = loadSound("assets/sonidos/Brutalismus 3000 - Scee (The Dare Remix).mp3");
  track3b = loadSound("assets/sonidos/Panteros666 - Cyberlink 2XL (feat. Zoee)  HARD Recs.mp3");

  vistaDJ = loadImage("assets/imagenes/VISTADJprueba.png");
  CrossFaderDJ = loadImage("assets/imagenes/VISTADJcrossfader.png");
  sliderTempoa = loadImage("assets/imagenes/VISTADJtempoa.png");
  sliderTempob = loadImage("assets/imagenes/VISTADJtempob.png");

  vistaVJ = loadImage("assets/imagenes/VISTAVJprueba.png");

  fotoflechas = loadImage("assets/imagenes/FOTOFLECHAS2.png");
}

function setup() {
  createCanvas(1200, 800);

  track1a.setVolume(1);
  track2a.setVolume(1);
  track3a.setVolume(1);

  track1b.setVolume(1);
  track2b.setVolume(1);
  track3b.setVolume(1);

  amplitudDJ = new p5.Amplitude();

  fft1a = new p5.FFT();
  fft1a.setInput(track1a);
  fft2a = new p5.FFT();
  fft2a.setInput(track2a);
  fft3a = new p5.FFT();
  fft3a.setInput(track3a);

  fft1b = new p5.FFT();
  fft1b.setInput(track1b);
  fft2b = new p5.FFT();
  fft2b.setInput(track2b);
  fft3b = new p5.FFT();
  fft3b.setInput(track3b);

  amplitudVJ = new p5.Amplitude();

  // Variables VJ
  anchoBarra = width / cantidad;
  centroY = height / 2;
  let maxBloques = height / altoBloque;
  for (let i = 0; i < cantidad; i++) {
    bloques[i]      = random(5, maxBloques);
    velocidadVJ[i]  = random(0.4, 1.8);
  }
  for (let i = 0; i < 20; i++) {
    xs[i] = random(width);
    ys[i] = random(height);
    velX[i] = random(-4, 4);
    velY[i] = random(-4, 4);
    tamaños[i] = random(30, 80);
  }

  vistaActual = pantalladj;
}

function draw() {
  background("black");
  vistaActual();
  nuevoCrossfader();
  nuevosliderTempoa();
  nuevosliderTempob();
  popup();
}

//popup
let mostrarPopup = true;

function popup() {
  push();
  imageMode(CENTER);

  if (mostrarPopup) {
    image(fotoflechas, width/2, height/2, width, height);
  }
  pop();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    vistaActual = pantalladj;
  } else if (keyCode === DOWN_ARROW) {
    vistaActual = pantallavj;
  } else if (key === ' ') {
    mostrarPopup = false;
  }
}

//PANTALLA Y ELEMENTOS DEL DJ
function pantalladj() {
  //wavelength
  ondasA();
  ondasB();
  //circulos
  push();
  blendMode(DIFFERENCE);
  CirculosConsolaa();
  CirculosConsolab();
  pop();
  //seleccion de cancion
  seleccionCancion();
  //imagen
  image(vistaDJ, 0, 0, 1200, 800);

  noFill();
  noStroke();
  //botones de cambio de track (los de arriba)
  rect(bTrack1a.x, bTrack1a.y, bTrack1a.w, bTrack1a.h);
  rect(bTack1b.x, bTack1b.y, bTack1b.w, bTack1b.h);
  rect(bTrack2a.x, bTrack2a.y, bTrack2a.w, bTrack2a.h);
  rect(bTrack2b.x, bTrack2b.y, bTrack2b.w, bTrack2b.h);
  rect(bTrack3a.x, bTrack3a.y, bTrack3a.w, bTrack3a.h);
  rect(bTrack3b.x, bTrack3b.y, bTrack3b.w, bTrack3b.h);
  //botones de pausa
  rect(bStopa.x, bStopa.y, bStopa.w, bStopa.h);
  rect(bStopb.x, bStopb.y, bStopb.w, bStopb.h);
  //slider crossfader
  image(CrossFaderDJ, crossFaderDJPosX, crossFaderDJPosY);
  //slider tempoa
  image(sliderTempoa, sliderTempoaPosX, sliderTempoaPosY);
  //slider tempob
  image(sliderTempob, sliderTempobPosX, sliderTempobPosY);
}

function nuevoCrossfader() {
  if (
    mouseIsPressed &&
    dist(crossFaderDJPosX, crossFaderDJPosY, mouseX, mouseY) < 50 &&
    crossFaderDJPosX > 530 &&
    crossFaderDJPosX < 690
  ) {
    console.log("catched");
    crossFaderDJPosX = mouseX;
  }
  
  let valorCrossfade = map(crossFaderDJPosX, 530, 690, 0, 1);
  let volumenCrossa = 1 - valorCrossfade;
  let volumenCrossb = valorCrossfade;

  track1a.setVolume(volumenCrossa);
  track2a.setVolume(volumenCrossa);
  track3a.setVolume(volumenCrossa);

  track1b.setVolume(volumenCrossb);
  track2b.setVolume(volumenCrossb);
  track3b.setVolume(volumenCrossb);
}

function nuevosliderTempoa(){
  if (
   mouseIsPressed &&
   dist(sliderTempoaPosX, sliderTempoaPosY, mouseX, mouseY) < 50 &&
   sliderTempoaPosY > 280 &&
   sliderTempoaPosY < 480
 ) {
   console.log("catched");
   sliderTempoaPosY = mouseY;
 }

 let ratesliderTempoa = map(sliderTempoaPosY, 280, 480, 0.5, 2.0);

  track1a.rate(ratesliderTempoa);
  track2a.rate(ratesliderTempoa);
  track3a.rate(ratesliderTempoa);
}

function nuevosliderTempob(){
  if (
   mouseIsPressed &&
   dist(sliderTempobPosX, sliderTempobPosY, mouseX, mouseY) < 50 &&
   sliderTempobPosY > 280 &&
   sliderTempobPosY < 480
 ) {
   console.log("catched");
   sliderTempobPosY = mouseY;
 }

 let ratesliderTempob = map(sliderTempobPosY, 280, 480, 0.5, 2.0);

  track1b.rate(ratesliderTempob);
  track2b.rate(ratesliderTempob);
  track3b.rate(ratesliderTempob);
}

function pararTracksLadoA() {
  track1a.stop();
  track2a.stop();
  track3a.stop();
}

function pararTracksLadoB() {
  track1b.stop();
  track2b.stop();
  track3b.stop();
}

function seleccionCancion() {
  noStroke();
  fill(255, 50);

  if (track1a.isPlaying()) {
  rect(480, 415, 270, 20);
  }
  if (track2a.isPlaying()) {
  rect(480, 433, 270, 20);
  }
  if (track3a.isPlaying()) {
  rect(480, 451, 270, 20);
  }

  if (track1b.isPlaying()) {
  rect(480, 497, 270, 20);
  }
  if (track2b.isPlaying()) {
  rect(480, 515, 270, 20);
  }
  if (track3b.isPlaying()) {
  rect(480, 533, 270, 20);
  }
}

function ondasA() {
  let onda1a = fft1a.waveform();
  noFill();

  stroke("#FF019A");
  beginShape();
  for (let i = 0; i < onda1a.length; i++) {
    let x = map(i, 0, onda1a.length, 150, 440);
    let y = map(onda1a[i], -1, 1, 300, 130);
    vertex(x, y);
  }
  endShape();

  let onda2a = fft2a.waveform();
  stroke("#8d01ff");
  beginShape();
  for (let i = 0; i < onda2a.length; i++) {
    let x = map(i, 0, onda2a.length, 150, 440);
    let y = map(onda2a[i], -1, 1, 300, 130);
    vertex(x, y);
  }
  endShape();

  let onda3a = fft3a.waveform();
  stroke("#ff0101");
  beginShape();
  for (let i = 0; i < onda3a.length; i++) {
    let x = map(i, 0, onda3a.length, 150, 440);
    let y = map(onda3a[i], -1, 1, 300, 130);
    vertex(x, y);
  }
  endShape();
}

function ondasB() {
  let onda1b = fft1b.waveform();
  noFill();

  stroke("#FF019A");
  beginShape();
  for (let i = 0; i < onda1b.length; i++) {
    let x = map(i, 0, onda1b.length, 790, 1080);
    let y = map(onda1b[i], -1, 1, 300, 130);
    vertex(x, y);
  }
  endShape();

  let onda2b = fft2b.waveform();
  stroke("#8d01ff");
  beginShape();
  for (let i = 0; i < onda2b.length; i++) {
    let x = map(i, 0, onda2b.length, 790, 1080);
    let y = map(onda2b[i], -1, 1, 300, 130);
    vertex(x, y);
  }
  endShape();

  let onda3b = fft3b.waveform();
  stroke("#ff0101");
  beginShape();
  for (let i = 0; i < onda3b.length; i++) {
    let x = map(i, 0, onda3b.length, 790, 1080);
    let y = map(onda3b[i], -1, 1, 300, 130);
    vertex(x, y);
  }
  endShape();
}

function CirculosConsolaa() {
  fft1a.analyze();
  fft2a.analyze();
  fft3a.analyze();

  let bajos1a = fft1a.getEnergy("bass");
  let bajos2a = fft2a.getEnergy("bass");
  let bajos3a = fft3a.getEnergy("bass");

  let b1a = map(bajos1a, 0, 255, 0, 200);
  let b2a = map(bajos2a, 0, 255, 0, 200);
  let b3a = map(bajos3a, 0, 255, 0, 200);

  noStroke();

  fill("#FF019A");
  circle(615, 265, b1a);
  fill("#8d01ff");
  circle(615, 265, b2a);
  fill("#ff0101");
  circle(615, 265, b3a);

  let mid1a = fft1a.getEnergy("mid");
  let mid2a = fft2a.getEnergy("mid");
  let mid3a = fft3a.getEnergy("mid");

  let m1a = map(mid1a, 0, 255, 0, 200);
  let m2a = map(mid2a, 0, 255, 0, 200);
  let m3a = map(mid3a, 0, 255, 0, 200);

  fill("#FF019A");
  circle(615, 265, m1a);
  fill("#8d01ff");
  circle(615, 265, m2a);
  fill("#ff0101");
  circle(615, 265, m3a);

  let treble1a = fft1a.getEnergy("treble");
  let treble2a = fft2a.getEnergy("treble");
  let treble3a = fft3a.getEnergy("treble");

  let t1a = map(treble1a, 0, 255, 0, 200);
  let t2a = map(treble2a, 0, 255, 0, 200);
  let t3a = map(treble3a, 0, 255, 0, 200);

  fill("#FF019A");
  circle(615, 265, t1a);
  fill("#8d01ff");
  circle(615, 265, t2a);
  fill("#ff0101");
  circle(615, 265, t3a);
}

function CirculosConsolab() {
  fft1b.analyze();
  fft2b.analyze();
  fft3b.analyze();

  let bajos1b = fft1b.getEnergy("bass");
  let bajos2b = fft2b.getEnergy("bass");
  let bajos3b = fft3b.getEnergy("bass");

  let b1b = map(bajos1b, 0, 255, 0, 200);
  let b2b = map(bajos2b, 0, 255, 0, 200);
  let b3b = map(bajos3b, 0, 255, 0, 200);

  noStroke();

  fill("#FF019A");
  circle(615, 265, b1b);
  fill("#8d01ff");
  circle(615, 265, b2b);
  fill("#ff0101");
  circle(615, 265, b3b);

  let mid1b = fft1b.getEnergy("mid");
  let mid2b = fft2b.getEnergy("mid");
  let mid3b = fft3b.getEnergy("mid");

  let m1b = map(mid1b, 0, 255, 0, 200);
  let m2b = map(mid2b, 0, 255, 0, 200);
  let m3b = map(mid3b, 0, 255, 0, 200);

  fill("#FF019A");
  circle(615, 265, m1b);
  fill("#8d01ff");
  circle(615, 265, m2b);
  fill("#ff0101");
  circle(615, 265, m3b);

  let treble1b = fft1b.getEnergy("treble");
  let treble2b = fft2b.getEnergy("treble");
  let treble3b = fft3b.getEnergy("treble");

  let t1b = map(treble1b, 0, 255, 0, 200);
  let t2b = map(treble2b, 0, 255, 0, 200);
  let t3b = map(treble3b, 0, 255, 0, 200);

  fill("#FF019A");
  circle(615, 265, t1b);
  fill("#8d01ff");
  circle(615, 265, t2b);
  fill("#ff0101");
  circle(615, 265, t3b);
}

//PANTALLA Y ELEMENTOS DEL VJ

function pantallavj() {
  valorAmplitud = amplitudVJ.getLevel();

  if (escena === 1) visual1();
  if (escena === 2) visual2();
  if (escena === 3) visual3();
  if (escena === 4) visual4();

  image(vistaVJ, 0, 0, 1200, 800);
  noStroke();
  fill(255, 255, 255, 0);
  rect(posXvj[0], posYvj[0], anchoBtn, altoBtn);
  rect(posXvj[1], posYvj[1], anchoBtn, altoBtn);
  rect(posXvj[2], posYvj[2], anchoBtn, altoBtn);
  rect(posXvj[3], posYvj[3], anchoBtn, altoBtn);
}

function visual1() {
  let velocidad = map(valorAmplitud, 0, 1, 1, 10);
  let glitchProb = map(valorAmplitud, 0, 1, 2, 20);
  let r = random(0, 100);

  strokeWeight(1);
  for (let i = 0; i < width; i += 40) {
    if (r < glitchProb) {
    stroke(255); 
    }
    // blanco glitch
    else {
    stroke(255, 0, 150);
    }
    line(i, 0, i, height);
  }

  for (let j = 0; j < height; j += 40) {
    if (r < glitchProb) {
      stroke(255);
    } else {
      stroke(255, 0, 150);
    }
    line(0, j + offset, width, j + offset);
  }

  offset = offset + velocidad;
  if (offset > 40) {
    offset = 0;
  }

  noStroke();
  for (let i = 0; i < xs.length; i++) {
    let x = xs[i];
    let y = ys[i];
    let t = tamaños[i];

    fill(255, 0, 150, 200);
    rect(x, y, t, t * 2);

    fill(255, 0, 150, 60);
    rect(x + random(-20, 10) * valorAmplitud * 5,
      y + random(-10, 5) * valorAmplitud * 5, t, t * 2);

    fill(255, 255, 255, 80);
    rect(x + random(-5, 5), y, t, t * 2);

    xs[i] = xs[i] + velX[i] * (1 + valorAmplitud * 5);
    ys[i] = ys[i] + velY[i] * (1 + valorAmplitud * 5);

    if (xs[i] > width - t || xs[i] < 0) {
      velX[i] = velX[i] * -1;
    }
    if (ys[i] > height - t * 2 || ys[i] < 0) {
      velY[i] = velY[i] * -1;
    }
  }
}

function visual2() {
  let factorVel = map(valorAmplitud, 0, 0.2, 0.5, 3);
  let glitchProb = map(valorAmplitud, 0, 0.2, 5, 25);
  let maxBloques = height / altoBloque;

  for (let i = 0; i < cantidad; i++) {
    let x = i * anchoBarra;

    bloques[i] = bloques[i] + velocidadVJ[i] * factorVel;
    if (bloques[i] > maxBloques || bloques[i] < 2) {
      velocidadVJ[i] = velocidadVJ[i] * -1;
    }
    for (let j = 0; j < bloques[i]; j++) {
      let y = height - j * altoBloque;
      let glitchX = 0;
      let r = random(0, 100);

      if (r < glitchProb) {
        glitchX = random(-3, 3) * valorAmplitud * 5;
      }
      if (r < glitchProb + 5) {
        let blanco = random(200, 255);
        fill(blanco);
        } else {
        fill(255, 0, 150);
      }
      noStroke();
      rect(x + glitchX, y, anchoBarra - 4, -altoBloque + 2);
    }
  }
}

function visual3() {
  let r = random(0, 100);
  let centroX = width / 2;
  cantLines = map(valorAmplitud, 0, 1, 10, 600);
  centroY = centroY + velocidadCentro;

  if (centroY > height * 0.65 || centroY < height * 0.35) {
    velocidadCentro = velocidadCentro * -1;
  }

  strokeWeight(1);
  stroke(255)
 
  for (let i = -width; i < width * 2; i += cantLines) {
    if (r < 1) {
      stroke(255);
    } else {
      stroke(255, 0, 150);
    }
    let puntoX = centroX + (i - centroX) * 0.12;

    line(i, 0, puntoX, centroY);
    line(i, height, puntoX, centroY);
  }
  stroke(255, 0, 150);
  line(380, centroY, 810, centroY);

  for (let j = 0; j < height; j += 40) {
    if (r < 1) {
      stroke(255);
    } else {
      stroke(255, 0, 150);
    }
    line(0, j, width, j);
  }
}

function visual4() {
  let cantidadCirculos = 8;
  for (let i = 0; i < cantidadCirculos; i++) {
    let x = random(width);
    let y = random(height);
    let tamaño = map(valorAmplitud, 0, 0.3, 30, 180);
    tamaño = tamaño + random(-20, 20);

    noStroke();
    let r = random(0, 100);

    if (r < 20) {
      fill(255, 255, 255, 30);
      ellipse(x, y, tamaño * 2);
      fill(255, 255, 255, 80);
      ellipse(x, y, tamaño * 1.5);
      fill(255, 255, 255, 180);
      ellipse(x, y, tamaño);
    } 
      else {
      fill(255, 0, 150, 20);
      ellipse(x, y, tamaño * 2);
      fill(255, 0, 150, 60);
      ellipse(x, y, tamaño * 1.5); 
      fill(255, 0, 150, 120);
      ellipse(x, y, tamaño);
    }
  }
}


function mousePressed() {
  if (vistaActual === pantalladj) {
    //botones de cambio de track (los de arriba)
  if (
    mouseX > bTrack1a.x &&
    mouseX < bTrack1a.x + bTrack1a.w &&
    mouseY > bTrack1a.y &&
    mouseY < bTrack1a.y + bTrack1a.h
  ) {
    pararTracksLadoA();
    track1a.play();
  }
  if (
    mouseX > bTack1b.x &&
    mouseX < bTack1b.x + bTack1b.w &&
    mouseY > bTack1b.y &&
    mouseY < bTack1b.y + bTack1b.h
  ) {
    pararTracksLadoB();
    track1b.play();
  }
  if (
    mouseX > bTrack2a.x &&
    mouseX < bTrack2a.x + bTrack2a.w &&
    mouseY > bTrack2a.y &&
    mouseY < bTrack2a.y + bTrack2a.h
  ) {
    pararTracksLadoA();
    track2a.play();
  }
  if (
    mouseX > bTrack2b.x &&
    mouseX < bTrack2b.x + bTrack2b.w &&
    mouseY > bTrack2b.y &&
    mouseY < bTrack2b.y + bTrack2b.h
  ) {
    pararTracksLadoB();
    track2b.play();
  }
  if (
    mouseX > bTrack3a.x &&
    mouseX < bTrack3a.x + bTrack3a.w &&
    mouseY > bTrack3a.y &&
    mouseY < bTrack3a.y + bTrack3a.h
  ) {
    pararTracksLadoA();
    track3a.play();
  }
  if (
    mouseX > bTrack3b.x &&
    mouseX < bTrack3b.x + bTrack3b.w &&
    mouseY > bTrack3b.y &&
    mouseY < bTrack3b.y + bTrack3b.h
  ) {
    pararTracksLadoB();
    track3b.play();
  }

  //botones de stop
  if (
    mouseX > bStopa.x &&
    mouseX < bStopa.x + bStopa.w &&
    mouseY > bStopa.y &&
    mouseY < bStopa.y + bStopa.h
  ) {
    pararTracksLadoA();
  }
  if (
    mouseX > bStopb.x &&
    mouseX < bStopb.x + bStopb.w &&
    mouseY > bStopb.y &&
    mouseY < bStopb.y + bStopb.h
  ) {
    pararTracksLadoB();
  }
  } else {
    // Botones de escena VJ
    for (let i = 0; i < posXvj.length; i++) {
      if (mouseX > posXvj[i] && mouseX < posXvj[i] + anchoBtn &&
          mouseY > posYvj[i] && mouseY < posYvj[i] + altoBtn) {
        escena = i + 1;
      }
    }
  }

  console.log(mouseX, mouseY);
}
