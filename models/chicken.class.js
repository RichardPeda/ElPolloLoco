class Chicken extends MovableObject {
    y = 370;
    multi = 0.25;
    world;
    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.height = 50;
        this.width = 50;
        this.x = 300 + Math.random() * 2500;
        this.loadImages(this.IMAGES_WALK);
        this.movementSpeed = 0.5 + Math.random() * 0.6;
        this.otherDirection = false;
        this.animate();
        this.moveLeft();
        this.energy = 1;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD[0]);
                this.stop();
            } else {
              
                this.playAnimation(this.IMAGES_WALK);
            }
        }, this.animationSpeed);
    }
}
