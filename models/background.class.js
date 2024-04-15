class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    height = CANVAS_HEIGHT;
   
    constructor(imagePath, width, x) {
        super().loadImage(imagePath);
        this.width = width;
        this.x = x;
    }
}
