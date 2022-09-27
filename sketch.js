let count;
let time;
let redEnemyCount;
let blueEnemyCount;
let yellowEnemyCount;
let greenEnemyCount;
let healthCount;
let waveNumber;

let waveEnd;
let waveText;
let t = 0;

let distance;
let healthDistance;

let numberOfStars = 100;
let stars = [];

let numberOfRedEnemies = 0;
let numberOfBlueEnemies = 0;
let numberOfYellowEnemies = 0;
let numberOfGreenEnemies = 0;
let redEnemies = [];
let blueEnemies = [];
let yellowEnemies = [];
let greenEnemies = [];

let backgroundColor = "rgb(35, 35, 35)";
let timeColor = 225;

let healthText = new HealthText(-100, -100);
let unicaOne;
let bebasFont;
let mouseImg;

let deathSound;
let powerUpSound;
let music;

let canvasHeight;
let canvasWidth;

function preload() {
  unicaOne = loadFont('fonts/UnicaOne-Regular.ttf');
  bebasFont = loadFont('fonts/BebasNeue-Regular.ttf');
  mouseImg = loadImage('mouse.png');

  soundFormats('mp3');
  deathSound = loadSound('sound/death.mp3');
  powerUpSound = loadSound('sound/powerUp.mp3');
  music = loadSound('sound/musikk.mp3');
}

function setup() {
  music.setVolume(0.25);
  music.play();
  canvasWidth = windowWidth;
  canvasHeight = windowHeight - 3.25;
  createCanvas(canvasWidth, canvasHeight); // Lager canvas

  count = 0;
  redEnemyCount = 0;
  blueEnemyCount = 0;
  yellowEnemyCount = 0;
  greenEnemyCount = 0;
  healthCount = 0;
  time = 0;
  waveNumber = 0;

  let waveEnd = false;

  player = new Player();
  lost = new Lost();

  healthP = new HealthPowerUp();

  for (i = 0; i < numberOfStars; i++) { // Fyller arrayet stars med stjerne-objekter
    stars[i] = new Star(random(canvasWidth), random(canvasHeight), random(0.25, 1.25), random(1));
  }
}

function draw() {
  frameRate(60);
  count++;
  if(lost.lost == false){
    time = Math.floor(frameCount / 60); // Tid i sekunder (Hvis det er 60fps)
  }

  background(backgroundColor); // Tegner bakgrunn
  for (let star of stars) { // Tegner alle sternene
    star.show();
  }

  if(lost.lost !== true){
    fill(255, 255);
    stroke(0, 255);
    strokeWeight(1);
    ellipse(mouseX, mouseY, 5);
  }

  if (frameCount - healthCount == 200) { // Hvor ofte HealthPowerUp skal spawne
    healthP.spawn();
    healthP.color.t = 0;
    healthP.visible = true;
  }

  healthDistance = dist(player.x, player.y, healthP.x, healthP.y)
  if (healthDistance < 30 && healthP.visible && lost.lost == false) {
    powerUpSound.setVolume(0.5);
    powerUpSound.play();
    healthP.visible = false;
    healthCount = frameCount;
    player.changeHealth(20);
    healthText = new HealthText(player.x, player.y, "+20 hp", true, frameCount);
  }

  healthP.show();

  player.show();
  player.move();

  // image(akImage, player.x - 40, player.y, 60, 30);

  if (player.health > 0) {
    player.health -= 0.025; // Mister 0.01 liv per frame
  }

  healthText.show();

  // WAVE SYSTEM // WAVE SYSTEM // WAVE SYSTEM // WAVE SYSTEM //
  if(frameCount > 60 && frameCount < 120){
    textMessage("WAVE 1");
  } else if(frameCount > 120 && frameCount < 720){
    t = 0;
    wave(150, 100000, 100000, 100000); // Ny wave
    if(lost.lost == false){
      waveNumber = 1;
    }
  } else if(frameCount > 720 && frameCount < 800){
    textMessage("WAVE 1 CLEARED");
    respawn();
  }

  else if(frameCount > 800 && frameCount < 860){
    textMessage("WAVE 2");
    numberOfRedEnemies = 0;
    numberOfBlueEnemies = 0;
    numberOfYellowEnemies = 0;
    numberOfGreenEnemies = 0;
  } else if(frameCount > 860 && frameCount < 1660){
    t = 0;
    wave(150, 100000, 100000, 100000); // Ny wave
    if(lost.lost == false){
      waveNumber = 2;
    }
  } else if(frameCount > 1660 && frameCount < 1720){
    textMessage("WAVE 2 CLEARED");
    respawn();
  }

  else if(frameCount > 1720 && frameCount < 1780){
    textMessage("WAVE 3");
    numberOfRedEnemies = 0;
    numberOfBlueEnemies = 0;
    numberOfYellowEnemies = 0;
    numberOfGreenEnemies = 0;
  } else if(frameCount > 1780 && frameCount < 2780){
    t = 0;
    wave(150, 350, 100000, 100000); // Ny wave
    if(lost.lost == false){
      waveNumber = 3;
    }
  } else if(frameCount > 2780 && frameCount < 2840){
    textMessage("WAVE 3 CLEARED");
    respawn();
  }

  else if(frameCount > 2840 && frameCount < 2900){
    textMessage("WAVE 4");
    numberOfRedEnemies = 0;
    numberOfBlueEnemies = 0;
    numberOfYellowEnemies = 0;
    numberOfGreenEnemies = 0;
  } else if(frameCount > 2900 && frameCount < 4100){
    wave(150, 350, 100000, 100000); // Ny wave
    if(lost.lost == false){
      waveNumber = 4;
    }
  } else if(frameCount > 4100 && frameCount < 4160){
    textMessage("WAVE 4 CLEARED");
    respawn();
  }

  else if(frameCount > 4160 && frameCount < 4220){
    textMessage("WAVE 5");
    numberOfRedEnemies = 0;
    numberOfBlueEnemies = 0;
    numberOfYellowEnemies = 0;
    numberOfGreenEnemies = 0;
  } else if(frameCount > 4220 && frameCount < 5620){
    wave(150, 350, 700, 100000); // Ny wave
    if(lost.lost == false){
      waveNumber = 5;
    }
  } else if(frameCount > 5620 && frameCount < 5680){
    textMessage("WAVE 5 CLEARED");
    respawn();
  }

  else if(frameCount > 5680 && frameCount < 5740){
    textMessage("WAVE 6");
    numberOfRedEnemies = 0;
    numberOfBlueEnemies = 0;
    numberOfYellowEnemies = 0;
    numberOfGreenEnemies = 0;
  } else if(frameCount > 5740 && frameCount < 7340){
    wave(150, 350, 700, 100000); // Ny wave
    if(lost.lost == false){
      waveNumber = 6;
    }
  } else if(frameCount > 7340 && frameCount < 7400){
    textMessage("WAVE 6 CLEARED");
    respawn();
  }

  else if(frameCount > 7400 && frameCount < 7460){
    textMessage("WAVE 7");
    numberOfRedEnemies = 0;
    numberOfBlueEnemies = 0;
    numberOfYellowEnemies = 0;
    numberOfGreenEnemies = 0;
  } else if(frameCount > 7460 && frameCount < 9000){
    wave(150, 350, 700, 700); // Ny wave
    if(lost.lost == false){
      waveNumber = 7;
    }
  } else if(frameCount > 9000 && frameCount < 9060){
    textMessage("WAVE 7 CLEARED");
    respawn();
  }

  else if(frameCount > 9060 && frameCount < 9120){
    textMessage("WAVE 8");
    numberOfRedEnemies = 0;
    numberOfBlueEnemies = 0;
    numberOfYellowEnemies = 0;
    numberOfGreenEnemies = 0;
  } else if(frameCount > 9120 && frameCount < 11000){
    wave(150, 350, 700, 700); // Ny wave
    if(lost.lost == false){
      waveNumber = 8;
    }
  }
  player.drawHealth();

  fill(timeColor);
  noStroke();
  textSize(75);
  textAlign(CENTER);
  textFont(unicaOne);
  text(time, canvasWidth / 2, 75);

  textSize(30);
  textAlign(LEFT);
  textFont(unicaOne);
  text(waveText, 7, 30);


  if(frameCount > 11000 && frameCount < 9999999999999){
    this.win = true;
    lost.show();
  }

  if (player.health <= 0) {
    lost.show();
    lost.lost = true;
    redEnemies.splice(0, redEnemies.length);
    blueEnemies.splice(0, blueEnemies.length);
    yellowEnemies.splice(0, yellowEnemies.length);
    greenEnemies.splice(0, greenEnemies.length);
  }

}

function wave(redTime, blueTime, yellowTime, greenTime){
  if(frameCount - redEnemyCount > redTime) { // Spawner en ny Enemy
    redEnemyCount = frameCount;
    redEnemies.push(new RedEnemy);
    numberOfRedEnemies += 1;
    redEnemies[redEnemies.length - 1].spawn();
  }
  for (i = 0; i <= numberOfRedEnemies; i++) {
    if(redEnemies[i]){ // Hvis det finnes enemies
      redEnemies[i].move(); // Beveg enemy
      redEnemies[i].show(); // Hvis enemy
      distance = dist(player.x, player.y, redEnemies[i].x, redEnemies[i].y); // Avstanden mellom Player og Enemy
      if (distance < player.radius + redEnemies[i].radius) { // Sjekker om player krasjer med en Enemy
        deathSound.setVolume(1.5);
        deathSound.play();
        redEnemies[i].spawn(); // Respawner Enemy
        player.changeHealth(-40); // Fjerner liv
        healthText = new HealthText(player.x, player.y, "-40 hp", false, frameCount);
      }
    }
  }

  if(frameCount - blueEnemyCount > blueTime) { // Spawner en ny Enemy
    blueEnemyCount = frameCount;
    blueEnemies.push(new BlueEnemy);
    numberOfBlueEnemies += 1;
    blueEnemies[blueEnemies.length - 1].spawn();
  }
  for (i = 0; i <= numberOfBlueEnemies; i++) {
    if(blueEnemies[i]){ // Hvis det finnes enemies
      blueEnemies[i].move(); // Beveg enemy
      blueEnemies[i].show(); // Hvis enemy
      distance = dist(player.x, player.y, blueEnemies[i].x, blueEnemies[i].y); // Avstanden mellom Player og Enemy
      if (distance < player.radius + blueEnemies[i].radius) { // Sjekker om player krasjer med en Enemy
        deathSound.setVolume(1.5);
        deathSound.play();
        blueEnemies[i].spawn(); // Respawner Enemy
        player.changeHealth(-50); // Fjerner liv
        healthText = new HealthText(player.x, player.y, "-50 hp", false, frameCount);
      }
    }
  }

  if(frameCount - yellowEnemyCount > yellowTime) { // Spawner en ny Enemy
    yellowEnemyCount = frameCount;
    yellowEnemies.push(new YellowEnemy);
    numberOfYellowEnemies += 1;
    yellowEnemies[yellowEnemies.length - 1].spawn();
  }
  for (i = 0; i <= numberOfYellowEnemies; i++) {
    if(yellowEnemies[i]){ // Hvis det finnes enemies
      yellowEnemies[i].move(); // Beveg enemy
      yellowEnemies[i].show(); // Hvis enemy
      distance = dist(player.x, player.y, yellowEnemies[i].x, yellowEnemies[i].y); // Avstanden mellom Player og Enemy
      if (distance < player.radius + yellowEnemies[i].radius) { // Sjekker om player krasjer med en Enemy
        deathSound.setVolume(1.5);
        deathSound.play();
        yellowEnemies[i].spawn(); // Respawner Enemy
        player.changeHealth(-50); // Fjerner liv
        healthText = new HealthText(player.x, player.y, "-30 hp", false, frameCount);
      }
    }
  }

  if(frameCount - greenEnemyCount > greenTime) { // Spawner en ny Enemy
    greenEnemyCount = frameCount;
    greenEnemies.push(new GreenEnemy);
    numberOfGreenEnemies += 1;
    greenEnemies[greenEnemies.length - 1].spawn();
  }
  for (i = 0; i <= numberOfGreenEnemies; i++) {
    if(greenEnemies[i]){ // Hvis det finnes enemies
      greenEnemies[i].move(); // Beveg enemy
      greenEnemies[i].show(); // Hvis enemy
      distance = dist(player.x, player.y, greenEnemies[i].x, greenEnemies[i].y); // Avstanden mellom Player og Enemy
      if (distance < player.radius + greenEnemies[i].radius) { // Sjekker om player krasjer med en Enemy
        deathSound.setVolume(1.5);
        deathSound.play();
        greenEnemies[i].spawn(); // Respawner Enemy
        player.changeHealth(-50); // Fjerner liv
        healthText = new HealthText(player.x, player.y, "-50 hp", false, frameCount);
      }
    }
  }
}

function respawn(){
  for (i = 0; i <= numberOfRedEnemies; i++) {
    if(redEnemies[i]){ // Hvis det finnes enemies
      redEnemies[i].spawn(); // Respawner Enemy
    }
  }
  for (i = 0; i <= numberOfBlueEnemies; i++) {
    if(blueEnemies[i]){ // Hvis det finnes enemies
      blueEnemies[i].spawn(); // Respawner Enemy
    }
  }
  for (i = 0; i <= numberOfYellowEnemies; i++) {
    if(yellowEnemies[i]){ // Hvis det finnes enemies
      yellowEnemies[i].spawn(); // Respawner Enemy
    }
  }
}

function textMessage(message){
  waveText = message;
  fill(timeColor, t);
  noStroke();
  textSize(100);
  textAlign(CENTER);
  textFont(unicaOne);
  text(message, canvasWidth / 2, canvasHeight / 2 - 30);
  t += 4;
}

function changeColor(backgroundCol, playerCol, playerType, enemyCol, enemyType, textCol){
  backgroundColor = backgroundCol;
  player.color = playerCol;
  player.colorType = playerType;
  for (i = 0; i <= numberOfRedEnemies; i++) {
    enemies[i].color = enemyCol;
    enemies[i].colorType = enemyType;
  }
  timeColor = textCol;
}
/*
function waveTime(waveNumber){
  if(frameCount > 60*waveNumber && frameCount < waveNumber * 120){
    textMessage("WAVE 1");
  } else if(frameCount > time + 120 && frameCount < time + 120 + ){
    t = 0;
    wave(100); // Ny wave
  } else if(frameCount > 720 && frameCount < 800){
    textMessage("WAVE 1 CLEARED");
    respawn();
  }
}
*/

function mousePressed(){
  if(lost.lost){
    if(mouseX > canvasWidth / 2 - 82.5 && mouseX < canvasWidth / 2 + 92.5 && mouseY > canvasHeight / 2 + 100 && mouseY < canvasHeight / 2 + 1650){
      location.reload();
    }
  }
}
