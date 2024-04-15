class World {
    // maxBackgroundLength = 10;
    character = new Character();
    healthStatusbar = new StatusBarHealth();
    coinStatusbar = new StatusbarCoin();
    bottleStatusbar = new StatusbarBottle();
    endbossStatusbar = new StatusBarEndboss();
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
    charMeetsEndboss = false;
    // canChangeBottles = false;
    // canChangeHealth = false;
    textChangeHealth = '';
    textChangeBottles = '';
    textOffset = 0;

    audioChickenHurt = new Audio('audio/chickenScream.mp3');
    audioCoinCollected = new Audio('audio/coinCollect.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateBackground();
        // this.setLevelCoinAmount();
        // this.setLevelBottleAmount();
        this.setEndbossPosition();
        this.run();
        this.draw();
        this.setWorld();
    }

    /**
     * Play chicken sound when it is hit, clone for multiple audios
     */
    playChickenSound() {
        if (!muteGame) {
            this.audioChickenHurt.volume = 0.2;
            let cloneAudio = this.audioChickenHurt.cloneNode();
            cloneAudio.volume = 0.2;
            cloneAudio.play();
        }
    }

    /**
     * Play coin collection sound
     */
    playCoinSound() {
        if (!muteGame) {
            this.audioCoinCollected.loop = false;
            this.audioCoinCollected.volume = 0.2;
            this.audioCoinCollected.play();
        }
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

    /**
     * Set the endboss position to the end of the level, depends how large the level background is
     */
    setEndbossPosition() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) enemy.x = this.max_x + 100;
        });
    }

    // setLevelCoinAmount() {
    //     this.levelCoinAmount = 100 / this.level.coins.length;
    // }
    // setLevelBottleAmount() {
    //     this.levelBottleAmount = 100 / this.level.collectableBottles.length;
    // }

    run() {
        setStoppableInterval(() => {
            this.checkCharacterCollisions();
            this.checkThrowableCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowObject();
            this.checkCharacterAtEndboss();
            this.checkChangeCoinsForBottles();
            this.checkChangeCoinsForHealth();
        }, 20);
    }

    checkChangeCoinsForBottles() {
        this.textOffset = 0;
        if (this.canChangeCoinsForBottles()) {
            this.textChangeBottles = 'Press Q to exchange coins for bottles';
            this.textOffset = 20;
            if (this.keyboard.BOTTLES) {
                this.bottleStatusbar.setPercentage(this.character.collectBottle(20));
                this.coinStatusbar.setPercentage(this.character.collectCoin(-100));
            }
        } else this.textChangeBottles = '';
    }

    checkChangeCoinsForHealth() {
        if (this.canChangeCoinsForHealth()) {
            this.textChangeHealth = 'Press E to exchange coins for health';
            if (this.keyboard.HEALTH) {
                this.healthStatusbar.setPercentage(this.healthStatusbar.percentage + 20);
                this.coinStatusbar.setPercentage(this.character.collectCoin(-100));
            }
        } else this.textChangeHealth = '';
    }

    canChangeCoinsForBottles() {
        return this.coinStatusbarIsFilled() && !this.bottleStatusbarIsFilled();
    }

    canChangeCoinsForHealth() {
        return this.coinStatusbarIsFilled() && !this.healthStatusbarIsFilled();
    }

    coinStatusbarIsFilled() {
        return this.coinStatusbar.percentage == 100;
    }

    bottleStatusbarIsFilled() {
        return this.bottleStatusbar.percentage == 100;
    }
    healthStatusbarIsFilled() {
        return this.healthStatusbar.percentage == 100;
    }

    /**
     * When the character is near the endboss, set flag for endboss-animation and visualize endboss-statusbar
     */
    checkCharacterAtEndboss() {
        if (this.character.x >= this.max_x - 400) this.charMeetsEndboss = true;
        if (this.charMeetsEndboss) this.endbossStatusbar.x = 560;
    }

    /**
     * Check if character hits any enemy, character hurts the enemy above ground, otherwise the enemy hurts character
     */
    checkCharacterCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !enemy.isDead() && !enemy.isHurt()) {
                    if (enemy instanceof Endboss) {
                        this.endbossStatusbar.setPercentage(enemy.isHit());
                        this.playChickenSound();
                    } else {
                        enemy.isHit();
                        this.playChickenSound();
                    }
                    this.character.bounce();
                } else if (!enemy.isDead() && !this.character.isHurt()) {
                    this.healthStatusbar.setPercentage(this.character.isHit());
                    this.character.playAudioHurt();
                }
            }
        });
    }

    /**
     * Check if character hits a coin, then collect it
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && !this.coinStatusbarIsFilled()) {
                this.playCoinSound();
                this.coinStatusbar.setPercentage(this.character.collectCoin(20));
                this.level.coins.splice(index, 1);
            }
        });
    }

    /**
     * Check if character hits a bottle on the ground, then collect it
     */
    checkBottleCollisions() {
        this.level.collectableBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && !this.bottleStatusbarIsFilled()) {
                this.bottleStatusbar.setPercentage(this.character.collectBottle(20));
                this.level.collectableBottles.splice(index, 1);
            }
        });
    }

    /**
     * Check if a thrown bottle hits an enemy. Only collected bottles can be thrown.
     * If enemy is hit, play different sounds (chicken / endboss). Chicken dies at once, endboss increase health status bar
     */
    checkThrowableCollisions() {
        if (this.throwableBottles.length > 0) {
            this.level.enemies.forEach((enemy) => {
                enemy.getsHurt = enemy.isImmune;
                if (this.bottleHitsEnemy(enemy)) {
                    if (enemy instanceof Endboss) {
                        this.endbossStatusbar.setPercentage(enemy.isHit());
                        this.playChickenSound();
                    } else {
                        enemy.isHit();
                        this.playChickenSound();
                    }
                    this.throwableBottles[this.throwableBottles.length - 1].objectHitEnemy = true;
                    this.throwableBottles[this.throwableBottles.length - 1].objectCanHit = false;
                    enemy.getsHurt = enemy.isNowImmune();
                }
            });
        }
    }

    bottleHitsEnemy(enemy) {
        return (
            this.throwableBottles[this.throwableBottles.length - 1].isColliding(enemy) &&
            this.throwableBottles[this.throwableBottles.length - 1].objectCanHit &&
            !enemy.isDead() &&
            !enemy.isImmune
        );
    }

    checkThrowObject() {
        if (this.keyboard.THROW) {
            if (!this.bottleIsThrown && this.character.collectedBottles > 0 && !this.character.isDead()) {
                let bottle = new ThrowableObject(this.character);
                this.throwableBottles.push(bottle);
                this.bottleStatusbar.setPercentage(this.character.throwBottle(20));
                this.bottleIsThrown = true;
                setTimeout(() => {
                    this.bottleIsThrown = false; //avoid that throwing is fired to often
                }, 1000);
            }
        }
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
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
        this.addToMap(this.endbossStatusbar);
        this.ctx.font = '16px serif';
        this.ctx.fillText(this.textChangeBottles, 10, 140);
        this.ctx.fillText(this.textChangeHealth, 10, 140 + this.textOffset);
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
     * Draws an objects, flips the images when it moves in other direction
     * @param {Object} obj - drawable Object
     */
    addToMap(obj) {
        if (obj.otherDirection) {
            this.flipImage(obj);
        }
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        // this.drawCollisionOutlines(obj);

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
            obj instanceof JumpingChicken ||
            obj instanceof Endboss ||
            obj instanceof ThrowableObject ||
            obj instanceof CollectableBottle ||
            obj instanceof Coin
        ) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '5';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(obj.x + obj.offsetX, obj.y + obj.offsetY, obj.width - obj.offsetWidth, obj.height - obj.offsetHeight);
            this.ctx.stroke();
        }
    }
}
