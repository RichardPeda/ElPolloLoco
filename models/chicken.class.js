class Chicken extends MovableObject {
    y = 370;
    world;
    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * Object constructor loads images, sets coordinates and starts main functions
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.height = 50;
        this.width = 50;
        this.x = 300 + Math.random() * 2500;
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.movementSpeed = 0.5 + Math.random() * 0.6;
        this.otherDirection = false;
        this.animate();
        this.moveLeft();
        this.energy = 1;
    }

    /**
     * general function with two intervals for movement and picture animation
     */
    animate() {
        setStoppableInterval(() => {
            if (gameStart && !this.isDead()) this.moveLeft();
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (gameStart) {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                    this.stop();
                    setTimeout(() => {
                        this.y = 800;
                    }, 1000);
                } else {
                    this.playAnimation(this.IMAGES_WALK);
                }
            }
        }, this.animationSpeed);
    }
}
