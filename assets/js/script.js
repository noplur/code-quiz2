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
// set initial timer for 60 seconds
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
    // console.log (current);
    if (current.correctAnswer === this.textContent) {
      // send feedback for correct answer
      score++;
      prevAnswer.textContent = "Correct";
      // window.confirm("correct");
    }
    else {
      time -= 10
      prevAnswer.textContent = "Wrong";
      // window.confirm("wrong");
    }
    // console.log(this.textContent);
    index++ 
    if (index < myQuestions.length) {
      buildQuiz ();
    } 
    else {
      myResults ();
    }
  };

  // function for once all questions have been answered

  var resultsSection = document.getElementById('results');
  var initialsFormEl = document.getElementById('initials-form');

  // displays final score 
  function myResults() {
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
  // clearInterval (timer);
}

// submit player scores and initials to local storage
var playerScore = score;  //find and replace what is 'score'
var playerInitials = initialsFormEl; //find and replace what is 'initial'
var highScore = localStorage.getItem("highscore");

function submitScoreFormHandler (event) {
  event.preventDefault
  let highScoreArray = []
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
}
  


  
// check localStorage for high score, if it's not there, use 0
// if (highScore === null) {
//   highScore = 0;
// }

  // if (playerScore > highScore) {
  //   localStorage.setItem("player-score", playerScore);
  //   localStorage.setItem("player-initials", playerInitials);
  // }
// }

// start quiz by clicking on start button

var startButton = document.getElementById('startBtn');

startButton.onclick= startQuiz

// submit initials by clickick on submit button

var submitBtnEl = document.querySelector("#submitBtn");
submitBtnEl.addEventListener("click", submitScoreFormHandler);

// submitButton.onclick= highScoreList;

// submitButton.onclick= startQuiz