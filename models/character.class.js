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

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
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
    audioWalk = createAudio('audio/walking.mp3');
    audioHurt = createAudio('audio/hurt1.mp3');
    audioSnoring = createAudio('audio/snoring.mp3');
    audioJump = createAudio('audio/jump.mp3');
    audioLoose = createAudio('audio/charLoose.mp3');
    collectedCoins = 0;
    collectedBottles = 0;
    lastMovement = 0;
    timeStampSet = false;

    /**
     * Object constructor loads images, set coordinates and starts main functions
     */
    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.height = 200;
        this.width = 100;
        this.offsetY = 70;
        this.offsetX = 10;
        this.offsetWidth = 30;
        this.offsetHeight = 80;
        this.energy = 100;
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    /**
     * general animation function with 2 intervals
     */
    animate() {
        setStoppableInterval(() => {
            // this.audioWalk.muted = true;
            this.stopAudio(this.audioWalk);
            if (!this.isDead()) {
                if (this.canMoveRight()) this.moveRight();
                else if (this.canMoveLeft()) this.moveLeft();

                if (this.canWalk() || this.canJump()) {
                    this.wakeUp();
                } else this.fallAsleep();

                if (this.canJump()) {
                    this.jump();
                    this.playAudio(this.audioJump);
                }
            }
            if (this.y > 225) this.y = 225;
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.playAudio(this.audioLoose);
                setTimeout(() => {
                    this.loadImage(this.IMAGES_DEAD[6]);
                    stopGame();
                    setScreenLost();
                }, 1000);
            } else if (this.isHurt() && !this.canJump()) {
                this.playAnimation(this.IMAGES_HURT);
                this.playAudio(this.audioHurt);
            } else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
            else if (this.canWalk()) this.playAnimation(this.IMAGES_WALK);
            else if (this.isSleeping()) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                this.playAudio(this.audioSnoring);
            } else this.playAnimation(this.IMAGES_IDLE);
        }, this.animationSpeed);
    }

    /**
     * If char is not moving set timestamp
     */
    fallAsleep() {
        if (!this.timeStampSet) {
            this.lastMovement = new Date().getTime();
            this.timeStampSet = true;
        }
    }

    /**
     * If char is moving clear timestamp and stop audio
     */
    wakeUp() {
        this.timeStampSet = false;
        this.stopAudio(this.audioSnoring);
    }

    /**
     * If char is not moving for 5 sec. return true
     * @returns {Boolean}
     */
    isSleeping() {
        if (this.timeStampSet) {
            let timepassed = new Date().getTime() - this.lastMovement;
            timepassed = timepassed / 1000;
            return timepassed > 5;
        } else return false;
    }

    /**
     * Let character move left, clear direction flag and plays a sound of walking
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) this.playAudio(this.audioWalk);
    }

    /**
     * Let character move right, set direction flag and plays a sound of walking
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) this.playAudio(this.audioWalk);
    }

    /**
     * Returns true if the character can walk
     * @returns {Boolean}
     */
    canWalk() {
        return (this.world.keyboard.RIGHT && this.x < this.world.max_x) || (this.world.keyboard.LEFT && this.x > 100);
    }

    /**
     * Returns true if the character can move right
     * @returns {Boolean}
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.max_x;
    }

    /**
     * Returns true if the character can move left
     * @returns {Boolean}
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 100;
    }

    /**
     * Returns true if the character can jump
     * @returns {Boolean}
     */
    canJump() {
        return (this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround();
    }

    /**
     * Increase the amount of collected coins
     * @param {Number} amount - The amount of a coin of the actual level
     * @returns
     */
    collectCoin(amount) {
        return (this.collectedCoins += amount);
    }

    /**
     * Increase the amount of collected bottles
     * @param {Number} amount - Amount of actual bottles
     * @returns
     */
    collectBottle(amount) {
        return (this.collectedBottles += amount);
    }

    /**
     * Decrease the amount of collected bottles
     * @returns {Number} - Amount of actual bottles
     */
    throwBottle(amount) {
        return (this.collectedBottles -= amount);
    }
}
