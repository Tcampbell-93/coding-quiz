var timerElement = document.querySelector(".timer");
var questions = document.querySelector(".questions");
var answerColumn = document.querySelector(".answers");
var startButton = document.querySelector(".start-button");
var grade = document.querySelector(".correct-incorrect");
var highScoreForm = document.getElementById("high-score-form");
var highScores = document.querySelector(".high-score");

highScores.style.visibility = "hidden";

var timer;
var timerCount;

var firstQuestion = "What method do you use to grab a single class from html?"
var firstAnswers = [
    ".getElementById", 
    ".querySelectorAll", 
    ".querySelector", 
    ".createElement"
];

var secondQuestion = "What method do you use to grab every element from html?";
var secondAnswers = [
    ".getElementById()", 
    ".querySelectorAll()", 
    ".querySelector()", 
    ".createElement()"
];

var thirdQuestion = "What method would you use to grab an element by it's id from html?";
var thirdAnswers = [
    ".getElementById()", 
    ".querySelectorAll()", 
    ".querySelector()", 
    ".createElement()"
];

var fourthQuestion = "What method would you use to create a button using JS?";
var fourthAnswers = [
    ".getElementById()", 
    ".querySelectorAll()", 
    ".querySelector()", 
    ".createElement()"
];

var fifthQuestion = "What method would you use to add an element to the end of an array?";
var fifthAnswers = [
    ".sort()",
    ".log()",
    ".split()",
    ".push()"
];

function startQuiz() {
    timerCount = 180;
    startButton.style.display = "none";
    startTimer ();
    changeQuestions();
    changeAnswers();
};

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;

        if (timerCount <= 0) {
            clearInterval(timer);
            var startOver = confirm("You ran out of time, would you like to start over?");
            if (startOver = true) {
                startQuiz();
            }else{
                location.reload();
            }
        };
    },1000);
};

var currentQuestion = 1;

function changeQuestions() {
  if (currentQuestion === 1) {
    questions.textContent = firstQuestion;
  } else if (currentQuestion === 2) {
    questions.textContent = secondQuestion;
  } else if (currentQuestion === 3) {
    questions.textContent = thirdQuestion;
  } else if (currentQuestion === 4) {
    questions.textContent = fourthQuestion;
  } else if (currentQuestion === 5) {
    questions.textContent = fifthQuestion;
  }
}

var correct = [
  firstAnswers[2],
  secondAnswers[1],
  thirdAnswers[0],
  fourthAnswers[3],
  fifthAnswers[3]
];

function changeAnswers() {
  answerColumn.innerHTML = ""; // Clear previous answers
  var answers;
  var correctAnswer;
  if (currentQuestion === 1) {
    answers = firstAnswers;
    correctAnswer = correct[currentQuestion - 1];
  } else if (currentQuestion === 2) {
    answers = secondAnswers;
    correctAnswer = correct[currentQuestion - 1];
  } else if (currentQuestion === 3) {
    answers = thirdAnswers;
    correctAnswer = correct[currentQuestion - 1];
  } else if (currentQuestion === 4) {
    answers = fourthAnswers;
    correctAnswer = correct[currentQuestion - 1];
  } else if (currentQuestion === 5) {
    answers = fifthAnswers;
    correctAnswer = correct[currentQuestion - 1];
  }

  for (var i = 0; i < answers.length; i++) {
    var answersEl = document.createElement("li");

    var radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "answer";
    radioInput.value = answers[i];

    var label = document.createElement("label");
    label.textContent = answers[i];

    answersEl.appendChild(radioInput);
    answersEl.appendChild(label);

    answerColumn.appendChild(answersEl);

    radioInput.addEventListener("change", function(event) {
      var selectedAnswer = event.target.value;
      if (selectedAnswer === event.target.correctAnswer) {
        grade.textContent = "Correct!";
      } else {
        timerCount -= 15;
        grade.textContent = "Incorrect";
      }
    });

    radioInput.correctAnswer = correctAnswer;
  }
}

function nextQuestion() {
  var selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    var userAnswer = selectedAnswer.value;
    var correctAnswer = correct[currentQuestion - 1];
    if (userAnswer === correctAnswer) {
      grade.textContent = "Correct!";
    } else {
      timerCount -= 15;
      grade.textContent = "Incorrect";
    }
    selectedAnswer.checked = false;
    currentQuestion++;
    if (currentQuestion > 5) {
      answerColumn.style.display = "none";
      questions.style.display = "none";
      highScores.style.visibility = "visible";
      displayHighScores();
      return;
    }
    changeQuestions();
    changeAnswers();
  }
}

highScoreForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var nameInput = document.getElementById('name');
  var scoreInput = document.getElementById('score');
  var name = nameInput.value;
  var score = timerCount; 

  var highScore = {
    name: name,
    score: score
  };

  var highScores = localStorage.getItem('highScores');
  if (!highScores) {
    highScores = [];
  } else {
    highScores = JSON.parse(highScores);
  }

  highScores.push(highScore);

  localStorage.setItem('highScores', JSON.stringify(highScores));

  nameInput.value = '';
  scoreInput.value = '';

  displayHighScores();
});

const highScoresLink = document.querySelector('a.high-scores-link');

highScoresLink.addEventListener('click', function(event) {
  event.preventDefault();

  displayHighScores();
});

function displayHighScores() {

  answerColumn.style.visibility = "hidden";
  questions.style.visibility = "hidden";
  startButton.style.visibility = "hidden";

  var highScores = localStorage.getItem('highScores');

  var highScoresArray = JSON.parse(highScores) || [];

  if (highScoresArray.length > 0) {
    highScoresArray.sort((a, b) => b.score - a.score);
  }

  var highScoresList = document.querySelector('.high-score-list');
  highScoresList.innerHTML = '';

  for (var i = 0; i < highScoresArray.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = `${highScoresArray[i].name}: ${highScoresArray[i].score}`;
    highScoresList.appendChild(listItem);
  }
  highScores.style.visibility = "visible";
}

startButton.addEventListener("click", startQuiz);
answerColumn.addEventListener("click", nextQuestion);
