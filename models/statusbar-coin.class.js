class StatusbarCoin extends StatusBarObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES[5]);
        this.loadImages(this.IMAGES);
        this.x = 5;
        this.y = 30 ;
        this.percentage = 0;
        this.setPercentage(this.percentage)
        this.resovePersentage(this.percentage)
    }
}
