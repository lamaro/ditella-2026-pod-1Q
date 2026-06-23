
let vistaActual = "DJ";

let cancion;
let cancion2;
let amplitud;
let amplitud2;
let nivel = 0;

let fondo;
let vinilos;
let vinilosMascarados;
let slider;

let cabina;
let luzPNG;

let historial = [];
let sliderX = 597;
let arrastrandoDJ = false;
let tiempo = 0;
let colorLedNuevo = [60, 210, 255];
let nivelAnterior = 0;
let nombreCancion1 = "What is Love";
let nombreCancion2 = "Freed from Desire";
let posTexto1 = 200;
let posTexto2 = 200;
let gama = [
  [220, 80, 80],    
  [150, 180, 255],  
  [100, 130, 220], 
  [100, 180, 130]   
];

const SLIDER_MIN_X = 558;
const SLIDER_MAX_X = 636;
const SLIDER_Y = 641;


let animacion1Activa = false;
let animacion2Activa = false;
let animacion3Activa = false;
let animacion4Activa = false;
let animacion5Activa = false;
let animacion6Activa = false;
let animacion7Activa = false;
let animacion8Activa = false;
let animacion9Activa = false;
let animacion10Activa = false;
let animacion11Activa = false;
let animacion12Activa = false;
let lucesActivas = true;
let radio12 = 0;
let rectX = 0;
let particles = [];
let flashes = [];
let indiceColor = 0;
let colorTimer = 0;
let lowLightsMode = false;
let cabinaOscura;


let boton1x = 440; let boton1y = 570; let boton1w = 70; let boton1h = 25;
let boton2x = 524; let boton2y = 569; let boton2w = 70; let boton2h = 25;
let boton3x = 608; let boton3y = 572; let boton3w = 70; let boton3h = 25;
let boton4x = 695; let boton4y = 570; let boton4w = 70; let boton4h = 25;
let boton5x = 433; let boton5y = 602; let boton5w = 70; let boton5h = 25;
let boton6x = 522; let boton6y = 602; let boton6w = 70; let boton6h = 25;
let boton7x = 609; let boton7y = 603; let boton7w = 70; let boton7h = 25;
let boton8x = 697; let boton8y = 603; let boton8w = 70; let boton8h = 25;
let boton9x = 425; let boton9y = 637; let boton9w = 70; let boton9h = 25;
let boton10x = 519; let boton10y = 637; let boton10w = 70; let boton10h = 25;
let boton11x = 609; let boton11y = 636; let boton11w = 74; let boton11h = 25;
let boton12x = 700; let boton12y = 638; let boton12w = 70; let boton12h = 25;
let boton13x = 590; let boton13y = 990; let boton13w = 70; let boton13h = 25;
let boton14x = 697; let boton14y = 990; let boton14w = 70; let boton14h = 25;
let boton15x = 804; let boton15y = 990; let boton15w = 70; let boton15h = 25;
let boton16x = 911; let boton16y = 990; let boton16w = 70; let boton16h = 25;


function preload() {
  fondo = loadImage("assets/foto.png");
  vinilos = loadImage("assets/vinilos.png");
  slider = loadImage("assets/slider.png");
  cabina = loadImage("assets/Cabina VJ.png");
  cabina2 = loadImage("assets/Cabina VJ 2.png");
  cabinaOscura = loadImage("assets/Low Lights cabina.png");

  boton1 = loadImage("assets/Boton 1.png");
  boton2 = loadImage("assets/Boton 2.png");
  boton3 = loadImage("assets/Boton 3.png");
  boton4 = loadImage("assets/Boton 4.png");
  boton5 = loadImage("assets/Boton 5.png");
  boton6 = loadImage("assets/Boton 6.png");
  boton7 = loadImage("assets/Boton 7.png");
  boton8 = loadImage("assets/Boton 8.png");
  boton9 = loadImage("assets/Boton 9.png");
  boton10 = loadImage("assets/Boton 10.png");
  boton11 = loadImage("assets/Boton 11.png");
  boton12 = loadImage("assets/Boton 12.png");



  cancion = loadSound("sounds/What is Love.mp3");
  cancion2 = loadSound("sounds/Freed from Desire.mp3");


  luzPNG = loadImage("assets/Stage Lighting Light PNG - 1000x1000.png");
}


function setup() {
  createCanvas(1200, 800);
  frameRate(20);

  amplitud = new p5.Amplitude();
  amplitud2 = new p5.Amplitude();

  let mascara = createGraphics(vinilos.width, vinilos.height);
  mascara.background(0);
  mascara.noStroke();
  mascara.fill(255);
  mascara.circle(344, 554, 180);
  mascara.circle(921, 553, 180);

  vinilosMascarados = vinilos.get();
  vinilosMascarados.mask(mascara);
}

function draw() {


  if (vistaActual === "DJ") dibujarDJ();
  if (vistaActual === "VJ") dibujarVJ();

}

function dibujarDJ() {
  image(vinilosMascarados, 0, 0, width, height);

  let nivel1 = amplitud.getLevel();
  let nivel2 = amplitud2.getLevel();
  colorTimer += nivel * 5;
  if (colorTimer > 10) {
    indiceColor = (indiceColor + 1) % gama.length;
    colorTimer = 0;
  }
  noStroke();
  let opacidad1 = map(nivel1, 0, 0.3, 0, 255, true);
  let opacidad2 = map(nivel2, 0, 0.3, 0, 255, true);

  fill(255, 0, 0, opacidad1);
  circle(351, 554, 180);
  fill(255, 0, 0, opacidad2);
  circle(821, 562, 180);

  image(fondo, 0, 0, width, height);

  dibujarLedNuevo();
  dibujarTextoCinta();

  let mix = map(sliderX, SLIDER_MIN_X, SLIDER_MAX_X, 0, 1);
  nivel = lerp(nivel1, nivel2, mix);

  historial.push(nivel);
  if (historial.length > 150) historial.shift();

  noFill();
  stroke(50);
  strokeWeight(2.5);
  strokeJoin(ROUND);
  beginShape();
  for (let i = 0; i < historial.length; i++) {
    let x = map(i, 0, historial.length, 525, 675);
    let y = map(historial[i], 0, 0.1, 475, 495);
    y = constrain(y, 475, 495);
    vertex(x, y);
  }
  endShape();

  if (cancion.isPlaying()) tiempo = floor(cancion.currentTime());

  let minutos = floor(tiempo / 60);
  let segundos = tiempo % 60;
  let segundosTexto = segundos < 10 ? "0" + segundos : segundos;
  let minutosTexto = minutos < 10 ? "0" + minutos : minutos;

  fill("#856f5a");
  noStroke();
  textSize(17);
  textAlign(CENTER);
  text(minutosTexto + ":" + segundosTexto, 330, 725);

  let tono = map(nivel, 0, 0.4, 0, 500);
  fill(0, 100, tono, 100); circle(625, 765, 35);
  fill(0, tono, 255, 100); circle(575, 765, 35);
  fill(tono, 150, 255, 100); circle(525, 765, 35);

  fill("#000000");
  noStroke();
  textSize(17);
  textAlign(CENTER);
  text("⟳", 859, 705);

  imageMode(CENTER);
  image(slider, sliderX, SLIDER_Y, 18, 30);
  imageMode(CORNER);

  noFill()
  noStroke();
  rect(390, 726, 80, 30);
  fill("#856f5a");
  textSize(14);
  textAlign(CENTER);
  text("IR A VJ", 425, 745);
}

function dibujarVJ() {
  background(0);
  let nivel1 = amplitud.getLevel();
  let nivel2 = amplitud2.getLevel();
  let mix = map(sliderX, SLIDER_MIN_X, SLIDER_MAX_X, 0, 1);
  nivel = lerp(nivel1, nivel2, mix);


  for (let i = flashes.length - 1; i >= 0; i--) {
    let f = flashes[i];
    let diametro = map(nivel, 0, 0.3, f.size * 0.7, f.size * 1.5, true);
    noStroke();
    fill(f.color[0], f.color[1], f.color[2], f.alpha);
    circle(f.x, f.y, diametro);
    f.alpha -= 5;
    f.size += 1.2;
    if (f.alpha <= 0) flashes.splice(i, 1);
  }


  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vida -= 3;
    fill(p.color[0], p.color[1], p.color[2], p.vida);
    noStroke();
    circle(p.x, p.y, p.size);
    if (p.vida <= 0) particles.splice(i, 1);
  }

  if (animacion1Activa) dibujarAnimacion1();
  if (animacion2Activa) dibujarAnimacion2();
  if (animacion3Activa) dibujarAnimacion3();
  if (animacion4Activa) dibujarAnimacion4();
  if (animacion5Activa) dibujarAnimacion5();
  if (animacion6Activa) dibujarAnimacion6();
  if (animacion7Activa) dibujarAnimacion7();
  if (animacion8Activa) dibujarAnimacion8();
  if (animacion9Activa) dibujarAnimacion9();
  if (animacion10Activa) dibujarAnimacion10();
  if (animacion11Activa) dibujarAnimacion11();
  if (animacion12Activa) dibujarAnimacion12();


  fill(220, 80, 80);
  noStroke();
  rect(boton1x - 10, boton1y, boton1w + 20, boton1h);
  fill(150, 180, 255);
  rect(boton2x - 10, boton2y, boton2w + 20, boton2h);
  fill(100, 180, 130)
  rect(boton3x - 10, boton3y, boton3w + 20, boton3h);
  fill(220, 80, 80);
  rect(boton4x - 10, boton4y, boton4w + 20, boton4h);
  fill(150, 180, 255);
  rect(boton5x - 10, boton5y, boton5w + 20, boton5h);
  fill(220, 80, 80);
  rect(boton6x - 10, boton6y, boton6w + 20, boton6h);
  fill(100, 130, 220)
  rect(boton7x - 10, boton7y, boton7w + 20, boton7h);
  fill(150, 180, 255);
  rect(boton8x - 10, boton8y, boton8w + 20, boton8h);
  fill(220, 80, 80);
  rect(boton9x - 10, boton9y, boton9w + 20, boton9h);
  fill(100, 180, 130)
  rect(boton10x - 10, boton10y, boton10w + 20, boton10h);
  fill(150, 180, 255);
  rect(boton11x - 10, boton11y, boton11w + 20, boton11h);
  fill(100, 180, 130)
  rect(boton12x - 10, boton12y, boton12w + 20, boton12h);



  if (lowLightsMode) {
    image(cabinaOscura, 0, 0, width, height);
  } else {
    image(cabina, 0, 0, width, height);
  }


  if (animacion1Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton1, boton1x - 8, boton1y - 1);
  noTint();

  if (animacion2Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton2, boton2x - 8, boton2y - 1);
  noTint();

  if (animacion3Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton3, boton3x - 6, boton3y - 13);
  noTint();

  if (animacion4Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton4, boton4x - 6, boton4y - 13);
  noTint();

  if (animacion5Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton5, boton5x - 9, boton5y - 12);
  noTint();

  if (animacion6Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton6, boton6x - 6, boton6y - 10);
  noTint();

  if (animacion7Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton7, boton7x - 6, boton7y - 10);
  noTint();

  if (animacion8Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton8, boton8x - 6, boton8y - 10);
  noTint();

  if (animacion9Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton9, boton9x - 8, boton9y - 10);
  noTint();

  if (animacion10Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton10, boton10x - 6, boton10y - 10);
  noTint();

  if (animacion11Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton11, boton11x - 6, boton11y - 10);
  noTint();

  if (animacion12Activa) { tint(255, 50); } else { tint(255, 255); }
  image(boton12, boton12x - 9, boton12y - 10);
  noTint();

  if (lucesActivas) dibujarLucesEscenario();
  fill(255);
  noStroke();
  textSize(14);
  textAlign(LEFT);
  text("mouseX: " + mouseX + "  mouseY: " + mouseY, 300, 50);

  noFill()
  noStroke();
  rect(310, 710, 80, 30);
  fill("#856f5a");
  textSize(14);
  textAlign(CENTER);
  text("IR A DJ", 345, 730);

  if (lowLightsMode) fill(50, 50, 100);
  else fill(150, 150, 200);
  noStroke();
  noFill()
  rect(766, 724, 884, 740);
  fill("#856f5a");
  textSize(14);
  textAlign(CENTER);
  text("LOW LIGHTS", 830, 736);

}
function mousePressed() {
  if (vistaActual === "DJ" && mouseX > 390 && mouseX < 500 && mouseY > 726 && mouseY < 780) {
    vistaActual = "VJ";
    return;
  }

  if (vistaActual === "VJ" && mouseX > 310 && mouseX < 360 && mouseY > 710 && mouseY < 730) {
    vistaActual = "DJ";
    return;
  }

  if (vistaActual === "DJ") mousePressDJ();
  if (vistaActual === "VJ") mousePressVJ();
}

function mousePressDJ() {
  userStartAudio();

  if (mouseX > 660 && mouseX < 720 && mouseY > 740 && mouseY < 770) {
    if (!cancion.isPlaying()) {
      cancion.play();
      cancion2.play();
      amplitud.setInput(cancion);
      amplitud2.setInput(cancion2);
      actualizarMezcla();
    }
  }

  if (mouseX > 720 && mouseX < 775 && mouseY > 740 && mouseY < 770) {
    if (cancion.isPlaying()) {
      cancion.pause();
      cancion2.pause();
      nivel = 0; 
    }
  }

  if (mouseX > 840 && mouseX < 880 && mouseY > 690 && mouseY < 720) {
    cancion.stop();
    cancion2.stop();
    cancion.play();
    cancion2.play();
    amplitud.setInput(cancion);
    amplitud2.setInput(cancion2);
    tiempo = 0;
    historial = [];
    actualizarMezcla();
  }

  if (mouseX > SLIDER_MIN_X && mouseX < SLIDER_MAX_X &&
    mouseY > SLIDER_Y - 25 && mouseY < SLIDER_Y + 25) {
    arrastrandoDJ = true;
  }
}


function mousePressVJ() {
  if (mouseX > boton1x && mouseX < boton1x + boton1w && mouseY > boton1y && mouseY < boton1y + boton1h) animacion1();
  if (mouseX > boton2x && mouseX < boton2x + boton2w && mouseY > boton2y && mouseY < boton2y + boton2h) animacion2();
  if (mouseX > boton3x && mouseX < boton3x + boton3w && mouseY > boton3y && mouseY < boton3y + boton3h) animacion3();
  if (mouseX > boton4x && mouseX < boton4x + boton4w && mouseY > boton4y && mouseY < boton4y + boton4h) animacion4();
  if (mouseX > boton5x && mouseX < boton5x + boton5w && mouseY > boton5y && mouseY < boton5y + boton5h) animacion5();
  if (mouseX > boton6x && mouseX < boton6x + boton6w && mouseY > boton6y && mouseY < boton6y + boton6h) animacion6();
  if (mouseX > boton7x && mouseX < boton7x + boton7w && mouseY > boton7y && mouseY < boton7y + boton7h) animacion7();
  if (mouseX > boton8x && mouseX < boton8x + boton8w && mouseY > boton8y && mouseY < boton8y + boton8h) animacion8();
  if (mouseX > boton9x && mouseX < boton9x + boton9w && mouseY > boton9y && mouseY < boton9y + boton9h) animacion9();
  if (mouseX > boton10x && mouseX < boton10x + boton10w && mouseY > boton10y && mouseY < boton10y + boton10h) animacion10();
  if (mouseX > boton11x && mouseX < boton11x + boton11w && mouseY > boton11y && mouseY < boton11y + boton11h) animacion11();
  if (mouseX > boton12x && mouseX < boton12x + boton12w && mouseY > boton12y && mouseY < boton12y + boton12h) animacion12();
  if (mouseX > boton13x && mouseX < boton13x + boton13w && mouseY > boton13y && mouseY < boton13y + boton13h) animacion13();
  if (mouseX > boton14x && mouseX < boton14x + boton14w && mouseY > boton14y && mouseY < boton14y + boton14h) animacion14();
  if (mouseX > boton15x && mouseX < boton15x + boton15w && mouseY > boton15y && mouseY < boton15y + boton15h) animacion15();
  if (mouseX > boton16x && mouseX < boton16x + boton16w && mouseY > boton16y && mouseY < boton16y + boton16h) animacion16();
  if (mouseX > 766 && mouseX < 884 && mouseY > 724 && mouseY < 740) {
  lowLightsMode = !lowLightsMode;
}
}
(766, 724, 884, 740);

function mouseDragged() {
  if (arrastrandoDJ) {
    sliderX = constrain(mouseX, SLIDER_MIN_X, SLIDER_MAX_X);
    actualizarMezcla();
  }
}

function mouseReleased() {
  arrastrandoDJ = false;
}

function keyPressed() {
  if (key === "d") vistaActual = "DJ";
  if (key === "v") vistaActual = "VJ";
}


function actualizarMezcla() {
  let mix = map(sliderX, SLIDER_MIN_X, SLIDER_MAX_X, 0, 1);
  cancion.setVolume(1 - mix);
  cancion2.setVolume(mix);
}

function dibujarLedNuevo() {
  if (nivel - nivelAnterior > 0.02) {
    colorLedNuevo = [random(255), random(255), random(255)];
  }
  nivelAnterior = nivel;
  noStroke();
  fill(colorLedNuevo[0], colorLedNuevo[1], colorLedNuevo[2]);
  rect(446, 220, 320, 14);
}

function dibujarTextoCinta() {
  noStroke();
  fill("#5a4a3a");
  textSize(13);
  textAlign(LEFT);

  let x1 = 301, y1 = 483, ancho1 = 173;
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(x1, y1, ancho1, 20);
  drawingContext.clip();
  text(nombreCancion1, x1 + posTexto1, y1 + 14);
  drawingContext.restore();
  posTexto1--;
  if (posTexto1 < -100) posTexto1 = ancho1;

  let x2 = 692, y2 = 480, ancho2 = 202;
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(x2, y2, ancho2, 20);
  drawingContext.clip();
  text(nombreCancion2, x2 + posTexto2, y2 + 14);
  drawingContext.restore();
  posTexto2--;
  if (posTexto2 < -100) posTexto2 = ancho2;
}

function animacion1() {
  animacion1Activa = !animacion1Activa;
}

function animacion2() { animacion2Activa = !animacion2Activa; }

function animacion3() {
  animacion3Activa = !animacion3Activa;
}

function animacion4() {
  animacion4Activa = !animacion4Activa;
}

function animacion5() {
  animacion5Activa = !animacion5Activa;
}

function animacion6() {
  animacion6Activa = !animacion6Activa;
}
function animacion7() {
  animacion7Activa = !animacion7Activa;
}

function animacion8() {
  animacion8Activa = !animacion8Activa;
}

function animacion9() { animacion9Activa = !animacion9Activa; }

function animacion10() { animacion10Activa = !animacion10Activa; }

function animacion11() { animacion11Activa = !animacion11Activa; }

function animacion12() { animacion12Activa = !animacion12Activa; radio12 = 0; }

function animacion13() {
  let tamanio = map(nivel, 0, 0.3, 20, 120);
  flashes.push({ x: width / 2, y: height * 0.3, size: tamanio, color: [random(255), random(255), random(255)], alpha: 255 });
}

function animacion14() {
  let tamanio = map(nivel, 0, 0.3, 20, 120);
  flashes.push({ x: width / 2, y: height * 0.3, size: tamanio, color: [random(255), random(255), random(255)], alpha: 255 });
}

function animacion15() {
  let tamanio = map(nivel, 0, 0.3, 20, 120);
  flashes.push({ x: width / 2, y: height * 0.3, size: tamanio, color: [random(255), random(255), random(255)], alpha: 255 });
}

function animacion16() {
  let tamanio = map(nivel, 0, 0.3, 20, 120);
  flashes.push({ x: width / 2, y: height * 0.3, size: tamanio, color: [random(255), random(255), random(255)], alpha: 255 });
}

function dibujarAnimacion1() {
  let c = gama[indiceColor];
  let largo = map(nivel, 0, 0.3, 70, width);
  let grosor = map(nivel, 0, 0.3, 1, 20);
  noFill();
  for (let i = 0; i < 10; i++) {
    stroke(c[0], c[1], c[2]);
    strokeWeight(grosor);
    let y = random(height);
    line(0, y, largo, y);
  }
}

function dibujarAnimacion2() {
  let c = gama[floor(random(gama.length))];
  let radio = map(nivel, 0, 0.3, 100, 500);
  for (let i = 0; i < 13; i++) {
    let angulo = (360 / 8) * i + frameCount * 0.02;
    noStroke();
    fill(c[0], c[1], c[2]);
    circle(width / -4 + cos(angulo) * radio, height / 1 + sin(angulo) * 200, map(nivel, 0, 0.3, 10, 60));
    circle(width / 2 + cos(angulo) * radio, height / 2 + sin(angulo) * 200, map(nivel, 0, 0.3, 10, 60));
    circle(width / 3 + cos(angulo) * radio, height / 3 + sin(angulo) * 300, map(nivel, 0, 0.3, 10, 60));
    circle(width / 4 + cos(angulo) * radio, height / 4 + sin(angulo) * 400, map(nivel, 0, 0.3, 10, 60));
  }

}

function dibujarAnimacion3() {
  let c = gama[indiceColor];
  let radio = map(nivel, 0, 0.3, 50, 200);
  for (let anillo = 0; anillo < 3; anillo++) {
    for (let i = 0; i < 6; i++) {
      let angulo = (360 / 6) * i - frameCount * 0.03 * (anillo % 2 === 0 ? 1 : -1);
      noStroke();
      fill(c[0], c[1], c[2]);
      circle(
        width/2 + cos(radians(angulo)) * (radio + anillo * 200),
        height/2 + sin(radians(angulo)) * (radio + anillo * 200),
        map(nivel, 0, 0.3, 5, 200)
      );
    }
  }
}

function dibujarAnimacion4() {
  let brillo = map(nivel, 0, 0.1, 0, 255, true);
  noStroke();
  fill(255, 255, 255, brillo);
  rect(0, 0, width, height);
}

function dibujarAnimacion5() {
  let c = gama[floor(random(gama.length))];
  let tamanio = map(nivel, 0, 0.3, 10, 200);
  for (let i = 0; i < 15; i++) {
    noStroke();
    fill(c[0], c[1], c[2], random(150, 255));
    circle(random(width), random(height), tamanio);
  }
}

function dibujarAnimacion6() {
  let c = gama[floor(random(gama.length))];
  noStroke();
  fill(c[0], c[1], c[2], 200);
  circle(width / 2, height / 2, width * 3);
}

function dibujarAnimacion7() {
  let c = gama[floor(random(gama.length))];
  let tamanio = map(nivel, 0, 0.3, 20, 1000);
  noStroke();
  fill(c[0], c[1], c[2]);
  circle(width / 2, height * 0.3+20, tamanio);
}

function dibujarAnimacion8() {
  let c = gama[floor(random(gama.length))];
  let tamanio = map(nivel, 0, 0.3, 20, 120);
  noStroke();
  fill(c[0], c[1], c[2]);
  circle(random(width), random(height), tamanio);
}

function dibujarAnimacion9() {
  let c = gama[floor(random(gama.length))];
  let tamanio = map(nivel, 0, 0.3, 10, 80);
  for (let i = 0; i < 10; i++) {
    noStroke();
    fill(c[0], c[1], c[2]);
    circle(random(width), random(height), tamanio);
  }
}
function dibujarAnimacion10() {
  let c = gama[indiceColor];
  let r = map(nivel, 0, 0.3, 10, 200);
  noFill();
  stroke(c[0], c[1], c[2]);
  strokeWeight(map(nivel, 0, 0.3, 1, 5));
  for (let i = 0; i < 4; i++) {
    let x = map(i, 0, 3, 200, 1000);
    circle(x, 250, r + i * 40);
    circle(x, 250, r + i * 40 + 20);
    circle(x, 350, r + i * 40);
    circle(x, 350, r + i * 40 + 20);
  }
  noStroke();
}

function dibujarAnimacion11() {
  let c = gama[floor(random(gama.length))];
  let tamanio = map(nivel, 0, 0.3, 10, 80);
  rectX += 3;
  if (rectX > width) rectX = 0;
  for (let i = 0; i < 5; i++) {
    noStroke();
    fill(c[0], c[1], c[2]);
    rect(rectX + i * 80, random(height), tamanio, tamanio);
  }
}

function dibujarAnimacion12() {
  let c = gama[floor(random(gama.length))];
  let velocidad = map(nivel, 0, 0.3, 2, 5);
  radio12 += velocidad;
  if (radio12 > width) radio12 = 0;
  for (let i = 0; i < 10; i++) {
    noFill();
    stroke(c[0], c[1], c[2]);
    strokeWeight(map(nivel, 0, 0.3, 1, 50));
    circle(width / 2, height / 2, radio12 + i * 60);
  }
  noStroke();
}

function dibujarLucesEscenario() {
  let brillo = map(nivel, 0, 0.3, 0, 255, true);

  tint(255, brillo);
  imageMode(CENTER);



  image(luzPNG, 285, 270, 300, 300);
  image(luzPNG, 285, 270, 300, 300)


  image(luzPNG, 350, 200, 300, 400);
  image(luzPNG, 350, 200, 300, 400);

  image(luzPNG, 477, 270, 300, 300);
  image(luzPNG, 477, 270, 300, 300);


  image(luzPNG, 552, 200, 300, 400);
  image(luzPNG, 552, 200, 300, 400);


  image(luzPNG, 648, 270, 300, 300);
  image(luzPNG, 648, 270, 300, 300);


  image(luzPNG, 713, 200, 300, 400);
  image(luzPNG, 713, 200, 300, 400);

  image(luzPNG, 880, 270, 300, 300);
  image(luzPNG, 880, 270, 300, 300);

  image(luzPNG, 935, 200, 300, 300);
  image(luzPNG, 935, 200, 300, 300);




  noTint();
  imageMode(CORNER);
}
function keyPressed() {
  if (key === "d") vistaActual = "DJ";
  if (key === "v") vistaActual = "VJ";
  if (key === "l") lowLightsMode = !lowLightsMode;
}