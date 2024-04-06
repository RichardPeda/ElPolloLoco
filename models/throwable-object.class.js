class ThrowableObject extends MovableObject {
    objectHitEnemy = false;
    objectCanHit = true;
    throwID = 0;
    thowAnimationId = 0;

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

    animate() {
        setStoppableInterval(() => {
            if (!this.objectHitEnemy) {
                this.animateRotate();
            } else {
                this.cancelGravity();
                this.cancelThrowInterval();
                this.speedY = 0;
                this.animateSplash();
                setTimeout(() => {
                    this.y = 800;
                }, 500);
            }
        }, 1000 / 10);
    }

    animateRotate() {
        this.playAnimation(this.IMAGES_ROTATE);
    }

    animateSplash() {
        this.playAnimation(this.IMAGES_SPLASH);
    }

    throw(direction) {
        this.speedY = 15;
        this.applyGravity();

        this.throwID = setInterval(() => {
            if (direction) this.x -= 25;
            else this.x += 25;
        }, 50);
    }

    cancelThrowInterval() {
        clearInterval(this.throwID);
    }
}
