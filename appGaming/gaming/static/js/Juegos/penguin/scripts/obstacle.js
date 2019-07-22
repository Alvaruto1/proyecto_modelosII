class Obstacle {
    constructor() {
        this.width = 75;
        this.height = 100;
        this.x = width;
        this.y = height - this.height - 50;
    }

    move(points) {
        this.x -= points
    }

    show() {
        image(stalagmiteImage, this.x, this.y, this.width, this.height)
    }
}