const playBoard = document.querySelector(".play-board")
const score = document.querySelector(".score")
const higthScoreElement = document.querySelector(".hight-score")
let GameeOver = false
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = []
let velocityX = 0, velocityY = 0;
let setIntervalId;
let scoreUpdate = 0
let higthScore = localStorage.getItem("higth-score") || 0

const changePosition = () => {
    //funzione che cambia la posizione da 0 a 30
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
//comandi da tastiera
const changeDirection = (e) => {
    if (e.key === "ArrowUp") {
        velocityX = 0
        velocityY = -1
    }
    else if (e.key === "ArrowDown") {
        velocityX = 0
        velocityY = 1
    }
    else if (e.key === "ArrowLeft") {
        velocityX = -1
        velocityY = 0
    }
    else if (e.key === "ArrowRight") {
        velocityX = 1
        velocityY = 0
    }
    console.log(e);

}
const handeGameOver = () => {
    alert("game Over")
    // initGame()
    clearInterval(setIntervalId)
    location.reload()
    localStorage.getItem(scoreUpdate)
}


const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`
    if (GameeOver) return handeGameOver()
    //aggiunge un elemento ogni volta che il serpente mangia e cambia posizione al cibo
    if (snakeX === foodX && snakeY === foodY) {
        changePosition()
        snakeBody.push([foodX, foodY])
        console.log(snakeBody);
        scoreUpdate++
        higthScore = scoreUpdate => higthScore ? scoreUpdate : higthScore
        localStorage.setItem(`higth-score ${higthScore}`)
        higthScoreElement.innerText = `score: ${higthScore}`

    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]

    }
    //collisione con le pareti
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        // alert("game over")
        GameeOver = true
    }
    //setta la prima posizione del serpente
    snakeBody[0] = [snakeX, snakeY]
    //update della direzione
    snakeX += velocityX
    snakeY += velocityY
    //aggiorna l'elemento serpente
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`

        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            GameeOver = true
        }
    }

    playBoard.innerHTML = htmlMarkup

}


changePosition()
setIntervalId = setInterval(initGame, 125);
// changeDirection()
document.addEventListener("keydown", changeDirection)
localStorage.getItem(snakeBody)
