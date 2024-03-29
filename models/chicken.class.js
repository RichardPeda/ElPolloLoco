class Chicken extends MovableObject {
    y = 370;
    multi = 0.25;
    world;
    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.height = 50;
        this.width = 50;
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALK);
        this.movementSpeed = 0.5 + Math.random() * 0.6;
        this.otherDirection = false;
        this.animate();
        this.moveLeft();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, this.animationSpeed);
    }
}
