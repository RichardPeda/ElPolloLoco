class Cloud extends MovableObject {
    height = 300;
    width = CANVAS_WIDTH;
    y = 20;

    /**
     * Object constructor loads images, sets coordinates and starts animation function
     * @param {String} imagePath - image path
     */
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = Math.random() * 2500;
        this.movementSpeed = this.movementSpeed + Math.random() * 0.6;
        this.animate();
    }

    /**
     * general function with one interval for movement
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
