const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const candyRain = document.getElementById("candy-rain");
const wrongAnswerRain = document.getElementById("wrong-answer-rain"); // New container
const progressBar = document.getElementById("progress");

// Sound Effects
const clappingSound = document.getElementById("clapping-sound");
const ohNoSound = document.getElementById("oh-no-sound");

let currentQuestionIndex = 0;
let score = 0;

// General Knowledge Questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Mark Twain",
      "Jane Austen",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    answer: "Blue Whale",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    answer: "H2O",
  },
];

// Load Question
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn", "fade-in");
    button.addEventListener("click", () => checkAnswer(option));
    optionsElement.appendChild(button);
  });
}

// Check Answer
function checkAnswer(selectedOption) {
  const question = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((button) => {
    button.disabled = true; // Disable buttons after selection
    if (button.textContent === question.answer) {
      button.classList.add("correct");
    } else if (button.textContent === selectedOption) {
      button.classList.add("incorrect");
    }
  });

  if (selectedOption === question.answer) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    updateProgressBar(); // Update progress bar for correct answer
    showCandyRain(); // Candy rain for correct answer
    playSound(clappingSound); // Play clapping sound
  } else {
    questionElement.classList.add("shake"); // Shake animation for wrong answer
    showWrongAnswerRain(); // "Wrong Answer" rain for wrong answer
    playSound(ohNoSound); // Play "oh no" sound
    setTimeout(() => {
      questionElement.classList.remove("shake");
    }, 500);
  }
}

// Play Sound with Duration
function playSound(sound) {
  sound.currentTime = 0; // Reset sound to start
  sound.play(); // Play the sound

  // Stop the sound after 3 seconds
  setTimeout(() => {
    sound.pause();
  }, 3000);
}

// Update Progress Bar
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Candy Rain Effect
function showCandyRain() {
  const candies = ["🍬", "🍭", "🍫", "🍩", "🍪"]; // Different types of candies
  for (let i = 0; i < 30; i++) {
    // Create 30 candies
    const candy = document.createElement("div");
    candy.textContent = candies[Math.floor(Math.random() * candies.length)];
    candy.classList.add("candy");
    candy.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    candy.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random fall speed
    candyRain.appendChild(candy);

    // Remove candy after animation ends
    candy.addEventListener("animationend", () => {
      candy.remove();
    });
  }

  // Stop candy rain after 3 seconds
  setTimeout(() => {
    candyRain.innerHTML = ""; // Clear all candies
  }, 3000);
}

// Wrong Answer Rain Effect
function showWrongAnswerRain() {
  for (let i = 0; i < 20; i++) {
    // Create 20 "Wrong Answer" texts
    const wrongAnswer = document.createElement("div");
    wrongAnswer.textContent = "Wrong Answer";
    wrongAnswer.classList.add("wrong-answer");
    wrongAnswer.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    wrongAnswer.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random fall speed
    wrongAnswerRain.appendChild(wrongAnswer);

    // Remove "Wrong Answer" text after animation ends
    wrongAnswer.addEventListener("animationend", () => {
      wrongAnswer.remove();
    });
  }

  // Stop "Wrong Answer" rain after 3 seconds
  setTimeout(() => {
    wrongAnswerRain.innerHTML = ""; // Clear all "Wrong Answer" texts
  }, 3000);
}

// Next Question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    alert(`Quiz Over! Your final score is ${score}`);
    // Reset quiz
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: 0`;
    progressBar.style.width = "0%"; // Reset progress bar
    loadQuestion();
  }
});

// Start Quiz
loadQuestion();
