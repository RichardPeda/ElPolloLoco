class MovableObject {
    x = 0;
    y = 100;
    img;
    width = 100;
    height = 150;
    imageCache = {};
    currentImage = 0;
    animationSpeed = 100;
    movementSpeed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 225;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imagePaths) {
        imagePaths.forEach((imagePath) => {
            let img = new Image();
            img.src = imagePath;
            this.imageCache[imagePath] = img;
        });
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
        this.speedY = 20;
    }
}
