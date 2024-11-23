let particles = [];

function preload() {
  sound = loadSound("assets/beat.mp3")
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(0, 50);
  let x = mouseX;
  let y = mouseY;
  let dia = random(20, 30);
  let ball = new Ball(x, y, dia);

  particles.push(ball);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i]
    p.move();
    p.speedUp();
    p.display();
    p.checkOutOfCanvas();
  }


  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (p.isDone === true) {
      particles.splice(i, 1);
    }
  }

  fill(255, 0, 255);
  text("number of objects: " + particles.length, 10, 30);
}

function mousePressed() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.explode();
  }
  sound.play();
  sound.rate(random(0.2, 0.3));
}

class Ball {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;

    this.xSpeed = random(-0.1, 0.1);
    this.ySpeed = random(-0.1, 0.1);

    this.isDone = false;
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  speedUp() {
    this.xSpeed *= 1.025;
    this.ySpeed *= 1.025;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255);
    noStroke();
    circle(0, 0, this.dia);
    pop();
  }


  checkOutOfCanvas() {
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.isDone = true;
    }
  }

  explode() {
    this.xSpeed *= 10;
    this.ySpeed *= 10;
  }

}