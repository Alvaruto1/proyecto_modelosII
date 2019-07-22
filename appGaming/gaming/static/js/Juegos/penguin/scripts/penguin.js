class Penguin {
    constructor() {
        this.width = 90;
        this.height = 115;
        this.x = 10;
        this.y = height - this.height - 50;
        this.jumpForce = 0;
        this.gravity = 0;
    }

    jump() {
        if (this.y == height - 165) {
            this.jumpForce = -18;
            i = 4;
        }
    }

    down() {
        if (this.y != this.height - 165) {
            this.gravity += 2;
        }
    }

    move() {
        this.y += this.jumpForce;
        this.jumpForce += this.gravity;
        this.y = constrain(this.y, 0, height - 165);

        if (this.y == height - 165) {
            this.jumpForce = 0;
            this.gravity = 0.90;
        }

        if (i < 3 && (millis() - penguinTime >= 200) && (this.y == height - 165)) {
            i += 1;
            penguinTime = millis();
        } else if ((millis() - penguinTime >= 200) && (this.y == height - 165)) {
            i = 0;
            penguinTime = millis();
        } else if (i == 4 && (this.y < 210)) {
            i = 5;
        } else if (i == 5 && (this.y > 200)) {
            i = 6;
        }
    }

    crash(obstacle) {
        let x1 = this.x + this.width / 2
        let y1 = this.y + this.height / 2
        let x2 = obstacle.x + obstacle.width / 2
        let y2 = obstacle.y + obstacle.height / 2

        let distance = sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2))
        return distance < obstacle.width / 2 + this.width / 2;
    }

    show(i) {
        image(penguinImages[i], this.x, this.y, this.width, this.height);
    }
}