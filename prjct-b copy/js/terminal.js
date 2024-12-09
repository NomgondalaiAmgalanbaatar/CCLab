let terminal = function (p) {
    let input = '';
    let placeholders = '____';
    let timeRemaining = 60;
    let beepSound, warningBeepSound;
    let lastBeepTime = 0;

    p.preload = function () {
        beepSound = p.loadSound('assets/computer-beep.mp3');
        warningBeepSound = p.loadSound('assets/beep-warning.mp3');
    };

    p.setup = function () {
        let canvas = p.createCanvas(300, 50);
        canvas.parent('terminal-container');
        p.textFont('Courier');
        p.textSize(16);
        p.noLoop();
    };

    p.draw = function () {
        p.background(0);
        p.fill(0, 255, 0);
        p.text('Meltdown in: ' + timeRemaining.toFixed(1), 5, 20);
        p.text('Code: ' + input + placeholders.slice(input.length), 5, 40);
    };

    p.keyPressed = function () {
        if (p.keyCode === p.BACKSPACE) {
            input = input.slice(0, -1);
        } else if (p.keyCode === p.ENTER) {
            checkCode();
        } else if (input.length < 4 && p.key >= '0' && p.key <= '9') {
            input += p.key;
            beepSound.play();
        }
        p.draw();
        return false;
    };

    function checkCode() {
        if (input === '1006') {
            window.scenarioController.deactivateDevice();
        } else {
            timeRemaining -= 5;
            if (timeRemaining < 0) timeRemaining = 0;
        }
        input = '';
    }

    p.startScenario = function () {
        console.log("Terminal started");
        input = '';
        timeRemaining = 60;
        p.loop();
    };

    p.updateTime = function (time) {
        timeRemaining = time;
        if (timeRemaining % 10 === 0 && timeRemaining !== 60) {
            warningBeepSound.play();
        }
        p.draw();
    };

    p.endScenario = function () {
        p.noLoop();
    };
};

window.terminalSketch = new p5(terminal);