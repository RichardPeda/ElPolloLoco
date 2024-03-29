class Character extends MovableObject {
    x = 100;
    y = 225;
    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    world;
    movementSpeed = 6;
    audio = new Audio('audio/walking.mp3');

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.height = 200;
        this.width = 100;
        this.loadImages(this.IMAGES_WALK);

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.audio.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.max_x) {
                this.x += this.movementSpeed;
                this.otherDirection = false;
                this.audio.play();
            } else if (this.world.keyboard.LEFT && this.x > 100) {
                this.x -= this.movementSpeed;
                this.otherDirection = true;
                this.audio.play();
            } else {
                this.loadImage(this.IMAGES_IDLE[0]);
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if ((this.world.keyboard.RIGHT && this.x < this.world.max_x) || (this.world.keyboard.LEFT && this.x > 100)) {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, this.animationSpeed);
    }

    jump() {}
}
