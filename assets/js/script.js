// global variables
var index = 0;
var score = 0;
var myQuestions = [];

// questions for quiz

var questionSection = document.getElementById('questionSection');

var myQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
       "strings",
       "booleans",
       "alerts",
       "numbers",
    ],
    correctAnswer: "booleans"
  },
  {
    question: "The condition in an if / else statement is enclosed within _______:",
    answers: [
       "quotes",
       "curly brackets",
       "parantheses",
       "square brackets",
    ],
    correctAnswer: "parantheses"
  },
  {
    question: "Arrays in JavaScript can be used to store _______:",
    answers: [
       "numbers and strings",
       "other arrays",
       "booleans",
       "all of the above",
    ],
    correctAnswer: "all of the above"
  },
  {
    question: "String values must be enclosed within _________ when being assigned to variables.",
    answers: [
      "commas",
      "curly brackets",
      "quotes",
      "parantheses",
    ],
    correctAnswer: "quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "JavaScript",
      "terminal/bash",
      "for loops",
      "console log",
    ],
    correctAnswer: "console log"
  },

];

// function for setting up of quiz

var startSection = document.getElementById('quiz');

function startQuiz() {
  timer = setInterval(countDown, 1000);
  startSection.classList.add("hidden");
  questionSection.classList.remove("hidden");
  buildQuiz ();
  
}

//function for timer
var counter = document.getElementById('counter');
var timer;
// set initial timer for 75 seconds
var time = 75;
var current = myQuestions[index];
// elements for 'submit button' in case time runs out
var questionEl = document.getElementById('question');
var answersEl = document.getElementById('answers');
var submitBtnEl = document.getElementById('submitBtn');

function countDown () {
  var initialsFormEl = document.getElementById('initials-form');
  var submitBtnEl = document.getElementById('submitBtn');
  time-- 
  counter.textContent = time
    if (time >= 0) {
      counter.textContent = "time remaining: " + time;
      time - - 1;
      initialsFormEl.style.display = 'none';
      submitBtnEl.style.display = 'none';
    }
    else {
      // removes questions from array and shows 'enter initials' and 'submit button'
      counter.textContent = "Womp! Womp!";
      clearInterval (timer);
      questionEl.innerHTML = "Time's up!";
      answersEl.innerHTML = "Your final score is " + score;
      prevAnswer.innerHTML = "Enter initials:"
      initialsFormEl.style.display = 'block';
      submitBtnEl.style.display = 'block';
    }
}


// function for quiz

function buildQuiz() {
  var current = myQuestions[index];
  var questionEl = document.getElementById('question');
  var answersEl = document.getElementById('answers');
  var initialsFormEl = document.getElementById('initials-form');
  var submitBtnEl = document.getElementById('submitBtn');
  questionEl.innerHTML = ""
  answersEl.innerHTML = ""
  initialsFormEl.style.display = 'none';
  submitBtnEl.style.display = 'none';
  questionEl.textContent = current.question
  current.answers.forEach (function (answer, i){

  //button to click to answer question
  var aBtn = document.createElement("button")
  aBtn.textContent = answer
  aBtn.onclick = checkAnswer
  answersEl.appendChild(aBtn)
  })
}

  //function for what to do if answer is right or wrong

  var resultsContainer = document.getElementById('results');

  function checkAnswer () {
    var current = myQuestions[index];
    if (current.correctAnswer === this.textContent) {
      // send feedback for correct answer
      score++;
      prevAnswer.textContent = "Correct";
    }
    else {
      time -= 10
      prevAnswer.textContent = "Wrong";
    }
    index++ 
    if (index < myQuestions.length) {
      buildQuiz ();
    } 
    else {
      myResults ();
    }
  };


  // displays final score 

  function myResults() {
    var initialsFormEl = document.getElementById('initials-form');

    questionEl.innerHTML = "All done! Your final score is " + score;
    answersEl.innerHTML = "Enter initials:"
    prevAnswer.innerHTML = ""
    initialsFormEl.style.display = 'block';
    submitBtnEl.style.display = 'block';
    clearInterval (timer);
  }

// function for displaying list of highscores

function highScoreList() {
  var initialsFormEl = document.getElementById('initials-form');
  var submitBtnEl = document.getElementById('submitBtn');

  questionEl.innerHTML = "High Scores";
  answersEl.innerHTML = ""
  prevAnswer.innerHTML = ""
  initialsFormEl.style.display = 'none';
  submitBtnEl.style.display = 'none';
}

// submit player scores and initials to local storage


function submitScoreFormHandler (event) {
  event.preventDefault
  let highScoreArray = []
  var playerScore = score;  
  var initialsFormEl = document.getElementById('initials');
  var playerInitials = initialsFormEl.value;
  console.log(playerInitials);
  var highScore = localStorage.getItem("highscore");
  var previousScores = JSON.parse(localStorage.getItem('scores'));

 if (previousScores === null) {
    highScoreArray.push({score: playerScore, initials: playerInitials});
    localStorage.setItem('scores', JSON.stringify(highScoreArray));
 }
else {
  highScoreArray = previousScores;
  highScoreArray.push({score: playerScore, initials: playerInitials});
  localStorage.setItem('scores', JSON.stringify(highScoreArray));
}

var questionSection = document.getElementById("questionSection");
questionSection.classList.add("hidden");

var highScoreSection = document.getElementById("highScore");
highScoreSection.classList.remove("hidden");
var allScores = document.getElementById("all-scores")
allScores.innerHTML= "";

highScoreArray.sort((a, b) => b.score- a.score);
highScoreArray.forEach(function (score){
  var p = document.createElement("p")
  p.textContent = score.initials + " - " + score.score;
  allScores.appendChild (p);
})
}

var showHighScores = function () {
  var highScoreArray = JSON.parse(localStorage.getItem('scores'));
  var startSection = document.getElementById("quiz");
  startSection.classList.add("hidden");

  var highScoreSection = document.getElementById("highScore");
  highScoreSection.classList.remove("hidden");
  var allScores = document.getElementById("all-scores")
  allScores.innerHTML= "";

  highScoreArray.sort((a, b) => b.score- a.score);
  highScoreArray.forEach(function (score){
  var p = document.createElement("p")
  p.textContent = score.initials + " - " + score.score;
  allScores.appendChild (p);
})
}
  
var restartQuiz = function () {
  index = 0;
  score = 0;
  time = 75;
  counter.textContent = "time remaining: " + time;

  var startSection = document.getElementById("quiz");
  startSection.classList.remove("hidden");
  
  var highScoreSection = document.getElementById("highScore");
  highScoreSection.classList.add("hidden");
}

// start quiz by clicking on start button

var startButton = document.getElementById('startBtn');

startButton.onclick= startQuiz

// submit initials by clickick on submit button

var submitBtnEl = document.querySelector("#submitBtn");
submitBtnEl.addEventListener("click", submitScoreFormHandler);

var restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", restartQuiz);

var viewHighScores = document.querySelector(".high-scores");
viewHighScores.addEventListener("click", showHighScores);