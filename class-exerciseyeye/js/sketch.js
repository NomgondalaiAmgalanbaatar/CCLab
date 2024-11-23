let img;

function preload() {
  img = loadImage("images/quandale-dingle.jpg")
}


function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(0);
  img.resize(200, 200);
  image(img, width / 2, height / 2);
  imageMode(CENTER);
  let r = map(mouseX, 0, width, 0, 255);
  let b = map(mouseY, 0, height, 0, 255);
  tint(r, 0, b);
  // filter(THRESHOLD, thres);
}