class Board {
    constructor() {
        this.x = width - 150;
        this.y = 50;
    }

    show() {
        fill(color(20, 20, 20))
        textSize(35);
        text(Math.trunc(points) + ' pt', this.x + 50, this.y + 5);
    }
}