let fontPixelifySans

let vistavj
let mesa
let mixer
let rueda
let slider

let vista = "DJ"

let layer1Activa = false
let layer2Activa = false
let layer3Activa = false
let hypeModeActivo = false
let filtroActivo = false

let trackVozActiva = false
let trackKaraokeActiva = false
let trackKylieActiva = false

let trackVoz
let trackKaraoke
let trackKylie

let hypeMode
let filtroSonoro

let deckVoz = {nombre:"TRACK 1",artista:"MIRANDA VOZ"}
let deckKaraoke = {nombre:"TRACK 2",artista:"MIRANDA KARAOKE"}
let deckKylie = {nombre:"TRACK 3",artista:"KYLIE MINOGUE"}

let sliderDJPosX = 600
let sliderDJPosY = 635

let sliderPuntoA = 510
let sliderPuntoB = 690

function preload(){
  fontPixelifySans = loadFont('assets/PixelifySans-VariableFont_wght.ttf')
  
  vistavj = loadImage('imágenes/vistavj.png')
  mesa = loadImage('imágenes/mesa.png')
  mixer = loadImage('imágenes/mixer.png')
  rueda = loadImage('imágenes/rueda.png')
  slider = loadImage('imágenes/slider.png')

  trackVoz = loadSound('canciones/yotedire_voz.mp3')
  trackKaraoke = loadSound('canciones/yotedire_karaoke.mp3')
  trackKylie = loadSound('canciones/kylie.mp3')
  hypeMode = loadSound('canciones/hypemode.mp3')
}

function setup(){
  createCanvas(1200,800)
  background(0)
  textFont(fontPixelifySans)

  filtroSonoro = new p5.LowPass()

  trackVoz.setVolume(0)
  trackKaraoke.setVolume(0)
  trackKylie.setVolume(1)
  hypeMode.setVolume(1)

  aplicarFiltroSonoro()
}

function draw() {
  actualizarVolumenesTracks()

  if(vista === "DJ"){
    mostrarDJ()
  }
  if(vista === "VJ"){
    mostrarVJ()
  }
}

function keyPressed(){
  if(key === "d"){
    vista = "DJ"
  }
  if(key === "v"){
    vista = "VJ"
  }

  if(key === "f" || key === "F"){
    filtroActivo = !filtroActivo
    aplicarFiltroSonoro()
  }
}

function mousePressed(){
  if(mouseX>84 && mouseX<184 && mouseY>580 && mouseY<610){
    trackVozActiva = !trackVozActiva
    if(trackVozActiva){
      if(!trackVoz.isPlaying()){
        trackVoz.play()
      }
    }else{
      trackVoz.stop()
    }
  }

  if(mouseX>204 && mouseX<304 && mouseY>580 && mouseY<610){
    trackKaraokeActiva = !trackKaraokeActiva
    if(trackKaraokeActiva){
      if(!trackKaraoke.isPlaying()){
        trackKaraoke.play()
      }
    }else{
      trackKaraoke.stop()
    }
  }

  if(mouseX>324 && mouseX<424 && mouseY>580 && mouseY<610){
    trackKylieActiva = !trackKylieActiva
    if(trackKylieActiva){
      if(!trackKylie.isPlaying()){
        trackKylie.play()
      }
    }else{
      trackKylie.stop()
    }
  }

  if(vista!=="VJ"){
    return
  }

  if(mouseX>750 && mouseX<900 && mouseY>600 && mouseY<630){
    hypeModeActivo = !hypeModeActivo
    if(hypeModeActivo){
      hypeMode.play()
    }else{
      hypeMode.stop()
    }
  }

  if(mouseX>404 && mouseX<469 && mouseY>473 && mouseY<493){
    layer1Activa = !layer1Activa
  }
  if(mouseX>404 && mouseX<469 && mouseY>493 && mouseY<513){
    layer2Activa = !layer2Activa
  }
  if(mouseX>404 && mouseX<469 && mouseY>513 && mouseY<533){
    layer3Activa = !layer3Activa
  }
}

function actualizarVolumenesTracks(){
  let valorCrossfade = map(sliderDJPosX, sliderPuntoA, sliderPuntoB, 0, 1)

  let volKaraoke = 1-valorCrossfade
  let volVoz = valorCrossfade

  if(trackVozActiva){
    trackVoz.setVolume(volVoz)
  }else{
    trackVoz.setVolume(0)
  }
  if(trackKaraokeActiva){
    trackKaraoke.setVolume(volKaraoke)
  }else{
    trackKaraoke.setVolume(0)
  }
  if(trackKylieActiva){
    trackKylie.setVolume(1)
  }else{
    trackKylie.setVolume(0)
  }
}

function aplicarFiltroSonoro(){
  if(filtroActivo){
    trackVoz.disconnect()
    trackKaraoke.disconnect()
    trackKylie.disconnect()
    hypeMode.disconnect()
    trackVoz.connect(filtroSonoro)
    trackKaraoke.connect(filtroSonoro)
    trackKylie.connect(filtroSonoro)
    hypeMode.connect(filtroSonoro)
    filtroSonoro.freq(600)
    filtroSonoro.res(18)
  }else{
    trackVoz.disconnect()
    trackKaraoke.disconnect()
    trackKylie.disconnect()
    hypeMode.disconnect()

    trackVoz.connect()
    trackKaraoke.connect()
    trackKylie.connect()
    hypeMode.connect()
  }
}

function mostrarDJ(){
  background(0)

  tint(255,120)
  image(mesa,0,0,width,height)
  noTint()
  image(mixer,50,50,1100,700)

  textSize(20)
  strokeWeight(1)
  fill('#903590')
  textAlign(CENTER)
  text("MIRANDA X KYLIE MINOGUE",width/2,115)

  image(rueda,118,280,268,268)
  image(rueda,808,280,268,268)

  stroke('#903590')
  strokeWeight(3)
  line(sliderPuntoA,632,sliderPuntoB,632)

  if(mouseIsPressed && dist(sliderDJPosX,sliderDJPosY,mouseX,mouseY)<50 && mouseX > sliderPuntoA && mouseX < sliderPuntoB){
    sliderDJPosX = mouseX
  }

  image(slider,sliderDJPosX-15,610,30,50)

  fill('#a555a5')
  rect(74,134,358,100)
  rect(768,134,358,100)

  if(trackVozActiva){
    fill('#ffacff')
  }else{
    fill('#a555a5')
  }
  rect(84,580,100,30)

  if(trackKaraokeActiva){
    fill('#ffacff')
  }else{
    fill('#a555a5')
  }
  rect(204,580,100,30)

  if(trackKylieActiva){
    fill('#ffacff')
  }else{
    fill('#a555a5')
  }
  rect(324,580,100,30)

  fill('#a555a5')
  rect(475,134,250,200)

  fill(255)

  textSize(20)

  text(deckVoz.nombre,130,600)
  text(deckKaraoke.nombre,250,600)
  text(deckKylie.nombre,370,600)

  textSize(10)

  text(deckVoz.artista,130,615)
  text(deckKaraoke.artista,250,615)
  text(deckKylie.artista,370,615)

  textSize(20)

  stroke('#ffacff')
  strokeWeight(2)

  for(let i=0;i<45;i++){
    let w = sin(frameCount*0.10 + i*0.2)*15 + sin(frameCount*0.1 + i*0.5)*8
    line(78+i*8,184-w,78+i*8,184+w)
  }

  stroke('#ffacff')
  strokeWeight(2)

  for(let i=0;i<45;i++){
    let w = sin(frameCount*0.10 + i*0.2)*15 + sin(frameCount*0.1 + i*0.5)*8
    line(772+i*8,184-w,772+i*8,184+w)
  }

  for(let i=0;i<6;i++){
    let coloresRandom = random(['#fc7d7d','#f579aa','#f5a660','#cfe252','#6cd255','#5bc4e1'])
    fill(coloresRandom)
    rect(478+i*41,380,40,40)
  }

  for(let i=0;i<6;i++){
    fill(random(['#fc7d7d','#f579aa','#f5a660','#cfe252','#6cd255','#5bc4e1']))
    rect(560,480+i*16,15,16)
  }

  for(let i=0;i<6;i++){
    fill(random(['#fc7d7d','#f579aa','#f5a660','#cfe252','#6cd255','#5bc4e1']))
    rect(625,480+i*16,15,16)
  }
}

function mostrarVJ(){
  if(hypeModeActivo){
    background(random(['#fc7d7d','#f579aa','#f5a660','#cfe252','#6cd255','#5bc4e1','#ef1aef','#a12a71']))
  }else{
    background('#ffc0ff')
  }

  image(vistavj,0,0,width,height)

  noStroke()
  fill('#a555a5')
  rect(404,473,65,20)
  rect(404,493,65,20)
  rect(404,513,65,20)

  if(hypeModeActivo){
    fill(random(['#fc7d7d','#f579aa','#f5a660','#cfe252','#6cd255','#5bc4e1','#ef1aef','#a12a71']))
  }else{
    fill('#a555a5')
  }

  rect(750,600,150,30)
  
  fill(random(['#ef1aef','#b46594','#a12a71']))
  rect(400,412,380,40)

  fill(255)
  textSize(10)
  text("LAYER 1",435,486)
  text("LAYER 2",435,506)
  text("LAYER 3",435,526)
  textSize(20)
  text("HYPE MODE",825,620)
  textSize(15)
  fill('#a555a5')
  text("LOW LIGHTS MODE",465,468)

  for(let i=0;i<11;i++){
    fill(random(['#fc7d7d','#f579aa','#f5a660','#cfe252','#6cd255','#5bc4e1']))
    rect(500+i*15,645,15,15)
  }

  if(layer1Activa){
    for(let i=0;i<25;i++){
      fill(random(['#ef1aef','#b46594','#a12a71']))
    }
    for(let i=0;i<40;i++){
      ellipse(600 + sin(frameCount*0.03+i)*140,190 + cos(frameCount*0.04+i)*70,8)
    }
  }

  if(layer2Activa){
    noStroke()
    fill('#b46594')

    for(let i=0;i<40;i++){
      ellipse(550 + sin(frameCount*0.05+i)*140,190 + cos(frameCount*0.08+i)*70,8)
    }
  }

  if(layer3Activa){
    noStroke()
    fill('#a12a71')

    for(let i=0;i<40;i++){
      ellipse(
        650 + sin(frameCount*0.05+i)*140,
        190 + cos(frameCount*0.08+i)*70,8
      )
    }
  }
}