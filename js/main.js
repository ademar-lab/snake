const stopButton = document.querySelector('.stop');
const startButton = document.querySelector('.start');
const gameContainer = document.querySelector('.gameContainer')
const xInitialCoordinate = 13;
const yInitialCoordinate = 13;

let run;
let velocity = 300;
let snake = [];
let direction;
// Default direction
direction = 'ArrowUp';

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
window.addEventListener("keydown", (e) => {direction = e.key });

class SnakeSquare {
    constructor(squareDiv, x, y) {
        this.squareDiv = squareDiv;
        this.x = x;
        this.y = y;
    }
}

// Motion functions
function moveUp(snake) {
    for (let i = 0; i < snake.length; i++) {
        snake[i].y--;
        setGridCoordinates(snake[i].squareDiv, snake[i].x, snake[i].y);
    }
}
function moveDown(snake) {
    for (let i = 0; i < snake.length; i++) {
        snake[i].y++;
        setGridCoordinates(snake[i].squareDiv, snake[i].x, snake[i].y);
    }
}
function moveRight(snake) {
    for (let i = 0; i < snake.length; i++) {
        snake[i].x++;
        setGridCoordinates(snake[i].squareDiv, snake[i].x, snake[i].y);
    }
}
function moveLeft(snake) {
    for (let i = 0; i < snake.length; i++) {
        snake[i].x--;
        setGridCoordinates(snake[i].squareDiv, snake[i].x, snake[i].y);
    }
}

// General functions
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

function stopGame() {
    run = false;
}

function startGame() {
    run = true;
    createSnakeSquareDiv(xInitialCoordinate, yInitialCoordinate);

    setInterval(() => {
        if(run) {
            console.log('running');
            switch (direction) {
                case 'ArrowDown':
                    moveDown(snake);
                    break;
                case 'ArrowUp':
                    moveUp(snake);
                    break;
                case 'ArrowLeft':
                    moveLeft(snake);
                    break;
                case 'ArrowRight':
                    moveRight(snake);
                    break;
            }
        } 
        else {
            clearInterval();
        }
    }, velocity);
}