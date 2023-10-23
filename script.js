// Declare and initialize variables that reference the main quiz and related DOM elements, 
// including sections, buttons, input fields, and displayed scores and initials.

var quizSection = document.getElementById("quiz");
var resultElement = document.getElementById("result");
var scoreElement = document.getElementById("finalScore");
var gameOverSection = document.getElementById("gameover");
var questionElement = document.getElementById("questions");
var timerElement = document.getElementById("timer");
var quizBodyStyleDisplay = "none";
var startButton = document.getElementById("startbtn");
var startPageSection = document.getElementById("startpage");
var highscoreSection  = document.getElementById("highscoreContainer");
var highscorePage = document.getElementById("high-scorePage");
var initialsInput = document.getElementById("initials");
var displayedInitials = document.getElementById("highscore-initials");
var endButtons = document.getElementById("endGameBtns");
var saveScoreButton = document.getElementById("proposeScore");
var displayedScore = document.getElementById("highscore-score");
var answerButtonA = document.getElementById("a");
var answerButtonB = document.getElementById("b");
var answerButtonC = document.getElementById("c");
var answerButtonD = document.getElementById("d");

// Object of quiz questions

var quizQuestions = [
    {
      question: "Which of the following is a semantic HTML element?",
      optionA: "div",
      optionB: "span",
      optionC: "article",
      optionD: "b",
      correctAnswer: "c"
    },
    {
      question: "Which CSS property is used to set the background color of an element?",
      optionA: "color",
      optionB: "bgcolor",
      optionC: "background-color",
      optionD: "background",
      correctAnswer: "c"
    },
    {
      question: "Which JavaScript method can be used to select an element by its ID?",
      optionA: "getById()",
      optionB: "selectElement()",
      optionC: "query()",
      optionD: "getElementById()",
      correctAnswer: "d"
    },
    {
      question: "Which of the following is not a valid HTTP request method?",
      optionA: "GET",
      optionB: "SEND",
      optionC: "POST",
      optionD: "PUT",
      correctAnswer: "b"
    },
    {
      question: "Which of these is not a common data type in JavaScript?",
      optionA: "string",
      optionB: "boolean",
      optionC: "float",
      optionD: "undefined",
      correctAnswer: "c"
    },
    {
      question: "Which CSS property allows you to create rounded corners?",
      optionA: "border-radius",
      optionB: "border-corner",
      optionC: "corner-radius",
      optionD: "round-corner",
      correctAnswer: "a"
    },
    {
      question: "Which HTML5 tag is used to embed a video in a webpage?",
      optionA: "movie",
      optionB: "media",
      optionC: "embed",
      optionD: "video",
      correctAnswer: "d"
    }
  ];
  
// Alternative global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// This function iterates over the array of quiz questions and populates the corresponding question and answer choices.

function generateQuizQuestion(){
    gameOverSection.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.innerHTML = "<p>" + currentQuestion.question + "</p>";
    answerButtonA.innerHTML = currentQuestion.optionA;
    answerButtonB.innerHTML = currentQuestion.optionB;
    answerButtonC.innerHTML = currentQuestion.optionC;
    answerButtonD.innerHTML = currentQuestion.optionD;
};

// The startQuiz function initializes the timer, conceals the start button, and presents the initial quiz question.

function startQuiz(){
    gameOverSection.style.display = "none";
    startPageSection.style.display = "none";
    generateQuizQuestion();

    // Initialize and start the countdown timer. Once it reaches zero, the quiz score will be displayed.

    timerInterval = setInterval(function() {
        timeLeft--;
        timerElement.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
      quizSection.style.display = "block";

}
// This function displays the final screen, showing the user's score after they've finished the quiz or when the timer expires.

function showScore(){
    quizSection.style.display = "none";
    gameOverSection.style.display = "flex";
    clearInterval(timerInterval);
    initialsInput.value = "";
    scoreElement.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// When the submit button is clicked, the highscore function is triggered. This function converts the existing high scores in local storage into a string format and adds the new user's name and score to the stored array. Afterwards, the high scores display function is executed.

saveScoreButton.addEventListener("click", function highscore(){
    
    
    if(initialsInput.value === "") 
    {
        alert("Initials cannot be blank");
        return false;
    }
    else
    {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = initialsInput.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameOverSection.style.display = "none";
        highscoreSection .style.display = "flex";
         highscorePage.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function resets the high scores list and then populates it with updated data from local storage.

function generateHighscores(){
    displayedInitials.innerHTML = "";
    displayedScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        displayedInitials.appendChild(newNameSpan);
        displayedScore.appendChild(newScoreSpan);
    }
}

// This function resets the high scores list and then populates it with updated data from local storage.

function showHighscore(){
    startPageSection.style.display = "none"
    gameOverSection.style.display = "none";
    highscoreSection .style.display = "flex";
     highscorePage.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function removes the high scores from local storage and also resets the text displayed on the high score board.

function clearScore(){
    window.localStorage.clear();
    displayedInitials.textContent = "";
    displayedScore.textContent = "";
}

// This function resets all variables to their default values and displays the home page, allowing the quiz to be replayed.

function replayQuiz(){
    highscoreSection .style.display = "none";
    gameOverSection.style.display = "none";
    startPageSection.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function evaluates the user's answer choice for each question.

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();

        // Show in the results section that the selected answer is right.

    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();

        // Indicate in the results section that the selected answer is incorrect.

    }else{
        showScore();
    }
}

// When this button is clicked, the quiz begins.
startButton.addEventListener("click",startQuiz);