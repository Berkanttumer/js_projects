const questions = [{
    question: 'Which is largest animal in the world?',
    answers: [
        {text: 'Shark', correct: false},
        {text: 'Blue whale', correct: true},
        {text: 'Elephant', correct: false},
        {text: 'Giraffe', correct: false},
    ]
},
    {
        question: 'Which is the smallest continent in the world?',
        answers: [
            {text: 'Asia', correct: false},
            {text: 'Australia', correct: true},
            {text: 'Arctic', correct: false},
            {text: 'Africa', correct: false},
        ]
    },
    {
        question: 'Which is largest desert in the world?',
        answers: [
            {text: 'Kalahari', correct: false},
            {text: 'Gobi', correct: false},
            {text: 'Sahara', correct: false},
            {text: 'Antarctica', correct: true},
        ]
    },
    {
        question: 'Which is the smallest country in the world?',
        answers: [
            {text: 'Vatican City', correct: true},
            {text: 'Bhutan', correct: false},
            {text: 'Nepal', correct: false},
            {text: 'Shri Lanka', correct: false},]
    },
    {
        question: 'Which planet is the closest to the Sun in our Solar System?',
        answers: [
            {text: 'Mars', correct: false},
            {text: 'Venus', correct: false},
            {text: 'Jupiter', correct: false},
            {text: 'Mercury', correct: true},]
    }
]
const btnStart = document.getElementById('btnStart')
const btnNext = document.getElementById('next')
const title = document.getElementById('title')
const questionTitle = document.getElementById('question-h3')
const qContainer = document.getElementById('q-container')
const answersDiv = document.getElementById('answers')
const startDiv = document.getElementById('start')

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    startDiv.classList.add('hide')
    qContainer.classList.remove('hide')
    btnStart.classList.add('hide')
    btnNext.classList.remove('hide')
    showQuestion()
}

function updateStatus() {
    title.innerHTML = `${currentQuestionIndex + 1} of ${questions.length} Question`
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    questionTitle.innerHTML = currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const div = document.createElement('div')
        div.innerHTML = answer.text
        answersDiv.appendChild(div)
        if (answer.correct) {
            div.dataset.correct = answer.correct
        }
        div.addEventListener('click', selectAnswer)
    })
    updateStatus()
}

function resetState() {
    while (answersDiv.firstChild) {
        answersDiv.removeChild(answersDiv.firstChild)
    }
}

function selectAnswer(e) {
    const selectedDiv = e.target
    const isCorrect = selectedDiv.dataset.correct === 'true'

    if (isCorrect) {
        selectedDiv.classList.add('correct')
        score++
    } else {
        selectedDiv.classList.add('false')
    }
    Array.from(answersDiv.children).forEach(div => {
        if (div.dataset.correct === 'true') {
            div.classList.add('correct')
        }
        div.style.pointerEvents = 'none'
    })
}

function showScore() {
    startDiv.classList.remove('hide')
    qContainer.classList.add('hide')
    startDiv.innerHTML = `<h2>Your score ${score} out of ${questions.length}!</h2>`
    btnNext.classList.add('hide')
}

function handleNextBtn() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

btnStart.addEventListener('click', startQuiz)
btnNext.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn()
    }
})




