const stopButton = document.querySelector('.stop');
const startButton = document.querySelector('.start');
const gameContainer = document.querySelector('.gameContainer')
const xInitialCoordinate = 13;
const yInitialCoordinate = 13;

let run;
let velocity = 300;
let snake = [];
let direction;
let food;
let foodEaten;

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

class Food {
    constructor(foodDiv, x, y) {
        this.div = foodDiv;
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

// Coordinates funtions
function randomCoordinate() {
    ranCoordinate = Math.floor((Math.random() * 25) + 1);
    return ranCoordinate;
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

function createFoodSquareDiv(x, y) {
    let foodSquareDiv = document.createElement('div');

    foodSquareDiv.classList.add('foodCoordinate');
    setGridCoordinates(foodSquareDiv, x, y);
    gameContainer.appendChild(foodSquareDiv);

    food = new Food(foodSquareDiv, x, y);
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
    startButton.classList.add('inactive');
    createSnakeSquareDiv(xInitialCoordinate, yInitialCoordinate);
    
    let ran1 = randomCoordinate();
    let ran2 = randomCoordinate();
    createFoodSquareDiv(ran1, ran2);

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
            if (snake[0].x == food.x && snake[0].y == food.y){
                console.log('collision!!!');
                foodEaten = true;
            }
        } 
        else {
            clearInterval();
        }
    }, velocity);
}