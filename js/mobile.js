const leftKey = document.getElementById('mobile-left-key');
const rightKey = document.getElementById('mobile-right-key');
const upKey = document.getElementById('mobile-up-key');
const throwKey = document.getElementById('mobile-bottle-key');
const bottleKey = document.getElementById('mobile-coinToBottle-key');
const healthKey = document.getElementById('mobile-coinToHealth-key');

leftKey.addEventListener('touchstart', () =>{
    keyboard.LEFT = true;
},{passive: true})

leftKey.addEventListener('touchend', () =>{
    keyboard.LEFT = false;
},{passive: true})

rightKey.addEventListener('touchstart', () =>{
    keyboard.RIGHT = true;
},{passive: true})

rightKey.addEventListener('touchend', () =>{
    keyboard.RIGHT = false;
},{passive: true})

upKey.addEventListener('touchstart', () =>{
    keyboard.UP = true;
},{passive: true})
upKey.addEventListener('touchend', () =>{
    keyboard.UP = false;
},{passive: true})

throwKey.addEventListener('touchstart', () =>{
    keyboard.THROW = true;
},{passive: true})
throwKey.addEventListener('touchend', () =>{
    keyboard.THROW = false;
},{passive: true})

bottleKey.addEventListener('touchstart', () =>{
    keyboard.BOTTLES = true;
},{passive: true})
bottleKey.addEventListener('touchend', () =>{
    keyboard.BOTTLES = false;
},{passive: true})

healthKey.addEventListener('touchstart', () =>{
    keyboard.HEALTH = true;
},{passive: true})
healthKey.addEventListener('touchend', () =>{
    keyboard.HEALTH = false;
},{passive: true})


