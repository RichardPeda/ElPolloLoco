class World {
    maxBackgroundLength = 10;
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundPaths = level1.backgroundPaths;

    backgroundObj = [];
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackground();
        this.draw();
        this.setWorld();
    }

    generateBackground() {
        let x_offset = 0;
        let path = '';
        for (let index = 0; index < this.maxBackgroundLength; index++) {
            this.backgroundPaths.forEach((backgroundPath) => {
                path = backgroundPath;
                this.backgroundObj.push(new BackgroundObject(path, CANVAS_WIDTH, x_offset));
            });
            x_offset += CANVAS_WIDTH - 1;
        }
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObj);

        this.addObjectsToMap(this.clouds);

        this.addToMap(this.character);

        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);

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
        if (obj.otherDirection) {
            this.ctx.save();
            this.ctx.translate(obj.width, 0);
            this.ctx.scale(-1, 1);
            obj.x = obj.x * -1;
        }
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        if (obj.otherDirection) {
            obj.x = obj.x * -1;
            this.ctx.restore();
        }
    }
}
