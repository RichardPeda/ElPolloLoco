class Cloud extends MovableObject {
    height = 300;
    width = 720;
    y = 20;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = Math.random() * 500;

        this.animate();
    }

    animate() {
        this.moveLeft();
    }

   
}
