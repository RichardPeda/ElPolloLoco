class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    height = CANVAS_HEIGHT;
    // width = CANVAS_WIDTH;

    constructor(imagePath, width, x) {
        super().loadImage(imagePath);
        this.width = width;
        this.x = x;
    }
}
