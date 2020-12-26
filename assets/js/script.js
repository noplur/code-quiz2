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
    // displays questions as timer counts down
    if (time >= 0) {
      counter.textContent = "time remaining: " + time;
      time - - 1;
      initialsFormEl.style.display = 'none';
      submitBtnEl.style.display = 'none';
    }
    else {
      // removes questions from array and shows 'enter initials' and 'submit button' if timer runs out
      counter.textContent = "Womp! Womp!";
      clearInterval (timer);
      questionEl.innerHTML = "Time's up!";
      answersEl.innerHTML = "Your final score is " + time;
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
  // displays question
  questionEl.innerHTML = ""
  // displays grid of answers
  answersEl.innerHTML = ""
  // hides initials form
  initialsFormEl.style.display = 'none';
  // hides submit button
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

  function checkAnswer () {
    var current = myQuestions[index];
    if (current.correctAnswer === this.textContent) {
      // send feedback for correct answer
      prevAnswer.textContent = "Correct";
    }
    else {
      // removes 10 seconds from timer
      time -= 10
      // send feedback for wrong answer
      prevAnswer.textContent = "Wrong";
    }
    //  move on to next question
    index++ 
    if (index < myQuestions.length) {
      // repeat function for quiz
      buildQuiz ();
    } 
    else {
      // what to do when last question of quiz has been answered
      myResults ();
    }
  };

  // displays final score 
  function myResults() {
    var initialsFormEl = document.getElementById('initials-form');
    // displays final score as time remainding
    questionEl.innerHTML = "All done! Your final score is " + time;
    // asks to enter initials
    answersEl.innerHTML = "Enter initials:"
    // hides notice displaying whether previous answer was correct or wrong
    prevAnswer.innerHTML = ""
    // displays form to enter initials
    initialsFormEl.style.display = 'block';
    // displays submit button
    submitBtnEl.style.display = 'block';
    // stops the timer
    clearInterval (timer);
  }

// submit player scores, initials to local storage and displays high scores

function submitScoreFormHandler (event) {
  event.preventDefault
  let highScoreArray = []
  var playerScore = time;  
  var initialsFormEl = document.getElementById('initials');
  var playerInitials = initialsFormEl.value;
  var highScore = localStorage.getItem("highscore");
  var previousScores = JSON.parse(localStorage.getItem('scores'));

// parses return value, assigns new variable to array, pushes new score into array, updates local storage with new array
 if (previousScores === null) {
    highScoreArray.push({score: playerScore, initials: playerInitials});
    // stringify updated array with new score
    localStorage.setItem('scores', JSON.stringify(highScoreArray));
 }
else {
  highScoreArray = previousScores;
  highScoreArray.push({score: playerScore, initials: playerInitials});
  localStorage.setItem('scores', JSON.stringify(highScoreArray));
}

// hides question section when high scores are displayed
var questionSection = document.getElementById("questionSection");
questionSection.classList.add("hidden");

// displays highScore section
var highScoreSection = document.getElementById("highScore");
highScoreSection.classList.remove("hidden");

// displays all the scores
var allScores = document.getElementById("all-scores")
allScores.innerHTML= "";

// adds numeric list order value in front of all the scores
var sortNumber = 1;

highScoreArray.sort((a, b) => b.score- a.score);
highScoreArray.forEach(function (score){
  var p = document.createElement("p")
  p.textContent = sortNumber++ + ". " + score.initials + " - " + score.score;
  allScores.appendChild (p);
})
}

// function to display highscores when "view highscores" at top of page is clicked
var showHighScores = function () {
  var highScoreArray = JSON.parse(localStorage.getItem('scores'));
  var startSection = document.getElementById("quiz");
  startSection.classList.add("hidden");

  var highScoreSection = document.getElementById("highScore");
  highScoreSection.classList.remove("hidden");
  var allScores = document.getElementById("all-scores")
  allScores.innerHTML= "";

  var sortNumber = 1;

  highScoreArray.sort((a, b) => b.score- a.score);
  highScoreArray.forEach(function (score){
  var p = document.createElement("p")
  p.textContent = sortNumber++ + ". " + score.initials + " - " + score.score;
  allScores.appendChild (p);
})
}

// function to clear highscores when "clear highscores" button is clicked
var clearHighScores = function () {
  // hides "all-scores" div
  var allScores = document.getElementById("all-scores")
  allScores.innerHTML= "";
}
 
//function to restart quiz when "go back" button is clicked
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

// restart quiz by clicking on go back button
var restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", restartQuiz);

// view list of high scores by clicking on view highscores button
var viewHighScores = document.querySelector(".high-scores");
viewHighScores.addEventListener("click", showHighScores);

// clear high scores by click on clear highscores button
var clearScoresBtn = document.querySelector("#clear-scores");
clearScoresBtn.addEventListener("click", clearHighScores);