const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "I think she spent the entire afternoon ______ the phone.",
        choice1: "on",
        choice2: "in",
        choice3: "at",
        choice4: "of",
        answer: 1,
    },
    {
        question:
            "I'll be ready to leave ____ about twenty minutes.",
        choice1: "at",
        choice2: "on",
        choice3: "at",
        choice4: "in",
        answer: 4,
    },
    {
        question: "My best friend, John, is named ______ his great-grandfather.",
        choice1: "after",
        choice2: "to",
        choice3: "about",
        choice4: "by",
        answer: 1,
    },
    {
        question: " I told Mom we would be home ______ an hour or so.",
        choice1: "to",
        choice2: "in",
        choice3: "at",
        choice4: "by",
        answer: 2,
    },
    {
        question: " You frequently see this kind of violence ____ television.",
        choice1: "with",
        choice2: "in",
        choice3: "on",
        choice4: "for",
        answer: 3,
    }
    ,{
        question: "He usually travels to New Delhi _______ train.",
        choice1: "at",
        choice2: "by",
        choice3: "with",
        choice4: "on",
        answer: 2,
    }, {
        question: "My parents have been married ______ forty-nine years. ",
        choice1: "since",
        choice2: "for",
        choice3: "until",
        choice4: "about",
        answer: 2,
    } ,{
        question: "My fingers were injured so my sister had to write the note _____ me.",
        choice1: "with",
        choice2: "to",
        choice3: "for",
        choice4: "about",
        answer: 3,
    } ,{
        question: "I will wait ______ 6:30, but then I'm going home.",
        choice1: "from",
        choice2: "at",
        choice3: "until",
        choice4: "about",
        answer: 3,
    } 
    ,{
        question: "She has a lot of admiration ___ all that you have done.",
        choice1: "from",
        choice2: "on",
        choice3: "of",
        choice4: "for",
        answer: 4,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()