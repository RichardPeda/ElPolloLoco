class Cloud extends MovableObject {
    height = 300;
    width = CANVAS_WIDTH;
    y = 20;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = Math.random() * 500;
        this.movementSpeed = this.movementSpeed + Math.random() * 1.2;
        this.animate();
    }

    /**
     * general animation function with 1 intervall
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
