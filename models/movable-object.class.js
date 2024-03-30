class MovableObject extends DrawableObject {
    animationSpeed = 100;
    movementSpeed = 0.2;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    getsHurt = false;
    // dies = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isColliding(obj) {
        return (
            // this.x + this.width >= obj.x &&
            // this.x <= obj.x + obj.width &&
            // this.y - this.offsetY + this.height >= obj.y &&
            // this.y + this.offsetY <= obj.y + obj.height 

            this.x + this.offsetX + this.width - this.offsetWidth >= obj.x &&
            this.x <= obj.x + obj.offsetX + obj.width - obj.offsetWidth &&
            this.y + this.offsetY + this.height - this.offsetHeight  >= obj.y &&
            this.y + this.offsetY <= obj.y + obj.offsetY + obj.height - obj.offsetHeight 
        );
    }

    isHit() {
        if (this.energy > 0) {
            this.energy -= 5;
        }
        return this.energy;
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

    moveRight() {
        this.x += this.movementSpeed;
    }

    moveLeft() {
        this.x -= this.movementSpeed;
    }

    jump() {
        this.speedY = 30;
    }
}
