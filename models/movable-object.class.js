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
            this.x + this.width >= obj.x && this.x <= obj.x + obj.width && this.y + this.height >= obj.y && this.y <= obj.y + obj.height // && obj.onCollisionCourse
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

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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
