
let terminal = function (p) {
    let input = '';
    let placeholders = '____';
    let timeRemaining = 60;
    let warningSound;
    let beepSound;
    let lastWarningSoundTime = 60;

    p.preload = function () {
        warningSound = p.loadSound('assets/warning.mp3');
        beepSound = p.loadSound('assets/computer-beep.mp3');
    };

    p.setup = function () {
        let canvas = p.createCanvas(170, 50);
        canvas.parent('terminal-container');
        p.textFont('Courier');
        p.textSize(16);
        p.noLoop();
    };

    p.draw = function () {
        p.background(24, 24, 24);
        p.fill(0, 255, 0);
        p.text('Meltdown in: ' + p.nf(timeRemaining, 2, 1), 5, 18);
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
            window.deactivateBomb();
        } else {
            timeRemaining = Math.max(0, timeRemaining - 5);
        }
        input = '';
    }

    p.startScenario = function () {
        input = '';
        timeRemaining = 60;
        lastWarningSoundTime = 60;
        p.loop();
    };

    p.updateTime = function () {
        timeRemaining -= 1 / 60;
        if (timeRemaining <= 0) {
            p.endScenario();
        }
        let currentSecond = Math.floor(timeRemaining);
        if (currentSecond % 10 === 0 && currentSecond < lastWarningSoundTime) {
            warningSound.play();
            lastWarningSoundTime = currentSecond;
        }
        p.draw();
    };

    p.getTimeRemaining = function () {
        return timeRemaining;
    };

    p.endScenario = function () {
        p.noLoop();
    };
};

window.terminalSketch = new p5(terminal);