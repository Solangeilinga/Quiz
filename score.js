const mostRecentScore = localStorage.getItem("mostRecentScore"); // Ajout des guillemets
const username = document.querySelector("#username");
const finalScore = document.querySelector("#finalScore");
const scoreBtn = document.querySelector("#scoreBtn");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = mostRecentScore; // Affiche le dernier score
console.log(finalScore.innerText);

username.addEventListener("keyup", () => {
    scoreBtn.disabled = !username.value; // Active/Désactive le bouton selon l'entrée utilisateur
});

const saveHighScore = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const score = {
        score: parseInt(mostRecentScore, 10) || 0, // Convertir en nombre
        name: username.value.trim() // Supprimer les espaces inutiles
    };

    highScores.push(score);

    // Trier les scores du plus élevé au plus bas
    highScores.sort((a, b) => b.score - a.score);

    // Garder seulement les 4 meilleurs scores
    highScores.splice(5);

    // Sauvegarde dans le localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    console.log(highScores); // Correction de "console.llog" en "console.log"

    // Redirige vers la page des scores
    window.location.assign("achievers.html");
};

scoreBtn.addEventListener("click", saveHighScore); // Ajout de l'événement sur le bouton
