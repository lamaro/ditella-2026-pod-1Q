function button(estado, x, y, w, h, txt, bkgColor, txtColor, img = null, imgX = null, imgY = null, imgW = null, imgH = null) {
  let encima =
    mouseX > x &&
    mouseX < x + w &&
    mouseY > y &&
    mouseY < y + h;

  if (img) {
    if (encima) {
      let dx = (imgX !== null) ? imgX : x;
      let dy = (imgY !== null) ? imgY : y;
      let dw = (imgW !== null) ? imgW : w;
      let dh = (imgH !== null) ? imgH : h;
      image(img, dx, dy, dw, dh);
    }
  } else {
    if (encima) {
      fill(bkgColor);
    } else {
      fill(100);
    }
    noStroke();
    rect(x, y, w, h);
    fill(txtColor);
    textSize(12);
    text(txt, x + 5, y + h / 2 + 4);
  }

  return encima;
}

function buttonDosImagenes(x, y, w, h, imgNormal, imgHover) {
  let encima =
    mouseX > x &&
    mouseX < x + w &&
    mouseY > y &&
    mouseY < y + h;

  if (encima) {
    image(imgHover, x, y, w, h);
  } else {
    image(imgNormal, x, y, w, h);
  }

  return encima;
}

let pantallaInicio;
let botonComenzar;
let dj;
let botonPlay;
let volumenPerilla1, volumenPerilla2;
let volumenPerilla1LUZ, volumenPerilla2LUZ;
let crossFader, crossFaderLUZ;
let disco1, disco2;
let anguloDisco1 = 0;
let anguloDisco2 = 0;
let perillaMaster;
let masterX = 602;
let masterY = 174;
let anguloMaster = 0;
let arrastrandoMaster = false;
let volumenMaster = 1;
let cancion, cancion2;
let analizador;
let analizador2;
let botonEfecto1, botonEfecto2;
let efecto1, efecto2, efecto3, efecto4, efecto5, efecto6;
let efecto1X = 244, efecto1Y = 530, efecto1Ancho = 66, efecto1Alto = 50;
let efecto2X = 326, efecto2Y = 530, efecto2Ancho = 66, efecto2Alto = 50;
let efecto3X = 406, efecto3Y = 530, efecto3Ancho = 66, efecto3Alto = 50;
let efecto4X = 245, efecto4Y = 590, efecto4Ancho = 66, efecto4Alto = 50;
let efecto5X = 326, efecto5Y = 590, efecto5Ancho = 66, efecto5Alto = 50;
let efecto6X = 406, efecto6Y = 590, efecto6Ancho = 66, efecto6Alto = 50;
let efectoD1X = 810, efectoD1Y = 530;
let efectoD2X = 885, efectoD2Y = 530;
let efectoD3X = 965, efectoD3Y = 530;
let efectoD4X = 810, efectoD4Y = 592;
let efectoD5X = 887, efectoD5Y = 592;
let efectoD6X = 965, efectoD6Y = 592;
let efectoDAncho = 66, efectoDAlto = 50;
let playX = 236,  playY = 481;
let playX2 = 800, playY2 = 478;
let playAncho = 62, playAlto = 23;
let perilla1X = 516, perilla1Y = 478;
let perilla2X = 639, perilla2Y = 478;
let perillaAncho = 45, perillaAlto = 25;
let arrastrando1 = false;
let arrastrando2 = false;
let tempo1X = 424, tempo1Y = 423;
let tempo2X = 1005, tempo2Y = 423;
let tempoAncho = 45, tempoAlto = 25;
let arrastrandoTempo1 = false;
let arrastrandoTempo2 = false;
let crossX = 530, crossY = 615;
let crossAncho = 45, crossAlto = 25;
let arrastrandoCross = false;
let tempoArosa, tempoProsa;
let tempoAverde, tempoPverde;
let hypeMode = false;
let botonAyuda;
let djInstrucciones;
let mostrarAyuda = false;
let vjInstrucciones;
let mostrarAyudaVJ = false;
let fft1, fft2;
let vj;
let datos;
let imagenes = {};
let mostrarVisuales = false;
let mostrarGrilla   = false;
let mostrarBarras   = false;
let mostrarOndas    = false;
let mostrarLuces    = false;
let lowLightsMode   = false;
let colorFondo      = 0;
let filtroActivo    = "NINGUNO";
let perillaOpacidad, perillaOpacidadLuz;
let c1d, c1dLuz;
let estadoFaders        = [];
let fadersInicializados = false;
let anguloPerillaLuz        = 0;
let arrastrandoPerillaLuz   = false;
let anguloPerillaColor      = 0;
let arrastrandoPerillaColor = false;
let opacidadLuces = 150;
let mezclaBlanco  = 0;
let opacidadVisual1 = 255;
let opacidadVisual2 = 255;
let opacidadVisual3 = 255;
let opacidadVisual4 = 255;
let pantalla;


function preload() {
  pantallaInicio = loadImage("recursos/pantallaInicio.jpg");
  botonComenzar  = loadImage("recursos/botonComenzar.png");

  dj = loadImage("recursos/dj.png");
  vj = loadImage("recursos/vj.png");

  cancion  = loadSound("recursos/cancion1.mp3");
  cancion2 = loadSound("recursos/cancion2.mp3");

  botonEfecto1 = loadImage("recursos/botonEfecto1.png");
  botonEfecto2 = loadImage("recursos/botonEfecto2.png");
  efecto1 = loadSound("recursos/Efecto1.wav");
  efecto2 = loadSound("recursos/Efecto2.wav");
  efecto3 = loadSound("recursos/Efecto3.wav");
  efecto4 = loadSound("recursos/Efecto4.wav");
  efecto5 = loadSound("recursos/Efecto5.wav");
  efecto6 = loadSound("recursos/Efecto6.wav");

  disco1 = loadImage("recursos/discoPlay1.png");
  disco2 = loadImage("recursos/discoPlay2.png");

  botonPlay = loadImage("recursos/botonPlay.png");

  volumenPerilla1    = loadImage("recursos/volumenPerilla1.png");
  volumenPerilla2    = loadImage("recursos/volumenPerilla2.png");
  volumenPerilla1LUZ = loadImage("recursos/volumenPerilla1LUZ.png");
  volumenPerilla2LUZ = loadImage("recursos/volumenPerilla2LUZ.png");

  perillaMaster = loadImage("recursos/perillaMasterVolume.png");

  tempoArosa  = loadImage("recursos/tempoArosa.png");
  tempoProsa  = loadImage("recursos/tempoProsa.png");
  tempoAverde = loadImage("recursos/tempoAverde.png");
  tempoPverde = loadImage("recursos/tempoPverde.png");

  crossFader    = loadImage("recursos/crossFader.png");
  crossFaderLUZ = loadImage("recursos/crossFaderLUZ.png");
  botonAyuda = loadImage("recursos/botonAyuda.png");
djInstrucciones = loadImage("recursos/djInstrucciones.jpg");
vjInstrucciones = loadImage("recursos/vjInstrucciones.jpg");

  datos = loadJSON("data/data.json");

  imagenes["b1r"]    = loadImage("recursos/botones/b1r.png");
  imagenes["b2c"]    = loadImage("recursos/botones/b2c.png");
  imagenes["b3v"]    = loadImage("recursos/botones/b3v.png");
  imagenes["b4vi"]   = loadImage("recursos/botones/b4vi.png");
  imagenes["b1f"]    = loadImage("recursos/botones/b1f.png");
  imagenes["b2f"]    = loadImage("recursos/botones/b2f.png");
  imagenes["b3f"]    = loadImage("recursos/botones/b3f.png");
  imagenes["bluces"] = loadImage("recursos/botones/bluces.png");
  imagenes["bmode"]  = loadImage("recursos/botones/bmode.png");
  imagenes["bc1"]    = loadImage("recursos/botones/bc1.png");
  imagenes["bc2"]    = loadImage("recursos/botones/bc2.png");
  imagenes["bc3"]    = loadImage("recursos/botones/bc3.png");
  imagenes["bc4"]    = loadImage("recursos/botones/bc4.png");

  perillaOpacidad    = loadImage("recursos/barras/perillaOpacidad.png");
  perillaOpacidadLuz = loadImage("recursos/barras/perillaOpacidadLuz.png");
  c1d    = loadImage("recursos/barras/c1d.png");
  c1dLuz = loadImage("recursos/barras/c1dLuz.png");
}

function setup() {
  createCanvas(1200, 800);
  pantalla  = "inicio";
  analizador = new p5.Amplitude();
  analizador2 = new p5.Amplitude();
  analizador.setInput(cancion);
  analizador2.setInput(cancion2);
  fft1 = new p5.FFT();
fft2 = new p5.FFT();
fft1.setInput(cancion); 
fft2.setInput(cancion2);

}


function draw() {
  let nivel = max(analizador.getLevel(),analizador2.getLevel());
  
  

  if (pantalla === "inicio") {
    background(220);
    image(pantallaInicio, 0, 0, 1200, 800);
    button(false, 520, 520, 160, 40, "", color(255), color(0), botonComenzar, 430, 525, 300, 80);
    return;
  }

  if (pantalla === "dj") {
    background(220);
    
    let vumetroX     = 580;
    let vumetroYBase = 568;
    let anchoBarra   = 55;
    let alturaTotal  = map(nivel, 0, 0.5, 0, 88);

    let altVerde = min(alturaTotal, 35);
    fill(0, 255, 50);
    noStroke();
    rect(vumetroX, vumetroYBase - altVerde, anchoBarra, altVerde);

    if (alturaTotal > 35) {
      let altAmarillo = min(alturaTotal - 35, 35);
      fill(255, 200, 0);
      rect(vumetroX, vumetroYBase - 35 - altAmarillo, anchoBarra, altAmarillo);
    }
    if (alturaTotal > 70) {
      let altRojo = min(alturaTotal - 70, 18);
      fill(255, 0, 0);
      rect(vumetroX, vumetroYBase - 70 - altRojo, anchoBarra, altRojo);
    }

    image(dj, 0, 0, 1200, 800);

    
  if (mostrarAyuda) {
  image(djInstrucciones, 0, 0, 1200, 800);

  image(botonAyuda, 1133, 46, 40, 40);

  return;
}

let espectro1 = fft1.analyze();
let espectro2 = fft2.analyze();
dibujarPantallaFFT(espectro1, 158, 155, 306, 53, color(200, 255, 0)); 
dibujarPantallaFFT(espectro2, 731, 155, 306, 53, color(255, 0, 128));

    push();
    translate(309, 358);
    if (cancion.isPlaying()) {
      anguloDisco1 += hypeMode ? 0.15 : 0.05;
    }
    rotate(anguloDisco1);
    imageMode(CENTER);
    image(disco1, 0, 0, 90, 90);
    pop();
    imageMode(CORNER);

    push();
    translate(873, 358);
    if (cancion2.isPlaying()) {
      anguloDisco2 += hypeMode ? 0.15 : 0.05;
    }
    rotate(anguloDisco2);
    imageMode(CENTER);
    image(disco2, 0, 0, 90, 90);
    pop();
    imageMode(CORNER);

    
    push();
    translate(masterX, masterY);
    rotate(anguloMaster);
    imageMode(CENTER);
    image(perillaMaster, 0, 0, 30, 30);
    pop();
    imageMode(CORNER);

    if (arrastrandoMaster) {
      let yMaster = constrain(mouseY, 100, 220);
      anguloMaster  = map(yMaster, 220, 100, -PI / 2, PI / 2);
      volumenMaster = map(yMaster, 220, 100, 0, 1);
      let volumenIzq = map(perilla1Y, 565, 465, 0, 1);
      let volumenDer = map(perilla2Y, 565, 465, 0, 1);
      cancion.setVolume(volumenIzq * volumenMaster);
      cancion2.setVolume(volumenDer * volumenMaster);
    }

    // BOTONES EFECTOS IZQUIERDOS
    button(false, efecto1X, efecto1Y, efecto1Ancho, efecto1Alto, "", color(255), color(0), botonEfecto1);
    button(false, efecto2X, efecto2Y, efecto2Ancho, efecto2Alto, "", color(255), color(0), botonEfecto1);
    button(false, efecto3X, efecto3Y, efecto3Ancho, efecto3Alto, "", color(255), color(0), botonEfecto1);
    button(false, efecto4X, efecto4Y, efecto4Ancho, efecto4Alto, "", color(255), color(0), botonEfecto1);
    button(false, efecto5X, efecto5Y, efecto5Ancho, efecto5Alto, "", color(255), color(0), botonEfecto1);
    button(false, efecto6X, efecto6Y, efecto6Ancho, efecto6Alto, "", color(255), color(0), botonEfecto1);

    // BOTONES EFECTOS DERECHOS
    button(false, efectoD1X, efectoD1Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2);
    button(false, efectoD2X, efectoD2Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2);
    button(false, efectoD3X, efectoD3Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2);
    button(false, efectoD4X, efectoD4Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2);
    button(false, efectoD5X, efectoD5Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2);
    button(false, efectoD6X, efectoD6Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2);

    // BOTONES PLAY
    button(false, playX,  playY,  playAncho, playAlto, "", color(255), color(0), botonPlay);
    button(false, playX2, playY2, playAncho, playAlto, "", color(255), color(0), botonPlay);

    // PERILLAS VOLUMEN
    buttonDosImagenes(perilla1X, perilla1Y, perillaAncho, perillaAlto, volumenPerilla1, volumenPerilla1LUZ);
    buttonDosImagenes(perilla2X, perilla2Y, perillaAncho, perillaAlto, volumenPerilla2, volumenPerilla2LUZ);

    if (arrastrando1) {
      perilla1Y = constrain(mouseY, 465, 565);
      let volumen = map(perilla1Y, 565, 465, 0, 1);
      cancion.setVolume(volumen * volumenMaster);
    }
    if (arrastrando2) {
      perilla2Y = constrain(mouseY, 465, 565);
      let volumen = map(perilla2Y, 565, 465, 0, 1);
      cancion2.setVolume(volumen * volumenMaster);
    }

    // TEMPOS
    buttonDosImagenes(tempo1X, tempo1Y, tempoAncho, tempoAlto, tempoArosa, tempoProsa);
    buttonDosImagenes(tempo2X, tempo2Y, tempoAncho, tempoAlto, tempoAverde, tempoPverde);

    if (arrastrandoTempo1) {
      tempo1Y = constrain(mouseY, 394, 453);
      let velocidad = map(tempo1Y, 453, 394, 0.8, 1.2);
      cancion.rate(velocidad);
    }
    if (arrastrandoTempo2) {
      tempo2Y = constrain(mouseY, 394, 453);
      let velocidad = map(tempo2Y, 453, 394, 0.8, 1.2);
      cancion2.rate(velocidad);
    }

    // CROSSFADER
    buttonDosImagenes(crossX, crossY, crossAncho, crossAlto, crossFader, crossFaderLUZ);

    if (arrastrandoCross) {
      crossX = constrain(mouseX, 510, 645);
      let volumen1 = map(crossX, 510, 645, 1, 0);
      let volumen2 = map(crossX, 510, 645, 0, 1);
      cancion.setVolume(volumen1 * volumenMaster);
      cancion2.setVolume(volumen2 * volumenMaster);
    }

  
    // HYPE MODE
    if (hypeMode) {
      if (frameCount % 8 < 4) {
        fill(255, 255, 255, 50);
        noStroke();
        rect(0, 0, width, height);
      }
    }

    
    image(botonAyuda, 1133, 46, 40, 40);

    return;
  }

  // PANTALLA VJ 
  if (pantalla === "vj") {

    background(colorFondo);
    if (mostrarAyudaVJ) {
  image(vjInstrucciones, 0, 0, 1200, 800);

  image(botonAyuda, 1133, 46, 40, 40);

  return;
}

    if (!fadersInicializados && datos.listaFaders) {
      inicializarFaders();
      fadersInicializados = true;
    }

    // VISUALES EN EL FONDO
    if (mostrarVisuales) {
      let diametro = map(nivel, 0, 0.5, 100, 450);
      fill(255, 0, 255, opacidadVisual1);
      noStroke();
      ellipse(592, 253, diametro, diametro);
      for (let i = 0; i < datos.circulosSecundarios.length; i++) {
        let c = datos.circulosSecundarios[i];
        dibujarCirculoReactivo(c.x, c.y, nivel);
      }
    }

    if (mostrarGrilla) {
      dibujarGrillaCirculitos(nivel);
    }
    if (mostrarBarras) {
      dibujarBarras(nivel);
    }
    if (mostrarOndas) {
      dibujarOndas(nivel);
    }

    aplicarFiltros();

    if (lowLightsMode) {
      filter(GRAY);
      fill(0, 0, 0, 150);
      noStroke();
      rect(0, 0, width, height);
    }

    image(vj, 0, 0, 1200, 800);

    if (mostrarLuces) {
      dibujarLuces(nivel);
    }

    dibujarPerillas();
    dibujarFaders();
    actualizarControles();

    cursor(ARROW);
    for (let i = 0; i < datos.listaBotones.length; i++) {
      let b = datos.listaBotones[i];
      dibujarBotonImagen(b.x, b.y, b.w, b.h, b.imgNombre);
    }

    
    image(botonAyuda, 1133, 46, 40, 40);
  }
}

function dibujarBotonImagen(x, y, w, h, nombre) {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    image(imagenes[nombre], x, y, w, h);
    cursor(HAND);
  } else {
    noFill();
    noStroke();
    rect(x, y, w, h);
  }
}

function inicializarFaders() {
  estadoFaders = [];
  for (let i = 0; i < datos.listaFaders.length; i++) {
    let f = datos.listaFaders[i];
    estadoFaders.push({ y: f.yInicio, arrastrado: false });
  }
}

function dibujarFaders() {
  for (let i = 0; i < datos.listaFaders.length; i++) {
    let f  = datos.listaFaders[i];
    let ef = estadoFaders[i];
    let hover = mouseX > f.x && mouseX < f.x + 30 &&
                mouseY > ef.y && mouseY < ef.y + 19;
    image(hover ? c1dLuz : c1d, f.x, ef.y, 30, 19);
  }
}

function dibujarPerillas() {
  for (let i = 0; i < datos.listaPerillas.length; i++) {
    let p   = datos.listaPerillas[i];
    let ang = p.tipo === "opacidad" ? anguloPerillaLuz : anguloPerillaColor;
    let hover = dist(mouseX, mouseY, p.x, p.y) < p.radio;
    push();
    translate(p.x, p.y);
    rotate(ang);
    imageMode(CENTER);
    image(hover ? perillaOpacidadLuz : perillaOpacidad, 0, 0, 35, 35);
    pop();
    imageMode(CORNER);
  }
}

function actualizarControles() {
  for (let i = 0; i < datos.listaFaders.length; i++) {
    let f  = datos.listaFaders[i];
    let ef = estadoFaders[i];
    if (ef.arrastrado) {
      ef.y = constrain(mouseY - 9, f.yMin, f.yMax);
      let opacidad = map(ef.y, f.yMax, f.yMin, 0, 255);
      if (f.visual === 1) opacidadVisual1 = opacidad;
      if (f.visual === 2) opacidadVisual2 = opacidad;
      if (f.visual === 3) opacidadVisual3 = opacidad;
      if (f.visual === 4) opacidadVisual4 = opacidad;
    }
  }
  let pLuz = datos.listaPerillas[0];
  if (arrastrandoPerillaLuz) {
    let yCtrl = constrain(mouseY, pLuz.y - 30, pLuz.y + 30);
    anguloPerillaLuz = map(yCtrl, pLuz.y + 30, pLuz.y - 30, -PI / 2, PI / 2);
    opacidadLuces    = map(yCtrl, pLuz.y + 30, pLuz.y - 30, 0, 255);
  }
  let pColor = datos.listaPerillas[1];
  if (arrastrandoPerillaColor) {
    let yCtrl = constrain(mouseY, pColor.y - 30, pColor.y + 30);
    anguloPerillaColor = map(yCtrl, pColor.y + 30, pColor.y - 30, -PI / 2, PI / 2);
    mezclaBlanco       = map(yCtrl, pColor.y + 30, pColor.y - 30, 0, 1);
  }
}

function dibujarLuces(nivel) {
  let yOrigen   = 125;
  let yDestino  = 491;
  let intensidad = map(nivel, 0, 0.5, 30, opacidadLuces);
  let anchoHaz   = map(nivel, 0, 0.5, 30, 130);
  if (lowLightsMode) {
    intensidad = intensidad * 0.40;
  }
  blendMode(ADD);
  for (let i = 0; i < datos.listaLuces.length; i++) {
    let l = datos.listaLuces[i];
    let anguloBalanceo     = sin(frameCount * 0.02 + i * 0.5);
    let amplitudMovimiento = map(nivel, 0, 0.5, 20, 150);
    let oscilacionX        = anguloBalanceo * amplitudMovimiento;
    let xBaseAbajo         = l.x + oscilacionX;
    let rFinal = lerp(l.r, 255, mezclaBlanco);
    let gFinal = lerp(l.g, 255, mezclaBlanco);
    let bFinal = lerp(l.b, 255, mezclaBlanco);
    fill(rFinal, gFinal, bFinal, intensidad);
    noStroke();
    beginShape();
    vertex(l.x - 5,              yOrigen);
    vertex(l.x + 5,              yOrigen);
    vertex(xBaseAbajo + anchoHaz, yDestino);
    vertex(xBaseAbajo - anchoHaz, yDestino);
    endShape(CLOSE);
  }
  blendMode(BLEND);
}

function dibujarCirculoReactivo(posX, posY, amp) {
  let d = map(amp, 0, 0.5, 20, 90);
  fill(255, 0, 255, opacidadVisual1);
  noStroke();
  ellipse(posX, posY, d, d);
}

function dibujarBarras(nivel) {
  for (let i = 0; i < datos.listaBarras.length; i++) {
    let b = datos.listaBarras[i];
    let velocidad = map(nivel, 0, 0.5, 0, 40) * (b.offset * 0.1);
    b.x += velocidad * b.dir;
    if (b.dir === 1  && b.x > width) b.x = 0;
    if (b.dir === -1 && b.x < 0)     b.x = width;
    fill(b.r, b.g, b.b, opacidadVisual2);
    noStroke();
    rect(b.x, b.y, 25, b.h);
  }
}

function dibujarOndas(amp) {
  let fuerzaOnda =
(cancion.isPlaying() || cancion2.isPlaying())
? map(amp, 0, 0.5, 5, 120)
: 0;
  noFill();
  strokeWeight(2);
  for (let y = 150; y < 450; y += 15) {
    if ((y / 15) % 2 === 0) {
      stroke(255, 0, 255, opacidadVisual3);
    } else {
      stroke(0, 255, 255, opacidadVisual3);
    }
    beginShape();
    for (let x = 230; x < 970; x += 10) {
      let angulo = (x * 0.02) + (frameCount * 0.05) + (y * 0.1);
      let desplazamiento = sin(angulo) * fuerzaOnda;
      vertex(x, y + desplazamiento);
    }
    endShape();
  }
}

function dibujarGrillaCirculitos(nivel) {
  let tamañoPaso = 40;
  for (let x = 0; x < width - 40; x += tamañoPaso) {
    for (let y = 0; y < height; y += tamañoPaso) {
      let tiempo =
(cancion.isPlaying() || cancion2.isPlaying())
? frameCount * 0.02
: 0;
      let factorRuido = noise(x * 0.005, y * 0.005, tiempo);
      let diametroMax = map(nivel, 0, 0.5, 15, 65);
      let d = factorRuido * diametroMax;
      if (factorRuido > 0.5) {
        stroke(0, 255, 50, opacidadVisual4);
      } else {
        stroke(200, 0, 200, opacidadVisual4);
      }
      strokeWeight(2);
      noFill();
      ellipse(x, y, d, d);
    }
  }
}

function dibujarPantallaFFT(espectro, trackX, trackY, trackAncho, trackAlto, colorOnda) {
  let trackPiso = trackY + trackAlto;
  let cantPuntos = espectro.length / 4; 

  noStroke();
  fill(colorOnda); 

  beginShape();
  vertex(trackX, trackPiso); 

  for (let i = 0; i < cantPuntos; i++) {
    let x = map(i, 0, cantPuntos - 1, trackX, trackX + trackAncho);
    let altoOnda = map(espectro[i], 0, 255, 0, trackAlto);
    let y = trackPiso - altoOnda;
    vertex(x, y);
  }

  vertex(trackX + trackAncho, trackPiso); 
  endShape(CLOSE);
}

function aplicarFiltros() {
  if (filtroActivo === "NINGUNO") return;
  if (filtroActivo === "GRAY")        filter(GRAY);
  else if (filtroActivo === "BLUR")   filter(BLUR, 3);
  else if (filtroActivo === "INVERT") filter(INVERT);
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    if (pantalla === "dj") {
      pantalla = "vj";
    } else if (pantalla === "vj") {
      pantalla = "dj";
    }
  }

  if (keyCode === 32) {
    hypeMode = !hypeMode;
    if (hypeMode) {
      cancion.rate(1.2);
      cancion2.rate(1.2);
    } else {
      let velocidad1 = map(tempo1Y, 453, 394, 0.8, 1.2);
      let velocidad2 = map(tempo2Y, 453, 394, 0.8, 1.2);
      cancion.rate(velocidad1);
      cancion2.rate(velocidad2);
    }
  }
}

function mousePressed() {

  // PANTALLA INICIO
  if (pantalla === "inicio") {
    if (button(false, 520, 520, 160, 40, "", color(255), color(0), botonComenzar)) {
      pantalla = "dj";
    }
    return;
  }

  // PANTALLA DJ
if (pantalla === "dj") {

  if (
    mouseX > 1133 &&
    mouseX < 1173 &&
    mouseY > 46 &&
    mouseY < 86
  ){
  mostrarAyuda = !mostrarAyuda;
  return;
}
    if (button(false, playX, playY, playAncho, playAlto, "", color(255), color(0), botonPlay)) {
      if (cancion.isPlaying()) { cancion.pause(); } else { cancion.loop(); }
    }
    if (button(false, playX2, playY2, playAncho, playAlto, "", color(255), color(0), botonPlay)) {
      if (cancion2.isPlaying()) { cancion2.pause(); } else { cancion2.loop(); }
    }
    if (button(false, efecto1X, efecto1Y, efecto1Ancho, efecto1Alto, "", color(255), color(0), botonEfecto1)) {
      efecto1.setVolume(volumenMaster); efecto1.play();
    }
    if (button(false, efecto2X, efecto2Y, efecto2Ancho, efecto2Alto, "", color(255), color(0), botonEfecto1)) {
      efecto2.play();
    }
    if (button(false, efecto3X, efecto3Y, efecto3Ancho, efecto3Alto, "", color(255), color(0), botonEfecto1)) {
      efecto3.play();
    }
    if (button(false, efecto4X, efecto4Y, efecto4Ancho, efecto4Alto, "", color(255), color(0), botonEfecto1)) {
      efecto4.play();
    }
    if (button(false, efecto5X, efecto5Y, efecto5Ancho, efecto5Alto, "", color(255), color(0), botonEfecto1)) {
      efecto5.play();
    }
    if (button(false, efecto6X, efecto6Y, efecto6Ancho, efecto6Alto, "", color(255), color(0), botonEfecto1)) {
      efecto6.play();
    }
    if (button(false, efectoD1X, efectoD1Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2)) {
      efecto1.setVolume(volumenMaster); efecto1.play();
    }
    if (button(false, efectoD2X, efectoD2Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2)) {
      efecto2.play();
    }
    if (button(false, efectoD3X, efectoD3Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2)) {
      efecto3.play();
    }
    if (button(false, efectoD4X, efectoD4Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2)) {
      efecto4.play();
    }
    if (button(false, efectoD5X, efectoD5Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2)) {
      efecto5.play();
    }
    if (button(false, efectoD6X, efectoD6Y, efectoDAncho, efectoDAlto, "", color(255), color(0), botonEfecto2)) {
      efecto6.play();
    }
    if (buttonDosImagenes(perilla1X, perilla1Y, perillaAncho, perillaAlto, volumenPerilla1, volumenPerilla1LUZ)) {
      arrastrando1 = true;
    }
    if (buttonDosImagenes(perilla2X, perilla2Y, perillaAncho, perillaAlto, volumenPerilla2, volumenPerilla2LUZ)) {
      arrastrando2 = true;
    }
    if (buttonDosImagenes(crossX, crossY, crossAncho, crossAlto, crossFader, crossFaderLUZ)) {
      arrastrandoCross = true;
    }
    if (buttonDosImagenes(tempo1X, tempo1Y, tempoAncho, tempoAlto, tempoArosa, tempoProsa)) {
      arrastrandoTempo1 = true;
    }
    if (buttonDosImagenes(tempo2X, tempo2Y, tempoAncho, tempoAlto, tempoAverde, tempoPverde)) {
      arrastrandoTempo2 = true;
    }
    if (dist(mouseX, mouseY, masterX, masterY) < 35) {
      arrastrandoMaster = true;
    }
    return;
  }

  // PANTALLA VJ
  if (pantalla === "vj") {
    if (
  mouseX > 1133 &&
  mouseX < 1173 &&
  mouseY > 46 &&
  mouseY < 86
) {
  mostrarAyudaVJ = !mostrarAyudaVJ;
  return;
}

    // Faders
    for (let i = 0; i < datos.listaFaders.length; i++) {
      let f = datos.listaFaders[i];
      if (mouseX > f.x && mouseX < f.x + 30 &&
          mouseY > estadoFaders[i].y && mouseY < estadoFaders[i].y + 19) {
        estadoFaders[i].arrastrado = true;
      }
    }

    // Perillas
    for (let i = 0; i < datos.listaPerillas.length; i++) {
      let p = datos.listaPerillas[i];
      if (dist(mouseX, mouseY, p.x, p.y) < p.radio) {
        if (p.tipo === "opacidad") arrastrandoPerillaLuz   = true;
        if (p.tipo === "color")    arrastrandoPerillaColor = true;
      }
    }

    // Botones JSON
    for (let i = 0; i < datos.listaBotones.length; i++) {
      let b = datos.listaBotones[i];
      if (mouseX > b.x && mouseX < b.x + b.w &&
          mouseY > b.y && mouseY < b.y + b.h) {

        if (b.tipo === "visual") {
          if (b.imgNombre === "b1r")    mostrarVisuales = !mostrarVisuales;
          if (b.imgNombre === "b2c")    mostrarBarras   = !mostrarBarras;
          if (b.imgNombre === "b3v")    mostrarGrilla   = !mostrarGrilla;
          if (b.imgNombre === "b4vi")   mostrarOndas    = !mostrarOndas;
          if (b.imgNombre === "bluces") mostrarLuces    = !mostrarLuces;
          if (b.imgNombre === "bmode")  lowLightsMode   = !lowLightsMode;

          if (b.imgNombre === "bc1") {
            colorFondo = (red(colorFondo) === 255 && green(colorFondo) === 0 && blue(colorFondo) === 255)
              ? 0 : color(255, 0, 255);
          }
          if (b.imgNombre === "bc2") {
            colorFondo = (red(colorFondo) === 0 && green(colorFondo) === 255 && blue(colorFondo) === 50)
              ? 0 : color(0, 255, 50);
          }
          if (b.imgNombre === "bc3") {
            colorFondo = (red(colorFondo) === 0 && green(colorFondo) === 255 && blue(colorFondo) === 255)
              ? 0 : color(0, 255, 255);
          }
          if (b.imgNombre === "bc4") {
            colorFondo = (red(colorFondo) === 160 && green(colorFondo) === 0 && blue(colorFondo) === 200)
              ? 0 : color(160, 0, 200);
          }
        }

        if (b.tipo === "filtro") {
          filtroActivo = (filtroActivo === b.filtro) ? "NINGUNO" : b.filtro;
        }
      }
    }
  }
}

function mouseReleased() {
  arrastrando1      = false;
  arrastrando2      = false;
  arrastrandoCross  = false;
  arrastrandoTempo1 = false;
  arrastrandoTempo2 = false;
  arrastrandoMaster = false;

  for (let i = 0; i < estadoFaders.length; i++) {
    estadoFaders[i].arrastrado = false;
  }
  arrastrandoPerillaLuz   = false;
  arrastrandoPerillaColor = false;
}