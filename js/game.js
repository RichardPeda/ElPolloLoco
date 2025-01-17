let canvas;
let world;
let keyboard = new Keyboard();
let muteGame = false;
let fullScreen = false;
let gameStart = false;
backgroundSound = new Audio('audio/backgroundSound.mp3');
backgroundSound.volume = 0.2;
mobileView = false;
endScreen = false;

let imageLostGame;
let imageWonGame;

let IMAGES_LOST = ['img/9_intro_outro_screens/game_over/oh no you lost!.png', 'img/9_intro_outro_screens/game_over/you lost.png'];

let IMAGES_GAMEOVER = ['img/9_intro_outro_screens/game_over/game over!.png', 'img/9_intro_outro_screens/game_over/game over.png'];


/**
 * Init function when the page is loades
 */
function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    setRandomScreens();
    world = new World(canvas, keyboard);
    setVolumeBtn();
    checkWindowSize();
    endScreen = false;
}

/**
 * Starts the game and hide the start screen
 */
function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    gameStart = true;
    if (!muteGame) backgroundSound.play();
}

/**
 * Enable the full screen button
 */
function showFullscreenBtn() {
    let container = document.getElementById('expand');
    if (gameStart) {
        container.classList.remove('d-none');
    } else container.classList.add('d-none');
}

/**
 * Show the final screen
 */
function showGameOverScreen() {
    document.getElementById('gameOver-screen').classList.remove('d-none');
    backgroundSound.pause();
    gameStart = false;
    endScreen = true;
}

/**
 * Hide the final screen
 */
function hideGameOverScreen() {
    document.getElementById('gameOver-screen').classList.add('d-none');
}

/**
 * Set a random screen
 */
function setRandomScreens() {
    let index = Math.round(Math.random());
    imageLostGame = IMAGES_LOST[index];
    imageWonGame = IMAGES_GAMEOVER[index];
}

/**
 * Set the source of the lost screen
 */
function setScreenLost() {
    let image = document.getElementById('gameOver-image');
    image.src = imageLostGame;
    if (!endScreen) showGameOverScreen();
}

/**
 * Set the source of the winning screen
 */
function setScreenWin() {
    let image = document.getElementById('gameOver-image');
    image.src = imageWonGame;
    if (!endScreen) showGameOverScreen();
}

/**
 * Restarts the game after 1 second to ensure all intervals are cleared
 */
function restart() {
    setTimeout(() => {
        init();
        hideGameOverScreen();
        backgroundSound.play();
        gameStart = true;
    }, 1000);
}

/**
 * Keyboard controls when a key is pressed
 */
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
    if (e.key == 'q') {
        keyboard.BOTTLES = true;
    }
    if (e.key == 'e') {
        keyboard.HEALTH = true;
    }
});

/**
 * Keybord controls when a key is released
 */
document.addEventListener('keyup', (e) => {
    if (e.key == 'a' || e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.key == 'd' || e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key == 'w' || e.key == 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.key == ' ') {
        keyboard.SPACE = false;
    }
    if (e.key == 'f') {
        keyboard.THROW = false;
    }
    if (e.key == 'q') {
        keyboard.BOTTLES = false;
    }
    if (e.key == 'e') {
        keyboard.HEALTH = false;
    }
});

/**
 * Set the muting state of the game and the icon
 */
function setVolumeBtn() {
    let container = document.getElementById('volume');

    if (!muteGame) {
        container.innerHTML = /*html*/ `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>
        `;
    } else {
        container.innerHTML = /*html*/ `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>
        `;
    }
}

/**
 * Set the fullscreen expand button icon
 */
function setExpandBtn() {
    let container = document.getElementById('expand');
    fullScreen = !fullScreen;
    if (fullScreen) {
        container.innerHTML = /*html*/ `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/></svg>
        `;
    } else {
        container.innerHTML = /*html*/ `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"/></svg>
        `;
    }
}

/**
 * set the canvas to fullscreen
 */
function setfullScreen() {
    enterFullscreen(canvas);
}

/**
 * canvas to fullscreen
 * @param {HTMLObjectElement} element 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * exit the canvas fullscreen
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Toggles the muting state on and off
 */
function toggleVolume() {
    muteGame = !muteGame;
    if (muteGame) backgroundSound.muted = true;
    else backgroundSound.muted = false;
    setVolumeBtn();
}

window.addEventListener('resize', checkWindowSize());

/**
 * Check if the device is a mobile device
 */
function checkWindowSize() {
    if (window.innerWidth < 700 || window.innerHeight <= 420) mobileView = true;
    else mobileView = false;
}
