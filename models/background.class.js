class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    height = CANVAS_HEIGHT;
    // width = CANVAS_WIDTH;

    constructor(imagePath, width) {
        super().loadImage(imagePath);
        this.width = width;
    }
}
