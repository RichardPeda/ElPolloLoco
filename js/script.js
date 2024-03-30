let canvas;
let world;
let keyboard = new Keyboard();



function init() {
   
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

document.addEventListener('keydown', (e) => {
    if (e.key == 'a' || e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.key == 'd' || e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key == 'w' || e.key == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.key == ' ') {
        keyboard.SPACE = true;
    }
    if (e.key == 'f') {
        keyboard.THROW = true;
    }
});

document.addEventListener('keyup', () => {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.SPACE = false;
    keyboard.THROW = false;
});
