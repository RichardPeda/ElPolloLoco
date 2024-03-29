class MovableObject {
    x = 0;
    y = 100;
    img;
    width = 100;
    height = 150;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {}
    moveLeft() {}
}
