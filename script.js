const questions = [
    {
        question: "What's the most VALID response when someone says 'skill issue'?",
        choices: [
            "Nah fr you spittin",
            "Didn't ask + ratio",
            "Touch grass fr fr",
            "Real + Based"],
        correct: 1
    },
    {
        question: "When the rizz is BUSSIN, what do you say?",
        choices: [
            "No cap fr fr",
            "That's so mid",
            "Sheeeeeesh",
            "On god"],
        correct: 2
    },
    {
        question: "What's the most REAL way to end a TikTok?",
        choices: [
            "Like and follow for part 2",
            "Story time in bio",
            "Don't let this flop",
            "Nah cause why did it end like that"],
        correct: 3
    },
    {
        question: "When someone's fit is ACTUALLY fire, you say:",
        choices: [
            "Respectfully, you ate that",
            "Mid tbh",
            "Common W",
            "Basic fit check"],
        correct: 0
    },
    {
        question: "What's the MOST valid response to 'didn't ask'?",
        choices: [
            "Didn't ask about you not asking",
            "Cool story bro",
            "That's crazy",
            "L + ratio"],
        correct: 0
    },
    {
        question: "When the rizz ACTUALLY works, they say:",
        choices: [
            "You're so real for that",
            "Nah fr though",
            "Actually valid",
            "All of the above"],
        correct: 3
    },
    {
        question: "What's the BIGGEST red flag in someone's bio?",
        choices: [
            "CEO of being late",
            "Professional overthinker",
            "Probably won't like you",
            "All of the above"],
        correct: 3
    },
    {
        question: "When someone's comeback is ACTUALLY fire, you say:",
        choices: [
            "Nah you didn't have to violate",
            "That's actually crazy",
            "Common W rizz",
            "Real and valid"],
        correct: 0
    },
    {
        question: "What's the MOST valid way to start a story time?",
        choices: [
            "So basically...",
            "STORY TIME!",
            "Nah cause listen-",
            "You're not ready for this"],
        correct: 2
    },
    {
        question: "When the rizz is ACTUALLY CRAZY, the response is:",
        choices: [
            "Nah cause how??",
            "Ain't no way fr",
            "Actually unreal",
            "All of the above"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 60;

function updateQuestionNumber() {
    const questionNumberElement = document.getElementById('question-number');
    questionNumberElement.textContent = `Question ${currentQuestion + 1} of 10`;
}

function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    updateQuestionNumber();
    
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice fade-in';
        button.textContent = choice;
        button.onclick = () => selectChoice(index);
        choicesDiv.appendChild(button);
    });
    
    updateProgress();
}

function selectChoice(index) {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => choice.classList.remove('selected'));
    choices[index].classList.add('selected');
}

function checkAnswer() {
    const selected = document.querySelector('.selected');
    if (!selected) {
        alert('Please select an answer!');
        return;
    }
    
    const selectedIndex = Array.from(document.querySelectorAll('.choice')).indexOf(selected);
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    
    // Show feedback
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.style.display = 'block';
    
    if (isCorrect) {
        feedbackElement.textContent = '✅ Correct!';
        feedbackElement.className = 'feedback correct fade-in';
        score++;
    } else {
        feedbackElement.textContent = '❌ Wrong! The correct answer was: ' + 
            questions[currentQuestion].choices[questions[currentQuestion].correct];
        feedbackElement.className = 'feedback wrong fade-in';
    }
    
    // Wait 1.5 seconds before moving to next question
    setTimeout(() => {
        feedbackElement.style.display = 'none';
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    clearInterval(timer);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    const timeBonus = Math.max(0, timeLeft);
    const finalScore = score + timeBonus * 0.1;
    
    document.getElementById('score').textContent = `${score} out of ${questions.length}`;
    document.getElementById('time-bonus').textContent = 
        `Time Bonus: +${(timeBonus * 0.1).toFixed(1)} points`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    startTimer();
    displayQuestion();
}

function startTimer() {
    timeLeft = 60;
    updateTimer();
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('time').textContent = timeLeft;
}

function updateProgress() {
    const progress = (currentQuestion / 10) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

// Event listeners
document.getElementById('submit').addEventListener('click', checkAnswer);
document.getElementById('restart').addEventListener('click', restartQuiz);

// Shuffle function to randomize questions
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Modify the startQuiz function to use 10 questions
function startQuiz() {
    shuffleQuestions();
    // Get 10 random questions instead of 5
    const quizQuestions = questions.slice(0, 10);
    // Replace the main questions array with our 10 selected questions
    questions.length = 0;
    questions.push(...quizQuestions);
    
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    startTimer();
}

// Start the quiz
startQuiz(); 