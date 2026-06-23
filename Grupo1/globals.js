let vista = "intro";
let normal, starwars;
let chill = false;
let viaje = false;

let ampLevel = 0;
let bassEnergy = 0;
let midEnergy = 10;
let trebleEnergy = 0;

function actualizarAudioModos() {
  let modificadorVelocidad = 1;

  if (viaje) {
    modificadorVelocidad = 1.25;
  }

  if (chill) {
    modificadorVelocidad = 0.75;
  }

  sfxMarcha.rate(velocidadMarcha * modificadorVelocidad);
  sfxOrquesta.rate(velocidadOrquesta * modificadorVelocidad);
}