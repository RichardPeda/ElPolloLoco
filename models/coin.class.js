class Coin extends DrawableObject {
    IMAGES = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];
    
    /**
     * Object constructor loads images, sets coordinates and starts animation function
     */
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 1500;
        this.y = 300 - Math.random() * 200;
        this.offsetX = 30;
        this.offsetY = 50;
        this.offsetWidth = 60;
        this.offsetHeight = 100;
        this.animate();
    }

    /**
     * general function with one interval for movement
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
    }

   
}
