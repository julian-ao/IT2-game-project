class Player {
  constructor() {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.radius = 15;
    this.color = "rgb(217, 251, 255)";
    this.xSpeed = .75; // Hvor mye xVelocity akselererer
    this.ySpeed = .75; // Hvor mye yVelocity akselererer
    this.xVelocity = 0; // x-farten
    this.yVelocity = 0; // y-farten
    this.xBrake = .35; // Hvor mye xVelocity bremser hele tiden
    this.yBrake = .35; // Hvor mye yVelocity bremser hele tiden
    this.xMaxSpeed = 5; // Maks x-fart
    this.yMaxSpeed = 5; // Maks y-fart

    this.startHealth = 100;
    this.health = this.startHealth;
    this.alive = true;
  }
  show() { // Funksjon som tegner spilleren
    fill(0, 0);
    strokeWeight(2);
    stroke(this.color);
    ellipse(this.x, this.y, this.radius * 2);
    fill(this.color.r, this.color.g, this.color.b, this.color.t);

    // Tegner smilefjes
    ellipse(this.x - 4.25, this.y - 5, 2);
    ellipse(this.x + 4.25, this.y - 5, 2);
    fill(0, 0);

    // Munn
    arc(this.x, this.y + 1, 10, 10, 0.25, 2.75);
  }
  move() { // Funksjon som flytter på spilleren
    if (keyIsDown(LEFT_ARROW) && this.x - this.radius > 0 && this.xVelocity > -this.xMaxSpeed || keyIsDown(65) && this.x - this.radius > 0 && this.xVelocity > -this.xMaxSpeed) {
      this.xVelocity -= this.xSpeed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x + this.radius < canvasWidth && this.xVelocity < this.xMaxSpeed || keyIsDown(68) && this.x + this.radius < canvasWidth && this.xVelocity < this.xMaxSpeed) {
      this.xVelocity += this.xSpeed;
    }
    if (keyIsDown(UP_ARROW) && this.y - this.radius > 0 && this.yVelocity > -this.yMaxSpeed || keyIsDown(87) && this.y - this.radius > 0 && this.yVelocity > -this.yMaxSpeed) {
      this.yVelocity -= this.ySpeed;
    }
    if (keyIsDown(DOWN_ARROW) && this.y + this.radius < canvasHeight - 4 && this.yVelocity < this.yMaxSpeed || keyIsDown(83) && this.y + this.radius < canvasHeight - 4 && this.yVelocity < this.yMaxSpeed) {
      this.yVelocity += this.ySpeed;
    }

    if(this.x + this.radius > canvasWidth){
      this.x = canvasWidth - this.radius;
    } else if (this.x - this.radius < 0){
      this.x = this.radius;
    }
    if(this.y + this.radius > canvasHeight){
      this.y = canvasHeight - this.radius;
    } else if (this.y - this.radius < 0){
      this.y = this.radius;
    }

    this.x += this.xVelocity; // Endrer på x-farten
    this.y += this.yVelocity; // Endrer på y-farten

    if (this.xVelocity > 0) { // Bremser xVelocity
      this.xVelocity -= this.xBrake;
    } else if (this.xVelocity < 0) {
      this.xVelocity += this.xBrake;
    }
    if (this.yVelocity > 0) { // Bremser yVelocity
      this.yVelocity -= this.yBrake;
    } else if (this.yVelocity < 0) {
      this.yVelocity += this.yBrake;
    }

    if (this.xVelocity < .2 && this.xVelocity > -.2) { // Stopper xVelocity hvis den blir for liten
      this.xVelocity = 0;
    }
    if (this.yVelocity < .2 && this.yVelocity > -.2) { // Stopper yVelocity hvis den blir for liten
      this.yVelocity = 0;
    }
  }
  drawHealth() { // Funksjon for health-baren

    noStroke();
    fill(115, 112, 111, 150);
    rect(canvasWidth / 2 - this.startHealth * 3 / 2, canvasHeight - 50, this.startHealth * 3, 20); // Den gråe bakgrunnen til health-baren

    fill(79, 196, 110, 200);
    rect(canvasWidth / 2 - this.startHealth * 3 / 2, canvasHeight - 50, this.health * 3, 20); // Health-baren

    textFont(unicaOne);
    noStroke();
    textSize(25);
    textAlign(RIGHT);
    text(Math.ceil(this.health), canvasWidth / 2 - this.startHealth * 1.6, canvasHeight - 32); // Tallet ved siden av health-baren
  }
  changeHealth(change) { // Funksjon som endrer på health til Player
    if (change + this.health > 100) {
      this.health = 100;
    } else if (change + this.health < 0) {
      this.health = 0;
    } else {
      this.health += change;
    }
  }
}

class Star {
  constructor(x, y, r, blink) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = {
      r: random(150, 255),
      g: random(150, 255),
      b: random(150, 255),
      t: 255
    };
    this.blink = blink;
  }
  show() { // Funksjon som tegner stjernen
    if (this.blink <= .2) { // 20% av stjernene blinker
      fill(this.color.r, this.color.g, this.color.b, random(255));
    } else {
      fill(this.color.r, this.color.g, this.color.b, );
    }
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
}

class RedEnemy {
  constructor() {
    this.x;
    this.y;
    this.radius = 25;
    this.speed = 2;
    this.sideVelocity;
    this.sideSpeed = 3;
    this.maxSpeed = 5;
    this.color = "rgb(291, 69, 55)";
    this.spawnPoint;
  }
  show() {
    fill(0, 0);
    strokeWeight(3);
    stroke(this.color);
    ellipse(this.x, this.y, this.radius * 2);

    // Tegner smilefjes
    // Øyne
    ellipse(this.x - 7, this.y - 7, 2);
    ellipse(this.x + 7, this.y - 7, 2);
    fill(0, 0);

    // Munn
    arc(this.x, this.y + 15, 20, 20, 3.5, 6);

    // Øyenbryn
    line(this.x - 10, this.y - 11, this.x - 3, this.y - 9);
    line(this.x + 10, this.y - 11, this.x + 3, this.y - 9);
  }
  spawn() {
    this.spawnPoint = Math.ceil(random(4)); // Setter this.spawnPoint til et tilfeldig tall fra 1 til 4
    this.sideVelocity = Math.random() * (this.sideSpeed + this.sideSpeed) - this.sideSpeed;
    if (this.speed < this.maxSpeed) {
      this.speed *= Math.random() * (1.01 - 1) + 1; // Beveger seg litt raskere hver gang Enemy spawner
    }
    if (this.spawnPoint == 1) {
      this.x = random(this.radius, canvasWidth - this.radius);
      this.y = -this.radius;
    } else if (this.spawnPoint == 2) {
      this.x = canvasWidth + this.radius;
      this.y = random(this.radius, canvasHeight);
    } else if (this.spawnPoint == 3) {
      this.x = random(this.radius, canvasWidth - this.radius);
      this.y = canvasHeight + this.radius;
    } else if (this.spawnPoint == 4) {
      this.x = -this.radius;
      this.y = random(this.radius, canvasHeight - this.radius);
    }
  }
  move() {
    if (this.spawnPoint == 1) {
      this.y += this.speed;
      this.x += this.sideVelocity;
      if (this.y > canvasHeight + this.radius || this.x - this.radius > canvasWidth || this.x < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 2) {
      this.x -= this.speed;
      this.y += this.sideVelocity;
      if (this.y > canvasHeight + this.radius || this.x < -this.radius || this.y < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 3) {
      this.y -= this.speed;
      this.x += this.sideVelocity;
      if (this.x - this.radius > canvasWidth || this.x < -this.radius || this.y < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 4) {
      this.x += this.speed;
      this.y += this.sideVelocity;
      if (this.y > canvasHeight + this.radius || this.x - this.radius > canvasWidth || this.y < -this.radius) {
        this.spawn();
      }
    }
  }
}

class BlueEnemy {
  constructor() {
    this.x;
    this.y;
    this.radius = 40;
    this.speed = 2;
    this.sideVelocity;
    this.sideSpeed = 0;
    this.color = "rgb(80, 129, 181)";
    this.spawnPoint;
    this.positive = true;
  }
  show() {
    fill(0, 0);
    strokeWeight(3);
    stroke(this.color);
    ellipse(this.x, this.y, this.radius * 2);

    // Tegner smilefjes
    // Øyne
    ellipse(this.x - 7, this.y - 7, 2);
    ellipse(this.x + 7, this.y - 7, 2);
    fill(0, 0);

    // Munn
    arc(this.x, this.y + 15, 20, 20, 3.5, 6);

    // Øyenbryn
    line(this.x - 10, this.y - 11, this.x - 3, this.y - 9);
    line(this.x + 10, this.y - 11, this.x + 3, this.y - 9);
  }
  spawn() {
    this.spawnPoint = Math.ceil(random(4)); // Setter this.spawnPoint til et tilfeldig tall fra 1 til 4
    this.sideVelocity = 3;
    if (this.spawnPoint == 1) {
      this.x = random(this.radius, canvasWidth - this.radius);
      this.y = -this.radius;
    } else if (this.spawnPoint == 2) {
      this.x = canvasWidth + this.radius;
      this.y = random(this.radius, canvasHeight);
    } else if (this.spawnPoint == 3) {
      this.x = random(this.radius, canvasWidth - this.radius);
      this.y = canvasHeight + this.radius;
    } else if (this.spawnPoint == 4) {
      this.x = -this.radius;
      this.y = random(this.radius, canvasHeight - this.radius);
    }
  }
  move() {
    if (this.spawnPoint == 1) {
      this.y += this.speed;
      this.x += this.sideSpeed;
      if (this.y > canvasHeight + this.radius || this.x - this.radius > canvasWidth || this.x < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 2) {
      this.x -= this.speed;
      this.y += this.sideSpeed;
      if (this.y > canvasHeight + this.radius || this.x < -this.radius || this.y < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 3) {
      this.y -= this.speed;
      this.x += this.sideSpeed;
      if (this.x - this.radius > canvasWidth || this.x < -this.radius || this.y < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 4) {
      this.x += this.speed;
      this.y += this.sideSpeed;
      if (this.y > canvasHeight + this.radius || this.x - this.radius > canvasWidth || this.y < -this.radius) {
        this.spawn();
      }
    }
    if(this.positive){
      if(this.sideSpeed < 10){
        this.sideSpeed++;
      } else{
        this.positive = false;
      }
    } else{
      if(this.sideSpeed > -10){
        this.sideSpeed--;
      } else{
        this.positive = true;
      }
    }
  }
}

class YellowEnemy {
  constructor() {
    this.x;
    this.y;
    this.radius = 15;
    this.speed = 10;
    this.sideVelocity;
    this.sideSpeed = 3;
    this.maxSpeed = 15;
    this.color = "rgb(217, 208, 41)";
    this.spawnPoint;
  }
  show() {
    fill(0, 0);
    strokeWeight(3);
    stroke(this.color);
    ellipse(this.x, this.y, this.radius * 2);

    // Tegner smilefjes
    // Øyne
    ellipse(this.x - 7, this.y - 7, 2);
    ellipse(this.x + 7, this.y - 7, 2);
    fill(0, 0);

    // Munn
    arc(this.x, this.y + 15, 20, 20, 3.5, 6);

    // Øyenbryn
    line(this.x - 10, this.y - 11, this.x - 3, this.y - 9);
    line(this.x + 10, this.y - 11, this.x + 3, this.y - 9);
  }
  spawn() {
    this.spawnPoint = Math.ceil(random(4)); // Setter this.spawnPoint til et tilfeldig tall fra 1 til 4
    this.sideVelocity = Math.random() * (this.sideSpeed + this.sideSpeed) - this.sideSpeed;
    if (this.speed < this.maxSpeed) {
      this.speed *= Math.random() * (1.05 - 1) + 1; // Beveger seg litt raskere hver gang Enemy spawner
    }
    if (this.spawnPoint == 1) {
      this.x = random(this.radius, canvasWidth - this.radius);
      this.y = -this.radius;
    } else if (this.spawnPoint == 2) {
      this.x = canvasWidth + this.radius;
      this.y = random(this.radius, canvasHeight);
    } else if (this.spawnPoint == 3) {
      this.x = random(this.radius, canvasWidth - this.radius);
      this.y = canvasHeight + this.radius;
    } else if (this.spawnPoint == 4) {
      this.x = -this.radius;
      this.y = random(this.radius, canvasHeight - this.radius);
    }
  }
  move() {
    if (this.spawnPoint == 1) {
      this.y += this.speed;
      this.x += this.sideVelocity;
      if (this.y > canvasHeight + this.radius || this.x - this.radius > canvasWidth || this.x < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 2) {
      this.x -= this.speed;
      this.y += this.sideVelocity;
      if (this.y > canvasHeight + this.radius || this.x < -this.radius || this.y < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 3) {
      this.y -= this.speed;
      this.x += this.sideVelocity;
      if (this.x - this.radius > canvasWidth || this.x < -this.radius || this.y < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 4) {
      this.x += this.speed;
      this.y += this.sideVelocity;
      if (this.y > canvasHeight + this.radius || this.x - this.radius > canvasWidth || this.y < -this.radius) {
        this.spawn();
      }
    }
  }
}

class GreenEnemy {
  constructor() {
    this.x;
    this.y;
    this.radius = 100;
    this.speed = 2;
    this.sideVelocity;
    this.sideSpeed = 3;
    this.color = "rgb(58, 135, 79)";
    this.spawnPoint;
  }
  show() {
    fill(0, 0);
    strokeWeight(3);
    stroke(this.color);
    ellipse(this.x, this.y, this.radius * 2);

    // Tegner smilefjes
    // Øyne
    ellipse(this.x - 7, this.y - 7, 2);
    ellipse(this.x + 7, this.y - 7, 2);
    fill(0, 0);

    // Munn
    arc(this.x, this.y + 15, 20, 20, 3.5, 6);

    // Øyenbryn
    line(this.x - 10, this.y - 11, this.x - 3, this.y - 9);
    line(this.x + 10, this.y - 11, this.x + 3, this.y - 9);
  }
  spawn() {
    this.spawnPoint = Math.ceil(random(4)); // Setter this.spawnPoint til et tilfeldig tall fra 1 til 4
    this.sideVelocity = Math.random() * (this.sideSpeed + this.sideSpeed) - this.sideSpeed;
    if (this.spawnPoint == 1) {
      this.x = random(this.radius, canvasWidth - this.radius);
      this.y = -this.radius;
    } else if (this.spawnPoint == 2) {
      this.x = canvasWidth + this.radius;
      this.y = random(this.radius, canvasHeight);
    } else if (this.spawnPoint == 3) {
      this.x = random(this.radius, canvasWidth - this.radius);
      this.y = canvasHeight + this.radius;
    } else if (this.spawnPoint == 4) {
      this.x = -this.radius;
      this.y = random(this.radius, canvasHeight - this.radius);
    }
  }
  move() {
    if (this.spawnPoint == 1) {
      this.y += this.speed;
      this.x += this.sideVelocity;
      if (this.y > canvasHeight + this.radius || this.x - this.radius > canvasWidth || this.x < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 2) {
      this.x -= this.speed;
      this.y += this.sideVelocity;
      if (this.y > canvasHeight + this.radius || this.x < -this.radius || this.y < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 3) {
      this.y -= this.speed;
      this.x += this.sideVelocity;
      if (this.x - this.radius > canvasWidth || this.x < -this.radius || this.y < -this.radius) {
        this.spawn();
      }
    } else if (this.spawnPoint == 4) {
      this.x += this.speed;
      this.y += this.sideVelocity;
      if (this.y > canvasHeight + this.radius || this.x - this.radius > canvasWidth || this.y < -this.radius) {
        this.spawn();
      }
    }
  }
}

class HealthPowerUp {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.borderDistance = 100;
    this.length = 25;
    this.thick = 5;
    this.visible = false;
    this.color = {
      r: 79,
      g: 196,
      b: 110,
      t: 0
    }
  }
  show() {
    fill(this.color.r, this.color.g, this.color.b, this.color.t);
    noStroke();
    if (this.visible) {
      rect(this.x - this.thick / 2, this.y - this.length / 2, this.thick, this.length);
      rect(this.x - this.length / 2, this.y - this.thick / 2, this.length, this.thick);
      if (this.color.t < 255) {
        this.color.t += 12;
      }
    }
  }
  spawn() {
    this.x = random(this.borderDistance, canvasWidth - this.borderDistance);
    this.y = random(this.borderDistance, canvasHeight - this.borderDistance);
  }
}

class Lost {
  constructor() {
    this.color = {
      r: 35,
      g: 35,
      b: 35,
      t: 0
    };
    this.lost = false;
    this.text = "YOU DIED";
    this.restartColor = 150;
    this.textColor = 150;
    this.win = false;
  }
  show() {
    if(this.lost){
      fill(this.color.r, this.color.g, this.color.b, this.color.t);
      noStroke();
      rect(0, 0, canvasWidth, canvasHeight);
      fill(222, 98, 98, this.color.t);
      textFont(unicaOne);
      textSize(150);
      stroke(0);
      noStroke();

      //strokeWeight(3);
      text(this.text, canvasWidth / 2 - 250, canvasHeight / 2 - 100);

      textSize(30);
      fill(this.textColor, this.color.t);
      text("You made it to wave " + waveNumber + ", and scored " + time + " points.", canvasWidth / 2 - 250, canvasHeight / 2);

      fill(this.color.r, this.color.t);
      strokeWeight(1.5);
      stroke(this.restartColor, this.color.t);
      rect(canvasWidth / 2 - 82.5, canvasHeight / 2 + 100, 175, 65);

      textSize(50);
      fill(this.restartColor, this.color.t);
      noStroke();
      textFont(unicaOne);
      text("RESTART", canvasWidth / 2 - 75, canvasHeight / 2 + 150);
      fill(255, 0, 0, this.color.t);
      image(mouseImg, mouseX, mouseY, 30, 30);
      if (this.color.r < 255) {
        this.color.r += 5;
        this.color.g += 5;
        this.color.b += 5;
      }
      if (this.color.t < 255) {
        this.color.t += 10;
      }
      if(mouseX > canvasWidth / 2 - 82.5 && mouseX < canvasWidth / 2 + 92.5 && mouseY > canvasHeight / 2 + 100 && mouseY < canvasHeight / 2 + 165){
        this.restartColor = 0;
      } else{
        this.restartColor = 150;
      }
    }

    if(this.win){
      textAlign(LEFT);
      fill(this.color.r, this.color.g, this.color.b, this.color.t);
      noStroke();
      rect(0, 0, canvasWidth, canvasHeight);
      fill(222, 98, 98, this.color.t);
      textFont(unicaOne);
      textSize(150);
      stroke(0);
      noStroke();

      //strokeWeight(3);
      text("CONGRATULATIONS", canvasWidth / 2 - 500, canvasHeight / 2 - 100);

      textSize(30);
      fill(this.textColor, this.color.t);
      text("You made it to wave " + waveNumber + ", and scored " + time + " points.", canvasWidth / 2 - 250, canvasHeight / 2);

      fill(this.color.r, this.color.t);
      strokeWeight(1.5);
      stroke(this.restartColor, this.color.t);
      rect(canvasWidth / 2 - 125, canvasHeight / 2 + 100, 250, 65);

      textSize(50);
      fill(this.restartColor, this.color.t);
      noStroke();
      textFont(unicaOne);
      text("PLAY AGAIN", canvasWidth / 2 - 110, canvasHeight / 2 + 150);
      fill(255, 0, 0, this.color.t);
      image(mouseImg, mouseX, mouseY, 30, 30);
      if (this.color.r < 255) {
        this.color.r += 5;
        this.color.g += 5;
        this.color.b += 5;
      }
      if (this.color.t < 255) {
        this.color.t += 10;
      }
      if(mouseX > canvasWidth / 2 - 82.5 && mouseX < canvasWidth / 2 + 92.5 && mouseY > canvasHeight / 2 + 100 && mouseY < canvasHeight / 2 + 165){
        this.restartColor = 0;
      } else{
        this.restartColor = 150;
      }
    }
  }
}

class HealthText {
  constructor(x, y, t, p, c) {
    this.x = x;
    this.y = y;
    this.text = t;
    this.positive = p;
    this.count = c;
    this.color = {
      t: 0
    }
  }
  show() {
    noStroke();
    textFont(unicaOne);
    textSize(20);
    if (this.positive == true) {
      fill(79, 196, 110, this.color.t);
      if (count - this.count <= 50) { // Hvor lenge teksten skal hvises
        text(this.text, this.x + 20, this.y - 30);
      }
    } else {
      fill(219, 69, 55, this.color.t);
      if (count - this.count <= 50) { // Hvor lenge teksten skal hvises
        text(this.text, this.x + 20, this.y - 30);
      }
    }
    if (this.color.t < 255) {
      this.color.t += 15;
    }
  }
}
