let v = [];


function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  for (let i = 0; i < 10; i++) {

  }
  background(220);
}

function draw() {
  //
}
// class
class myBalls {
  constructor(u, v, r) {
    this.x = u;
    this.y = v;
    this.dia = r;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
  show() {
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.dia);
    this.drawFace();
    this.drawMouth();
  }
  drawFace() {
    circle(this.x - this.dia * 0.2, this.y - this.dia * 0.1);
    circle(this.x + this.dia * 0.2, this.y - this.dia * 0.1);
  }
  drawMouth() {
    push();
    translate(x, y);
    ellipse(0, 0, this.dia * 0.2, this.dia * 0.5);
    pop();
  }
  move() {
    this.y += random(-20, 20)
  }
}