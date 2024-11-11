let particles = [];

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");

}

function draw() {
  background(0);

  let x = mouseX;
  let y = mouseY;
  let dia = random(30, 40);
  let ball = new Ball(x, y, dia);
  particles.push(ball);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.checkOutOfCanvas();
    p.age();
    p.display();
  }
  //
  // while (particles.length > 300) {
  //   particles.splice(0, 1);
  // }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (p.isDone == true) {
      particles.splice(i, 1);
    }
  }

  fill(255, 0, 0);
  text("number of objects: " + particles.length, 10, 30);
}

class Ball {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.isDone = false;

    this.r = 0;
    this.g = 255;
    this.b = 255;

    this.lifespan = 1.0;
    this.lifeReduce = random(0.001, 0.01);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  age() {
    if (this.lifespan > 0) {
      this.lifespan -= this.lifeReduce;
    } else {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  checkOutOfCanvas() {
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      // out!
      // this.dia = 100;
      this.isDone = true;
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(this.r + 255 * this.lifespan, this.g, this.b);
    noStroke();
    circle(0, 0, this.dia * this.lifespan);
    fill(255, 0, 0);
    text(this.lifespan, 0, 0);
    pop();
  }
}