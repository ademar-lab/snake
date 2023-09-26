const stopButton = document.querySelector('.stop');
const startButton = document.querySelector('.start');
let run;

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);

function stopGame() {
    run = false;
}

function startGame() {
    run = true;
    setInterval(() => {
        if(run) {
            console.log('Running');
        } 
        else {
            clearInterval();
        }
    }, 1000);
}