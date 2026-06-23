let energiaVisual = 0;
let baile = 0;

let capaCirculos = false;
let capaLineas = false;
let capaSable = false;

let estrellasIX = [];
let estrellasIY = [];
let tamanio = [];
let velocidad = [];

let puntosIzq = [];
let puntosDer = [];

let fondoVJ, consVJ, storm1, storm2, djvader, caraDJ;
let Yoda, Han, Nave;

let disparos = [];

let pantallaCentralX = 600;
let pantallaCentralY = 313;
let pantallaCentralW = 400;
let pantallaCentralH = 430;

let pantallaVisualArribaX = 176;
let pantallaVisualArribaY = 175;
let pantallaVisualArribaW = 180;
let pantallaVisualArribaH = 135;

let pantallaVisualAbajoX = 178;
let pantallaVisualAbajoY = 385;
let pantallaVisualAbajoW = 170;
let pantallaVisualAbajoH = 240;

let pantallaEstrellasArribaX = 340;
let pantallaEstrellasArribaY = 180;
let pantallaEstrellasArribaW = 115;
let pantallaEstrellasArribaH = 120;

let pantallaEstrellasAbajoX = 340;
let pantallaEstrellasAbajoY = 385;
let pantallaEstrellasAbajoW = 115;
let pantallaEstrellasAbajoH = 250;

let distanciaVisualesDerecha = 850;
let distanciaEstrellasDerecha = 520;

function preloadVJ() {
  fondoVJ = loadImage("assets/img/fondoVj.JPG");
  consVJ = loadImage("assets/img/consolaVJ.png");
  storm1 = loadImage("assets/img/storm1.png");
  storm2 = loadImage("assets/img/storm2.png");
  djvader = loadImage("assets/img/DJDarth.png");
  caraDJ = loadImage("assets/img/CabezaDarth.png");

  Yoda = loadImage("assets/img/Yoda.png");
  Han = loadImage("assets/img/Han.png");
  Nave = loadImage("assets/img/Nave.png");
}

function setupVJ() {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  crearEstrellas(
    pantallaEstrellasArribaX,
    pantallaEstrellasArribaY,
    pantallaEstrellasArribaW,
    pantallaEstrellasArribaH,
    50,
  );
  crearEstrellas(
    pantallaEstrellasAbajoX,
    pantallaEstrellasAbajoY,
    pantallaEstrellasAbajoW,
    pantallaEstrellasAbajoH,
    55,
  );

  crearPuntos(
    puntosIzq,
    pantallaVisualAbajoX,
    pantallaVisualAbajoY,
    pantallaVisualAbajoW,
    pantallaVisualAbajoH,
    35,
  );
  crearPuntos(
    puntosDer,
    pantallaVisualAbajoX + distanciaVisualesDerecha,
    pantallaVisualAbajoY,
    pantallaVisualAbajoW,
    pantallaVisualAbajoH,
    35,
  );

  disparos = [
    {
      img: Yoda,
      xBoton: 100,
      yBoton: 720,
      mostrar: false,
      x: 0,
      y: 0,
      tam: 0,
      angulo: 0,
    },
    {
      img: Han,
      xBoton: 185,
      yBoton: 720,
      mostrar: false,
      x: 0,
      y: 0,
      tam: 0,
      angulo: 0,
    },
    {
      img: Nave,
      xBoton: 270,
      yBoton: 720,
      mostrar: false,
      x: 0,
      y: 0,
      tam: 0,
      angulo: 0,
    },
  ];
}

function drawVJ() {
  actualizarValoresVisuales();

  image(fondoVJ, width / 2, height / 2, 1200, 800);
  filtroModoEspecial();

  visualesLaterales();
  visualesPantallaCentral();
  estrellasLaterales();
  cabinaDJVADER();
  imagenesBailando();
  consolaVJ();
  dibujarDisparosImagenes();
}

function actualizarValoresVisuales() {
  console.log(ampLevel, bassEnergy, midEnergy, trebleEnergy);
  if (
    typeof analizadorAmp !== "undefined" &&
    typeof analizadorFFT !== "undefined"
  ) {
    analizadorFFT.analyze();

    bassEnergy = analizadorFFT.getEnergy("bass");
    midEnergy = analizadorFFT.getEnergy("mid");
    trebleEnergy = analizadorFFT.getEnergy("treble");

    ampLevel = map(bassEnergy, 0, 255, 0, 0.4);
  } else {
    ampLevel = 0;
    bassEnergy = 0;
    midEnergy = 0;
    trebleEnergy = 0;
  }

  energiaVisual = lerp(energiaVisual, bassEnergy, 0.08);
}

function filtroModoEspecial() {
  noStroke();

  if (viaje) {
    fill(255, 0, 0, map(ampLevel, 0, 0.4, 20, 180, true));
    rect(width / 2, height / 2, 1200, 800);
  }

  if (chill) {
    fill(5, 0, 20, 120);
    rect(width / 2, height / 2, 1200, 800);
  }
}

function cabinaDJVADER() {
  image(djvader, width / 2 + 23, 480, 350, 300);

  fill(80);
  noStroke();
  rect(width / 2, 545, 300, 85, 4);

  fill(255, 0, 0);
  textFont(starwars);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("DJ vADER", width / 2, 532);
}

function visualesLaterales() {
  grillaCirculosRojos(
    pantallaVisualArribaX,
    pantallaVisualArribaY,
    pantallaVisualArribaW,
    pantallaVisualArribaH,
  );
  grillaCirculosRojos(
    pantallaVisualArribaX + distanciaVisualesDerecha,
    pantallaVisualArribaY,
    pantallaVisualArribaW,
    pantallaVisualArribaH,
  );

  visualPuntosRojos(
    puntosIzq,
    pantallaVisualAbajoX,
    pantallaVisualAbajoY,
    pantallaVisualAbajoW,
    pantallaVisualAbajoH,
  );
  visualPuntosRojos(
    puntosDer,
    pantallaVisualAbajoX + distanciaVisualesDerecha,
    pantallaVisualAbajoY,
    pantallaVisualAbajoW,
    pantallaVisualAbajoH,
  );
}
//circulos rojos superiores
function grillaCirculosRojos(xPantalla, yPantalla, wPantalla, hPantalla) {
  let velocidadColor = map(midEnergy, 0, 255, 0.03, 0.25);

  if (chill) velocidadColor = map(midEnergy, 0, 255, 0.01, 0.06);
  if (viaje) velocidadColor = map(midEnergy, 0, 255, 0.08, 0.35);

  for (let fila = 0; fila < 5; fila++) {
    for (let columna = 0; columna < 8; columna++) {
      let x = xPantalla - 80 + columna * 22;
      let y = yPantalla - 45 + fila * 23;
      let ola = sin(baile * velocidadColor + columna + fila * 0.8);

      strokeWeight(1);

      if (chill) {
        stroke(80, 20, 120, 80);
        fill(map(ola, -1, 1, 20, 90), 20, 80, 160);
      } else {
        stroke(255, 0, 0, 100);
        fill(map(ola, -1, 1, 20, 255), 0, 0, 230);
      }

      if (estaDentro(x, y, xPantalla, yPantalla, wPantalla, hPantalla)) {
        circle(x, y, 15);
      }
    }
  }
}
//puntos rojos en movimiento con lineas
function crearPuntos(
  lista,
  xPantalla,
  yPantalla,
  wPantalla,
  hPantalla,
  cantidad,
) {
  for (let i = 0; i < cantidad; i++) {
    lista.push({
      x: random(xPantalla - wPantalla / 2 + 10, xPantalla + wPantalla / 2 - 10),
      y: random(yPantalla - hPantalla / 2 + 10, yPantalla + hPantalla / 2 - 10),
      vx: random([-1, 1]) * random(0.4, 1.3),
      vy: random([-1, 1]) * random(0.4, 1.3),
    });
  }
}

function visualPuntosRojos(lista, xPantalla, yPantalla, wPantalla, hPantalla) {
  let velocidadAudio = map(bassEnergy, 0, 255, 0.5, 4);
  let distanciaLineas = map(midEnergy, 0, 255, 45, 95);
  let tamPunto = map(trebleEnergy, 0, 255, 3, 7);

  if (chill) {
    velocidadAudio = map(bassEnergy, 0, 255, 0.1, 0.9);
    distanciaLineas = map(midEnergy, 0, 255, 25, 65);
    tamPunto = map(trebleEnergy, 0, 255, 2, 5);
  }

  if (viaje) {
    velocidadAudio = map(bassEnergy, 0, 255, 2, 7);
    distanciaLineas = map(midEnergy, 0, 255, 60, 115);
    tamPunto = map(trebleEnergy, 0, 255, 4, 9);
  }

  let izquierda = xPantalla - wPantalla / 2;
  let derecha = xPantalla + wPantalla / 2;
  let arriba = yPantalla - hPantalla / 2;
  let abajo = yPantalla + hPantalla / 2;

  for (let i = 0; i < lista.length; i++) {
    let p = lista[i];

    p.x += p.vx * velocidadAudio;
    p.y += p.vy * velocidadAudio;

    if (p.x < izquierda || p.x > derecha) {
      p.vx *= -1;

      if (p.x < izquierda) {
        p.x = izquierda;
      }

      if (p.x > derecha) {
        p.x = derecha;
      }
    }

    if (p.y < arriba || p.y > abajo) {
      p.vy *= -1;

      if (p.y < arriba) {
        p.y = arriba;
      }

      if (p.y > abajo) {
        p.y = abajo;
      }
    }

    noStroke();
    fill(chill ? color(130, 80, 180, 150) : color(255, 25, 0, 240));

    circle(p.x, p.y, tamPunto);

    for (let j = 0; j < lista.length; j++) {
      let otro = lista[j];
      let d = dist(p.x, p.y, otro.x, otro.y);

      if (d < distanciaLineas) {
        stroke(chill ? color(140, 80, 200, 45) : color(255, 0, 0, 80));
        strokeWeight(1);
        line(p.x, p.y, otro.x, otro.y);
      }
    }
  }
}

function visualesPantallaCentral() {
  if (capaCirculos) visualCirculosCentrales();
  if (capaLineas) visualBarrasCentrales();
  if (capaSable) visualSablesCentrales();
  push();
  drawingContext.shadowBlur = map(bassEnergy, 0, 255, 10, 50, true);
  drawingContext.shadowColor = color(255, 0, 0);
  image(caraDJ, width / 2 + 2, pantallaCentralY, 250, 185);
  drawingContext.shadowBlur = 50;
  pop();
}
function visualCirculosCentrales() {
  noFill();
  strokeWeight(4);
  if (chill) {
    stroke(110, 60, 160, 180);
  } else {
    stroke(255, 0, 0, 220);
  }
  let movimiento = map(bassEnergy, 0, 255, 0, 80, true);
  if (chill) {
    movimiento = map(bassEnergy, 0, 255, 0, 25, true);
  }
  if (viaje) {
    movimiento = map(bassEnergy, 0, 255, 0, 130, true);
  }
  circle(pantallaCentralX, pantallaCentralY, 260 + movimiento);
  circle(pantallaCentralX, pantallaCentralY, 190 + movimiento);
  circle(pantallaCentralX, pantallaCentralY, 120 + movimiento);
  circle(pantallaCentralX, pantallaCentralY, 55 + movimiento);
}
function visualBarrasCentrales() {
  stroke(255, 40, 40, 210);
  strokeWeight(2);

  if (chill) {
    stroke(130, 70, 180, 140);
    strokeWeight(1);
  }

  let fuerzaAudio = map(bassEnergy, 0, 255, 20, 150, true);

  if (chill) {
    fuerzaAudio = map(bassEnergy, 0, 255, 8, 55, true);
  }

  if (viaje) {
    fuerzaAudio = map(bassEnergy, 0, 255, 40, 230, true);
  }

  for (let i = 0; i < 34; i++) {
    let x = pantallaCentralX - 170 + i * 10;

    let fuerzaCentro;

    if (i < 17) {
      fuerzaCentro = map(i, 0, 17, 0.25, 1, true);
    } else {
      fuerzaCentro = map(i, 17, 34, 1, 0.25, true);
    }

    let alto = fuerzaAudio * fuerzaCentro * random(0.5, 1.2);

    line(x, pantallaCentralY + 192, x, pantallaCentralY + 192 - alto);
    line(x, pantallaCentralY - 192, x, pantallaCentralY - 192 + alto);
  }
}

function visualSablesCentrales() {
  let x1 = pantallaCentralX - 150;
  let x2 = pantallaCentralX + 150;

  let movimiento = sin(baile) * map(bassEnergy, 0, 255, 10, 85, true);
  let grosorSable = map(bassEnergy, 0, 255, 4, 28, true);
  let brillo = map(bassEnergy, 0, 255, 10, 55, true);

  if (chill) {
    movimiento = sin(baile) * map(bassEnergy, 0, 255, 5, 25, true);
    grosorSable = map(bassEnergy, 0, 255, 3, 10, true);
    brillo = map(bassEnergy, 0, 255, 5, 20, true);
  }

  if (viaje) {
    movimiento = sin(baile) * map(bassEnergy, 0, 255, 20, 120, true);
    grosorSable = map(bassEnergy, 0, 255, 8, 38, true);
    brillo = map(bassEnergy, 0, 255, 25, 80, true);
  }

  drawingContext.shadowBlur = brillo;
  drawingContext.shadowColor = color(255, 0, 0);

  if (chill) {
    stroke(130, 70, 180, 180);
  } else {
    stroke(255, 0, 20, 240);
  }

  strokeWeight(grosorSable);

  line(
    x1,
    pantallaCentralY + 90 + movimiento,
    x2,
    pantallaCentralY - 90 - movimiento,
  );
  line(
    x1,
    pantallaCentralY - 90 - movimiento,
    x2,
    pantallaCentralY + 90 + movimiento,
  );

  drawingContext.shadowBlur = 0;

  stroke(255, 200);
  strokeWeight(2);

  line(
    x1,
    pantallaCentralY + 90 + movimiento,
    x2,
    pantallaCentralY - 90 - movimiento,
  );
  line(
    x1,
    pantallaCentralY - 90 - movimiento,
    x2,
    pantallaCentralY + 90 + movimiento,
  );
}

function crearEstrellas(xPantalla, yPantalla, wPantalla, hPantalla, cantidad) {
  for (let i = 0; i < cantidad; i++) {
    estrellasIX.push(
      random(xPantalla - wPantalla / 2, xPantalla + wPantalla / 2),
    );
    estrellasIY.push(
      random(yPantalla - hPantalla / 2, yPantalla + hPantalla / 2),
    );
    tamanio.push(random(1, 4));
    velocidad.push(random(1, 3));
  }
}

function estrellasLaterales() {
  estrellasIzquierda();
  estrellasDerecha();
}

function estrellasIzquierda() {
  for (let i = 0; i < estrellasIX.length; i++) {
    let x = estrellasIX[i];
    let y = estrellasIY[i];

    let arriba = i < 50;

    let xPantalla = arriba ? pantallaEstrellasArribaX : pantallaEstrellasAbajoX;
    let yPantalla = arriba ? pantallaEstrellasArribaY : pantallaEstrellasAbajoY;
    let wPantalla = arriba ? pantallaEstrellasArribaW : pantallaEstrellasAbajoW;
    let hPantalla = arriba ? pantallaEstrellasArribaH : pantallaEstrellasAbajoH;

    if (estaDentro(x, y, xPantalla, yPantalla, wPantalla, hPantalla)) {
      if (viaje) {
        stroke(255, 235, 170, random(120, 255));
        strokeWeight(tamanio[i]);
        line(x - 5, y, x + 5, y);
      } else {
        noStroke();
        fill(chill ? color(190, 170, 120, 130) : color(255, 235, 170, 230));
        circle(x, y, tamanio[i]);
      }
    }

    moverEstrella(i, xPantalla, wPantalla);
  }
}
function estrellasDerecha() {
  for (let i = 0; i < estrellasIX.length; i++) {
    let x = estrellasIX[i] + distanciaEstrellasDerecha;
    let y = estrellasIY[i];

    let arriba = i < 50;

    let xPantalla = arriba
      ? pantallaEstrellasArribaX + distanciaEstrellasDerecha
      : pantallaEstrellasAbajoX + distanciaEstrellasDerecha;

    let yPantalla = arriba ? pantallaEstrellasArribaY : pantallaEstrellasAbajoY;
    let wPantalla = arriba ? pantallaEstrellasArribaW : pantallaEstrellasAbajoW;
    let hPantalla = arriba ? pantallaEstrellasArribaH : pantallaEstrellasAbajoH;

    if (estaDentro(x, y, xPantalla, yPantalla, wPantalla, hPantalla)) {
      if (viaje) {
        stroke(255, 235, 170, random(120, 255));
        strokeWeight(tamanio[i]);
        line(x - 5, y, x + 5, y);
      } else {
        noStroke();
        fill(chill ? color(190, 170, 120, 130) : color(255, 235, 170, 230));
        circle(x, y, tamanio[i]);
      }
    }
  }
}

function moverEstrella(i, xPantalla, wPantalla) {
  if (viaje) estrellasIX[i] += velocidad[i] * 3;
  else if (chill) estrellasIX[i] += 0.08;
  else estrellasIX[i] += 0.3;

  if (estrellasIX[i] > xPantalla + wPantalla / 2) {
    estrellasIX[i] = xPantalla - wPantalla / 2;
  }
}

function imagenesBailando() {
  let movimientoStorm = map(bassEnergy, 0, 255, 2, 45, true);

  if (chill) {
    movimientoStorm = map(bassEnergy, 0, 255, 1, 15, true);
  }

  if (viaje) {
    movimientoStorm = map(bassEnergy, 0, 255, 10, 70, true);
  }

  for (let i = 0; i < 7; i++) {
    image(
      storm2,
      90 + i * 160,
      550 + sin(baile + i) * movimientoStorm,
      160,
      200,
    );
    image(
      storm1,
      130 + i * 160,
      600 + sin(baile + i) * movimientoStorm,
      160,
      200,
    );
  }

  baile += 0.08;
}

function consolaVJ() {
  image(consVJ, width / 2, 720);
  botonImagen(disparos[0].xBoton, disparos[0].yBoton, disparos[0].img);
  botonImagen(disparos[1].xBoton, disparos[1].yBoton, disparos[1].img);
  botonImagen(disparos[2].xBoton, disparos[2].yBoton, disparos[2].img);
  botonTexto(428, 720, 97, 112, "RING", capaCirculos);
  botonTexto(540, 720, 97, 112, "BARS", capaLineas);
  botonTexto(652, 720, 97, 112, "SABER", capaSable);
  botonTexto(932, 694, 400, 45, "HYPER MODE", viaje);
  botonTexto(932, 750, 400, 45, "LOW LIGHTS", chill);
}

function botonImagen(x, y, img) {
  push();
  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = color(255, 0, 0);
  fill(35);
  stroke(235, 33, 46);
  strokeWeight(3);
  rect(x, y, 55, 105, 4);
  image(img, x, y, 38, 38);
  pop();
}

function botonTexto(x, y, w, h, txt, activo) {
  push();
  drawingContext.shadowBlur = activo ? 6 : 12;
  drawingContext.shadowColor = activo ? color(120, 0, 0) : color(255, 0, 0);
  fill(activo ? 20 : 35);
  stroke(activo ? color(120, 0, 0) : color(235, 33, 46));
  strokeWeight(3);
  rect(x, y, w, h, 6);
  pop();

  fill(255);
  noStroke();
  textFont(normal);
  textAlign(CENTER, CENTER);
  textSize(18);
  text(txt, x, y - 1);
}

function dibujarDisparosImagenes() {
  for (let i = 0; i < disparos.length; i++) {
    let d = disparos[i];

    if (d.mostrar) {
      dibujarImagenConGlow(d.img, d.x, d.y, d.tam, d.angulo);
      d.tam++;

      if (d.tam > 100) {
        d.mostrar = false;
        d.tam = 0;
      }
    }
  }
}

function dibujarImagenConGlow(img, x, y, tam, angulo) {
  push();
  translate(x, y);
  rotate(angulo);
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color(255, 0, 0);
  image(img, 0, 0, tam, tam);
  drawingContext.shadowBlur = 0;
  pop();
}

function activarDisparo(numero) {
  let pos = elegirPosicionDisparo(int(random(5)));

  disparos[numero].mostrar = true;
  disparos[numero].tam = 10;
  disparos[numero].x = pos.x;
  disparos[numero].y = pos.y;
  disparos[numero].angulo = random(-0.4, 0.4);
}

function elegirPosicionDisparo(numeroPantalla) {
  if (numeroPantalla == 0)
    return posicionRandom(pantallaCentralX, pantallaCentralY, 200, 200);
  if (numeroPantalla == 1)
    return posicionRandom(pantallaVisualArribaX, pantallaVisualArribaY, 80, 50);
  if (numeroPantalla == 2)
    return posicionRandom(pantallaVisualAbajoX, pantallaVisualAbajoY, 90, 130);
  if (numeroPantalla == 3)
    return posicionRandom(
      pantallaVisualAbajoX + distanciaVisualesDerecha,
      pantallaVisualAbajoY,
      90,
      130,
    );
  if (numeroPantalla == 4)
    return posicionRandom(
      pantallaVisualArribaX + distanciaVisualesDerecha,
      pantallaVisualArribaY,
      80,
      50,
    );
}

function posicionRandom(xCentro, yCentro, ancho, alto) {
  return {
    x: random(xCentro - ancho / 2, xCentro + ancho / 2),
    y: random(yCentro - alto / 2, yCentro + alto / 2),
  };
}
//
function mousePressedVJ() {
  tocarControlesVJ();
}

function keyPressedVJ() {
  if (key == " ") activarViaje();
  if (key == "l" || key == "L") activarChill();
}

function tocarControlesVJ() {
  if (clickRect(932, 694, 400, 45)) activarViaje();
  if (clickRect(932, 750, 400, 45)) activarChill();

  if (clickRect(428, 720, 97, 112)) capaCirculos = !capaCirculos;
  if (clickRect(540, 720, 97, 112)) capaLineas = !capaLineas;
  if (clickRect(652, 720, 97, 112)) capaSable = !capaSable;

  if (clickRect(disparos[0].xBoton, disparos[0].yBoton, 55, 105)) {
    activarDisparo(0);
  }

  if (clickRect(disparos[1].xBoton, disparos[1].yBoton, 55, 105)) {
    activarDisparo(1);
  }

  if (clickRect(disparos[2].xBoton, disparos[2].yBoton, 55, 105)) {
    activarDisparo(2);
  }
}

function activarViaje() {
  viaje = !viaje;
  if (viaje) chill = false;
}

function activarChill() {
  chill = !chill;
  if (chill) viaje = false;
}

function clickRect(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

function estaDentro(x, y, centroX, centroY, w, h) {
  return (
    x > centroX - w / 2 &&
    x < centroX + w / 2 &&
    y > centroY - h / 2 &&
    y < centroY + h / 2
  );
}
