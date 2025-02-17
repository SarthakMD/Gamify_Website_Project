const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultSection = document.getElementById('result-section');
const scoreElement = document.getElementById('score');
const analysisElement = document.getElementById('analysis');
const suggestionElement = document.getElementById('suggestion');
const retryBtn = document.getElementById('retry-btn');

let currentQuestionIndex = 0;
let score = 0;
let weakTopics = [];
let timeLeft = 600; // 10 minutes in seconds
let timerInterval;

// Sample Weekly Test Questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
    topic: "Geography"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
    answer: "William Shakespeare",
    topic: "Literature"
  },
  {
    question: "What is 10 - 5?",
    options: ["2", "3", "5", "7"],
    answer: "5",
    topic: "Math"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
    topic: "General Knowledge"
  },
  {
    question: "What is the past tense of 'go'?",
    options: ["Goed", "Went", "Gone", "Going"],
    answer: "Went",
    topic: "English Grammar"
  },
  {
    question: "Who was the first President of India?",
    options: ["Jawaharlal Nehru", "Rajendra Prasad", "Lal Bahadur Shastri", "Indira Gandhi"],
    answer: "Rajendra Prasad",
    topic: "History"
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "8", "10", "12"],
    answer: "8",
    topic: "Math"
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
    topic: "Geography"
  },
  {
    question: "What is the synonym of 'Happy'?",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    answer: "Joyful",
    topic: "English Grammar"
  },
  {
    question: "Who discovered gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Stephen Hawking"],
    answer: "Isaac Newton",
    topic: "General Knowledge"
  }
];

// Timer Function
function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResult();
    } else {
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000);
}

// Update Timer Display
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Load Question
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  optionsElement.innerHTML = '';
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(option, question.topic));
    optionsElement.appendChild(button);
  });
}

// Check Answer
function checkAnswer(selectedOption, topic) {
  const question = questions[currentQuestionIndex];
  if (selectedOption === question.answer) {
    score++;
  } else {
    weakTopics.push(topic); // Track weak topics
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show Result
function showResult() {
  clearInterval(timerInterval); // Stop the timer
  document.getElementById('test-section').style.display = 'none';
  resultSection.style.display = 'block';
  scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
  analysisElement.textContent = `Weak Areas: ${[...new Set(weakTopics)].join(', ')}`;
  suggestionElement.textContent = `Suggestion: Focus on ${weakTopics.length > 0 ? weakTopics.join(', ') : 'all topics'}.`;
}

// Retry Test
retryBtn.addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  weakTopics = [];
  timeLeft = 600; // Reset timer
  document.getElementById('test-section').style.display = 'block';
  resultSection.style.display = 'none';
  loadQuestion();
  startTimer(); // Restart the timer
});

// Start Test
loadQuestion();
startTimer(); // Start the timer when the test begins