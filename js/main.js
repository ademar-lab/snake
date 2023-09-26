const stopButton = document.querySelector('.stop');
const startButton = document.querySelector('.start');
const gameContainer = document.querySelector('.gameContainer')
const xInitialCoordinate = 13;
const yInitialCoordinate = 13;

let run;

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);

function displaySnake(x, y) {
    let snakeSquare = document.createElement('div');
    snakeSquare.classList.add('activeCoordinate');
    setGridCoordinates(snakeSquare, x, y);
    gameContainer.appendChild(snakeSquare);
}

function setGridCoordinates(square, x, y) {
    square.style.gridRow = `${x}`;
    square.style.gridColumn = `${y}`;
}

function stopGame() {
    run = false;
}

function startGame() {
    run = true;
    displaySnake(xInitialCoordinate, yInitialCoordinate);

    setInterval(() => {
        if(run) {
            console.log('Running');
        } 
        else {
            clearInterval();
        }
    }, 1000);
}