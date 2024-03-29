class Character extends MovableObject {
    x = 50;
    y = 225;

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.height = 200;
        this.width = 100;
    }

    jump() {}
}
