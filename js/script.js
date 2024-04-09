let canvas;
let world;
let keyboard = new Keyboard();
let muteGame = false;

let imageLostGame;
let imageWonGame;

let IMAGES_LOST = ['img/9_intro_outro_screens/game_over/oh no you lost!.png', 'img/9_intro_outro_screens/game_over/you lost.png'];

let IMAGES_GAMEOVER = ['img/9_intro_outro_screens/game_over/game over!.png', 'img/9_intro_outro_screens/game_over/game over.png'];

function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    setRandomScreens();
    muteGame = false;
    world = new World(canvas, keyboard);
}

function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
}

function showGameOverScreen() {
    document.getElementById('gameOver-screen').classList.remove('d-none');
}

function hideGameOverScreen() {
    document.getElementById('gameOver-screen').classList.add('d-none');
}

function setRandomScreens() {
    let index = Math.round(Math.random());
    imageLostGame = IMAGES_LOST[index];
    imageWonGame = IMAGES_GAMEOVER[index];
}

function setScreenLost() {
    let image = document.getElementById('gameOver-image');
    image.src = imageLostGame;
    showGameOverScreen();
}

function setScreenWin() {
    let image = document.getElementById('gameOver-image');
    image.src = imageWonGame;
    showGameOverScreen();
}

function restart() {
    init();
    hideGameOverScreen();
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
