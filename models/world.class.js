class World {
    // maxBackgroundLength = 10;
    character = new Character();
    healthStatusbar = new StatusBarHealth();
    coinStatusbar = new StatusbarCoin();
    bottleStatusbar = new StatusbarBottle();
    throwableBottles = [];
    level = level1;
    backgroundObj = [];
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    max_x = this.level.maxBackground_x;
    throwableIndex = 0;
    levelCoinAmount = 0;
    levelBottleAmount = 5;
    bottleIsThrown = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackground();
        this.setLevelCoinAmount();
        this.setLevelBottleAmount();
        this.setEndbossPosition();
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

    setEndbossPosition() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) enemy.x = this.max_x + 100;
        });
    }

    setLevelCoinAmount() {
        this.levelCoinAmount = 100 / this.level.coins.length;
    }
    setLevelBottleAmount() {
        this.levelBottleAmount = 100 / this.level.collectableBottles.length;
    }

    run() {
        setInterval(() => {
            this.checkCharacterCollisions();
            this.checkThrowableCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowObject();
        }, 20);
    }

    checkCharacterCollisions() {
        //Character collision hurts character
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !enemy.isDead() && !enemy.isHurt()) {
                    enemy.isHit();
                    // enemy.isNowImmune();
                    console.log(enemy.energy);
                    this.character.bounce();
                } else if (!enemy.isDead() && !this.character.isHurt()) {
                    this.healthStatusbar.setPercentage(this.character.isHit());
                }
            }
        });
    }

    checkCoinCollisions() {
        //collect coins
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coinStatusbar.setPercentage(this.character.collectCoin(this.levelCoinAmount));
                this.level.coins.splice(index, 1);
            }
        });
    }

    checkBottleCollisions() {
        //collect bottles
        this.level.collectableBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottleStatusbar.setPercentage(this.character.collectBottle() * this.levelBottleAmount);
                this.level.collectableBottles.splice(index, 1);
            }
        });
    }

    checkThrowableCollisions() {
        if (this.throwableBottles.length > 0) {
            this.level.enemies.forEach((enemy) => {
                enemy.getsHurt = enemy.isImmune;
                if (
                    this.throwableBottles[this.throwableBottles.length - 1].isColliding(enemy) &&
                    this.throwableBottles[this.throwableBottles.length - 1].objectCanHit &&
                    !enemy.isDead() &&
                    !enemy.isImmune
                ) {
                    enemy.isHit();
                    this.throwableBottles[this.throwableBottles.length - 1].objectHitEnemy = true;
                    this.throwableBottles[this.throwableBottles.length - 1].objectCanHit = false;
                    // console.log(this.throwableBottles[this.throwableBottles.length - 1])
                    enemy.getsHurt = enemy.isNowImmune();
                }
            });
        }
    }

    checkThrowObject() {
        if (this.keyboard.THROW) {
            if (!this.bottleIsThrown && this.character.collectedBottles > 0 && !this.character.isDead()) {
                let bottle = new ThrowableObject(this.character);
                this.throwableBottles.push(bottle);
                console.log(this.throwableBottles[this.throwableBottles.length - 1]);
                this.bottleStatusbar.setPercentage(this.character.throwBottle() * this.levelBottleAmount);

                this.bottleIsThrown = true;
                setTimeout(() => {
                    this.bottleIsThrown = false; //avoid that throwing is fired to often
                }, 500);
            }
        }
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObj);

        this.addObjectsToMap(this.level.clouds);

        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableBottles);

        this.ctx.translate(-this.camera_x, 0);
        //-----SPACE FOR FIXED OBJECTS
        this.addToMap(this.healthStatusbar);
        this.addToMap(this.coinStatusbar);
        this.addToMap(this.bottleStatusbar);
        //----------------------------
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.collectableBottles);

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
        if (
            obj instanceof Character ||
            obj instanceof Chicken ||
            obj instanceof Endboss ||
            obj instanceof ThrowableObject ||
            obj instanceof CollectableBottle ||
            obj instanceof Coin
        ) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '5';
            this.ctx.strokeStyle = 'blue';
            // this.ctx.rect(obj.x + obj.offsetX, obj.y + obj.offsetY, obj.width - obj.offsetX, obj.height - obj.offsetY);
            this.ctx.rect(obj.x + obj.offsetX, obj.y + obj.offsetY, obj.width - obj.offsetWidth, obj.height - obj.offsetHeight);
            this.ctx.stroke();
        }
    }
}
