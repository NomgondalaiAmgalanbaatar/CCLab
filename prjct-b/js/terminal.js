let terminal = function (p) {
    let input = '';
    let placeholders = '____';
    let timeRemaining = 60;

    p.setup = function () {
        let canvas = p.createCanvas(150, 25);
        canvas.parent('terminal-container');
        p.textFont('Courier');
        p.textSize(16);
        p.noLoop();
    };

    p.draw = function () {
        p.background(0);
        p.fill(0, 255, 0);
        p.text(input + placeholders.slice(input.length) + ' ' + timeRemaining.toFixed(1), 5, 18);
    };

    p.keyPressed = function () {
        if (p.keyCode === p.BACKSPACE) {
            input = input.slice(0, -1);
        } else if (p.keyCode === p.ENTER) {
            checkCode();
        } else if (input.length < 4 && p.key >= '0' && p.key <= '9') {
            input += p.key;
        }
        p.draw();
        return false;
    };

    function checkCode() {
        if (input === '1006') {
            window.scenarioController.deactivateDevice();
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
        p.draw();
    };

    p.endScenario = function () {
        p.noLoop();
    };
};

window.terminalSketch = new p5(terminal);