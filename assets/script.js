const h1 = document.getElementById('h1');
const p = document.getElementById('p')
const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const scoreContainer = document.getElementById('score-container');
const timerContainer = document.getElementById('timer-container');
const initialsInput = document.getElementById('initials');
const submitScoreButton = document.getElementById('submit-score');
const goBackContainer = document.getElementById('goback-container');
const goBackButton = document.getElementById('go-back');
const result = document.getElementById('rss');


let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60; // Set the initial timer value

const questions = [
    {
      question: 'What is JavaScript?',
      options: ['A programming language', 'A type of coffee', 'A vegetable'],
      correctAnswer: 'A programming language'
    },
    {
        question: 'Commonly used data types DO NOT include',
        options: ['strings', 'booleans', 'alerts','numbers'],
        correctAnswer: 'alerts'
      },
      {
        question: 'The condition in an if/else statement is enclosed within?',
        options: ['quotes', 'curly brackets', 'parentheses','square brackets'],
        correctAnswer: 'parentheses'
      },  
      {
        question: 'String values must be enclosed within_____when assigned to variables',
        options: ['commas', 'curly brackets', 'parentheses','quotes'],
        correctAnswer: 'quotes'
      },
  ];

  
  startButton.addEventListener('click', startQuiz);
  submitScoreButton.addEventListener('click', saveScore);

  function startQuiz() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    scoreContainer.classList.add('hide');
    timerContainer.classList.remove('hide');
    h1.innerText ='';
    p.innerText = '';
    timeLeft = 60; // Reset timer
    startTimer();
    showNextQuestion();
  }

  function startTimer() {
    timer = setInterval(function () {
      timeLeft--;
      if (timeLeft <= 0) {
        endQuiz();
      }
      updateTimerDisplay();
    }, 1000);
  }

  function updateTimerDisplay() {
    document.getElementById('timer-text').innerText = 'Time: ' + timeLeft + 's';
  }

  function showNextQuestion() {
    resetOptions();
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      document.getElementById('question-text').innerText = currentQuestion.question;
      currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
      });
    } else {
      endQuiz();
    }
  }

  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      rss.innerText = 'Correct';  
      score += 10; // Increase score for correct answer
    } 
    else {  
      if (timeLeft >= 10){
        timeLeft -= 10;
      }
      else{
        endQuiz();
      }
    }
    currentQuestionIndex++;

    showNextQuestion();
  }

  function resetOptions() {
    while (optionsContainer.firstChild) {
      optionsContainer.removeChild(optionsContainer.firstChild);
    }  
  }

  function endQuiz() {
    clearInterval(timer);
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreContainer.classList.remove('hide');
    updateResultDisplay();
  }

  function updateResultDisplay() {
    document.getElementById('result-text').innerText = 'Your final score is: ' + score;
  }

  function saveScore() {
    const initials = initialsInput.value.toUpperCase();
    if (initials) {
      //alert('Score saved!');
      highScore(initials);
      window.location.href = "finalscore.html"
    } else {
      alert('Please enter initials.');
    }
  }

  var lst = [];
  function highScore(initials){
    var final_score = {initials: initials,
    score: score}
    lst = JSON.parse(localStorage.getItem("user_score"))||[];
    lst.push(final_score);
    localStorage.setItem("user_score",JSON.stringify(lst));
  }