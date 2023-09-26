const stopButton = document.querySelector('.stop');
const startButton = document.querySelector('.start');
const gameContainer = document.querySelector('.gameContainer')
const xInitialCoordinate = 13;
const yInitialCoordinate = 13;

let run;
let velocity = 1000;
let snake = [];

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);

class SnakeSquare {
    constructor(squareDiv, x, y) {
        this.squareDiv = squareDiv;
        this.x = x;
        this.y = y;
    }
}

function createSnakeSquareDiv(x, y) {
    let snakeSquareDiv = document.createElement('div');

    snakeSquareDiv.classList.add('activeCoordinate');
    setGridCoordinates(snakeSquareDiv, x, y);
    gameContainer.appendChild(snakeSquareDiv);

    let snakeSquare = new SnakeSquare(snakeSquareDiv, x, y);
    snake.push(snakeSquare);
}

function setGridCoordinates(squareDiv, x, y) {
    squareDiv.style.gridRow = `${y}`;
    squareDiv.style.gridColumn = `${x}`;
}

function moveForward(snake) {
    for (let i = 0; i < snake.length; i++) {
        snake[i].y--;
        setGridCoordinates(snake[i].squareDiv, snake[i].x, snake[i].y);
    }
}

function stopGame() {
    run = false;
}

function startGame() {
    run = true;
    createSnakeSquareDiv(xInitialCoordinate, yInitialCoordinate);

    setInterval(() => {
        if(run) {
            moveForward(snake);
        } 
        else {
            clearInterval();
        }
    }, velocity);
}