class DrawableObject{
    x = 0;
    y = 100;
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

}