function setup() {
  let canvas = createCanvas(505, 375, WEBGL);
  canvas.parent("p5-canvas-container");
  background(20);
}

function draw() {
  background(20);
  rotateY(frameCount * 0.01);

  // Atmospheric smoke effect
  push();
  noFill();
  stroke(100, 50);
  for (let i = 0; i < 20; i++) {
    beginShape();
    for (let j = 0; j < 10; j++) {
      let x = cos(j + frameCount * 0.01) * 100 + random(-20, 20);
      let y = sin(j + frameCount * 0.01) * 100 + random(-20, 20);
      let z = cos(j * 0.5) * 100;
      vertex(x, y, z);
    }
    endShape();
  }
  pop();

  // Main sphere body
  push();
  noStroke();
  strokeWeight(2);
  fill(100);
  sphere(100);
  pop();

  // Panel lines
  push();
  noFill();
  strokeWeight(1);
  rotateX(PI / 2);
  for (let a = 0; a < TWO_PI; a += PI / 8) {
    rotateX(a);
    arc(0, 0, 200, 200, 0, PI / 8);
  }
  pop();

  // Attached spheres
  for (let i = 0; i < 8; i++) {
    push();
    let angle = i * TWO_PI / 8;
    let x = cos(angle) * 100;
    let y = sin(angle) * 100;
    translate(x, y);
    fill(200);
    sphere(20);
    pop();
  }

  // Shadow
  push();
  translate(0, 120, 0);
  rotateX(PI / 2);
  noStroke();
  fill(0, 50);
  ellipse(0, 0, 250, 60);
  pop();
}