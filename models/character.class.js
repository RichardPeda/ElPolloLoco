class Character extends MovableObject {
    x = 100;
    y = 225;

    // y = 125;
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
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png'];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    world;
    movementSpeed = 6;
    audio = new Audio('audio/walking.mp3');
    collectedCoins = 0;
    collectedBottles = 0;

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.height = 200;
        this.width = 100;
        this.offsetY = 70;
        this.offsetX = 10;
        this.offsetWidth = 30;
        this.offsetHeight = 80;
        // this.energy = 200000;
        this.energy = 100;
        // this.animationSpeed= 500
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        // this.isHurt = true;
        this.applyGravity();
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.audio.pause();
            if (!this.isDead())
                if (this.canMoveRight()) this.moveRight();
                else if (this.canMoveLeft()) this.moveLeft();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    stopGame();
                }, 1500);
            } else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
            else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
            else if (this.canJump()) this.jump();
            else if (this.canWalk()) this.playAnimation(this.IMAGES_WALK);
            else this.loadImage(this.IMAGES_IDLE[0]);
        }, this.animationSpeed);
    }

    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.playAudioWalk();
    }
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.playAudioWalk();
    }

    canWalk() {
        return (this.world.keyboard.RIGHT && this.x < this.world.max_x) || (this.world.keyboard.LEFT && this.x > 100);
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.max_x;
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 100;
    }

    canJump() {
        return (this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround();
    }

    playAudioWalk() {
        if (!this.isAboveGround()) this.audio.play();
    }

    collectCoin(amount) {
        return (this.collectedCoins += amount);
    }

    collectBottle() {
        return (this.collectedBottles += 1);
    }

    throwBottle() {
        return (this.collectedBottles -= 1);
    }
}
