
let questionsStore = JSON.parse(localStorage.getItem('questions'));

let start = document.getElementById('start');
let startContainer = document.getElementById('start-container');
let quizBox = document.getElementById('quiz-box');
let quizTitle = document.getElementById('quiz-title');
let next = document.getElementById('next');
let displayContainer = document.getElementById('display-container');
let options = Array.from(document.getElementsByClassName('option'));
let restartBlock = document.getElementById('restart-block');
let restart = document.getElementById('restart');
let skip = document.getElementById('skip')
let c = document.getElementById('current');
let t = document.getElementById('total');
let lose = document.getElementById('lose');
let won = document.getElementById('won');
let congratulation = document.getElementById('congratulation')
let initialTotalScore = 0;
let initialCurrentScore = 100;
const RESULT_TO_WIN = 1000000;
const X2 = 2;
let repeated = [];

function initialStart() {
    c.textContent = initialCurrentScore;
    t.textContent = initialTotalScore;
    getQuiestion();
    skip.style.display='none'
    skip.style.display='block'
}
function isWon(result) {
    if (result >= RESULT_TO_WIN) {
        quizBox.style.display = 'none';
        restart.style.display = 'none'
        congratulation.style.display ='block';
        won.innerHTML = t.textContent;
    }
}
function skipQuestion() {
    skip.addEventListener('click', () => {
        getQuiestion();
        skip.style.display='none'
    })
}
function increaseScore (currentScore) {
    let current = parseInt(currentScore);
    let totalScore = parseInt(t.textContent);
    let sum = current + totalScore;
    t.textContent = sum;
    let multiply = current * X2;
    c.textContent = multiply;
}
function showQuestion (b , n) {
    displayContainer.style.display = b;
    quizTitle.style.display = b;
    next.style.display = n;
}
function showNext (n, b) {
    displayContainer.style.display = n;
    quizTitle.style.display = n;
    next.style.display = b;
    skip.style.display='none'
}

function randomQuestion(array) {
    for (let i = array.length; i--; ) {
        return array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }
}
function getQuiestion() {
    let received = randomQuestion(questionsStore);
    /* let received = questionsStore[Math.floor(Math.random()*questionsStore.length)];  */
    console.log(questionsStore)
    console.log(received); 
    quizTitle.textContent = received.question;
    showQuestion('block', 'none');
    for (let i = 0; i < options.length; i++) {
        for (let k = 0; k < received.content.length; k++) {
            options[k].textContent = received.content[k];
        }
    }
    skipQuestion()
    isCorrect(received.correct);
}
function isCorrect(cor) {
    displayContainer.onclick = () => {
        if (parseInt(event.target.dataset.index) === cor) {
            showNext('none', 'block');
            increaseScore(c.textContent);
            isWon(t.textContent)
        } else {
            quizBox.style.display = 'none'
            restartBlock.style.display = 'block';
            lose.textContent = t.textContent;
        }
    }
}   
start.addEventListener('click', () => {
    startContainer.style.display = 'none';
    quizBox.style.display = 'block';
    initialStart();
});
function reload () {
    window.location.reload() ;
}
restart.addEventListener('click', () => {
    startContainer.style.display = 'none';
    quizBox.style.display = 'block';
    reload()
});
next.addEventListener('click', () => {
    getQuiestion(); 
});