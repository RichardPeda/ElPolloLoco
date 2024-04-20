const CANVAS_HEIGHT = 480;
const CANVAS_WIDTH = 720;
let intervallIds = [];
let audioArray = [];

/**
 * Defines a intervall and save to array
 * @param {Function} fn - function
 * @param {Number} time - time in ms
 */
function setStoppableInterval(fn, time) {
    let intervall = setInterval(fn, time);
    intervallIds.push(intervall);
}

/**
 * Create a audio object and save to array
 * @param {String} url - Audio src
 * @returns 
 */
function createAudio(url) {
    let audio = new Audio(url);
    audioArray.push(audio);
    return audio;
}

/**
 * Stop the game, clears all intervals and audio files
 */
function stopGame() {
    intervallIds.forEach(clearInterval);
    audioArray.forEach((el) => {
        if(el.pause) el.pause()
    });
    gameStart = false;
}
