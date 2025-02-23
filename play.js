let questions = [
    {
        question: "What is the world's most populated country?",
        choice1: "USA",
        choice2: "China",
        choice3: "Russia",
        choice4: "India",
        answer: 2, // China
    },
    {
        question: "What is the capital of the Philippines?",
        choice1: "Jakarta",
        choice2: "Dili",
        choice3: "Manila",
        choice4: "Marawi",
        answer: 3, // Manila
    },
    {
        question: "What is the world's smallest country?",
        choice1: "USA",
        choice2: "Russia",
        choice3: "Monaco",
        choice4: "Vatican City",
        answer: 4, // Vatican City
    },
    {
        question: "Quelle est la capitale du Canada ?",
        choice1:"Toronto",
        choice2:"Ottawa",
        choice3:"Vancouver",
        choice4:"Montréal",
        answer: 2,
    },
    {
        question: "Qui a peint la Joconde ?",
        choice1:"Picasso",
        choice2:"Van Gogh",
        choice3:"Léonard de Vinci",
        choice4:"Michel-Ange",
        answer: 3,
    },
    {
        question: "Quelle est la planète la plus grande du système solaire ?",
        choice1:"Mars",
        choice2:"Saturne",
        choice3:"Jupiter",
        choice4:"Neptune",
        answer: 3,
    },
    {
        question: "Quel est l’élément chimique dont le symbole est 'O' ?",
        choice1:"Oxygène",
        choice2:"Or",
        choice3:"Osmium",
        choice4:"Ozone",
        answer: 1,
    },
    {
        question: "Quel pays a remporté la Coupe du Monde de football en 2018 ?",
        choice1:"Brésil",
        choice2:"Allemagne",
        choice3:"France",
        choice4:"Argentine",
        answer: 3
    },
    {
        question: "Quel est le plus grand océan du monde ?",
        choice1:"Atlantique",
        choice2:"Pacifique",
        choice3:"Indien",
        choice4:"Arctique",
        answer:2,
    },
    {
        question: "Dans quel pays se trouve la célèbre tour de Pise ?",
        choice1: "Espagne",
        choice2:"France",
        choice3:"Italie",
        choice4:"Grèce",
        answer: 3,
    },
    {
        question: "Quel est l’animal terrestre le plus rapide du monde ?",
        choice1: "Guépard",
        choice2:"Lion",
        choice3:"Gazelle",
        choice4:"Léopard",
        answer: 1,
    },
    {
        question: "Combien y a-t-il de continents sur Terre ?",
        choice1: "5",
        choice2:"6",
        choice3:"7",
        choice4:"8",
        answer: 3,
    },
    {
        question: "Qui a écrit 'Les Misérables' ?",
        choice1:"Victor Hugo",
        choice2:"Émile Zola",
        choice3:"Alexandre Dumas",
        choice4:"Molière",
        answer: 1
    }
];

let currentQuestion = {}
let TrueAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

const question = document.querySelector("#questionText");
const choices = Array.from(document.querySelectorAll(".ChoiceText"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#scorenumber");
const progressBarFull = document.querySelector("#progressBarFull");

const score_points = 10;
const max_questions = 10; // Ajusté à la taille du tableau de questions

const GetStarted = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // Copier les questions
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("score.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${max_questions}`;
    progressBarFull.style.width = `${(questionCounter /max_questions) * 100}%`;

    const questionsRandNumber = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsRandNumber];
    if (!currentQuestion) return;
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionsRandNumber, 1);
    TrueAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!TrueAnswers) return;
        TrueAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(score_points);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

const incrementScore = number => {
    score += number;
    scoreText.innerText = score;
};

GetStarted();