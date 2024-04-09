class Endboss extends MovableObject {
    y = 150;
    multi = 0.25;
    world;
    step = 0;
    counter = 0;

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.height = 300;
        this.width = 300;
        // this.x = 2000;
        // this.x = 500;
        this.movementSpeed = 2;
        this.offsetY = 50;
        this.offsetX = 10;
        this.offsetWidth = 30;
        this.offsetHeight = 80;

        this.animationSpeed = 200;
        this.energy = 100;
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            if (this.world.charMeetsEndboss) {
                this.animationSequence();
                this.moveSequence();
            }
        }, 2000);

        setStoppableInterval(() => {
            if (this.step == 0 && this.world.charMeetsEndboss) {
                if (this.counter == 0 || this.counter == 1) this.moveLeft();
                else this.moveRight();
            }
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.stop();
                setTimeout(() => {
                    // clearInterval(this.animationID);
                    this.loadImage(this.IMAGES_DEAD[2]);
                    stopGame();
                    setScreenWin();
                }, 1500);
            } else if (this.getsHurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.step == 0) {
                this.playAnimation(this.IMAGES_WALK);
            } else if (this.step == 1) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.step == 2) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, this.animationSpeed);
    }

    moveLeft() {
        super.moveLeft();
        this.otherDirection = false;
    }
    moveRight() {
        super.moveRight();
        this.otherDirection = true;
    }

    animationSequence() {
        if (this.step < 2) this.step++;
        else this.step = 0;
    }

    moveSequence() {
        if (this.step == 0) this.counter++;
        if (this.counter == 4) this.counter = 0;
    }
}
