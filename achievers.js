const scoreList=document.querySelector('#scoreList')
const highScores=JSON.parse(localStorage.getItem("highScores"))||[]
scoreList.innerHTML = highScores.map(score => 
    `<li class="Achievers"> ${score.name} : ${score.score} </li>`
).join("")