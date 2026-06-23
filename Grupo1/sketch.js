

function preload() {
  normal = loadFont("assets/tipo/Geist.ttf");
  starwars = loadFont("assets/tipo/Starjedi.ttf");
  preloadDJ();
  preloadVJ();
}

function setup() {
  createCanvas(1200, 800);

  setupDJ();
  setupVJ();
}

function dibujarIntro() {
  background(0);

  push()
  fill(255, 0, 0);
  textSize(42);
  textAlign(CENTER, CENTER);
  textFont(starwars)
  stroke(0)
  strokeWeight(5)
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = color(200, 0, 0);
  text("DJ / vJ  STAR WARS", width / 2, 300);

  pop()

  fill(255);
  textFont(normal)
  textSize(22);
  text("Tocá D para ir a DJ", width / 2, 400);
  text("Tocá V para ir a VJ", width / 2, 440);
}

function draw() {

  actualizarAudioModos();
  
  if (vista == "intro") {
    dibujarIntro();
  }

  if (vista == "dj") {
    drawDJ();
  }

  if (vista == "vj") {
    drawVJ();
  }

}

function mousePressed() {

  if (vista == "dj") {
    mousePressedDJ();
  }

  if (vista == "vj") {
    mousePressedVJ();
  }

}

function mouseDragged() {

  if (vista == "dj") {
    mouseDraggedDJ();
  }

}

function mouseReleased() {

  if (vista == "dj") {
    mouseReleasedDJ();
  }

}

function keyPressed() {

  if (key == "D") vista = "dj";
  if (key == "d") vista = "dj";

  if (key == "V") vista = "vj";
  if (key == "v") vista = "vj";

  if (key == "I") vista = "intro";
  if (key == "i") vista = "intro";

  if (vista == "vj") {
    keyPressedVJ();
  }

}