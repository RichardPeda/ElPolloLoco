class World {
    // maxBackgroundLength = 10;
    character = new Character();
    healthStatusbar = new StatusBarHealth();
    coinStatusbar = new StatusbarCoin();
    bottleStatusbar = new StatusbarBottle();
    // bottles = [new ThrowableObject(this.character.x, this.character.y)];
    bottles = [];
    level = level1;
    backgroundObj = [];
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    max_x = this.level.maxBackground_x;
    throwableIndex = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackground();
        this.run();
        this.draw();
        this.setWorld();
    }

    /**
     * Generates the background images for the level
     */
    generateBackground() {
        let x_offset = 0;
        let path = '';
        for (let index = 0; index < this.level.maxBackgroundNr; index++) {
            this.level.backgroundPaths.forEach((backgroundPath) => {
                path = backgroundPath;
                this.backgroundObj.push(new BackgroundObject(path, CANVAS_WIDTH, x_offset));
            });
            x_offset += CANVAS_WIDTH - 1;
        }
    }

    run() {
        setInterval(() => {
            this.checkCharacterCollisions();
            this.checkThrowableCollisions();
            this.checkThrowObject();
        }, 200);
    }

    checkCharacterCollisions() {
        this.character.getsHurt = false;
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.healthStatusbar.setPercentage(this.character.isHit());
                this.character.getsHurt = true;
            }
        });
    }

    checkThrowableCollisions() {
        // this.character.getsHurt = false;
        console.log(this.bottles.length);
        if (this.bottles.length > 0) {
            this.level.enemies.forEach((enemy) => {
                if (this.bottles[this.bottles.length - 1].isColliding(enemy)) {
                    console.log('bottle');
                }
            });
        }
    }

    checkThrowObject() {
        if (this.keyboard.THROW) {
            // let bottle = new ThrowableObject(this.character.x + this.character.width / 2, this.character.y + this.character.height / 2, this.character.otherDirection);
            let bottle = new ThrowableObject(this.character);
            this.bottles.push(bottle);
        }
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObj);

        this.addObjectsToMap(this.level.clouds);

        this.addToMap(this.character);
        this.addObjectsToMap(this.bottles);

        this.ctx.translate(-this.camera_x, 0);
        //-----SPACE FOR FIXED OBJECTS
        this.addToMap(this.healthStatusbar);
        this.addToMap(this.coinStatusbar);
        this.addToMap(this.bottleStatusbar);
        //----------------------------
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);

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
            this.flipImage(obj);
        }
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        this.drawCollisionOutlines(obj);

        if (obj.otherDirection) {
            this.flipImageBack(obj);
        }
    }

    flipImage(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }

    flipImageBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }

    drawCollisionOutlines(obj) {
        if (obj instanceof Character || obj instanceof Chicken || obj instanceof Endboss || obj instanceof ThrowableObject) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '5';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(obj.x, obj.y, obj.width, obj.height);
            this.ctx.stroke();
        }
    }
}
