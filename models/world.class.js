class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    cloud = [
        new Cloud('img/5_background/layers/4_clouds/1.png'),
        new Cloud('img/5_background/layers/4_clouds/2.png')
    ]
    backgroundObj = [
        // new BackgroundObject('img/5_background/layers/1_first_layer/1.png'),
        new BackgroundObject('img/5_background/layers/air.png', CANVAS_WIDTH),
        new BackgroundObject('img/5_background/layers/3_third_layer/full.png', CANVAS_WIDTH * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/full.png', CANVAS_WIDTH * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/full.png', CANVAS_WIDTH * 2),
    ];
    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObj);

        this.addObjectsToMap(this.cloud);

        this.addToMap(this.character);

        this.addObjectsToMap(this.enemies);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws an array of objects
     * @param {Array} objects - Array of drawable Object
     */
    addObjectsToMap(objects) {
        objects.forEach((obj) => {
            this.addToMap(obj);
        });
    }

    /**
     * Draws an objects
     * @param {Object} obj - drawable Object
     */
    addToMap(obj) {
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }
}
