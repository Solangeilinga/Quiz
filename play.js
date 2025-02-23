let questions = [
    {
        question: "Quelle est la capitale du Burkina Faso ?",
        choice1: "Bobo-Dioulasso",
        choice2: "Ouagadougou",
        choice3: "Ouahigouya",
        choice4: "Koudougou",
        answer: 2,
    },
    {
        question: "Quelle est la deuxième plus grande ville du Burkina Faso après Ouagadougou ?",
        choice1: "Ouagadougou",
        choice2: "Dédougou",
        choice3: "Bobo-Dioulasso",
        choice4: "Kaya",
        answer: 3,
    },
    {
        question: "Quelle nation africaine a remporté la Coupe d'Afrique des Nations (CAN) 2024 ?",
        choice1: "Sénégal",
        choice2: "Maroc",
        choice3: "Egypte",
        choice4: "Cote d'Ivoire",
        answer: 4,
    },
    {
        question: "Quelle est la capitale du Maroc ?",
        choice1:"Marrakech",
        choice2:"Rabat",
        choice3:"Casablanca",
        choice4:"Fès",
        answer: 2,
    },
    {
        question: " Quel gaz est principalement responsable du réchauffement climatique ?",
        choice1:"Oxygène",
        choice2:"Azote",
        choice3:"Dioxyde de Carbone",
        choice4:"Néon",
        answer: 3,
    },
    {
        question: "Quelle est la capitale du Ghana ?",
        choice1:" Takoradi",
        choice2:"Tamale",
        choice3:"Kumasi",
        choice4:" Accra",
        answer: 4,
    },
    {
        question: "Quelle ressource minière est la plus exploitée au Burkina Faso ?",
        choice1:"Or",
        choice2:"Diamants",
        choice3:"Pétrole",
        choice4:"Cuivre",
        answer: 1,
    },
    {
        question: "Quelle est la principale langue parlée au Maroc ?",
        choice1:"Français",
        choice2:"Espagnol",
        choice3:"Arabe",
        choice4:"Anglais",
        answer: 3
    },
    {
        question: "Qui est Iron Biby ?",
        choice1:"Un footballeur",
        choice2:"Un athlète de basketball",
        choice3:"Un boxeur",
        choice4:"Un athlète de powerlifting",
        answer:4,
    },
    {
        question: " Qui est le président actuel du Burkina Faso",
        choice1: "Roch Marc Christian Kaboré",
        choice2:"Thomas Sankara",
        choice3:"Ibrahim Traoré",
        choice4:"Blaise Compaoré",
        answer: 3,
    },
    {
        question: "Quel est le sport pratiqué par Hugues Fabrice Zango ?",
        choice1: "Football",
        choice2:"Triple saut",
        choice3:"Saut en longueur",
        choice4:"Saut à la perche",
        answer: 2,
    },
    {
        question: "Quelle est la principale langue parlée au Burkina Faso en dehors du français ?",
        choice1: "Dioula",
        choice2:"Bissa",
        choice3:"Mooré",
        choice4:"Fulfudé",
        answer: 3,
    },
    {
        question: "Quelle est la monnaie officielle du Burkina Faso ?",
        choice1:"Le Franc CFA",
        choice2:" Le Naira",
        choice3:"Le Dollar Burkinabé",
        choice4:" L'Euro",
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
