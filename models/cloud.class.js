class Cloud extends MovableObject {
    height = 300;
    width = CANVAS_WIDTH;
    y = 20;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = Math.random() * 500;
    }
}
