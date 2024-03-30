class Endboss extends MovableObject {
    y = 150;
    multi = 0.25;
    world;

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

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.height = 300;
        this.width = 300;
        this.x = 2000;
        this.animationSpeed = 200
        this.loadImages(this.IMAGES_ALERT);
        this.animate()
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT)
        }, this.animationSpeed);
    }

}
