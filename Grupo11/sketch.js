let datos;
let track1, track2, track3, soundRewind;
let imgDJ, imgVJ;
let vista = "INTRO";
let amplitud;
let fft;

let playingTrack1 = false;
let playingTrack2 = false;
let playingTrack3 = false;

let botonesDJ = [];

let crossfader      = 0.5;
let arrastandoCross = false;

let hypeMode = false;

let filtro;
let filtroOn = false;

let colorLuz  = null;
let luzRandom = false;
let luzBlanca = false;

let botonesLuz = [
  { x: 751, y: 454, r: 16, hex: "#FF6400" },
  { x: 751, y: 503, r: 16, hex: "#FFFFFF" },
  { x: 751, y: 552, r: 16, hex: "#C80000" },
];


let efectoVJ      = 0;
let previewEfecto = 1;

let velVJ     = 1;
let velActiva = 1;

let tVJ       = 0;
let tVJFrozen = 0;

let flashPantalla = 0;

let freezeVJ   = false;
let strobeVJ   = false;
let blackoutVJ = false;

let zoomVJ       = false;
let espejoVJ     = false;
let invertirVJ   = false;
let fadeVJ       = false;
let flickerFocos = false;

let mostrarCoords = false;
let clicksCoord   = [];

let tVinilo = 0;
let rewindFlashL = 0, rewindFlashR = 0;


let colorFocos = [255, 100, 0];

const COLORES_PADS = [
  [180,   0,   0], [220,  20,   0], [255,  50,   0], [255,  80,   0],
  [255, 110,   0], [255, 140,   0], [255, 170,   0], [255, 200,   0],
  [255, 220,   0], [255, 235,  30], [255, 245,  80], [255, 250, 150],
];

let PANTALLA         = { x: 372, y:  46, w: 318, h: 222 };
let PREVIEW          = { x: 308, y: 353, w: 470, h: 196 };
let PANTALLA_LATERAL = { x: 984, y: 396, w: 211, h: 139 };
let miniPantallas = [
  { x:  55, y: 375, w: 114, h: 85 },
  { x: 178, y: 375, w: 114, h: 85 },
  { x:  55, y: 470, w: 114, h: 85 },
  { x: 178, y: 470, w: 114, h: 85 },
];

let botonesVJ = [
  { x: 800, y: 385, w: 148, h: 38, timerPress: 0 },
  { x: 800, y: 428, w: 148, h: 38, timerPress: 0 },
  { x: 800, y: 471, w: 148, h: 38, timerPress: 0 },
  { x: 800, y: 514, w: 148, h: 38, timerPress: 0 },
];

let botonesMedio = [
  { x: 310, y: 565, w: 90, h: 28, timerPress: 0 },
  { x: 410, y: 565, w: 90, h: 28, timerPress: 0 },
  { x: 510, y: 565, w: 90, h: 28, timerPress: 0 },
  { x: 610, y: 565, w: 90, h: 28, timerPress: 0 },
  { x: 710, y: 565, w: 90, h: 28, timerPress: 0 },
];

const VELOCIDADES = [0.3, 1, 2, 3.5];
let botonesVel = [
  { x:  93, y: 636, r: 19, id: 0 },
  { x: 138, y: 636, r: 19, id: 1 },
  { x: 183, y: 636, r: 19, id: 2 },
  { x: 226, y: 636, r: 19, id: 3 },
];

let padsVJ = [];

let focos = [
  { x1a: 270, x1b: 390, y1: 20, x2:  30, y2: 305, x3: 460,  y3: 305 },
  { x1a: 730, x1b: 860, y1: 20, x2: 510, y2: 305, x3: 1080, y3: 305 },
];


function preload() {
  datos  = loadJSON("data/tracks.json");
  imgDJ  = loadImage("images/vista dj.png");
  imgVJ  = loadImage("images/NUEVO VJ SIN FONDO.png");
  track1      = loadSound("sounds/Live Your Life.mp3");
  track2      = loadSound("sounds/Bad Boys Cry.mp3");
  soundRewind = loadSound("sounds/rewind.mp3");
}

function setup() {
  createCanvas(1200, 800);

  botonesDJ = datos.botones;

  amplitud = new p5.Amplitude();
  fft      = new p5.FFT();

  filtro = new p5.LowPass();
  filtro.connect();

  for (let i = 0; i < 12; i++) {
    padsVJ.push({
      x: 912 + (i % 4) * 38,
      y: 612 + floor(i / 4) * 32,
      w: 32, h: 26,
      color: COLORES_PADS[i],
      timerPress: 0,
    });
  }
}


function draw() {
  background("#000000");

  track1.setVolume(1 - crossfader);
  track2.setVolume(crossfader);

  if (vista === "INTRO") {
    dibujarIntro();
  } else if (vista === "DJ") {
    tVinilo += hypeMode ? 0.055 : 0.028;
    dibujarLuces();
    dibujarVinilos();
    image(imgDJ, 0, 0, width, height);
    dibujarGlowVinilos();
    dibujarBarras();
    dibujarCrossfader();
    dibujarControlesExtra();
    dibujarNombreTrack();
    dibujarBotonesDJ();

    if (hypeMode && frameCount % 6 < 3) {
      noStroke();
      fill(255, 200, 0, 40);
      rect(0, 0, width, height);
    }


  } else {
    dibujarVJ();
  }
}


function dibujarLuces() {
  dibujarBotonLuz(botonesLuz[0], colorLuz !== null);
  dibujarBotonLuz(botonesLuz[1], luzBlanca);
  dibujarBotonLuz(botonesLuz[2], luzRandom);

  noStroke();
  if (luzBlanca) {
    fill(frameCount % 20 < 10 ? color(255, 255, 255, 80) : color(0, 0, 0, 0));
    rect(0, 0, 1200, 400);
  } else if (luzRandom) {
    fill(random([color(0, 0, 255, 80), color(255, 0, 0, 80), color(255, 200, 0, 80)]));
    rect(0, 0, 1200, 400);
  } else if (colorLuz !== null) {
    fill(colorLuz);
    rect(0, 0, 1200, 400);
  }
}

function dibujarBotonLuz(b, activo) {
  let encima = dist(mouseX, mouseY, b.x, b.y) < b.r;
  let brillo = activo ? 1.0 : encima ? 0.75 : 0.5;

  let c = color(b.hex);
  let rr = red(c)   * brillo;
  let gg = green(c) * brillo;
  let bb = blue(c)  * brillo;

  noStroke();
  fill(0, 0, 0, 80);
  ellipse(b.x + 3, b.y + 4, b.r * 2, b.r * 2);

  fill(rr, gg, bb);
  ellipse(b.x, b.y, b.r * 2, b.r * 2);

  drawingContext.save();
  let grad = drawingContext.createRadialGradient(
    b.x - b.r * 0.3, b.y - b.r * 0.4, b.r * 0.1,
    b.x, b.y, b.r
  );
  grad.addColorStop(0, 'rgba(255,255,255,0.55)');
  grad.addColorStop(0.4, 'rgba(255,255,255,0.12)');
  grad.addColorStop(1, 'rgba(0,0,0,0.15)');
  drawingContext.fillStyle = grad;
  drawingContext.beginPath();
  drawingContext.arc(b.x, b.y, b.r, 0, TWO_PI);
  drawingContext.fill();
  drawingContext.restore();

  if (activo) {
    noFill(); stroke(255, 255, 255, 200); strokeWeight(2);
    ellipse(b.x, b.y, b.r * 2 + 5, b.r * 2 + 5);
  }
}


let ZONA_BARRAS = { x: 530, xFin: 657, yBase: 370 };
let POS_CROSS   = { x: 508, y: 438, w: 190 };
let POS_FILTRO  = { x: 540, y: 504 };
let POS_HYPE    = { x: 540, y: 553 };

function dibujarBarras() {
  let spectrum    = fft.analyze();
  let numBarras   = 12;
  let anchoBarras = (ZONA_BARRAS.xFin - ZONA_BARRAS.x) / numBarras;
  let alturaMax   = hypeMode ? 150 : 80;

  for (let i = 0; i < numBarras; i++) {
    let indice      = floor(map(i, 0, numBarras, 0, spectrum.length / 4));
    let alturaBarra = map(spectrum[indice], 0, 255, 2, alturaMax);
    fill(255, 90, 10, 200);
    noStroke();
    rect(ZONA_BARRAS.x + i * anchoBarras, ZONA_BARRAS.yBase - alturaBarra, anchoBarras - 2, alturaBarra);
  }
}

function dibujarCrossfader() {
  let cx = POS_CROSS.x, cy = POS_CROSS.y, cw = POS_CROSS.w;

  fill(40, 40, 40); noStroke();
  rect(cx, cy, cw, 8, 4);

  fill(255, 90, 10);
  rect(cx, cy, crossfader * cw, 8, 4);

  fill(255);
  ellipse(cx + crossfader * cw, cy + 4, 14, 14);

  fill(255); textSize(7); textAlign(CENTER, TOP);
  text("TRACK 1",   cx,          cy + 10);
  text("TRACK 2",   cx + cw,     cy + 10);
  text("CROSSFADER", cx + cw / 2, cy + 10);
}

function dibujarControlesExtra() {
  let fx = POS_FILTRO.x, fy = POS_FILTRO.y;
  let brilloFiltro = filtroOn ? 1.0 : 0.45;
  dibujarRectBevel(fx, fy, 120, 24, filtroOn ? 255 : 80, filtroOn ? 140 : 80, filtroOn ? 0 : 80, brilloFiltro);
  if (filtroOn) { noFill(); stroke(255, 255, 255, 190); strokeWeight(2); rect(fx, fy, 120, 24, 4); }
  noStroke(); fill(filtroOn ? 0 : 255);
  textFont("Courier New"); textStyle(BOLD); textSize(10); textAlign(CENTER, CENTER);
  text("FILTRO LP", fx + 60, fy + 12);
  textStyle(NORMAL); textFont("sans-serif");

  let hx = POS_HYPE.x, hy = POS_HYPE.y;
  let brilloHype = hypeMode ? 1.0 : 0.45;
  dibujarRectBevel(hx, hy, 120, 24, hypeMode ? 255 : 80, hypeMode ? 150 : 80, hypeMode ? 0 : 80, brilloHype);
  if (hypeMode) { noFill(); stroke(255, 255, 255, 190); strokeWeight(2); rect(hx, hy, 120, 24, 4); }
  noStroke(); fill(hypeMode ? 0 : 255);
  textFont("Courier New"); textStyle(BOLD); textSize(10); textAlign(CENTER, CENTER);
  text("HYPE MODE", hx + 60, hy + 12);
  textStyle(NORMAL); textFont("sans-serif");
}

function dibujarNombreTrack() {
  let nombre;
  if (playingTrack1)      nombre = datos.tracks[0].nombre;
  else if (playingTrack2) nombre = datos.tracks[1].nombre;
  else if (playingTrack3) nombre = datos.tracks[2].nombre;
  else                    nombre = "— SIN TRACK —";

  fill(255, 90, 10); noStroke(); textSize(13); textAlign(CENTER, CENTER);
  text("♪ " + nombre, 593, 305);
}

function dibujarBotonesDJ() {
  for (let i = 0; i < botonesDJ.length; i++) {
    let b = botonesDJ[i];
    let brillo = dentroDeZona(b) ? 0.85 : 0.55;
    dibujarRectBevel(b.x, b.y, b.w, b.h, b.r, b.g, b.b, brillo);

    if (dentroDeZona(b)) {
      noFill(); stroke(255, 255, 255, 180); strokeWeight(1.5);
      rect(b.x, b.y, b.w, b.h, 4);
    }

    dibujarIconoBoton(b.accion, b.x + b.w / 2, b.y + b.h / 2);
  }
}

function dibujarIconoBoton(accion, cx, cy) {
  noStroke(); fill(255);
  if (accion === "play1" || accion === "play2") {
    triangle(cx - 5, cy - 6, cx - 5, cy + 6, cx + 7, cy);
  } else if (accion === "pause1" || accion === "pause2") {
    rect(cx - 6, cy - 5, 4, 10);
    rect(cx + 2, cy - 5, 4, 10);
  } else if (accion === "stop1" || accion === "stop2") {
    rect(cx - 5, cy - 5, 10, 10);
  }
}

function ejecutarAccion(accion) {
  if (accion === "play1")  { track1.loop();  playingTrack1 = true;  }
  if (accion === "pause1") { track1.pause(); playingTrack1 = false; }
  if (accion === "stop1")  { track1.stop();  playingTrack1 = false; }
  if (accion === "play2")  { track2.loop();  playingTrack2 = true;  }
  if (accion === "pause2") { track2.pause(); playingTrack2 = false; }
  if (accion === "stop2")  { track2.stop();  playingTrack2 = false; }
}


function dentroDeZona(zona) {
  return mouseX > zona.x && mouseX < zona.x + zona.w &&
         mouseY > zona.y && mouseY < zona.y + zona.h;
}


function dibujarVJ() {
  velVJ = VELOCIDADES[velActiva];
  tVJ  += 0.02 * velVJ;

  dibujarFocos();
  image(imgVJ, 0, 0, width, height);
  dibujarBotonesVelocidad();
  dibujarBotonGO();
  dibujarBotonesDerechos();
  dibujarPads();
  dibujarBotonesMedio();
  dibujarPantallaGrande();
  dibujarMonitorPreview();
  dibujarMiniPantallas();
  dibujarPantallaLateral();
  dibujarFlashTransicion();

  dibujarMultitud(0, 40, 1200, 300, tVJ, amplitud.getLevel());

  
}


function dibujarFocos() {
  let alphaFoco;
  if (flickerFocos) {
    let ondaLenta   = sin(tVJ * 18) * 0.5 + 0.5;
    let corteBrusco = sin(tVJ * 47) > 0.3 ? 1 : 0.1;
    alphaFoco = 255 * ondaLenta * corteBrusco;
  } else {
    alphaFoco = 210;
  }

  noStroke();
  fill(colorFocos[0], colorFocos[1], colorFocos[2], alphaFoco);

  let f0 = focos[0];
  let f1 = focos[1];
  quad(f0.x1a, f0.y1, f0.x1b, f0.y1, f0.x3, f0.y3, f0.x2, f0.y2);
  quad(f1.x1a, f1.y1, f1.x1b, f1.y1, f1.x3, f1.y3, f1.x2, f1.y2);
}

function dibujarBtnVelocidad(b, r, g, az) {
  let seleccionado = (b.id === velActiva);
  let encima       = dist(mouseX, mouseY, b.x, b.y) < b.r;
  let brillo       = seleccionado ? 1.0 : encima ? 0.7 : 0.25;

  noStroke();
  fill(r * brillo, g * brillo, az * brillo);
  ellipse(b.x, b.y, b.r * 2, b.r * 2);

  if (seleccionado) {
    noFill(); stroke(255, 255, 255, 200); strokeWeight(2);
    ellipse(b.x, b.y, b.r * 2 + 4, b.r * 2 + 4);
  }
}

function dibujarBotonesVelocidad() {
  dibujarBtnVelocidad(botonesVel[0], 140,   0,  0);
  dibujarBtnVelocidad(botonesVel[1], 255,  60,  0);
  dibujarBtnVelocidad(botonesVel[2], 255, 170,  0);
  dibujarBtnVelocidad(botonesVel[3], 255, 240, 50);
}


function dibujarBotonVJ(b, activo, r, g, az, icono) {
  let brillo = activo ? 1.0 : dentroDeZona(b) ? 0.7 : 0.25;
  dibujarRectBevel(b.x, b.y, b.w, b.h, r, g, az, brillo);

  if (activo) {
    noFill(); stroke(255, 255, 255, 200); strokeWeight(2);
    rect(b.x, b.y, b.w, b.h, 3);
  }

  let fc = activo ? color(0, 0, 0, 255) : color(200, 200, 200, 160);
  dibujarIconoVJ(icono, b.x + b.w / 2, b.y + b.h / 2, fc);

  if (b.timerPress > 0) {
    noStroke(); fill(255, 255, 255, b.timerPress);
    rect(b.x, b.y, b.w, b.h, 3);
    b.timerPress -= 12;
  }
}

function dibujarIconoVJ(icono, cx, cy, fc) {
  push();
  if (icono === "freeze") {
    fill(fc); noStroke();
    rect(cx - 6, cy - 7, 4, 14);
    rect(cx + 2, cy - 7, 4, 14);
  } else if (icono === "strobe") {
    fill(fc); noStroke();
    beginShape();
    vertex(cx + 2, cy - 9); vertex(cx - 4, cy - 1);
    vertex(cx, cy - 1);     vertex(cx - 3, cy + 9);
    vertex(cx + 5, cy + 1); vertex(cx, cy + 1);
    endShape(CLOSE);
  } else if (icono === "blackout") {
    stroke(fc); strokeWeight(3); noFill();
    line(cx - 6, cy - 6, cx + 6, cy + 6);
    line(cx + 6, cy - 6, cx - 6, cy + 6);
  } else if (icono === "zoom") {
    noFill(); stroke(fc); strokeWeight(1.5);
    ellipse(cx - 2, cy - 2, 11, 11);
    strokeWeight(2); line(cx + 3, cy + 3, cx + 8, cy + 8);
    strokeWeight(1.5);
    line(cx - 2, cy - 5, cx - 2, cy + 1);
    line(cx - 5, cy - 2, cx + 1, cy - 2);
  } else if (icono === "mirror") {
    stroke(fc); strokeWeight(1.5); noFill();
    line(cx - 2, cy, cx - 8, cy);
    line(cx - 8, cy, cx - 5, cy - 3); line(cx - 8, cy, cx - 5, cy + 3);
    line(cx + 2, cy, cx + 8, cy);
    line(cx + 8, cy, cx + 5, cy - 3); line(cx + 8, cy, cx + 5, cy + 3);
    strokeWeight(1); line(cx, cy - 6, cx, cy + 6);
  } else if (icono === "invert") {
    fill(fc); noStroke();
    arc(cx, cy, 14, 14, HALF_PI, HALF_PI + PI, PIE);
    noFill(); stroke(fc); strokeWeight(1.5);
    arc(cx, cy, 14, 14, -HALF_PI, HALF_PI);
    line(cx, cy - 7, cx, cy + 7);
  } else if (icono === "fade") {
    let cr = red(fc), cg = green(fc), cb = blue(fc);
    noStroke();
    fill(cr, cg, cb, 210); rect(cx - 8, cy - 6, 16, 4);
    fill(cr, cg, cb, 110); rect(cx - 8, cy - 1, 16, 4);
    fill(cr, cg, cb, 30);  rect(cx - 8, cy + 4, 16, 4);
  } else if (icono === "flicker") {
    stroke(fc); strokeWeight(1.5); noFill();
    beginShape();
    vertex(cx - 8, cy - 3); vertex(cx - 4, cy - 7);
    vertex(cx, cy - 3);     vertex(cx + 4, cy - 7);
    vertex(cx + 8, cy - 3);
    endShape();
    beginShape();
    vertex(cx - 8, cy + 4); vertex(cx - 4, cy + 7);
    vertex(cx, cy + 4);     vertex(cx + 4, cy + 7);
    vertex(cx + 8, cy + 4);
    endShape();
  }
  pop();
}


function dibujarBotonGO() {
  let b         = botonesVJ[0];
  let pendiente = (previewEfecto !== efectoVJ);
  let pulso     = 160 + sin(tVJ * 6) * 80;

  let brillo = pendiente ? pulso / 255 : dentroDeZona(b) ? 0.7 : 0.3;
  dibujarRectBevel(b.x, b.y, b.w, b.h, pendiente ? 255 : 60, pendiente ? 255 : 60, pendiente ? 255 : 60, brillo);

  noFill();
  stroke(255, 255, 255, pendiente ? pulso + 40 : 120);
  strokeWeight(pendiente ? 3 : 1.5);
  rect(b.x, b.y, b.w, b.h, 4);

  noStroke();
  fill(pendiente ? color(0, 0, 0, 255) : color(200, 200, 200, 140));
  let gx = b.x + b.w / 2, gy = b.y + b.h / 2;
  rect(gx - 12, gy - 4, 14, 8);
  triangle(gx + 2, gy - 9, gx + 2, gy + 9, gx + 14, gy);

  if (b.timerPress > 0) {
    noStroke(); fill(255, 255, 255, b.timerPress);
    rect(b.x, b.y, b.w, b.h, 4);
    b.timerPress -= 12;
  }
}

function dibujarBotonesDerechos() {
  dibujarBotonVJ(botonesVJ[1], freezeVJ,   255, 230,  50, "freeze");
  dibujarBotonVJ(botonesVJ[2], strobeVJ,   180, 220, 255, "strobe");
  dibujarBotonVJ(botonesVJ[3], blackoutVJ, 255, 255, 200, "blackout");
}

function dibujarPads() {
  for (let i = 0; i < padsVJ.length; i++) {
    let p = padsVJ[i];
    let brillo = dentroDeZona(p) ? 1.0 : 0.35;
    dibujarRectBevel(p.x, p.y, p.w, p.h, p.color[0], p.color[1], p.color[2], brillo);

    if (p.timerPress > 0) {
      noStroke(); fill(255, 255, 255, p.timerPress);
      rect(p.x, p.y, p.w, p.h, 2);
      p.timerPress -= 15;
    }
  }
}


function dibujarBotonesMedio() {
  dibujarBotonVJ(botonesMedio[0], zoomVJ,       255, 160,  0, "zoom");
  dibujarBotonVJ(botonesMedio[1], espejoVJ,     255, 100,  0, "mirror");
  dibujarBotonVJ(botonesMedio[2], invertirVJ,   255, 210,  0, "invert");
  dibujarBotonVJ(botonesMedio[3], fadeVJ,       200,  50,  0, "fade");
  dibujarBotonVJ(botonesMedio[4], flickerFocos, 255, 230, 80, "flicker");
}


function dibujarPantallaGrande() {
  let mostrar;
  if (blackoutVJ)    mostrar = false;
  else if (strobeVJ) mostrar = frameCount % 6 < 3;
  else               mostrar = true;

  let t = freezeVJ ? tVJFrozen : tVJ;

  if (mostrar) {
    dibujarEfecto(PANTALLA, efectoVJ, t, true, true);
  } else {
    noStroke(); fill(0);
    rect(PANTALLA.x, PANTALLA.y, PANTALLA.w, PANTALLA.h);
  }
}

function dibujarMonitorPreview() {
  dibujarEfecto(PREVIEW, previewEfecto, tVJ, false, false);
}


function dibujarMiniPantallas() {
  dibujarEfecto(miniPantallas[0], 0, tVJ, false, false);
  dibujarEfecto(miniPantallas[1], 1, tVJ, false, false);
  dibujarEfecto(miniPantallas[2], 2, tVJ, false, false);
  dibujarEfecto(miniPantallas[3], 3, tVJ, false, false);

  noFill(); stroke(255, 200, 0); strokeWeight(2);
  rect(miniPantallas[previewEfecto].x, miniPantallas[previewEfecto].y,
       miniPantallas[previewEfecto].w, miniPantallas[previewEfecto].h);

  stroke(255, 30, 30); strokeWeight(1);
  rect(miniPantallas[efectoVJ].x - 2, miniPantallas[efectoVJ].y - 2,
       miniPantallas[efectoVJ].w + 4,  miniPantallas[efectoVJ].h + 4);
}


function dibujarPantallaLateral() {
  let x = PANTALLA_LATERAL.x, y = PANTALLA_LATERAL.y;
  let w = PANTALLA_LATERAL.w, h = PANTALLA_LATERAL.h;

  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(x, y, w, h);
  drawingContext.clip();

  noStroke(); fill(0); rect(x, y, w, h);

  let spectrum  = fft.analyze();
  let numBarras = 28;
  let anchoB    = w / numBarras;

  for (let i = 0; i < numBarras; i++) {
    let idx    = floor(map(i, 0, numBarras, 0, spectrum.length / 3));
    let altura = map(spectrum[idx], 0, 255, 2, h * 0.88);
    fill(255, map(i, 0, numBarras, 20, 210), 0, 220);
    noStroke();
    rect(x + i * anchoB + 1, y + h - altura, anchoB - 2, altura);
  }

  dibujarGlarePantalla(x, y, w, h);

  drawingContext.restore();
  pop();
}


function dibujarFlashTransicion() {
  if (flashPantalla > 0) {
    noStroke(); fill(255, 255, 255, flashPantalla);
    rect(PANTALLA.x, PANTALLA.y, PANTALLA.w, PANTALLA.h);
    flashPantalla -= 8;
  }
}


function dibujarRectBevel(bx, by, bw, bh, rojo, verde, azul, brillo) {
  noStroke();
  fill(rojo * brillo, verde * brillo, azul * brillo);
  rect(bx, by, bw, bh, 4);
}


function dibujarEfecto(zona, efecto, t, aplicarMods, conMultitud) {
  let x = zona.x, y = zona.y, w = zona.w, h = zona.h;
  let cx = x + w / 2, cy = y + h / 2;
  let nivel = amplitud.getLevel();

  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(x, y, w, h);
  drawingContext.clip();

  noStroke(); fill(0); rect(x, y, w, h);

  if (aplicarMods) {
    if (fadeVJ)    drawingContext.globalAlpha = 0.35;
    if (zoomVJ)  { translate(cx, cy); scale(1.6); translate(-cx, -cy); }
    if (espejoVJ){ translate(cx * 2, 0); scale(-1, 1); }
  }

  if      (efecto === 0) dibujarEfecto0(x, y, w, h, cx, cy, t, nivel);
  else if (efecto === 1) dibujarEfecto1(cx, cy, w, h, t, nivel);
  else if (efecto === 2) dibujarEfecto2(x, y, w, h, cx, cy, t, nivel);
  else if (efecto === 3) dibujarEfecto3(x, y, w, h, cx, cy, t, nivel);

  if (aplicarMods && invertirVJ) {
    drawingContext.globalCompositeOperation = 'difference';
    drawingContext.globalAlpha = 1.0;
    noStroke(); fill(255); rect(x, y, w, h);
    drawingContext.globalCompositeOperation = 'source-over';
  }

  dibujarGlarePantalla(x, y, w, h);

  drawingContext.globalAlpha = 1.0;
  drawingContext.restore();
  pop();
}

function dibujarGlarePantalla(x, y, w, h) {
  drawingContext.save();

  let gradSombra = drawingContext.createLinearGradient(x, y, x, y + h);
  gradSombra.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
  gradSombra.addColorStop(1.0, 'rgba(0, 0, 0, 0.5)');
  drawingContext.fillStyle = gradSombra;
  drawingContext.fillRect(x, y, w, h);

  let gradReflejo = drawingContext.createLinearGradient(x, y, x + w * 0.6, y + h * 0.6);
  gradReflejo.addColorStop(0.0,  'rgba(255, 255, 255, 0.13)');
  gradReflejo.addColorStop(0.35, 'rgba(255, 255, 255, 0.05)');
  gradReflejo.addColorStop(1.0,  'rgba(255, 255, 255, 0)');
  drawingContext.fillStyle = gradReflejo;
  drawingContext.fillRect(x, y, w, h);

  drawingContext.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  drawingContext.lineWidth = 2;
  drawingContext.strokeRect(x + 1, y + 1, w - 2, h - 2);

  drawingContext.restore();
}

function dibujarEfecto0(x, y, w, h, cx, cy, t, nivel) {
  noFill();
  let maxRadio = max(w, h) * 0.8;

  strokeWeight(2);
  for (let i = 0; i < 8; i++) {
    let radio      = (t * 50 + i * (maxRadio / 8)) % maxRadio;
    let alpha      = map(radio, 0, maxRadio, 230, 0);
    let verdeParte = map(i, 0, 7, 0, 200);
    stroke(255, verdeParte, 0, alpha);
    ellipse(cx, cy, radio * 2 * (1 + nivel * 2), radio * 2 * (1 + nivel * 2));
  }

  strokeWeight(1);
  for (let i = 0; i < 18; i++) {
    let angulo       = (TWO_PI / 18) * i + t * 0.25;
    let radioInterno = 15 * (1 + nivel * 3);
    let radioExterno = maxRadio * 0.55 * (0.5 + 0.5 * sin(t * 1.8 + i * 0.7));
    stroke(255, map(i, 0, 18, 0, 200), 0, 140);
    line(cx + cos(angulo) * radioInterno, cy + sin(angulo) * radioInterno,
         cx + cos(angulo) * radioExterno, cy + sin(angulo) * radioExterno);
  }
}

function dibujarEfecto1(cx, cy, w, h, t, nivel) {
  noFill();

  for (let i = 0; i < 9; i++) {
    let tamanio   = (10 + i * 16) * (1 + nivel * 1.2);
    let cantLados = 3 + (i % 4);
    let direccion = (i % 2 === 0) ? 1 : -1;

    push();
    translate(cx, cy);
    rotate(t * 0.4 * direccion + i * 0.4);
    stroke(255, map(i, 0, 8, 220, 20), 0, 200);
    strokeWeight(1.5);

    beginShape();
    for (let v = 0; v < cantLados; v++) {
      let angulo = (TWO_PI / cantLados) * v - HALF_PI;
      vertex(cos(angulo) * tamanio, sin(angulo) * tamanio);
    }
    endShape(CLOSE);
    pop();
  }
}

function dibujarEfecto2(x, y, w, h, cx, cy, t, nivel) {
  noFill();

  for (let c = 0; c < 5; c++) {
    stroke(255, map(c, 0, 4, 20, 210), 0, 190);
    strokeWeight(1.5);

    beginShape();
    for (let a = 0; a <= TWO_PI * 4; a += 0.06) {
      vertex(
        cx + cos((2 + c * 0.7) * a + t * 0.8 + c * 0.5) * (w * 0.42) * (1 + nivel * 0.8),
        cy + sin((3 + c * 0.4) * a)                       * (h * 0.42) * (1 + nivel * 0.8)
      );
    }
    endShape();
  }
}

function dibujarEfecto3(x, y, w, h, cx, cy, t, nivel) {
  let puntos = [];

  for (let i = 0; i < 22; i++) {
    puntos.push({
      x: cx + cos(t * 0.5 + i * 0.85) * w * 0.42 * sin(t * 0.3 + i * 0.7),
      y: cy + sin(t * 0.7 + i * 0.65) * h * 0.42 * cos(t * 0.2 + i * 1.1),
    });
  }

  let distMax = min(w, h) * 0.38;
  for (let i = 0; i < puntos.length; i++) {
    for (let j = i + 1; j < puntos.length; j++) {
      let d = dist(puntos[i].x, puntos[i].y, puntos[j].x, puntos[j].y);
      if (d < distMax) {
        stroke(255, map(i, 0, 22, 0, 200), 0, map(d, 0, distMax, 200, 0));
        strokeWeight(1);
        line(puntos[i].x, puntos[i].y, puntos[j].x, puntos[j].y);
      }
    }
  }

  noStroke();
  for (let i = 0; i < puntos.length; i++) {
    fill(255, map(i, 0, 22, 0, 220), 0);
    ellipse(puntos[i].x, puntos[i].y, 3 + nivel * 8, 3 + nivel * 8);
  }
}


function dibujarMultitud(x, y, w, h, t, nivel) {
  let cantidadPersonas = floor(w / 20);

  for (let fila = 0; fila < 2; fila++) {
    let escala        = fila === 0 ? 0.55 : 1.0;
    let alturaPersona = h * 0.28 * escala;
    let tamCabeza     = alturaPersona * 0.32;
    let anchoCuerpo   = alturaPersona * 0.42;
    let baseY         = fila === 0 ? y + h - alturaPersona * 0.1 : y + h + alturaPersona * 0.15;
    let alpha         = fila === 0 ? 200 : 255;
    let colorBase     = fila === 0 ? color(15, 4, 0, alpha) : color(8, 2, 0, alpha);

    for (let i = 0; i < cantidadPersonas; i++) {
      let px     = x + (i + 0.5) * (w / cantidadPersonas);
      let pyBase = baseY + (px > x + w * 0.78 ? 5 : 0);

      fill(colorBase); noStroke();
      rect(px - anchoCuerpo / 2, pyBase - alturaPersona * 0.72, anchoCuerpo, alturaPersona * 0.68, anchoCuerpo * 0.3);
      ellipse(px, pyBase - alturaPersona * 0.72 - tamCabeza * 0.55, tamCabeza, tamCabeza);

      let anguloBalance = sin(t * 4.5 + i * 1.7 + fila * 3.4) * 0.35;
      let largoBrazo    = alturaPersona * 0.5;
      stroke(colorBase); strokeWeight(max(1.5, anchoCuerpo * 0.22));

      let bxIzq = px - anchoCuerpo * 0.35, byHom = pyBase - alturaPersona * 0.6;
      line(bxIzq, byHom, bxIzq - anchoCuerpo * 0.5, byHom - largoBrazo + anguloBalance * largoBrazo);
      let bxDer = px + anchoCuerpo * 0.35;
      line(bxDer, byHom, bxDer + anchoCuerpo * 0.5, byHom - largoBrazo - anguloBalance * largoBrazo);
    }
  }
}


function dibujarVinilos() {
  dibujarVinilo(202, 392, 145);
  dibujarVinilo(986, 392, 145);
}

function dibujarGlowVinilos() {
  dibujarGlowVinilo(202, 392, 145, rewindFlashL);
  dibujarGlowVinilo(986, 392, 145, rewindFlashR);
  rewindFlashL = max(0, rewindFlashL - 10);
  rewindFlashR = max(0, rewindFlashR - 10);
}

function dibujarGlowVinilo(cx, cy, radio, flash) {
  let encima = dist(mouseX, mouseY, cx, cy) < radio;
  noFill();
  if (encima) {
    stroke(255, 90, 10, 55 + sin(frameCount * 0.14) * 40);
    strokeWeight(5);
    ellipse(cx, cy, (radio + 14) * 2, (radio + 14) * 2);
  }
  if (flash > 0) {
    stroke(255, 220, 80, flash);
    strokeWeight(7);
    ellipse(cx, cy, (radio + 10) * 2, (radio + 10) * 2);
  }
}

function dibujarVinilo(cx, cy, radio) {
  push();
  translate(cx, cy);
  rotate(tVinilo);

 
  fill(12, 12, 12); noStroke();
  ellipse(0, 0, radio * 2, radio * 2);

  noFill();
  for (let i = 0; i < 16; i++) {
    let r = radio * 0.28 + i * (radio * 0.65 / 16);
    stroke(32 + i * 3, 32 + i * 3, 32 + i * 3);
    strokeWeight(0.7);
    ellipse(0, 0, r * 2, r * 2);
  }

 
  fill(140, 45, 5); noStroke();
  ellipse(0, 0, radio * 0.44, radio * 0.44);

  fill(190, 70, 8);
  ellipse(0, 0, radio * 0.30, radio * 0.30);


  noFill(); stroke(255, 90, 10, 100); strokeWeight(1);
  ellipse(0, 0, radio * 0.38, radio * 0.38);

  
  stroke(220, 90, 15, 150); strokeWeight(1);
  line(-radio * 0.13, 0, radio * 0.13, 0);
  line(0, -radio * 0.13, 0, radio * 0.13);

 
  fill(0); noStroke();
  ellipse(0, 0, 8, 8);

  pop();
}

//introducción
function dibujarIntro() {
  tVJ += 0.02;
  background(0);

  let cx = width / 2, cy = height / 2;

  noFill();
  for (let i = 0; i < 9; i++) {
    let r = (tVJ * 28 + i * 110) % 990;
    stroke(255, 90, 10, map(r, 0, 990, 55, 0));
    strokeWeight(1.5);
    ellipse(cx, cy, r * 2, r * 2);
  }

  noStroke();
  fill(8, 3, 0, 215);
  rect(cx - 360, cy - 280, 720, 560, 8);
  noFill();
  stroke(255, 90, 10, 55);
  strokeWeight(1);
  rect(cx - 360, cy - 280, 720, 560, 8);

  textAlign(CENTER, CENTER);

  noStroke();
  fill(255, 90, 10);
  textFont("Courier New");
  textStyle(BOLD);
  textSize(44);
  text("DJ + VJ CONTROLLER", cx, cy - 205);

  stroke(255, 90, 10, 110);
  strokeWeight(1.5);
  line(cx - 270, cy - 175, cx + 270, cy - 175);

  noStroke();
  fill(175, 95, 20);
  textStyle(NORMAL);
  textSize(12);
  text("TRABAJO FINAL  ·  POD  ·  DITELLA", cx, cy - 150);

  fill(255, 210, 65);
  textStyle(BOLD);
  textSize(21);
  text("por Catalina Basaldua y Julieta Avich", cx, cy - 115);

  stroke(55, 30, 5);
  strokeWeight(1);
  line(cx - 250, cy - 88, cx + 250, cy - 88);

  noStroke();
  fill(165, 165, 165);
  textStyle(NORMAL);
  textSize(14);
  text("Controlador interactivo de audio y visuales en tiempo real.", cx, cy - 60);
  fill(110, 110, 110);
  textSize(12);
  text("Mezclá música, activá efectos visuales y controlá el escenario.", cx, cy - 36);

  stroke(55, 30, 5);
  strokeWeight(1);
  line(cx - 250, cy - 8, cx + 250, cy - 8);

  
  let hovDJ = mouseX > cx - 290 && mouseX < cx - 50 && mouseY > cy + 10 && mouseY < cy + 120;
  dibujarRectBevel(cx - 290, cy + 10, 240, 110, 255, 90, 10, hovDJ ? 0.75 : 0.42);
  noStroke();
  fill(hovDJ ? 0 : 230, hovDJ ? 0 : 155, hovDJ ? 0 : 55);
  textFont("Courier New");
  textStyle(BOLD);
  textSize(30);
  text("[ D ]", cx - 170, cy + 48);
  textSize(12);
  text("VISTA DJ", cx - 170, cy + 80);
  fill(hovDJ ? 40 : 115, hovDJ ? 40 : 115, hovDJ ? 40 : 115);
  textStyle(NORMAL);
  textSize(10);
  text("mezclas · luces · audio", cx - 170, cy + 98);

  
  let hovVJ = mouseX > cx + 50 && mouseX < cx + 290 && mouseY > cy + 10 && mouseY < cy + 120;
  dibujarRectBevel(cx + 50, cy + 10, 240, 110, 255, 130, 0, hovVJ ? 0.75 : 0.42);
  noStroke();
  fill(hovVJ ? 0 : 255, hovVJ ? 0 : 175, hovVJ ? 0 : 60);
  textFont("Courier New");
  textStyle(BOLD);
  textSize(30);
  text("[ V ]", cx + 170, cy + 48);
  textSize(12);
  text("VISTA VJ", cx + 170, cy + 80);
  fill(hovVJ ? 40 : 115, hovVJ ? 40 : 115, hovVJ ? 40 : 115);
  textStyle(NORMAL);
  textSize(10);
  text("visuales · efectos · focos", cx + 170, cy + 98);

  let pulso = 140 + sin(tVJ * 3.5) * 90;
  noStroke();
  fill(255, 90, 10, pulso);
  textFont("Courier New");
  textStyle(BOLD);
  textSize(13);
  text("— presioná D o V para comenzar —", cx, cy + 195);

  textStyle(NORMAL);
  textFont("sans-serif");
}



function mousePressed() {
  if (mostrarCoords) {
    if (clicksCoord.length < 2) clicksCoord.push({ x: mouseX, y: mouseY });
    return;
  }

  if (vista === "INTRO") {
    userStartAudio();
    let cx = width / 2, cy = height / 2;
    if (mouseX > cx - 290 && mouseX < cx - 50  && mouseY > cy + 10 && mouseY < cy + 120) vista = "DJ";
    if (mouseX > cx + 50  && mouseX < cx + 290 && mouseY > cy + 10 && mouseY < cy + 120) vista = "VJ";
    return;
  }

  if (vista === "DJ") {
    if (dist(mouseX, mouseY, 202, 392) < 145) {
      rewindFlashL = 255;
      if (soundRewind.isPlaying()) soundRewind.stop();
      soundRewind.play(0, 1, 1, 1);
      return;
    }
    if (dist(mouseX, mouseY, 986, 392) < 145) {
      rewindFlashR = 255;
      if (soundRewind.isPlaying()) soundRewind.stop();
      soundRewind.play(0, 1, 1, 1);
      return;
    }

    let cx = POS_CROSS.x, cy = POS_CROSS.y, cw = POS_CROSS.w;
    if (dist(mouseX, mouseY, cx + crossfader * cw, cy + 4) < 12) arrastandoCross = true;

    if (mouseX > POS_FILTRO.x && mouseX < POS_FILTRO.x + 120 && mouseY > POS_FILTRO.y && mouseY < POS_FILTRO.y + 24) {
      filtroOn = !filtroOn;
      if (filtroOn) {
        track1.disconnect();
        track1.connect(filtro);
        filtro.freq(800);
      } else {
        track1.disconnect();
        track1.connect();
        filtro.freq(22050);
      }
    }

    if (mouseX > POS_HYPE.x && mouseX < POS_HYPE.x + 120 && mouseY > POS_HYPE.y && mouseY < POS_HYPE.y + 24) {
      hypeMode = !hypeMode;
      track1.rate(hypeMode ? 1.15 : 1);
      track2.rate(hypeMode ? 1.15 : 1);
    }

    if (dist(mouseX, mouseY, botonesLuz[0].x, botonesLuz[0].y) < botonesLuz[0].r) {
      if (colorLuz !== null) { colorLuz = null; }
      else { colorLuz = color(255, 100, 0, 80); luzBlanca = false; luzRandom = false; }
    }
    if (dist(mouseX, mouseY, botonesLuz[1].x, botonesLuz[1].y) < botonesLuz[1].r) {
      luzBlanca = !luzBlanca; luzRandom = false; colorLuz = null;
    }
    if (dist(mouseX, mouseY, botonesLuz[2].x, botonesLuz[2].y) < botonesLuz[2].r) {
      luzRandom = !luzRandom; luzBlanca = false; colorLuz = null;
    }

    for (let i = 0; i < botonesDJ.length; i++) {
      if (dentroDeZona(botonesDJ[i])) ejecutarAccion(botonesDJ[i].accion);
    }
    return;
  }

  for (let i = 0; i < miniPantallas.length; i++) {
    if (dentroDeZona(miniPantallas[i])) previewEfecto = i;
  }

  if (dentroDeZona(botonesVJ[0])) { efectoVJ = previewEfecto; botonesVJ[0].timerPress = 255; flashPantalla = 200; }
  if (dentroDeZona(botonesVJ[1])) { freezeVJ   = !freezeVJ;   if (freezeVJ) tVJFrozen = tVJ; botonesVJ[1].timerPress = 255; }
  if (dentroDeZona(botonesVJ[2])) { strobeVJ   = !strobeVJ;   botonesVJ[2].timerPress = 255; }
  if (dentroDeZona(botonesVJ[3])) { blackoutVJ = !blackoutVJ; botonesVJ[3].timerPress = 255; }

  if (dentroDeZona(botonesMedio[0])) { zoomVJ       = !zoomVJ;       botonesMedio[0].timerPress = 255; }
  if (dentroDeZona(botonesMedio[1])) { espejoVJ     = !espejoVJ;     botonesMedio[1].timerPress = 255; }
  if (dentroDeZona(botonesMedio[2])) { invertirVJ   = !invertirVJ;   botonesMedio[2].timerPress = 255; }
  if (dentroDeZona(botonesMedio[3])) { fadeVJ       = !fadeVJ;       botonesMedio[3].timerPress = 255; }
  if (dentroDeZona(botonesMedio[4])) { flickerFocos = !flickerFocos; botonesMedio[4].timerPress = 255; }

  for (let i = 0; i < botonesVel.length; i++) {
    if (dist(mouseX, mouseY, botonesVel[i].x, botonesVel[i].y) < botonesVel[i].r) velActiva = botonesVel[i].id;
  }

  for (let i = 0; i < padsVJ.length; i++) {
    if (dentroDeZona(padsVJ[i])) { colorFocos = padsVJ[i].color; padsVJ[i].timerPress = 255; }
  }
}

function mouseDragged() {
  if (arrastandoCross) {
    crossfader = constrain(map(mouseX, POS_CROSS.x, POS_CROSS.x + POS_CROSS.w, 0, 1), 0, 1);
  }
}

function mouseReleased() {
  arrastandoCross = false;
}

function keyPressed() {
  userStartAudio();
  if (key === "d" || key === "D") vista = "DJ";
  if (key === "v" || key === "V") vista = "VJ";
}
