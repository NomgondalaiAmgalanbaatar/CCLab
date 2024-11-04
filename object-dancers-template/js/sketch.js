/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  new NomgosDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor();
  DancerManager.getInstance().updateAndDisplayDancers();
}

class NomgosDancer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.jumpHeight = 0;
    this.isJumpingUp = true;
    this.sideMovement = 0;
    this.color = color(255, 0, 0);
    this.speedX = 2; // speed of side movement
    this.direction = 1; // direction of side movement (1 for right, -1 for left)
    DancerManager.getInstance().addDancer(this);
  }

  update() {
    if (this.isJumpingUp) {
      this.jumpHeight += 5;
      if (this.jumpHeight > 50) {
        this.isJumpingUp = false;
      }
    } else {
      this.jumpHeight -= 5;
      if (this.jumpHeight < -50) {
        this.isJumpingUp = true;
      }
    }

    // side to side movement
    this.sideMovement += this.speedX * this.direction;
    if (this.sideMovement > 200 || this.sideMovement < -200) {
      this.direction *= -1; // reverse direction
    }
  }

  display() {
    push();
    translate(this.x + this.sideMovement, this.y + this.jumpHeight);
    fill(this.color);
    noStroke();


    ellipse(0, 0, this.size, this.size * 1.5);


    fill(255);
    ellipse(0, -this.size / 3, this.size / 3, this.size / 3);
    fill(0);
    ellipse(-this.size / 6, -this.size / 3, this.size / 12, this.size / 12);
    ellipse(this.size / 6, -this.size / 3, this.size / 12, this.size / 12);


    fill(this.color);
    rectMode(CENTER);
    rect(-this.size / 2, this.size / 4, this.size / 5, this.size / 2);
    rect(this.size / 2, this.size / 4, this.size / 5, this.size / 2);
    rect(0, this.size / 2, this.size / 2, this.size / 5);
    pop();
  }
}

class DancerManager {
  constructor() {
    this.dancers = [];
  }

  addDancer(dancer) {
    this.dancers.push(dancer);
  }

  updateAndDisplayDancers() {
    for (let dancer of this.dancers) {
      dancer.update();
      dancer.display();
    }
  }

  static instance;
  static getInstance() {
    if (!DancerManager.instance) {
      DancerManager.instance = new DancerManager();
    }
    return DancerManager.instance;
  }
}

