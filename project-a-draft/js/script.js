let phase = 1;  // 1: Normal, 2: Running/eating, 3: Angry
let foodGrabbed = 0;
let failCount = 0;
let animalWants = "apple";
let foodItems = [];
let animalX = 100;
let animalY = 300;
let currentFood = null;  // Food currently being dragged
let foodSpawnInterval = 5000; // 5 seconds
let lastFoodSpawn = 0;
let wanderTargetX, wanderTargetY;
let wanderSpeed = 0.05;
let clouds = [];
let bubbles = [];

class Cloud {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = random(0.1, 0.5);
    }

    update() {
        this.x -= this.speed;
        if (this.x < 0) {
            this.x = width;
            this.y = random(height / 2);
        }
    }

    display() {
        fill(255); // White
        noStroke();
        ellipse(this.x, this.y, 50, 20);
    }
}

class Bubble {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = random(0.5, 2);
        this.size = random(10, 30);
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.y = height;
            this.x = random(width);
        }
    }

    display() {
        fill(150, 200, 255, 100); // Light blue with alpha
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
    }
}

class Food {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.type = random(["apple", "banana", "cherry"]);
    }

    move() {
        this.y += this.speed;
        if (this.y > height) {
            this.y = 0;
            this.x = random(width);
        }
    }

    display() {
        textSize(25);
        if (this.type === "apple") {
            text("🍎", this.x - 10, this.y - 10);
        } else if (this.type === "banana") {
            text("🍌", this.x - 10, this.y - 10);
        } else if (this.type === "cherry") {
            text("🍒", this.x - 10, this.y - 10);
        }
    }
}

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas")
    animalX = width / 2;
    animalY = height - 100;
    lastFoodSpawn = millis();
    wanderTargetX = animalX + random(-50, 50);
    wanderTargetY = animalY + random(-50, 50);

    // Create floating food items
    for (let i = 0; i < 5; i++) {
        foodItems.push(new Food(random(width), random(height / 2), random(1, 3)));
    }

    // Create background clouds
    for (let i = 0; i < 10; i++) {
        clouds.push(new Cloud(random(width), random(height / 2)));
    }

    // Create background bubbles
    for (let i = 0; i < 20; i++) {
        bubbles.push(new Bubble(random(width), random(height)));
    }
}

function draw() {
    backgroundGradient();
    drawClouds();
    drawBubbles();

    let mouthOpen = false;
    if (currentFood !== null) {
        // Follow the mouse while dragging
        currentFood.x = mouseX;
        currentFood.y = mouseY;

        // Animal approaches cursor
        let targetX = mouseX;
        let targetY = mouseY;
        animalX += (targetX - animalX) * 0.02; // Adjust speed as needed
        animalY += (targetY - animalY) * 0.02;

        // Open mouth when approaching food
        if (dist(animalX, animalY, targetX, targetY) < 100) {
            mouthOpen = true;
        }

        // When food reaches the animal's mouth
        if (dist(currentFood.x, currentFood.y, animalX, animalY) < 50) {
            if (currentFood.type === animalWants) {
                foodGrabbed += 1;
                // Remove the food item from the array and set currentFood to null
                foodItems = foodItems.filter(food => food !== currentFood);
                currentFood = null;
                animalWants = random(["apple", "banana", "cherry"]);
                phase = 1;
            } else {
                failCount += 1;
                // Remove the food item from the array and set currentFood to null
                foodItems = foodItems.filter(food => food !== currentFood);
                currentFood = null;
                if (failCount >= 3) {
                    phase = 3;  // Trigger angry phase
                }
            }
        }
    } else if (phase !== 3) {
        // Make the animal wander if not chasing food or angry
        wander();

        animalX = constrain(animalX, 0, width);
        animalY = constrain(animalY, 0, height);
    }

    // Draw animal with potential mouth opening
    drawAnimal(mouthOpen);

    // Check for win condition
    if (foodGrabbed >= 10) {
        winGame();
    }

    if (phase === 3) {
        angryBehavior();
        drawAngryTextBox();
    }


    textSize(30);
    text("✋", mouseX - 25, mouseY);

    let score = "Score: " + foodGrabbed;
    textSize(20);
    fill(255);
    text(score, 30, 30);

    showFoodPreference();
    moveAndDisplayFoods();

    // Spawn new food at intervals
    if (millis() - lastFoodSpawn >= foodSpawnInterval) {
        spawnNewFood();
        lastFoodSpawn = millis();
    }
}

function mousePressed() {
    // Check if a food item is clicked
    for (let food of foodItems) {
        if (dist(mouseX, mouseY, food.x, food.y) < 30) {
            currentFood = food;
            break;
        }
    }
}

function backgroundGradient() {
    let c1 = color(255, 182, 193);
    let c2 = color(173, 216, 230);

    for (let y = 0; y < height; y++) {
        let t = map(y, 0, height, 0, 1);
        let col = lerpColor(c1, c2, t);
        stroke(col);
        line(0, y, width, y);
    }
}

function drawClouds() {
    for (let cloud of clouds) {
        cloud.update();
        cloud.display();
    }
}

function drawBubbles() {
    for (let bubble of bubbles) {
        bubble.update();
        bubble.display();
    }
}

// Modified to accept a mouthOpen parameter
function drawAnimal(mouthOpen = false) {
    push();
    translate(animalX, animalY);
    scale(2);

    if (phase === 3) {
        // Red tinted version of phase 2 with angry expression
        fill(255, 0, 0, 100);
        triangle(-25, 0, 0, -25, 25, 0);
        fill(219, 112, 147, 100);
        triangle(-25, -25, 0, 0, 25, -25);

        // Angry expression
        fill(0);
        ellipse(-10, -15, 5, 5); // Left eye
        ellipse(10, -15, 5, 5); // Right eye
        line(-5, -5, 5, -5); // Mouth

        // Vibration/Shaking effect
        let shakeOffsetX = sin(frameCount * 0.1) * 5;
        let shakeOffsetY = cos(frameCount * 0.1) * 5;
        translate(shakeOffsetX, shakeOffsetY);

        // Chase cursor faster
        let targetX = mouseX;
        let targetY = mouseY;
        animalX += (targetX - animalX) * 0.1; // Increased speed
        animalY += (targetY - animalY) * 0.1;

        animalX = constrain(animalX, 0, width);
        animalY = constrain(animalY, 0, height);
    } else {
        // Two triangle animal design
        fill(255, 182, 193);
        triangle(-25, 0, 0, -25, 25, 0);

        fill(219, 112, 147);
        triangle(-25, -25, 0, 0, 25, -25);

        // Eyes
        fill(0);
        ellipse(-10, -15, 5, 5);
        ellipse(10, -15, 5, 5);

        // Mouth with opening animation
        // Mouth with opening animation
        if (mouthOpen) {
            // Open mouth
            fill(255, 150); // Lighter fill to indicate open mouth
            rect(-10, -10, 20, 5); // Simple open mouth representation
        } else {
            // Closed mouth
            line(-5, -5, 5, -5);
        }
    }
    pop();
}

function showFoodPreference() {
    textSize(20);
    fill(255);
    text(`Wants: ${animalWants}`, width - 150, 30);
}

function moveAndDisplayFoods() {
    for (let food of foodItems) {
        food.move();
        food.display();
    }
}

function winGame() {
    textSize(40);
    fill(0, 255, 0);
    text("You Win!", width / 2 - 80, height / 2);

}

function angryBehavior() {
    fill(255, 0, 0);
}

function drawAngryTextBox() {
    // Draw text box
    fill(255, 0, 0, 150);
    noStroke();
    rect(animalX - 50, animalY - 70, 100, 30, 10);

    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("I'm Angry!", animalX, animalY - 55);
}

function spawnNewFood() {
    foodItems.push(new Food(random(width), random(height / 2), random(1, 3)));
    if (foodItems.length > 10) {
        foodItems.shift(); // Remove the oldest food item
    }
}

function wander() {
    // Move towards the wander target
    animalX += (wanderTargetX - animalX) * wanderSpeed;
    animalY += (wanderTargetY - animalY) * wanderSpeed;

    // Check if the animal has reached the target, and if so, generate a new target
    if (dist(animalX, animalY, wanderTargetX, wanderTargetY) < 10) {
        // Ensure new target is within frame boundaries
        wanderTargetX = constrain(animalX + random(-50, 50), 0, width);
        wanderTargetY = constrain(animalY + random(-50, 50), 0, height);
    }
}