class DrawableObject{
    x = 0;
    y = 100;
    offsetY = 0;
    offsetX = 0;
    offsetWidth = 0;
    offsetHeight = 0;
    img;
    width = 100;
    height = 150;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;

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

}