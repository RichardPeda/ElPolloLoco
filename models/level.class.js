class Level {
    enemies;

    clouds;
    backgroundPaths;
    maxBackgroundNr;
    maxBackground_x;
    coins;
    collectableBottles;

    constructor(enemies, clouds, backgroundPaths, maxBackgroundNr, coins, collectableBottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundPaths = backgroundPaths;
        this.maxBackgroundNr = maxBackgroundNr;
        this.maxBackground_x = maxBackgroundNr * CANVAS_WIDTH - CANVAS_WIDTH;
        this.coins = coins;
        this.collectableBottles = collectableBottles;
    }
}
