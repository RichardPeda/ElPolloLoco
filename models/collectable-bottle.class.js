class CollectableBottle extends DrawableObject{
    IMAGES =[
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    constructor(){
        super().loadImage(this.IMAGES[0])
        this.loadImages(this.IMAGES)
        this.height = 80;
        this.width = 80;
        this.x = 200 + Math.random() * 1500;
        this.y = 350;
        // this.animate()
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 300);
    }
}