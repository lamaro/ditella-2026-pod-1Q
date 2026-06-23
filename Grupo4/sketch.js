let soundFile;
let soundDos;
let helvet;
let mostrarVJ = false;
let mostrarDJ = false;
let dnd
//DJ
let fondoSet;
let frontt;
let midX = 275;
let midY = 600;
let midY2 = 600;
let midX2 = 925;

let mx = 600;
let my = 500;

let a = 200;
let b = 500;
let c = 350;
let p = 995;
let o = 500;
let k = 845;
let j = 500;

//opacidad botones
let playingA = 80;
let playingB = 80;

//filtro ECHO(ayuda de la ia)
let filtro;
let filtro2;
let v = 100;
let n = 500;
let g = 500;
let w = 100;
let z = 600;
let delay;
let delay2;
let delayActivo = false;
let delay2Activo = false;
let on = 80;
let on2 = 80;

//visulaizacion lineas
let play = "PLAY";
let play2 = "PLAY";
let fft1;
let fft2;
let listaDeVolumenes;
let listaDeVolumenes2;
let tamanioArray = 1024;
let tamanioArray2 = 1024;

//visualizacion pero en circulos[cds]
let amplitud;
let nivel;
let amplitud2;
let nivel2;

//imagenes
let cd;
let cdbrillo;
let roti = 10;
let roti2 = 60;
let rotiVeloc = 0;
let rotiVeloc2 = 0;
let prueba;
let botonPlay;
let fdw;
let bkw;
let sliderCentro;
let veloc;
let BASS;
let ECHO;
let base;
let volumns;
//variables colores
let verde = 50;
let rosa = 50;
let verdeEcho = 50;
let rosaEcho = 50;
//json
let datosCanciones;

//VJ

//rayos crecientes
let tamanioFotosX = 1.2;
let tamanioFotosY = 0.8;
let tamanioFotosXa;
let tamanioFotosYa;
let tamanioFotosX2 = 0.12;
let tamanioFotosY2 = 0.08;
let tamanioFotosXb;
let tamanioFotosYb;
let tamanioFotosX3 = 0.012;
let tamanioFotosY3 = 0.008;
let speedRayos1;
let tamanioFotosXc;
let tamanioFotosYc;
let tamanioFotosXj;
let tamanioFotosYj;
let tamanioFotosXf;
let tamanioFotosYf;
let tamanioFotosXg;
let tamanioFotosYg;
let tamanioFotosXh;
let tamanioFotosYh;
let tamanioFotosXi;
let tamanioFotosYi;

//fotos:
let rayos1;
let imgVJ;
let imgTablero;
let imgBoton1;
let imgBoton2;
let imgBoton3;
let imgBotonS;
let imgBotonD;
let imgBotonF;
let imgBotonG;
let botonH;
let botonJ;
let jsi;
let hsi;
let gatoDj;

//booleanas key pressed
let visibleS = false;
let visibleD = false;
let visibleF = false;
let visibleG = false;
let visibleH = false;
let visibleJ = false;
let visibleK = false;

// circulos al apretar la s
let mostrarCirculos = false;

// D
let grid;
let tamanioFotosXd = 1200;
let tamanioFotosYd = 800;
let tamanioFotosX4d = 116;
let tamanioFotosY4d = 76;
let tamanioFotosX2d = 12;
let tamanioFotosY2d = 8;
let tamanioFotosX3d = 0.12;
let tamanioFotosY3d = 0.08;
let speedGrid = 1.05 + rotiVeloc2;

//Grilla y rectangulos al apretar la D
let mostrarGrilla = false;
// puntos "F"
let cantidad = 20;
let mostrarPuntos = false;
let caballoGalopa;
// pared "G"
let mostrarPared = false;
let anguloG = 45;
let anguloG1 = 45;
let caballos;
//h
let mostrarCds = false;
//j
let mostrarLins = false;
//K
let mostrarLow = false;
// luces
let fondoRojo = false;
let fondoAzul = false;
let fondoAmarillo = false;
let luzam;
let luzro;
let luzaz;
let inicio;

//low mode
let oscur;
let apagar=0
let lowlow
let soll
let kkkk
let kVerde
let bolaaa

function preload() {
  soundFile = loadSound("music/ACID BALADE.mp3");
  soundDos = loadSound("music/Nicolas Julian - 4 Da Ravers (SPOTISAVER).mp3");
  inicio = loadImage("photos/inicio.jpeg");
  helvet = loadFont("fonts/HelveticaNeue-Medium.otf");
  dnd=loadImage('photos/dnd.png')
  //DJ
  datosCanciones = loadJSON("json/canciones.json");
  fondoSet = loadImage("photos/fondoset.jpg.jpeg");
  cd = loadImage("photos/brillos cd.png");
  cdbrillo = loadImage("photos/cd.png");
  prueba = loadImage("photos/prueba.png");
  botonPlay = loadImage("photos/play.png");
  fdw = loadImage("photos/fdw.png");
  bkw = loadImage("photos/bkw.png");
  sliderCentro = loadImage("photos/sliderCentro.png");
  veloc = loadImage("photos/veloc.png");
  BASS = loadImage("photos/BASS.png");
  ECHO = loadImage("photos/ECHO.png");
  base = loadImage("photos/base.png");
  volumns = loadImage("photos/volumns.png");
  frontt = loadImage("photos/frontt.png");

  //VJ
  gatoDj = loadImage("photos/gatodj.gif");
  rayos1 = loadImage("photos/rayos1.png");
  imgVJ = loadImage("photos/VJ.png");
  imgTablero = loadImage("photos/Tablero.png");
  imgBoton1 = loadImage("photos/Boton1.png");
  imgBoton2 = loadImage("photos/Boton2.png");
  imgBoton3 = loadImage("photos/Boton3.png");
  imgBotonS = loadImage("photos/BotonS.png");
  imgBotonD = loadImage("photos/BotonD.png");
  imgBotonF = loadImage("photos/BotonF.png");
  imgBotonG = loadImage("photos/BotonG.png");
  botonH = loadImage("photos/botonH.png");
  botonJ = loadImage("photos/botonJ.png");
  jsi = loadImage("photos/jsi.png");
  hsi = loadImage("photos/hsi.png");
  caballoGalopa = loadImage("photos/caballoGalopa.gif");
  grid = loadImage("photos/grid.png");
  caballos = loadImage("photos/caballos.gif");
  luzam = loadImage("photos/luzam.png");
  luzro = loadImage("photos/luzro.png");
  luzaz = loadImage("photos/luzaz.png");
  oscur=loadImage('photos/lowLight.gif')
  lowlow=loadImage('photos/lowlow.gif')
  soll=loadImage('photos/soll.gif')
  kkkk=loadImage('photos/kkkk.png')
  kVerde=loadImage('photos/KVERDE.png')
  bolaaa=loadImage('photos/bolaaa.gif')
}

function keyPressed() {
  //Key Pressed la IA nos ayudo a entenderla
  if (key === "w") {
    mostrarDJ = !mostrarDJ;
    mostrarVJ = false;
  }
  if (key === "q") {
    mostrarVJ = !mostrarVJ;
    mostrarDJ = false;
  }

  if (key === "d" || key === "D") {
    mostrarGrilla = !mostrarGrilla;
  }

  if (key === "s" || key === "S") {
    mostrarCirculos = !mostrarCirculos;
  }

  if (key === "f" || key === "F") {
    mostrarPuntos = !mostrarPuntos;
  }


  if (key === "g" || key === "G") {
    mostrarPared = !mostrarPared;
  }

  if(key==='k'||key==='K'){
    mostrarLow=!mostrarLow
  }
  if (key === "1") {
    fondoRojo = !fondoRojo;
    fondoAzul = false;
    fondoAmarillo = false;
  }

  if (key === "2") {
    fondoAzul = !fondoAzul;
    fondoRojo = false;
    fondoAmarillo = false;
  }

  if (key === "3") {
    fondoAmarillo = !fondoAmarillo;
    fondoRojo = false;
    fondoAzul = false;
  }
  if (key === "h") {
    mostrarCds = !mostrarCds;
  }

  if (key === "j") {
    mostrarLins = !mostrarLins;
  }

  if (key === "s" || key === "S") visibleS = !visibleS;
  if (key === "d" || key === "D") visibleD = !visibleD;
  if (key === "f" || key === "F") visibleF = !visibleF;
  if (key === "g" || key === "G") visibleG = !visibleG;
  if (key === "h" || key === "H") visibleH = !visibleH;
  if (key === "j" || key === "J") visibleJ = !visibleJ;
  if (key === 'k' || key === "k") visibleK=!visibleK;
}

function setup() {
  createCanvas(1200, 800);
  //para sliders
  rectMode(CENTER);
  textFont(helvet);
  //SONIDO
  //visualizacion de ondas
  fft1 = createFft(soundFile, tamanioArray);
  fft2 = createFft(soundDos, tamanioArray2);

  //filtro BASS ayuda de IA
  filtro = new p5.LowPass();
  filtro.freq(200);
  filtro.res(15);
  soundFile.disconnect();
  soundFile.connect(filtro);
  delay = new p5.Delay();
  soundFile.connect(delay);
  filtro.freq(4000);
  //lo mismo pero para el otro tema
  filtro2 = new p5.LowPass();
  filtro2.freq(200);
  filtro2.res(15);
  soundDos.disconnect();
  soundDos.connect(filtro2);
  delay2 = new p5.Delay();
  soundDos.connect(delay2);
  filtro2.freq(4000);

  //circulos amplitud cds
  amplitud = new p5.Amplitude();
  amplitud.setInput(soundFile);
  amplitud2 = new p5.Amplitude();
  amplitud2.setInput(soundDos);
}

function draw() {
  background(0);
  imageMode(CENTER);
  image(inicio, width / 2, height / 2, width, height);
  if (mostrarVJ) {
    vj();
  }

  if (mostrarDJ) {
    drawMixer();
  }
  image(dnd,width/2,40,200,50)
}

//DJ
function drawMixer() {
  fill(10);
  rectMode(CENTER);
  imageMode(CENTER);
  rect(width / 2, height / 2, width, height, 20);
  image(fondoSet, width / 2, 500);
  image(base, width / 2, 670);
  image(prueba, width / 2, 500);

  //slider velocidad lado A
  image(veloc, midX, midY);
  let y = 640;
  let miau = 150 / 4;
  if (
    mouseIsPressed &&
    mouseX > midX - 50 &&
    mouseX < midX + 50 &&
    mouseY > midY - 50 &&
    mouseY < midY + 50
  ) {
    midX = mouseX;
    //comando contrain aprendido de IA
    midX = constrain(midX, 200, 350);

    if (mouseX >= 200 && mouseX < 200 + miau / 2) {
      soundFile.rate(0.5);
      rotiVeloc = 0.5;
    }
    if (mouseX > 200 + miau / 2 && mouseX <= 231.25 + miau / 2) {
      soundFile.rate(0.75);
      rotiVeloc = 0.9;
    }
    if (mouseX >= 277.5 - miau / 2 && mouseX < 277.5 + miau / 2) {
      soundFile.rate(1);
      rotiVeloc = 3;
    }
    if (mouseX > 323.75 - miau / 2 && mouseX < 323.75 + miau / 2) {
      soundFile.rate(1.5);
      rotiVeloc = 8;
    }
    if (mouseX >= 323.75) {
      soundFile.rate(2);
      rotiVeloc = 14;
    }
  }

  //slider velocidad lado B
  blendMode(BLEND);
  strokeWeight(0);
  image(veloc, midX2, midY2);
  if (
    mouseIsPressed &&
    mouseX > midX2 - 25 &&
    mouseX < midX2 + 25 &&
    mouseY > midY2 - 25 &&
    mouseY < midY2 + 25
  ) {
    midX2 = mouseX;
    midX2 = constrain(midX2, 850, 1000);
    if (mouseX >= 1200 - 370 && mouseX < 1200 - 370 + miau / 2) {
      soundDos.rate(0.5);
      rotiVeloc2 = 0.5;
    }
    if (mouseX > 1200 - 370 + miau / 2 && mouseX <= 1200 - 323.75 + miau / 2) {
      soundDos.rate(0.75);
      rotiVeloc2 = 0.9;
    }
    if (mouseX >= 1200 - 277.5 - miau / 2 && mouseX < 1200 - 277.5 + miau / 2) {
      soundDos.rate(1);
      rotiVeloc2 = 3;
    }
    if (
      mouseX > 1200 - 231.25 - miau / 2 &&
      mouseX < 1200 - 231.25 + miau / 2
    ) {
      soundDos.rate(1.5);
      rotiVeloc2 = 8;
    }
    if (mouseX >= 1200 - 231.25) {
      soundDos.rate(2);
      rotiVeloc2 = 14;
    }
  }

  // waveform abajo A y B
  blendMode(DIFFERENCE);
  stroke("#c8ff00");
  strokeWeight(2);
  listaDeVolumenes = fft1.waveform();
  listaDeVolumenes2 = fft2.waveform();
  let separacionY = 400 / listaDeVolumenes.length;
  let separacionY2 = 1125 / listaDeVolumenes2.length;

  for (let i = 200; i < listaDeVolumenes.length; i++) {
    let largo = map(listaDeVolumenes[i], -1, 1, 700, 740);
    let y = separacionY * i;
    line(y, 720, y, largo);
  }
  stroke("#ff75c5");
  for (let i = 740; i < listaDeVolumenes2.length; i++) {
    let largo = map(listaDeVolumenes2[i], -1, 1, 700, 740);
    let y = separacionY2 * i;
    line(y, 720, y, largo);
  }

  //amplitud circulos atras de cds A y B
  fill(0, 0);
  stroke("#c8ff00");
  nivel = amplitud.getLevel();
  let diametro = map(nivel, 0, 0.5, 15, 30);
  strokeWeight(diametro);
  circle(340, 280, 320);
  stroke("#ff75c5");
  nivel2 = amplitud2.getLevel();
  let diametro2 = map(nivel2, 0, 0.5, 15, 30);
  strokeWeight(diametro2);
  circle(880, 280, 320);
  strokeWeight(2);
  fill("#c8ff00");

  //slider volumen relativo (medio)
  blendMode(BLEND);
  image(volumns, width / 2, 475, 180, 20);
  circle(500, 500, 5);
  circle(550, 500, 5);
  circle(600, 500, 5);
  circle(650, 500, 5);
  circle(700, 500, 5);
  image(sliderCentro, mx, my, 50);

  if (
    mouseIsPressed &&
    mouseX > mx - 25 &&
    mouseX < mx + 25 &&
    mouseY > my - 35 &&
    mouseY < my + 35
  ) {
    mx = mouseX;
    mx = constrain(mx, 500, 700);
    soundFile.setVolume(map(mx, 500, 700, 1.0, 0.0));
    soundDos.setVolume(map(mx, 500, 700, 0.0, 1.0));
  }

  //rewind y fodward lado a
  let d = dist(mouseX, mouseY, a, b);
  image(botonPlay, 275, 500);
  image(fdw, a, b);
  if (d < 25 && mouseIsPressed) {
    rewind10(soundFile);
  }
  let d2 = dist(mouseX, mouseY, c, b);
  image(bkw, c, b);
  if (d2 < 25 && mouseIsPressed) {
    foward10(soundFile);
  }

  //fodward y rewind lado b
  let ddos = dist(mouseX, mouseY, k, j);
  image(fdw, k, j);
  if (ddos < 25 && mouseIsPressed) {
    rewind10(soundDos);
  }
  let ddos2 = dist(mouseX, mouseY, p, o);
  image(bkw, p, o);
  if (ddos2 < 25 && mouseIsPressed) {
    foward10(soundDos);
  }
  fill(255);
  stroke(10);

  //BASS a y b filtro con ayuda de la IA:
  image(BASS, v, n);
  let d3 = dist(mouseX, mouseY, v, n);
  if (d3 < 25 && mouseIsPressed) {
    n = mouseY;
    n = constrain(n, 340, 500);
    let freq = map(mouseY, 350, 500, 300, 4000);
    filtro.freq(freq);
  }
  image(BASS, 1100, g);
  let d6 = dist(mouseX, mouseY, 1100, g);
  if (d6 < 25 && mouseIsPressed) {
    g = mouseY;
    g = constrain(g, 340, 500);
    let freq = map(mouseY, 350, 500, 300, 4000);
    filtro2.freq(freq);
  }
  //botones de ECHO
  strokeWeight(4);
  stroke(verdeEcho);
  fill(0, on);
  image(ECHO, 100, 600, 70, 70);
  circle(100, 600, 75);
  stroke(rosaEcho);
  fill(0, on2);
  image(ECHO, 1097, 600, 70, 70);
  circle(1097, 603, 75);

  //cds giratorios ayb
  imageMode(CENTER);
  image(cd, 340, 280);
  roti += rotiVeloc;
  roti2 += rotiVeloc2;
  push();
  blendMode(EXCLUSION);
  translate(340, 280);
  angleMode(DEGREES);
  rotate(roti);
  image(cdbrillo, 0, 0);
  pop();
  image(cd, 880, 280);
  push();
  blendMode(EXCLUSION);
  translate(880, 280);
  angleMode(DEGREES);
  rotate(roti2);
  image(cdbrillo, 0, 0);
  pop();

  //opacidad botones play
  //lado A play rew y fow
  strokeWeight(4);
  stroke(verde);
  fill(0, 0, 0, playingA);
  rect(275, 500, 70, 50, 50);
  rect(a, b, 50, 50, 50);
  rect(c, b, 50, 50, 50);
  //lado B play rew y fow
  stroke(rosa);
  fill(0, 0, 0, playingB);
  rect(1200 - 280, 500, 70, 50, 50);
  rect(k, j, 50, 50, 50);
  rect(p, o, 50, 50, 50);

  //fondo sobre textos para legibilidad
  fill(180);
  strokeWeight(9);
  textSize(15);
  stroke(180);
  text("ECHO", 1100, 560);
  text("ECHO", 100, 560);
  text("SPEED", 925, 565);
  text("SPEED", 270, 565);
  text("BASS", 1100, 300);
  text("BASS", 100, 300);
  strokeWeight(3);
  textSize(10);
  text("x1.5", 1200 - 231.25, y, 10);
  text("x0.75", 1200 - 323.75, y, 10);
  text("x2", 1200 - 185, y, 10);
  text("x1", 1200 - 277.5, y, 10);
  text("x0.5", 1200 - 370, y, 10);

  text("x1.5", 323.75, y, 10);
  text("x0.75", 231.25, y, 10);
  text("x2", 370, y, 10);
  text("x1", 277.5, y, 10);
  text("x0.5", 185, y, 10);

  //textos
  noStroke();
  fill(0);
  textSize(15);
  textAlign(CENTER);
  text(play, 275, 505);
  text(play2, 1200 - 280, 505);
  text("ECHO", 1100, 560);
  text("ECHO", 100, 560);
  text("SPEED", 925, 565);
  text("SPEED", 270, 565);
  text("BASS", 1100, 300);
  text("BASS", 100, 300);
  textSize(10);
  text("x1.5", 1200 - 231.25, y, 10);
  text("x0.75", 1200 - 323.75, y, 10);
  text("x2", 1200 - 185, y, 10);
  text("x1", 1200 - 277.5, y, 10);
  text("x0.5", 1200 - 370, y, 10);
  text("x1.5", 323.75, y, 10);
  text("x0.75", 231.25, y, 10);
  text("x2", 370, y, 10);
  text("x1", 277.5, y, 10);
  text("x0.5", 185, y, 10);

  //play y pausa a y b
  if (mouseIsPressed) {
    let d4 = dist(mouseX, mouseY, 1200 - 295, 505);
    if (d4 < 25) {
      if (soundDos.isPlaying()) {
        soundDos.pause();
        rotiVeloc2 = 0;
        play2 = "PLAY";
        playingB = 80;
        rosa = 50;
      } else {
        soundDos.loop();
        rotiVeloc2 = 3;
        play2 = "PAUSE";
        playingB = 0;
        rosa = "#ff75c5";
      }
    }
    let d5 = dist(mouseX, mouseY, 260, 505);
    if (d5 < 25) {
      if (soundFile.isPlaying()) {
        soundFile.pause();
        play = "PLAY";
        rotiVeloc = 0;
        playingA = 80;
        verde = 80;
      } else {
        soundFile.loop();
        play = "PAUSE";
        rotiVeloc = 3;
        playingA = 0;
        verde = "#098C03";
      }
    }

    //filtro ECHO con ayuda de IA
    let dcl = dist(mouseX, mouseY, 100, 600);
    if (dcl < 25) {
      delayActivo = !delayActivo;
      if (delayActivo) {
        delay.process(soundFile, 0.4, 0.6, 3000);
        on = 0;
        verdeEcho = "#098C03";
      } else {
        delay.delayTime(0.001);
        on = 80;
        verdeEcho = 50;
      }
    }
    let dcl2 = dist(mouseX, mouseY, 1100, 600);
    if (dcl2 < 25) {
      delay2Activo = !delay2Activo;
      if (delay2Activo) {
        delay2.process(soundDos, 0.4, 0.6, 3000);
        on2 = 0;
        rosaEcho = "#ff75c5";
      } else {
        delay2.delayTime(0.001);
        on2 = 80;
        rosaEcho = 50;
      }
    }
  }
  //json con canciones (parte de arriba
  let cancion1 = datosCanciones.canciones[0];
  let cancion2 = datosCanciones.canciones[1];
  image(frontt, width / 2, height / 2);
  fill(255);
  textSize(20);
  text(
    "TRACK1:" +
      cancion1.titulo +
      " - " +
      cancion1.artista +
      "\n" +
      cancion1.duracion +
      "________________________" +
      cancion1.anio,
    250,
    30,
  );
  text(
    "TRACK2:" +
      cancion2.titulo +
      " - " +
      cancion2.artista +
      "\n" +
      cancion2.duracion +
      "___________________" +
      cancion2.anio,
    1020,
    30,
  );
}
function rewind10(x) {
  let pa = x.currentTime();
  let np = pa - 0.5;

  if (np < 0) {
    np = 0;
  }
  //funcion con ayuda de IA para usar el jump y que vaya a la nueva posicion np
  x.jump(np);
}
function foward10(g) {
  let pa = g.currentTime();
  let np = pa + 0.5;

  if (np < 0) {
    np = 0;
  }
  //mismo que rewind para el uso de jump
  g.jump(np);
}
function createFft(sound, cantidad) {
  let fft = new p5.FFT(0.8, cantidad);
  fft.setInput(sound);
  return fft;
}

//VJ
function vj() {
  fill(2);
  rect(width / 2, height / 2, 1200, 800);
  //VJ
  fill(255);
  // waveform 1 y 2
  stroke("#c8ff00");
  strokeWeight(2);
  waveforms();
  //rectangulos rayos
  imgRayos();
  //triangulos negros
  triangulosPersp();
  // circulos tecla H
  if (mostrarCds) {
    cds();
  }
  //lineas colores tecla J
  if (mostrarLins) {
    arcoiris();
  }
  // grilla y rectangulos tecla D
  if (mostrarGrilla) {
    Grilla();
  }
  // circulos tecla S
  if (mostrarCirculos) {
    circulos();
  }
  // pared
  if (mostrarPared) {
    pared();
  }
  // puntos tecla F
  if (mostrarPuntos) {
    puntos();
  }
  //low mode
  if(mostrarLow){
    oscuro()
  }
  // Fondo
  image(imgVJ, width / 2, height / 2);
  image(gatoDj, width / 2, 545, 100, 140);
  // Gente saltando
  musicaInferior();
  push()
  fill(0,apagar)
 rect(width/2,height/2,width,height)
pop()
  //Tablero VJ
  image(imgTablero, width / 2, height / 2);
  image(botonH, 525, 717);
  image(botonJ, 609, 717);
  image(kkkk,width/2,height/2);
  // luces "1", "2","3"
  if (fondoRojo) {
    luces();
  }
  if (fondoAzul) {
    luces();
  }
  if (fondoAmarillo) {
    luces();
  }
  // Tablero: Botones "S", "D", "F", "G"
  mostrarBotones();

  textAlign(CENTER);
  fill(180);
  strokeWeight(9);
  textSize(15);
  stroke(180);
  text('HYPER',525,765)
  text('LOW',690,765)
  noStroke();
  fill(0);
  textSize(15);
  
  text('HYPER',525,765)
  text('LOW',690,765)
}
function waveforms() {
  listaDeVolumenes = fft1.waveform();
  listaDeVolumenes2 = fft2.waveform();

  let separacionY = 2000 / listaDeVolumenes.length;
  let separacionY2 = 2000 / listaDeVolumenes2.length;

  noFill();
  stroke(0, 255, 200);
  strokeWeight(2);
  //LADO A
  //partimos de las soundwaves y con IA logramos hacer que sean mas altas de un lado(floor, vertex, begin y end shape)
  beginShape();
  for (let x = 0; x <= width / 2; x++) {
    let t = x / (width / 2);
    let limite = map(x, 0, width / 2, height, 1);
    let baseY = height / 2 - 60;
    let i = floor(map(x, 0, width / 2, 0, listaDeVolumenes.length - 1));
    let sample = listaDeVolumenes[i];
    let y = baseY + sample * limite;
    vertex(x, y);
  }
  endShape();
  //para que sean varios superpuestos
  stroke(0, 0, 200);
  beginShape();
  for (let x = 0; x <= width / 2; x++) {
    let t = x / (width / 2);
    let limite = map(x, 0, width / 2, height, 1);
    let baseY = height / 2 - 60;
    let i = floor(map(x, 0, width / 2, 0, listaDeVolumenes.length - 1));
    let sample = listaDeVolumenes[i];
    let y = baseY + sample * (limite - 80);
    vertex(x, y);
  }
  endShape();
  stroke(200, 0, 200);
  beginShape();
  for (let x = 0; x <= width / 2; x++) {
    let t = x / (width / 2);
    let limite = map(x, 0, width / 2, height, 1);
    let baseY = height / 2 - 60;
    let i = floor(map(x, 0, width / 2, 0, listaDeVolumenes.length - 1));
    let sample = listaDeVolumenes[i];
    let y = baseY + sample * (limite - 160);
    vertex(x, y);
  }
  endShape();

  stroke(255, 80, 180);
  strokeWeight(2);
  //LADO B
  beginShape();
  for (let x = width / 2; x <= width; x++) {
    let limite = map(x, width / 2, width, 1, height - 60);
    let baseY = height / 2 - 60;
    let i = floor(map(x, width / 2, width, 0, listaDeVolumenes2.length - 1));
    let sample = listaDeVolumenes2[i];
    let y = baseY + sample * limite;
    if (x === width / 2) {
      vertex(width / 2, height / 2 - 60);
    } else {
      vertex(x, y);
    }
  }
  endShape();
  //mini
  stroke(255, 0, 0);
  strokeWeight(2);
  beginShape();
  for (let x = width / 2; x <= width; x++) {
    let limite = map(x, width / 2, width, 1, height - 60);
    let baseY = height / 2 - 60;
    let i = floor(map(x, width / 2, width, 0, listaDeVolumenes2.length - 1));
    let sample = listaDeVolumenes2[i];
    let y = baseY + sample * (limite - 80);
    if (x === width / 2) {
      vertex(width / 2, height / 2 - 60);
    } else {
      vertex(x, y);
    }
  }
  endShape();
  stroke(0, 80, 180);
  strokeWeight(2);
  beginShape();
  for (let x = width / 2; x <= width; x++) {
    let limite = map(x, width / 2, width, 1, height - 60);
    let baseY = height / 2 - 60;
    let i = floor(map(x, width / 2, width, 0, listaDeVolumenes2.length - 1));
    let sample = listaDeVolumenes2[i];
    let y = baseY + sample * (limite - 160);
    if (x === width / 2) {
      vertex(width / 2, height / 2 - 60);
    } else {
      vertex(x, y);
    }
  }
  endShape();
}
function oscuro(){
  
  image(lowlow,width/2,350,781,595)
   image(oscur,1080,350,164,755)
  image(oscur,120,350,184,755)
  blendMode(LIGHTEST)
  image(lowlow,width/2,350,1300,595)
  image(oscur,200,300,164,555)
  image(oscur,200,300,164,555)
image(soll,width/2,height/2)
image(bolaaa,600,350)
  blendMode(BLEND)

  apagar=90
}
function imgRayos() {
  blendMode(BLEND);
  imageMode(CENTER);
  speedRayos1 = 1.05 + rotiVeloc / 40; //para que depende de la velocidad de la cancion A
  image(rayos1, width / 2, height / 2 - 60, tamanioFotosX, tamanioFotosY);
  if (tamanioFotosX >= 1.2 && tamanioFotosX < 1300) {
    tamanioFotosX = tamanioFotosX * speedRayos1;
  }
  if (tamanioFotosY >= 0.8 && tamanioFotosY < 900) {
    tamanioFotosY = tamanioFotosY * speedRayos1;
  }
  if (tamanioFotosY > 850) {
    tamanioFotosY = 1.1;
  }
  if (tamanioFotosX > 1250) {
    tamanioFotosX = 1.6;
  }
  //segunda img
  image(rayos1, width / 2, height / 2 - 60, tamanioFotosX2, tamanioFotosY2);
  if (tamanioFotosX2 >= 0.12 && tamanioFotosX2 < 1300) {
    tamanioFotosX2 = tamanioFotosX2 * speedRayos1;
  }
  if (tamanioFotosY2 >= 0.08 && tamanioFotosY2 < 900) {
    tamanioFotosY2 = tamanioFotosY2 * speedRayos1;
  }
  if (tamanioFotosY2 > 850) {
    tamanioFotosY2 = 1.1;
  }
  if (tamanioFotosX2 > 1250) {
    tamanioFotosX2 = 1.6;
  }

  //tercera img
  image(rayos1, width / 2, height / 2 - 60, tamanioFotosX3, tamanioFotosY3);
  if (tamanioFotosX3 >= 0.012 && tamanioFotosX3 < 1300) {
    tamanioFotosX3 = tamanioFotosX3 * speedRayos1;
  }
  if (tamanioFotosY3 >= 0.008 && tamanioFotosY3 < 900) {
    tamanioFotosY3 = tamanioFotosY3 * speedRayos1;
  }
  if (tamanioFotosY3 > 850) {
    tamanioFotosY3 = 1.1;
  }
  if (tamanioFotosX3 > 1250) {
    tamanioFotosX3 = 1.6;
  }
  //b
  if (mouseIsPressed) {
    blendMode(BLEND);
    tamanioFotosXb = (tamanioFotosX3 + tamanioFotosX2) / 2;
    tamanioFotosYb = (tamanioFotosY3 + tamanioFotosY2) / 2;
    image(rayos1, width / 2, height / 2 - 60, tamanioFotosXb, tamanioFotosYb);
    //a
    tamanioFotosXa = (tamanioFotosX + tamanioFotosX2) / 2;
    tamanioFotosYa = (tamanioFotosY + tamanioFotosY2) / 2;
    image(rayos1, width / 2, height / 2 - 60, tamanioFotosXb, tamanioFotosYb);
    //c
    tamanioFotosXc = (tamanioFotosX + tamanioFotosX3) / 2;
    tamanioFotosYc = (tamanioFotosY + tamanioFotosY3) / 2;
    image(rayos1, width / 2, height / 2 - 60, tamanioFotosXc, tamanioFotosYc);
    //j
    tamanioFotosXj = (tamanioFotosX3 * 4) / 2;
    tamanioFotosYj = (tamanioFotosY3 * 4) / 2;
    image(rayos1, width / 2, height / 2 - 60, tamanioFotosXj, tamanioFotosYj);
    //f
    tamanioFotosXf = (tamanioFotosX3 * 8) / 2;
    tamanioFotosYf = (tamanioFotosY3 * 8) / 2;
    image(rayos1, width / 2, height / 2 - 60, tamanioFotosXf, tamanioFotosYf);
    //g
    tamanioFotosXg = (tamanioFotosX3 * 16) / 2;
    tamanioFotosYg = (tamanioFotosY3 * 16) / 2;
    image(rayos1, width / 2, height / 2 - 60, tamanioFotosXg, tamanioFotosYg);
    //h
    tamanioFotosXh = (tamanioFotosX3 * 32) / 2;
    tamanioFotosYh = (tamanioFotosY3 * 32) / 2;
    image(rayos1, width / 2, height / 2 - 60, tamanioFotosXh, tamanioFotosYh);
    //i
    tamanioFotosXi = (tamanioFotosX3 * 32) / 2;
    tamanioFotosYi = (tamanioFotosY3 * 32) / 2;
    image(rayos1, width / 2, height / 2 - 60, tamanioFotosXi, tamanioFotosYi);
  } else {
  }
}
function triangulosPersp() {
  fill(0);
  strokeWeight(0);
  triangle(195, 60, 1025, 60, width / 2, height / 2 - 60);
  triangle(195, 620, 1025, 620, width / 2, height / 2 - 60);
}
function luces() {
  if (fondoRojo) {
    background(255, 0, 0, 50);
    image(imgBoton1, width / 2, height / 2);
    image(luzro, width / 2, height / 2);
  } else if (fondoAzul) {
    background(0, 0, 255, 50);
    image(imgBoton2, width / 2, height / 2);
    image(luzaz, width / 2, height / 2);
  } else if (fondoAmarillo) {
    background(255, 255, 0, 50);
    image(imgBoton3, width / 2, height / 2);
    image(luzam, width / 2, height / 2);
  }
}
//efectos
function circulos() {
  strokeWeight(4);
  //usamos IA para que los puntos queden sobre la diagonal(asi sigue la perspectiva)
  //LADO A
  let t1 = random(0, 1);
  let p1x = lerp(190, width / 2, t1);
  let p1y = lerp(40, height / 2 - 60, t1);
  let t2 = random(0, 1);
  let p2x = lerp(190, width / 2, t2);
  let p2y = lerp(610, height / 2 - 60, t2);
  line(p1x, p1y, p2x, p2y);
  //LADO B
  let t3 = random(0, 1);
  let p3x = lerp(1035, width / 2, t3);
  let p3y = lerp(50, height / 2 - 60, t3);
  let t4 = random(0, 1);
  let p4x = lerp(1035, width / 2, t4);
  let p4y = lerp(610, height / 2 - 60, t4);
  line(p3x, p3y, p4x, p4y);
  line(random(40, 190), 60, random(40, 190), 600);
  let distMore = dist(100, 710, mouseX, mouseY);
  if (mouseIsPressed && distMore < 25) {
    background(0, 120);
    let cantidad = 20;
    let posicionesX = [];
    let posicionesY = [];

    for (let i = 0; i < cantidad; i++) {
      posicionesX[i] = random(width);
      posicionesY[i] = random(height);
    }
  }
  rojodeg(205, 0, 0, 10);
}
function rojodeg(a, b, c, d) {
  blendMode(DODGE);
  rectMode(CENTER);
  fill(a, b, c, d);
  strokeWeight(20);
  //abs pow y lerp ayuda de IA para hacer que sean concentricos y respondan al fft
  let numCapas = 30;
  let altosActuales = new Array(numCapas).fill(0);
  let anchosActuales = new Array(numCapas).fill(0);
  let suavizado = 0.2;
  let tamanioMinimo = 4;

  for (let capa = numCapas; capa >= 1; capa--) {
    let t = capa / numCapas;

    let i1 = floor(map(capa, 1, numCapas, 0, listaDeVolumenes.length - 1));
    let i2 = floor(map(capa, 1, numCapas, 0, listaDeVolumenes2.length - 1));

    let sample1 = abs(listaDeVolumenes[i1]);
    let sample2 = abs(listaDeVolumenes2[i2]);

    let sample = max(sample1, sample2);
    sample = pow(sample, 0.25);
    sample = constrain(sample, 0, 1);
    let maxAlto = t * height * 10;
    let maxAncho = t * width * 10;
    let altoObjetivo = tamanioMinimo + sample * maxAlto;
    let anchoObjetivo = tamanioMinimo + sample * maxAncho;
    let idx = capa - 1;
    altosActuales[idx] = lerp(altosActuales[idx], altoObjetivo, suavizado);
    anchosActuales[idx] = lerp(anchosActuales[idx], anchoObjetivo, suavizado);
    stroke(205, 90, 0, 10);
    rect(width / 2, height / 2 - 60, anchosActuales[idx], altosActuales[idx]);
  }

  blendMode(MULTIPLY);
  rectMode(CENTER);
  strokeWeight(20);
  //otro mas
  for (let capa = numCapas; capa >= 1; capa--) {
    let t = capa / numCapas;
    let i1 = floor(map(capa, 1, numCapas, 0, listaDeVolumenes.length - 1));
    let i2 = floor(map(capa, 1, numCapas, 0, listaDeVolumenes2.length - 1));
    let sample1 = abs(listaDeVolumenes[i1]);
    let sample2 = abs(listaDeVolumenes2[i2]);
    let sample = max(sample1, sample2);
    sample = pow(sample, 0.25);
    sample = constrain(sample, 0, 1);
    let maxAlto = t * height * 5;
    let maxAncho = t * width * 5;
    let altoObjetivo = tamanioMinimo + sample * maxAlto;
    let anchoObjetivo = tamanioMinimo + sample * maxAncho;
    let idx = capa - 1;
    altosActuales[idx] = lerp(altosActuales[idx], altoObjetivo, suavizado);
    anchosActuales[idx] = lerp(anchosActuales[idx], anchoObjetivo, suavizado);
    stroke(205, 0, 0, 10);
    rect(width / 2, height / 2 - 60, anchosActuales[idx], altosActuales[idx]);
  }

  blendMode(BLEND);
}
function Grilla() {
  let espacio = 40;

  // rectangulos
  for (let k = 0; k < 12; k++) {
    fill(random(0), random(255), random(255));
    noStroke();

    //rectangulos de colores
    let posX = random(width);
    let posY = random(height) * espacio;
    rect(posX, posY, random(5, 100), random(50, 250));
  }

  imageMode(CENTER);
  blendMode(BLEND);
  //grilla que se acerca
  image(grid, width / 2, height / 2 - 60, tamanioFotosXd, tamanioFotosYd);
  if (tamanioFotosXd > 11 && tamanioFotosXd < 6000) {
    tamanioFotosXd = tamanioFotosXd * speedGrid;
  }
  if (tamanioFotosYd > 7 && tamanioFotosYd < 4000) {
    tamanioFotosYd = tamanioFotosYd * speedGrid;
  }
  if (tamanioFotosYd > 4000) {
    tamanioFotosYd = 8;
  }
  if (tamanioFotosXd > 6000) {
    tamanioFotosXd = 12;
  }
  //segunda img
  image(grid, width / 2, height / 2 - 60, tamanioFotosX2d, tamanioFotosY2d);
  if (tamanioFotosX2d >= 11 && tamanioFotosX2d < 6000) {
    tamanioFotosX2d = tamanioFotosX2d * speedGrid;
  }
  if (tamanioFotosY2d >= 7 && tamanioFotosY2d < 4000) {
    tamanioFotosY2d = tamanioFotosY2d * speedGrid;
  }
  if (tamanioFotosY2d > 4000) {
    tamanioFotosY2d = 8;
  }
  if (tamanioFotosX2d > 6000) {
    tamanioFotosX2d = 12;
  }
  //tercera img
  image(grid, width / 2, height / 2 - 60, tamanioFotosX3d, tamanioFotosY3d);
  if (tamanioFotosX3d >= 11 && tamanioFotosX3d < 6000) {
    tamanioFotosX3d = tamanioFotosX3d * speedGrid;
  }
  if (tamanioFotosY3d >= 7 && tamanioFotosY3d < 4000) {
    tamanioFotosY3d = tamanioFotosY3d * speedGrid;
  }
  if (tamanioFotosY3d > 4000) {
    tamanioFotosY3d = 8;
  }
  if (tamanioFotosX3d > 6000) {
    tamanioFotosX3d = 12;
  }
  //cuarta img
  image(grid, width / 2, height / 2 - 60, tamanioFotosX4d, tamanioFotosY4d);
  if (tamanioFotosX4d >= 11 && tamanioFotosX4d < 6000) {
    tamanioFotosX4d = tamanioFotosX4d * speedGrid;
  }
  if (tamanioFotosY4d >= 7 && tamanioFotosY4d < 4000) {
    tamanioFotosY4d = tamanioFotosY4d * speedGrid;
  }
  if (tamanioFotosY4d > 4000) {
    tamanioFotosY4d = 8;
  }
  if (tamanioFotosX4d > 6000) {
    tamanioFotosX4d = 12;
  }
}
function puntos() {
  // puntos "F"
  let xCoords = random(width);
  let yCoords = random(height);

  for (let i = 0; i < cantidad; i++) {
    fill(255);
    noStroke();
    circle(xCoords, yCoords, (15, 20));

    stroke(255, 100);
    strokeWeight(1);

    line(
      width / 2,
      height / 2 - 60,
      xCoords + random(-5, 5),
      yCoords + random(-5, 5),
    );
  }
  blendMode(LIGHTEST);
  //caballito
  image(caballoGalopa, width / 2, height / 2 - 60, 160, 160, 80, 80);
  blendMode(BLEND);
}
function cds() {
  //son los cds rotando en un for que crecen con la music
  push();
  background(0, 50);
  blendMode(DIFFERENCE);
  translate(width / 2, height / 2 - 60);
  angleMode(DEGREES);
  rotate(anguloG);
  anguloG - anguloG + 5;
  imageMode(CENTER);
  //uso de IA para que crezca con abs(y el map)
  for (let i = 1200; i > 60; i = i - 100) {
    let idxSample = floor(map(i, 700, 1200, 0, listaDeVolumenes.length - 1));
    let sample = abs(listaDeVolumenes[idxSample]);
    let tamanioFinal = i + sample * 400;
    image(cd, 0, 0, tamanioFinal, tamanioFinal);
  }
  rotate(anguloG1);
  anguloG1 = anguloG1 - 10;
  for (let i = 1200; i > 60; i = i - 100) {
    let idxSample = floor(map(i, 700, 1200, 0, listaDeVolumenes.length - 1));
    let sample = abs(listaDeVolumenes[idxSample]);

    let tamanioFinal = i + sample * 400;

    image(cd, 0, 0, tamanioFinal, tamanioFinal);
  }
  blendMode(BLEND);
  background(0, 80);
  pop();
  //esto le deja color mas estetico
  rojodeg(200, 80, 255, 10);
  rojodeg(205, 0, 0, 10);
}
function pared() {
  blendMode(LIGHTEST);
  image(caballos, width / 2, height / 2 - 60, 400, 300);
  blendMode(BLEND);
}
function arcoiris() {
  let centroX = width / 2;
  let centroY = height / 2 - 60;

  for (let i = 0; i < 30; i++) {
    stroke(random(255), random(255), random(255));
    strokeWeight(random(1, 3));

    line(centroX, centroY, random(width), random(height));
  }
}
function mostrarBotones() {
  imageMode(CENTER);
  if (visibleS) image(imgBotonS, width / 2, height / 2);
  if (visibleD) image(imgBotonD, width / 2, height / 2);
  if (visibleF) image(imgBotonF, width / 2, height / 2);
  if (visibleG) image(imgBotonG, width / 2, height / 2);
  if (visibleJ) image(jsi, 609, 717);
  if (visibleH) image(hsi, 525, 717);
  if(visibleK) image(kVerde,width/2,height/2);
}
//Gente saltando al ritmo de la musica
function musicaInferior() {
  // IA para que se correlacione el tamanio y sonido
  let nivel = amplitud.getLevel();
  let tamanoRitmico = map(nivel, 0, 0.5, 10, 40);

  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(580, height);

    //color cambiante por luz
    if (fondoRojo) {
      fill(random(150, 255), random(tamanoRitmico), random(tamanoRitmico), 200);
    } else if (fondoAzul) {
      fill(random(tamanoRitmico), random(tamanoRitmico), random(150, 255), 200);
    } else if (fondoAmarillo) {
      fill(random(200, 255), random(200, 255), random(tamanoRitmico), 200);
    } else {
      fill(random(255), 30, 100);
    }
    noStroke();
    circle(x, y, random(tamanoRitmico / 1.5, tamanoRitmico / 2));
  }
}
