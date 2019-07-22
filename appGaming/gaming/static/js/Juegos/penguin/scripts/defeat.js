class LooseBoard {
    constructor() {
        this.side = 250;
        this.x = width / 2;
        this.y = height / 3;
    }

    show() {
        fill(color(250, 250, 250));
        filter(BLUR, 2);
        textAlign(CENTER, TOP);
        textSize(32)
        text('Los pinguinos no vuelan, pero tu ni saltas...', this.x, this.y);

        textSize(45);
        text(Math.trunc(points) + ' Puntos', this.x, this.y + height / 6);

        textSize(25);
        text('Presione R para reiniciar el juego', this.x, height - this.y)
    }
}