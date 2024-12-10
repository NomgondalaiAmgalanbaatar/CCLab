let bomb;
let alarmSound;
let backgroundMusic;
let explosionSound;
let triumphMusic;
let countdownStarted = false;
let timeRemaining = 60;
let beginButton;
let redness = 0;
let rotationSpeed = 0.01;

function preload() {
  alarmSound = loadSound('assets/alarm.mp3');
  backgroundMusic = loadSound('assets/background-music.mp3');
  explosionSound = loadSound('assets/big-explosion-fx_F_minor.wav');
  triumphMusic = loadSound('assets/triumph-music.mp3');
}

function setup() {
  let canvas = createCanvas(505, 375, WEBGL);
  canvas.parent("p5-canvas-container");
  background(20);

  bomb = new Bomb();

  beginButton = createButton('Begin');
  beginButton.position(width / 2 - 50, height + 20);
  beginButton.mousePressed(startCountdown);
  beginButton.class('begin-button');
}

function draw() {
  background(20 + redness, 20, 20);

  if (countdownStarted) {
    timeRemaining = window.terminalSketch.getTimeRemaining(); // Get time from terminal sketch
    if (timeRemaining <= 0) {
      explodeBomb();
      return;
    }

    redness = map(60 - timeRemaining, 0, 60, 0, 235);
    rotationSpeed = map(60 - timeRemaining, 0, 60, 0.01, 0.1);

    alarmSound.setVolume(map(60 - timeRemaining, 0, 60, 0.1, 1));

    window.terminalSketch.updateTime();
  }

  bomb.display();
}

function startCountdown() {
  countdownStarted = true;
  alarmSound.loop();
  backgroundMusic.loop();
  backgroundMusic.setVolume(0.5);
  beginButton.hide();
  window.terminalSketch.startScenario();
}

function explodeBomb() {
  countdownStarted = false;
  alarmSound.stop();
  backgroundMusic.stop();
  explosionSound.play();
  setTimeout(() => {
    location.reload();
  }, 3000);
}

function deactivateBomb() {
  countdownStarted = false;
  alarmSound.stop();
  backgroundMusic.stop();
  triumphMusic.play();
  bomb.reset();
  displayStory();
}

function displayStory() {
  let story = "You experienced a wave of relief as the reality of what you had done set in, but it was soon followed by an adrenaline rush. The pounding of your own heart seemed to take the place of the now-silent bomb's ticking as the world around you seemed to come back into focus. You inhaled deeply as you braced yourself for the magnitude of what had just happened. You picked up the remains of the time capsule and Dr. Elias's instructions with trembling hands. These were now priceless relics, proof of a covert conflict, and the ultimate sacrifice made by a scientist. The normalcy of the outside world, with people going about their daily lives, blissfully unaware of how close they had come to annihilation, struck you as you emerged from the secret location. You knew that your work wasn't over. The truth had to be told, and the Consortium was still out there. You determinedly set out to pay tribute to Dr. Elias's memory by bringing the shadowy organization to light and making sure that humanity would never again be in danger from such a threat. To be continued...";

  let storyDiv = createDiv('');
  storyDiv.position(0, 0);
  storyDiv.style('width', '100%');
  storyDiv.style('height', '100%');
  storyDiv.style('background-color', 'rgba(0, 0, 0, 0.8)');
  storyDiv.style('color', 'white');
  storyDiv.style('padding', '20px');
  storyDiv.style('box-sizing', 'border-box');
  storyDiv.style('font-family', 'Arial, sans-serif');
  storyDiv.style('font-size', '18px');
  storyDiv.style('line-height', '1.5');
  storyDiv.style('display', 'flex');
  storyDiv.style('align-items', 'center');
  storyDiv.style('justify-content', 'center');
  storyDiv.style('text-align', 'center');
  storyDiv.style('opacity', '0');
  storyDiv.style('transition', 'opacity 2s');

  setTimeout(() => {
    storyDiv.style('opacity', '1');
    let index = 0;
    let interval = setInterval(() => {
      if (index < story.length) {
        storyDiv.html(story.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }, 100);
}

class Bomb {
  constructor() {
    this.rotation = 0;
  }

  display() {
    push();
    rotateY(this.rotation);
    this.rotation += rotationSpeed;

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

    pop();
  }

  reset() {
    this.rotation = 0;
    rotationSpeed = 0.01;
  }
}