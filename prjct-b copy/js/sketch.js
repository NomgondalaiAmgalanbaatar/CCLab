let bomb;
let alarmSound;
let countdownStarted = false;
let countdown = 60;
let beginButton;

function preload() {
  alarmSound = loadSound('assets/alarm-final.mp3');
}

function setup() {
  let canvas = createCanvas(505, 375, WEBGL);
  canvas.parent("p5-canvas-container");
  bomb = new Bomb();

  beginButton = createButton('Begin');
  beginButton.position(width / 2 - 50, height / 2);
  beginButton.mousePressed(startCountdown);
  beginButton.class('begin-button');
}

function draw() {
  background(20);

  if (countdownStarted) {
    bomb.update();
    bomb.display();

    if (frameCount % 60 == 0 && countdown > 0) {
      countdown--;
      window.terminalSketch.updateTime(countdown);
    }

    if (countdown <= 0) {
      explode();
    }
  } else {
    push();
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Press Begin to start", 0, 0);
    pop();
  }
}

function startCountdown() {
  countdownStarted = true;
  beginButton.hide();
  alarmSound.loop();
  window.terminalSketch.startScenario();
}

function explode() {
  background(255, 0, 0);
  noLoop();
  alarmSound.stop();
  window.terminalSketch.endScenario();
  setTimeout(() => {
    location.reload();
  }, 3000);
}

class Bomb {
  constructor() {
    this.rotation = 0;
    this.rotationSpeed = 0.01;
    this.tint = color(255, 0, 0, 0);
  }

  update() {
    this.rotation += this.rotationSpeed;
    this.rotationSpeed += 0.0001;
    this.tint = color(255, 0, 0, map(60 - countdown, 0, 60, 0, 255));
    alarmSound.setVolume(map(60 - countdown, 0, 60, 0.1, 1));
  }

  display() {
    push();
    rotateY(this.rotation);
    ambientLight(255);
    pointLight(255, 0, 0, 0, 0, 100);
    ambientMaterial(this.tint);

    // Main sphere body
    sphere(100);

    noFill();
    stroke(255);
    strokeWeight(1);
    for (let a = 0; a < TWO_PI; a += PI / 8) {
      rotateX(a);
      arc(0, 0, 200, 200, 0, PI / 8);
    }

    // Attached spheres
    for (let i = 0; i < 8; i++) {
      push();
      let angle = i * TWO_PI / 8;
      let x = cos(angle) * 100;
      let y = sin(angle) * 100;
      translate(x, y);
      sphere(20);
      pop();
    }

    pop();

    // Shadow
    push();
    translate(0, 120, 0);
    rotateX(PI / 2);
    noStroke();
    fill(0, 50);
    ellipse(0, 0, 250, 60);
    pop();
  }
}