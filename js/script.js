let canvas;
let world;

const CANVAS_HEIGHT = document.getElementById('canvas').height;
const CANVAS_WIDTH = document.getElementById('canvas').width;

function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas);
  
}
