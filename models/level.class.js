class Level {
    enemies;
    clouds;
    backgroundPaths;
    maxBackgroundNr;
    maxBackground_x;

    constructor(enemies, clouds, backgroundPaths, maxBackgroundNr) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundPaths = backgroundPaths;
        this.maxBackgroundNr = maxBackgroundNr;
        this.maxBackground_x = maxBackgroundNr * CANVAS_WIDTH - CANVAS_WIDTH;
    }
}
