let penguin;
let obstacles;
let board;
let looseBoard;
let stop;
let stalagmiteImage;
let backgrounImage;
let penguinImages = [];
let penguinImage;
var points;

var x1Top, x1Bottom;
var x2Top, x2Bottom;
var scrollSpeedTop;
var scrollSpeedBottom;
var i;
var speed;

let timeLastUpdated;
let pointsTime;
let penguinTime;

function preload() {
    backgroundTop = loadImage('https://i.imgur.com/PVn7zkv.jpg');
    backgroundBottom = loadImage('https://i.imgur.com/Ighwedo.jpg');
    penguinImages[0] = loadImage('https://i.imgur.com/0NHu6b7.png');
    penguinImages[1] = loadImage('https://i.imgur.com/XHhXby0.png');
    penguinImages[2] = loadImage('https://i.imgur.com/byamBze.png');
    penguinImages[3] = loadImage('https://i.imgur.com/D8718pE.png');
    penguinImages[4] = loadImage('https://i.imgur.com/ByrY3rb.png');
    penguinImages[5] = loadImage('https://i.imgur.com/sVcyBgm.png');
    penguinImages[6] = loadImage('https://i.imgur.com/17VRrqv.png');
    penguinImages[7] = loadImage('https://i.imgur.com/i7ZXHhv.png');
    stalagmiteImage = loadImage('https://i.imgur.com/cRWyYuc.png');
}

function setup() {
    createCanvas(800, 450);

    obstacles = [];
    penguin = new Penguin();
    board = new Board();
    looseBoard = new LooseBoard();
    points = 0;
    stop = false;

    timeLastUpdated = millis();
    pointsTime = millis();
    penguinTime = millis();
    x1Top = 0;
    x1Bottom = 0;
    x2Top = width;
    x2Bottom = width;
    i = 0;
    speed = 0;
}

function keyPressed() {
    if (key == ' ' || keyCode == UP_ARROW) {
        penguin.jump();
    } else if (keyCode == DOWN_ARROW) {
        penguin.down();
    } else if (keyCode == 82) {
        setup();
        loop();
    }
}

function draw() {

    if (!stop) {
        if (points <= 75) {
            scrollSpeedTop = 2;
            scrollSpeedBottom = 8;
            speed = 8;

        } else if (points % 75 === 0) {
            scrollSpeedTop += 0.03125;
            scrollSpeedBottom += 0.125;
            speed += 0.125;
        }

        image(backgroundTop, x1Top, 0, width, 375);
        image(backgroundTop, x2Top, 0, width, 375);
        image(backgroundBottom, x1Bottom, 375, width, 75);
        image(backgroundBottom, x2Bottom, 375, width, 75);

        x1Top -= scrollSpeedTop;
        x2Top -= scrollSpeedTop;

        x1Bottom -= scrollSpeedBottom;
        x2Bottom -= scrollSpeedBottom;

        if (x1Top < -width) {
            x1Top = width;
        }
        if (x1Bottom < -width) {
            x1Bottom = width;
        }
        if (x2Top < -width) {
            x2Top = width;
        }
        if (x2Bottom < -width) {
            x2Bottom = width;
        }

        board.show();

        penguin.move();
        penguin.show(i);


        if (random(1) < 0.015 && (millis() - timeLastUpdated > 700)) {
            obstacles.push(new Obstacle());
            timeLastUpdated = millis();
        }

        for (let obstacle of obstacles) {
            obstacle.move(speed);
            obstacle.show();
            if (penguin.crash(obstacle)) {
                penguin.show(7);
                stop = penguin.crash(obstacle)
            }
        }

        if (millis() - pointsTime >= 250) {
            points += 1;
            pointsTime = millis();
        }
    } else {
        looseBoard.show();
        noLoop();
    }
}