const CANVAS_HEIGHT = 480;
const CANVAS_WIDTH = 720;
let intervallIds = [];

function setStoppableInterval(fn, time) {
    let intervall = setInterval(fn, time);
    intervallIds.push(intervall);
}

function stopGame() {
    intervallIds.forEach(clearInterval);
}