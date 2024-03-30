class Level {
    enemies;
    clouds;
    backgroundPaths;
    maxBackgroundNr;
    maxBackground_x;
    coins;
    bottles;

    constructor(enemies, clouds, backgroundPaths, maxBackgroundNr, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundPaths = backgroundPaths;
        this.maxBackgroundNr = maxBackgroundNr;
        this.maxBackground_x = maxBackgroundNr * CANVAS_WIDTH - CANVAS_WIDTH;
        this.coins = coins;
        this.bottles = bottles;
    }
}
