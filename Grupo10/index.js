
//FONDO
let imgDJ
let imgVJ
let pantalla = "dj"

//VJ
let consolaVj
let capa1Activa = false
let capa2Activa = false
let capa3Activa = false
let capa4Activa = false
let amplitud
let efectoBlur = false
let efectoFlash = false
let diametroCapa2 = 100
let djChiquito
let publico
let publico1
let publico2

//REFLECTORES
let reflectoresChicos = false
let reflectoresGrandes = false

// IMGBOTONES
let imgPausa
let imgDespausa
let imgRepeat
let imgVolumenMenos
let imgVolumenMas
let imgCrossfadeBase
let imgCrossfadeBoton
let crossfadeX = 716
let imgHighMode
let imgLowMode

//volumen
let volumen1 = 0.5
let volumen2 = 0.5
// comandos para no repetir  en botones
let pausaActiva = false
let playActivo = false
let repeatActivo = false
let pausaActiva2 = false
let playActivo2 = false
let repeatActivo2 = false
let highModeActivo = false
let lowModeActivo = false

//PARA CUE
let imgCue

let cueActivo = false
let cueActivo2 = false

let volumenGuardado1 = 0
let volumenGuardado2 = 0

let clickPendiente = false
//mp3
let cancion1
let cancion2
let sonido1
let sonido2
let sonido3
let sonido4
let cancion3
let cancionActual2
let nombreCancion2 = "THETIMEOFMYLIFE"
let changeTrackActivo = false

let imgFX
let imgSonido
let imgChangeTrack

let sonidoBeat
let beatActivo = false

let fft1
let fft2
let listaDeVolumenes
let tamanioArray = 32
let amplitud1
let amplitud2

// COSAS DE VJ 
let capa5Activa = false
let capa6Activa = false

let textoCancion1
let textoCancion2
let textoCancion3
let textoX = 0

let efectoLluvia = false
let efectoColores = false
let efectoParticulas = false

let djChiquitoSalt
let botonCapa


function preload() {
//IMAGENES INICIALES
  imgDJ = loadImage("imagenes/CONSOLA-12.png")
  imgVJ = loadImage("imagenes/EDIFICIOSVJ.png")
//CANCIONES PRINCIPALES
  cancion1 = loadSound("sonido/PLEASE ME.mp3")
 cancion2 = loadSound("sonido/THETIMEOFMYLIFE.mp3")
cancion3 = loadSound("sonido/ROCKYOURBODY.mp3")
  sonido1= loadSound("sonido/SONIDO1-PM.mp3")
  sonido2= loadSound("sonido/SONIDO2-PM.mp3")
  sonidoBeat = loadSound("sonido/SONIDO3BEAT.mp3")
  sonido4 = loadSound ("sonido/sonido4.mp3")
 
//BOTONESDJ
 imgPausa = loadImage("imagenes/PAUSA1.png")
imgDespausa = loadImage("imagenes/DESPAUSA2.png")
imgRepeat = loadImage("imagenes/REPEAT1.png")
imgVolumenMenos = loadImage("imagenes/VOLUMEN-.png")
imgVolumenMas = loadImage("imagenes/VOLUMEN+.png")
imgCue = loadImage ("imagenes/CUE.png")
imgFX = loadImage("imagenes/Recurso 31FX3.png")
imgSonido = loadImage("imagenes/Recurso 54SONIDO.png")
imgChangeTrack = loadImage("imagenes/Recurso 52CHANGE TRACK.png")
imgCrossfadeBase = loadImage("imagenes/Recurso 50CROSSFADE BASE.png")
imgCrossfadeBoton = loadImage("imagenes/Recurso 51CROSSFADEBOTON.png")
imgLowMode = loadImage("imagenes/LOW MODE.png")
imgHighMode = loadImage("imagenes/HIGH MODE.png")
//VJ
consolaVj = loadImage("imagenes/consolaVj.png")
djChiquito = loadImage ("imagenes/DJCHIQUITO.png")
publico = loadImage ("imagenes/PUBLICO-(2).gif")
publico1 = loadImage("imagenes/PERSONAS1.png")
publico2 = loadImage("imagenes/PERSONAS2.png")
botonCapa = loadImage("imagenes/BOTONCAPA.png")
djChiquitoSalt = loadImage("imagenes/DJCHIQUITOsaltando.png")
textoCancion1 = loadImage("imagenes/textCancion1.png")
textoCancion2 = loadImage("imagenes/textCancion2.png")
textoCancion3 = loadImage("imagenes/textCancion3.png")
}

function setup() {
  createCanvas(1606, 850)
  imageMode(CORNER)

  // La cancion que empieza en el lado derecho es cancion2
  cancionActual2 = cancion2

  // VOLUMENES DE CANCIONES
  cancion1.setVolume(volumen1)
  cancionActual2.setVolume(volumen2)
  cancion3.setVolume(volumen2)

  // VOLUMEN DEL BEAT
  sonidoBeat.setVolume(0.5)

  // PARA WF CANCION 1
  fft1 = new p5.FFT(0.8, tamanioArray)
  fft1.setInput(cancion1)

  // PARA WF CANCION 2 / CANCION ACTUAL DEL LADO DERECHO
  fft2 = new p5.FFT(0.8, tamanioArray)
  fft2.setInput(cancionActual2)

  // AMPLITUD GENERAL
  amplitud = new p5.Amplitude()
    amplitud1 = new p5.Amplitude()
amplitud1.setInput(cancion1)

amplitud2 = new p5.Amplitude()
amplitud2.setInput(cancionActual2)
}
function draw() {

  //TECLAS V Y D, CAMBIAR DE PANTALLA
  if (pantalla === "dj") {
    drawDJ()
  } else if (pantalla === "vj") {
    drawVJ()
  }
  
  // CLICK PARA BOTONES 
  clickPendiente = false
}


function drawDJ() {
  image(imgDJ, 0, 0, width, height)
  drawWaveformDJ()
  drawTiempoCancion()

  fill(255)
  textSize(20)
  text("x: " + mouseX + " y: " + mouseY, 100, 30)

  // BOTONES CANCION 1
  let pausaAntes = pausaActiva
  pausaActiva = button(pausaActiva, 525, 575, 65, 45, "", 0, 255, imgDespausa)

  if (pausaActiva !== pausaAntes) {
    cancion1.pause()
    playActivo = false
  }

  let playAntes = playActivo
  playActivo = button(playActivo, 448, 575, 65, 45, "", 0, 255, imgPausa)

  if (playActivo !== playAntes) {
    if (!cancion1.isPlaying()) {
      cancion1.play()
    }
    pausaActiva = false
  }

  let repeatAntes = repeatActivo
  repeatActivo = button(repeatActivo, 372, 575, 65, 45, "", 0, 255, imgRepeat)

  if (repeatActivo !== repeatAntes) {
    cancion1.stop()
    cancion1.play()
    repeatActivo = false
    playActivo = true
    pausaActiva = false
  }

  // BOTONES CANCION ACTUAL 2
  let pausaAntes2 = pausaActiva2
  pausaActiva2 = button(pausaActiva2, 1148, 575, 70, 45, "", 0, 255, imgDespausa)

  if (pausaActiva2 !== pausaAntes2) {
    cancionActual2.pause()
    playActivo2 = false
  }

  let playAntes2 = playActivo2
  playActivo2 = button(playActivo2, 1068, 575, 70, 45, "", 0, 255, imgPausa)

  if (playActivo2 !== playAntes2) {
    if (!cancionActual2.isPlaying()) {
      cancionActual2.play()
    }
    pausaActiva2 = false
  }

  let repeatAntes2 = repeatActivo2
  repeatActivo2 = button(repeatActivo2, 992, 575, 70, 45, "", 0, 255, imgRepeat)

  if (repeatActivo2 !== repeatAntes2) {
    cancionActual2.stop()
    cancionActual2.play()
    repeatActivo2 = false
    playActivo2 = true
    pausaActiva2 = false
  }

  // VOLUMENES
  volumen1 = controlVolumen(cancion1, volumen1, 660, 393, 660, 421)
  volumen2 = controlVolumen(cancionActual2, volumen2, 900, 393, 900, 421)


 indicadorAmplitud(amplitud1, 698, 512)
indicadorAmplitud(amplitud2, 880, 511)

  // CUE CANCION 1
  let cueAntes = cueActivo
  cueActivo = button(cueActivo, 675, 307, 50, 20, "", 0, 255, imgCue)

  if (cueActivo !== cueAntes) {
    if (cueActivo) {
      volumenGuardado1 = volumen1
      cancion1.setVolume(0)
    } else {
      volumen1 = volumenGuardado1
      cancion1.setVolume(volumen1)
    }
  }

  // CUE CANCION ACTUAL 2
  let cueAntes2 = cueActivo2
  cueActivo2 = button(cueActivo2, 860, 307, 50, 20, "", 0, 255, imgCue)

  if (cueActivo2 !== cueAntes2) {
    if (cueActivo2) {
      volumenGuardado2 = volumen2
      cancionActual2.setVolume(0)
    } else {
      volumen2 = volumenGuardado2
      cancionActual2.setVolume(volumen2)
    }
  }

  // BOTONES SONIDOS EXTRA
  if (button(false, 398, 129, 40, 15, "", 0, 255, imgSonido)) {
  sonido1.stop()
  sonido1.play()
}
if (button(false, 452, 129, 40, 15, "", 0, 255, imgSonido)) {
  sonido2.stop()
  sonido2.play()
}
if (button(false, 551, 129, 40, 15, "", 0, 255, imgSonido)) {
  sonido4.stop()
  sonido4.play()
}
//CROSSFADE NUEVO, IMAGEN QUE TAPA BOTONES VIEJOS Y PERILLA
image(imgCrossfadeBase, 690, 581, 200, 40)

  // +BOTONES CON SUS FUNCTIONS
  drawCrossfade()
  drawBotonesFXDJ()
  drawBotonBeatDJ()
  drawBotonChangeTrackDJ()
  drawBotonesModoDJ()
}
function drawCrossfade() {
  let xMin = 716
  let xMax = 860
  let y = 580
  let ancho = 35
  let alto = 45

  if (
    mouseIsPressed &&
    mouseX > xMin &&
    mouseX < xMax &&
    mouseY > y &&
    mouseY < y + alto
  ) {
    crossfadeX = mouseX
  }

  if (crossfadeX < xMin) {
    crossfadeX = xMin
  }

  if (crossfadeX > xMax) {
    crossfadeX = xMax
  }

  image(imgCrossfadeBoton, crossfadeX, y, ancho, alto)

  let mitad = (xMin + xMax) / 2

  let volumenFinal1
  let volumenFinal2

  if (crossfadeX <= xMin) {
    volumenFinal1 = volumen1
    volumenFinal2 = 0
  } else if (crossfadeX >= xMax) {
    volumenFinal1 = 0
    volumenFinal2 = volumen2
  } else if (crossfadeX <= mitad) {
    volumenFinal1 = volumen1
    volumenFinal2 = map(crossfadeX, xMin, mitad, 0, volumen2)
  } else {
    volumenFinal1 = map(crossfadeX, mitad, xMax, volumen1, 0)
    volumenFinal2 = volumen2
  }

  if (cueActivo) {
    volumenFinal1 = 0
  }

  if (cueActivo2) {
    volumenFinal2 = 0
  }
if (highModeActivo) {
  if (volumenFinal1 > 0) {
    volumenFinal1 = 1
  }

  if (volumenFinal2 > 0) {
    volumenFinal2 = 1
  }

  cancion1.rate(1.2)
  cancionActual2.rate(1.2)
} else if (lowModeActivo) {
  volumenFinal1 = volumenFinal1 * 0.3
  volumenFinal2 = volumenFinal2 * 0.3

  cancion1.rate(0.8)
  cancionActual2.rate(0.8)
} else {
  cancion1.rate(1)
  cancionActual2.rate(1)
}
  cancion1.setVolume(volumenFinal1)
  cancionActual2.setVolume(volumenFinal2)
}
function drawTiempoCancion() {
  // CANCION 1
  let tiempo1 = cancion1.currentTime()
  let minutos1 = floor(tiempo1 / 60)
  let segundos1 = floor(tiempo1 % 60)

  if (segundos1 < 10) {
    segundos1 = "0" + segundos1
  }

  fill(175)
  textSize(12)
  text(minutos1 + ":" + segundos1, 745, 186)

  // CANCION ACTUAL 2
  let tiempo2 = cancionActual2.currentTime()
  let minutos2 = floor(tiempo2 / 60)
  let segundos2 = floor(tiempo2 % 60)

  if (segundos2 < 10) {
    segundos2 = "0" + segundos2
  }

  fill(175)
  textSize(12)
  text(minutos2 + ":" + segundos2, 904, 186)

  // NOMBRES CANCIONES
  fill(255)
  textSize(9)
  textAlign(CORNER)
  text(nombreCancion2, 797, 133)
  text("PLEASE ME - MAXI TRUSSO", 637, 133)
}
function drawBotonesFXDJ() {
  if (button(false, 973, 120, 50, 20, "", 0, 255, imgFX)) {
    aplicarFX(0.85)
  }

  if (button(false, 1025, 120, 50, 20, "", 0, 255, imgFX)) {
    aplicarFX(1)
  }

  if (button(false, 1095, 120, 50, 20, "", 0, 255, imgFX)) {
    aplicarFX(1.15)
  }
}

function aplicarFX(velocidad) {
  if (cancion1.isPlaying()) {
    cancion1.rate(velocidad)
  }

  if (cancionActual2.isPlaying()) {
    cancionActual2.rate(velocidad)
  }
}

function drawBotonBeatDJ() {
  let beatAntes = beatActivo

  beatActivo = button(beatActivo, 498, 127, 40, 15, "", 0, 255, imgSonido)

  if (beatActivo !== beatAntes) {
    if (beatActivo) {
      sonidoBeat.loop()
    } else {
      sonidoBeat.stop()
    }
  }
}

function drawBotonChangeTrackDJ() {
  let changeAntes = changeTrackActivo

  changeTrackActivo = button(changeTrackActivo, 938, 224, 130, 30, "", 0, 255, imgChangeTrack)

  if (changeTrackActivo !== changeAntes) {
    cambiarTrack2()
    changeTrackActivo = false
  }
}

function cambiarTrack2() {
  let estabaSonando = cancionActual2.isPlaying()

  cancionActual2.stop()

  if (cancionActual2 === cancion2) {
    cancionActual2 = cancion3
    nombreCancion2 = "ROCKYOURBODY"
  } else {
    cancionActual2 = cancion2
    nombreCancion2 = "THETIMEOFMYLIFE"
  }

  cancionActual2.setVolume(volumen2)
  fft2.setInput(cancionActual2)
  amplitud2.setInput(cancionActual2)

  if (estabaSonando) {
    cancionActual2.play()
  }

  playActivo2 = estabaSonando
  pausaActiva2 = false
  repeatActivo2 = false
  cueActivo2 = false
}
function drawWaveformDJ() {
  let lista1 = fft1.waveform()
  let lista2 = fft2.waveform()

  for (let i = 0; i < 10; i++) {
    let alto1 = map(lista1[i], -1, 1, 5, 70)
    let alto2 = map(lista2[i], -1, 1, 5, 70)

    fill(140)
    noStroke()
    rect(640 + i * 10, 186 - alto1, 4, alto1)

    fill(230)
    rect(800 + i * 10, 186 - alto2, 4, alto2)
  }
}
function controlVolumen(cancion, volumen, xMas, yMas, xMenos, yMenos) {
  if (button(false, xMenos, yMenos, 20, 20, "", 0, 255, imgVolumenMenos)) {
    volumen = volumen - 0.1
  }

  if (button(false, xMas, yMas, 20, 20, "", 0, 255, imgVolumenMas)) {
    volumen = volumen + 0.1
  }

  if (volumen < 0) {
    volumen = 0
  }

  if (volumen > 1) {
    volumen = 1
  }

  cancion.setVolume(volumen)

  return volumen
}
function indicadorAmplitud(amplitudCancion, x, yAbajo) {
  let nivel = amplitudCancion.getLevel()

  let cantidad = round(map(nivel, 0, 0.4, 0, 9))

  if (cantidad > 9) {
    cantidad = 9
  }

  for (let i = 0; i < cantidad; i++) {
    fill(255)
    noStroke()
    circle(x, yAbajo - i * 21.4894, 10.5)
  }
}
function drawBotonesModoDJ() {
  let highAntes = highModeActivo
  highModeActivo = button(highModeActivo, 755, 224, 80, 15, "", 0, 255, imgHighMode)

  if (highModeActivo !== highAntes) {
    if (highModeActivo) {
      lowModeActivo = false
    }
  }

  let lowAntes = lowModeActivo
  lowModeActivo = button(lowModeActivo, 755, 247, 80, 15, "", 0, 255, imgLowMode)

  if (lowModeActivo !== lowAntes) {
    if (lowModeActivo) {
      highModeActivo = false
    }
  }
}
function drawVJ() {
  
  //ACA COMPLETA MILIIIIIIIIIIIIIIIII, NO EDITAR LO DE WIDHT Y HEIGHT PORQUE YA ESTA EN EL SETUP INICIAL 
  background(0)

    if (capa1Activa) {
    drawCapa1()
  }

  if (capa2Activa) {
    drawCapa2()
  }

  if (capa3Activa) {
    drawCapa3()
  }

  if (capa4Activa) {
    drawCapa4()
  }

  if (capa5Activa) {
    drawCapa5()
  }

   if (capa6Activa) {
    drawCapa6()
  }

if (efectoLluvia) {
  drawLluvia()
}

if (efectoFlash) {
  drawFlash()
}

if (efectoColores){
  drawColores()
}

if (efectoParticulas) {
  drawParticulas()
}

  image(imgVJ, 0, 0, width, height)

if (floor(frameCount / 21) % 2 === 0) {
  image(djChiquitoSalt, 0, +20, width, height)
} else {
  image(djChiquito, 0,+20, width, height)
}

if (floor(frameCount / 21) % 2 === 0) {
  image(publico1, 0, -70, width, height)
} else {
  image(publico2, 0, -80, width, height)
}

  drawBotonesVJ()
  
  drawReflectores()

   image(consolaVj, 0,0,width,height)
  drawBotonesReflectores()
  drawBotonesEfectosVJ()
 

  fill(255)
  textSize(20)
  text("x: " + mouseX + " y: " + mouseY, 100, 30)
}

function drawBotonesEfectosVJ() {
  efectoLluvia = button(efectoLluvia, 835, 590, 70, 40, "", 0, 255)

  efectoFlash = button(efectoFlash, 920, 590, 70, 40, "", 0, 255)

  efectoColores = button(efectoColores, 1005, 590, 70, 40, "", 0, 255)

  efectoParticulas = button(efectoParticulas, 1090, 590, 70, 40, "", 0, 255)
}

function drawBotonesReflectores() {
  if (button(false, 715, 545, 20, 20, "", 0, 255)) {
    reflectoresChicos = true
  }

  if (button(false, 750, 545, 20, 20, "", 0, 255)) {
    reflectoresChicos = false
    reflectoresGrandes = false
  }
  
  if (button(false, 785, 545, 20, 20, "", 0, 255)) {
    reflectoresGrandes = true
  }
}

function drawLluvia(){
   stroke(255, 120)
  strokeWeight(2)

  for (let i = 0; i < 80; i++) {
    let x = random(width)
    let y = random(height)
    line(x, y, x, y + 60)
  }

  noStroke()
}

function drawFlash() {
  let nivel = amplitud.getLevel()

  let opacidad = map(nivel, 0, 0.4, 0, 220)

  if (opacidad > 220) {
    opacidad = 220
  }

  noStroke()
  fill(255, opacidad)
  rect(0, 0, width, height)
}

function drawColores(){
fill (random(225), random (225), random (225),80)
rect (0,0,width, height)
}

function drawParticulas() {
let nivel = amplitud.getLevel()

  let cantidad = 40 + round(nivel * 1000)
  let tam = 2

  for (let i = 0; i < cantidad; i++) {
    let x = random(width)
    let y = random(height)

    noStroke()
    fill(255, 180)
    circle(x, y, tam)
  }
}

function drawReflectores() {
  noStroke()

  if (reflectoresGrandes) {
  fill(255, 225, 150, 35)

  let movimientoX1 = sin(frameCount * 0.025) * 260
  let movimientoY1 = sin(frameCount * 0.018) * 900

  let movimientoX2 = sin(frameCount * 0.025 + 2) * 260
  let movimientoY2 = sin(frameCount * 0.018 + 2) * 900

  let yGrande1 = 1600 - movimientoY1
  let yGrande2 = 1600 - movimientoY2



  triangle(
    420, 75,
    150 + movimientoX1, yGrande1,
    750 + movimientoX1, yGrande1
  )

  triangle(
    1190, 75,
    890 + movimientoX2, yGrande2,
    1490 + movimientoX2, yGrande2
  )
}

 if (reflectoresChicos) {
  stroke(225, 50)
  strokeWeight(1)

  for (let i = 0; i < 13; i++) {
    let x = 520 + i * 47.5
    let movimientoX = sin(frameCount * 0.09 + i * 0.9) * 300

    line(
      x, 150,
      x + movimientoX, 700
    )
  }
  noStroke()
}
}

function drawCapa1() {
  let nivel = amplitud.getLevel()

  let cantidad = 30 + round(nivel * 300)
  let tam = 5 + nivel * 60

  for (let i = 0; i < cantidad; i++) {
    fill(220, 200, 30, 180)
    noStroke()

    circle(random(width), random(height), tam)
  }
}

function drawCapa2() {
  let nivel = amplitud.getLevel()

let x = width / 2 + sin(frameCount * 0.03) * 300
let y = height / 3

let opacidad = 80 + nivel * 300

fill(0, 70, 220, opacidad)
strokeWeight(2)
circle(x, y, 800)
}

function drawCapa3() {
  listaDeVolumenes = fft1.waveform()

  stroke(220, 200,30, 50)
  strokeWeight(60,100)

  for (let i = 0; i < listaDeVolumenes.length; i++) {
    let x = map(i, 0, listaDeVolumenes.length - 1, 0, width)

    let valor = listaDeVolumenes[i]

    if (valor < 0) {
      valor = valor * -1
    }

    let yArriba = map(valor, 0, 1, 300, 330)
    let yAbajo = map(valor, 0, 1, 300, 360)

    line(x, 0, x, yArriba)
    line(x, height, x, yAbajo)
  }

  noStroke()
}

function drawCapa4(){
   let nivel = amplitud.getLevel()
  listaDeVolumenes = fft1.waveform()

  stroke(0, 70, 220, 100)
  strokeWeight(2)

  for (let i = 0; i < listaDeVolumenes.length; i++) {
    let valor = listaDeVolumenes[i]

    if (valor < 0) {
      valor = valor * -1
    }

    let x = map(i, 0, listaDeVolumenes.length - 1, 200, 1608 - 200)
    let largo = map(valor, 0, 1, 50, 300)

    largo = largo + nivel * 500

    line(800, 400, x, 300 - largo)
    line(800, 400, x, 300 + largo)
  }

  noStroke()
}

function drawCapa5() {
  let imagenTexto

  if (cancion1.isPlaying()) {
    imagenTexto = textoCancion1
  }

if (cancionActual2.isPlaying()) {
  imagenTexto = textoCancion2
}

  //if (cancion3.isPlaying()) {
 //   imagenTexto = textoCancion3
 // }

  textoX = textoX - 8

  if (textoX < -width) {
    textoX = 0
  }

  if (imagenTexto) {
    image(imagenTexto, textoX, 0, width, height-30)
    image(imagenTexto, textoX + width, 0, width, height-30)
  }
}

function drawCapa6() {
  noStroke()
fill(255, 180)
circle(width / 2, height / 2, 120 + amplitud.getLevel() * 800) 
}

function drawBotonesVJ() {
  let yBotonesVJ = 590

  capa1Activa = button(capa1Activa, 460, yBotonesVJ, 60, 100, "", 0, 255)
  capa2Activa = button(capa2Activa, 540, yBotonesVJ, 60, 100, "", 0, 255)
  capa3Activa = button(capa3Activa, 620, yBotonesVJ, 60, 100, "", 0, 255)
  capa4Activa = button(capa4Activa, 700, yBotonesVJ, 60, 100, "", 0, 255)
  capa5Activa = button(capa5Activa, 780, yBotonesVJ, 60, 100, "", 0, 255)
  capa6Activa = button(capa6Activa, 860, yBotonesVJ, 60, 100, "", 0, 255)
}

function keyPressed() {
  if (key === "v" || key === "V") {
    pantalla = "vj"
  }

  if (key === "d" || key === "D") {
    pantalla = "dj"
  }
  
}

function mousePressed() {
  clickPendiente = true
}

// ESTO DEL HOVER ME COSTO ENTENDERLO, TODAVIA NO LO SE DEL TODO
function button(variable, x, y, w, h, txt, bkgColor, txtColor, img = null) {
  let hover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h

  if (img !== null) {
    if (hover) {
      image(img, x - 4, y - 4, w + 8, h + 8)
    } else {
      image(img, x, y, w, h)
    }
  } else {
    if (variable) {
      fill(255, 0, 120)
    } else if (hover) {
      fill(180)
    } else {
      fill(bkgColor)
    }

    rect(x, y, w, h)

    fill(txtColor)
    text(txt, x + w / 2, y + h / 2)
  }

  if (hover && clickPendiente) {
    variable = !variable
  }

  return variable
}
