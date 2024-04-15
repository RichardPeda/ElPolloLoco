class MovableObject extends DrawableObject {
    animationSpeed = 100;
    movementSpeed = 0.2;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    getsHurt = false;
    isImmune = false;
    animationID;
    lastHit = 0;
    gravityID = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Returns true if a MoveableObject is colliding with another MoveableObject
     * @param {MovableObject} obj
     * @returns {Boolean}
     */
    isColliding(obj) {
        return (
            this.x + this.offsetX + this.width - this.offsetWidth >= obj.x &&
            this.x <= obj.x + obj.offsetX + obj.width - obj.offsetWidth &&
            this.y + this.offsetY + this.height - this.offsetHeight >= obj.y &&
            this.y + this.offsetY <= obj.y + obj.offsetY + obj.height - obj.offsetHeight
        );
    }

    /**
     * Increases the amount of energy by 20 and set a timestamp for the last hit
     * @returns {Number} - amount of actual energy
     */
    isHit() {
        if (this.energy > 0) {
            this.energy -= 20;
            this.lastHit = new Date().getTime();
        }
        return this.energy;
    }

    /**
     * Calculates the passing time when a MovableObject is hurt and return true for 1 second
     * @returns {Boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Returns true if the energy level is 0
     * @returns {Boolean}
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Returns true if a MovableObject is above the ground with different y-axis depending of instance
     * @returns {Boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof Character) {
            return this.y < 225;
        } else if (this instanceof JumpingChicken) {
            return this.y < 350;
        }
    }

    /**
     * Returns true if a MovableObject is hit for 1 second and makes it immune for new damage
     * @returns {Boolean}
     */
    isNowImmune() {
        this.isImmune = true;
        setTimeout(() => {
            this.isImmune = false;
        }, 1000);
        return this.isImmune;
    }

    /**
     * Let the MoveableObject move right
     */
    moveRight() {
        this.x += this.movementSpeed;
    }

    /**
     * Let the MoveableObject move left
     */
    moveLeft() {
        this.x -= this.movementSpeed;
    }

    /**
     * Set the movementspeed to 0 and let the MoveableObject stop moving
     */
    stop() {
        this.movementSpeed = 0;
    }

    /**
     * Let the MoveableObject jump
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Let the MoveableObject jump for a small amount
     */
    bounce() {
        this.speedY = 15;
    }
}
