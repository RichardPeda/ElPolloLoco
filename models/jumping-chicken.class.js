class JumpingChicken extends MovableObject {
    y = 370;
    multi = 0.25;
    world;
    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.height = 50;
        this.width = 50;
        this.x = 300 + Math.random() * 2500;
        this.loadImages(this.IMAGES_WALK);
        this.movementSpeed = 0.5 + Math.random() * 0.6;
        this.otherDirection = false;
        this.animate();

        this.applyGravity();
        this.energy = 1;
        console.log(this.world);
    }

    animate() {
        setStoppableInterval(() => {
            if (!this.isAboveGround() && !this.isDead()) this.jump();
        }, 2000);

        setStoppableInterval(() => {
            if (!this.isDead()) this.moveLeft();
        }, 20);

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD[0]);
                this.stop();
                setTimeout(() => {
                    this.y = 800;
                }, 1000);
            } else if (!this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, this.animationSpeed);
    }
}
