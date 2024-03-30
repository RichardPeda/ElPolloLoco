class StatusBarObject extends DrawableObject {
    percentage = 100;
    x = 5;
    height = 50;
    width = 150;

    setPercentage(percentage) {
        this.percentage = percentage;
        this.loadImage(this.IMAGES[this.resovePersentage(this.percentage)]);
    }

    resovePersentage(percentage) {
        if (percentage > 80) {
            return 5;
        } else if (percentage > 60) {
            return 4;
        } else if (percentage > 40) {
            return 3;
        } else if (percentage > 20) {
            return 2;
        } else if (percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}
