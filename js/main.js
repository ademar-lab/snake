const stopButton = document.querySelector('.stop');
const pauseParagraph = document.querySelector('.pause')
const startButton = document.querySelector('.startButton');
const startMenu = document.querySelector('.startMenu');
const runningContent = document.querySelector('.runningContent');
const gameContainer = document.querySelector('.gameContainer');
const upButton = document.querySelector('.up');
const downButton = document.querySelector('.down');
const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');
const xInitialCoordinate = 13;
const yInitialCoordinate = 13;

let run;
let velocity = 180;
let snake = [];
let direction;
let food;
let foodEaten;
let xRan = randomCoordinate();
let yRan = randomCoordinate();

// Default direction
direction = 'ArrowUp';

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
window.addEventListener("keydown", (e) => {
    if (e.key == ' ') {
        stopGame();
    } else {
        direction = e.key;
    }
});
upButton.addEventListener("click", () => {direction = 'ArrowUp'});
downButton.addEventListener("click", () => {direction = 'ArrowDown'});
leftButton.addEventListener("click", () => {direction = 'ArrowLeft'});
rightButton.addEventListener("click", () => {direction = 'ArrowRight'});

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
        snake[0].y--;
        setGridCoordinates(snake[0].squareDiv, snake[0].x, snake[0].y);
}
function moveDown(snake) {
        snake[0].y++;
        setGridCoordinates(snake[0].squareDiv, snake[0].x, snake[0].y);
}
function moveRight(snake) {
        snake[0].x++;
        setGridCoordinates(snake[0].squareDiv, snake[0].x, snake[0].y);
}
function moveLeft(snake) {
        snake[0].x--;
        setGridCoordinates(snake[0].squareDiv, snake[0].x, snake[0].y);    
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

function createNewFood() {
    xRan = randomCoordinate();
    yRan = randomCoordinate();

    if(food) {
        setGridCoordinates(food.div, xRan, yRan);
        food.x = xRan;
        food.y = yRan;
    } else {
        let foodSquareDiv = document.createElement('div');

        foodSquareDiv.classList.add('foodCoordinate');
        setGridCoordinates(foodSquareDiv, xRan, yRan);
        gameContainer.appendChild(foodSquareDiv);
    
        food = new Food(foodSquareDiv, xRan, yRan);
    }
}

function setGridCoordinates(squareDiv, x, y) {
    squareDiv.style.gridRow = `${y}`;
    squareDiv.style.gridColumn = `${x}`;
}

function stopGame() {
    if(run) {
        run = false;
        pauseParagraph.textContent = 'Play';
    } else {
        run = true;
        pauseParagraph.textContent = 'Pause';
    }
}

function startGame() {
    let eatenFoodX;
    let eatenFoodY;

    run = true;
    startMenu.classList.add('inactive');
    runningContent.classList.remove('inactive');

    createSnakeSquareDiv(xInitialCoordinate, yInitialCoordinate);
    createNewFood();

    setInterval(() => {
        if(run) {
            console.log('running');
            startMenu.classList.add('inactive');

            // if (snake.length > 1 && snake.length < 3) {
            //         snake[snake.length-1].x = snake[snake.length-2].x;
            //         snake[snake.length-1].y = snake[snake.length-2].y;
            //         setGridCoordinates(snake[snake.length-1].squareDiv, snake[snake.length-1].x, snake[snake.length-1].y)
            // }

            if (snake.length > 1) {
                for (let i = snake.length-1; i > 0 ; i--) {
                    snake[i].x = snake[i-1].x;
                    snake[i].y = snake[i-1].y;
                    setGridCoordinates(snake[i].squareDiv, snake[i].x, snake[i].y)
                }
            }

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
                default :
                    break;
            }

            if (foodEaten) {
                createSnakeSquareDiv(eatenFoodX, eatenFoodY);
                foodEaten = false;
            }

            if (snake[0].x == food.x && snake[0].y == food.y){
                console.log('collision!!!');
                eatenFoodX = snake[snake.length-1].x;
                eatenFoodY = snake[snake.length-1].y;

                createNewFood();
                foodEaten = true;
            }
        } 
        else {
            clearInterval();
        }
    }, velocity);
}