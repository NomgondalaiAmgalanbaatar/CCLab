let particles = [];

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(20, 30, 60);

  if (particles.length < 300) {
    particles.push(new Particle(random(width), random(-50, 0)));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].y > height) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = random(10, 20);
    this.dia = 1;
    this.speed = random(4, 10);
    this.angle = PI / 6;
    this.color = color(135, 206, 250, 150);
  }

  update() {
    this.y += this.speed;

    this.x += sin(this.angle) * 0.5;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(this.color);

    ellipse(0, 0, this.dia, this.length);

    pop();
  }
}
