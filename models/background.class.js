class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    height = CANVAS_HEIGHT;
   
    /**
     * Object constructor
     * @param {String} imagePath - image path
     * @param {Number} width - canvas width
     * @param {Number} x - x-offset for the canvas
     */
    constructor(imagePath, width, x) {
        super().loadImage(imagePath);
        this.width = width;
        this.x = x;
    }
}
