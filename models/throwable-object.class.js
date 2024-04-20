class ThrowableObject extends MovableObject {
    objectHitEnemy = false;
    objectCanHit = true;
    throwID = 0;
    isActive = true;

    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    audioBreak = new Audio('audio/bottleBreak.mp3');

    /**
     * Object constructor load images, set coordinates and start animation when created
     * @param {DrawableObject} obj - used for direction character property
     */
    constructor(obj) {
        super().loadImage(this.IMAGES_ROTATE[0]);
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.height = 80;
        this.width = 80;
        this.x = obj.x;
        this.offsetX = 30;
        this.offsetY = 10;
        this.offsetWidth = 40;
        this.offsetHeight = 15;

        if (obj.otherDirection) this.x = obj.x;
        else this.x = obj.x + obj.width / 3;

        this.y = obj.y + obj.height / 2;
        this.throw(obj.otherDirection);
        this.animate();
    }

    /**
     * general function with one interval for movement (rotate, splash) and audio
     */
    animate() {
        setStoppableInterval(() => {
            if (!this.objectHitEnemy) {
                this.animateRotate();
            } else {
                this.cancelThrowInterval();
                this.speedY = 0;
                this.animateSplash();

                if (this.isActive) this.playAudio();
                else this.stopAudio();

                setTimeout(() => {
                    this.y = 800;
                    this.isActive = false;
                }, 500);
            }
        }, 1000 / 10);
    }

    /**
     * Plays animation of rotating bottle
     */
    animateRotate() {
        this.playAnimation(this.IMAGES_ROTATE);
    }

    /**
     * Plays animation of a bottle splashing
     */
    animateSplash() {
        this.playAnimation(this.IMAGES_SPLASH);
    }

    /**
     * Throw a bottle in a given direction and starts an interval
     * @param {Boolean} direction - the direction the bottle is throwing
     */
    throw(direction) {
        this.speedY = 15;
        this.applyGravity();
        this.throwID = setInterval(() => {
            if (direction) this.x -= 25;
            else this.x += 25;
        }, 50);
    }

    /**
     * Cancel the interval of the throw animation
     */
    cancelThrowInterval() {
        clearInterval(this.throwID);
    }

    /**
     * Play audio when the bottle hit an enemy and break
     */
    playAudio() {
        if (!muteGame) {
            this.audioBreak.loop = false;
            this.audioBreak.muted = false;
            this.audioBreak.volume = 0.2;
            this.audioBreak.play();
        }
    }

    /**
     * Mute the breaking bottle audio
     */
    stopAudio() {
        this.audioBreak.muted = true;
    }
}
