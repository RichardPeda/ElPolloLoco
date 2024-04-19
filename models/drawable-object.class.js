class DrawableObject {
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

    /**
     * loads one image path
     * @param {String} path
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * loads an array of image paths
     * @param {Array} imagePaths
     */
    loadImages(imagePaths) {
        imagePaths.forEach((imagePath) => {
            let img = new Image();
            img.src = imagePath;
            this.imageCache[imagePath] = img;
        });
    }

    /**
     * loads image path sequence for animation
     * @param {Array} images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAudio(audio) {
        if (!muteGame && gameStart) {
            audio.volume = 0.6;
            audio.loop = false;
            audio.muted = false;
            audio.play();
        }
    }

    stopAudio(audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}
