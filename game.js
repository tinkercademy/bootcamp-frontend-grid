const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;

const GRID_SIZE = 10;
const ROWS = canvas.height / GRID_SIZE;
const COLS = canvas.width / GRID_SIZE;

const elements = {
    EMPTY: 0,
    ORE: 1,
    MINING_BOT: 2,
    FACTORY_BOT: 3
};

const images = {};
const imagePaths = {
    [elements.EMPTY]: 'assets/EMPTY.png',
    [elements.ORE]: 'assets/ORE.png'
};

function loadImages(paths, callback) {
    let loadedImages = 0;
    const numImages = Object.keys(paths).length;
    for (let key in paths) {
        images[key] = new Image();
        images[key].src = paths[key];
        images[key].onload = () => {
            if (++loadedImages >= numImages) {
                callback();
            }
        };
    }
}

let gameState = Array.from({length: ROWS}, () => Array(COLS).fill(elements.EMPTY));

function randomState(){
    for(let row = 0; row < ROWS; row++){
        for(let col = 0; col < COLS; col++){
            gameState[row][col] = Math.floor(Math.random() * 4);
        }
    }
    console.log(gameState);
}

function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let row = 0; row < ROWS; row++){
        for(let col = 0; col < COLS; col++){
            const element = gameState[row][col];
            if (images[element]) {
                ctx.drawImage(images[element], col * GRID_SIZE, row * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            }else{
                switch(element){
                    case elements.EMPTY:
                        ctx.fillStyle = 'white';
                        break;
                    case elements.ORE:
                        ctx.fillStyle = 'gray';
                        break;
                    case elements.MINING_BOT:
                        ctx.fillStyle = 'blue';
                        break;
                    case elements.FACTORY_BOT:
                        ctx.fillStyle = 'green';
                        break;
                }
                ctx.fillRect(col * GRID_SIZE, row * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            }
        }      
    }
}

loadImages(imagePaths, () => {
    randomState();
    render();
});