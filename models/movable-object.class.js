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
        this.gravityID = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    cancelGravity() {
        clearInterval(this.gravityID);
    }

    isColliding(obj) {
        return (
            // this.x + this.width >= obj.x &&
            // this.x <= obj.x + obj.width &&
            // this.y - this.offsetY + this.height >= obj.y &&
            // this.y + this.offsetY <= obj.y + obj.height

            this.x + this.offsetX + this.width - this.offsetWidth >= obj.x &&
            this.x <= obj.x + obj.offsetX + obj.width - obj.offsetWidth &&
            this.y + this.offsetY + this.height - this.offsetHeight >= obj.y &&
            this.y + this.offsetY <= obj.y + obj.offsetY + obj.height - obj.offsetHeight
        );
    }

    isHit() {
        if (this.energy > 0) {
            this.energy -= 20;
            this.lastHit = new Date().getTime();
        }
        return this.energy;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy <= 0;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 225;
        }
    }

    isNowImmune() {
        this.isImmune = true;
        setTimeout(() => {
            this.isImmune = false;
        }, 1000);

        return this.isImmune;
    }

    moveRight() {
        this.x += this.movementSpeed;
    }

    moveLeft() {
        this.x -= this.movementSpeed;
    }
    stop() {
        this.movementSpeed = 0;
    }

    jump() {
        this.speedY = 30;
    }
    bounce() {
        this.speedY = 15;
    }
}
