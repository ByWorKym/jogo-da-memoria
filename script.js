const gridContainer = document.querySelector(".grid-container");
let cardsArray = [
    { name: "0", img: "./assets/0.png" },
    { name: "1", img: "./assets/1.png" },
    { name: "2", img: "./assets/2.png" },
    { name: "3", img: "./assets/3.png" },
    { name: "4", img: "./assets/4.png" },
    { name: "5", img: "./assets/5.png" },
    { name: "6", img: "./assets/6.png" },
    { name: "7", img: "./assets/7.png" },
    { name: "8", img: "./assets/8.png" },
    { name: "9", img: "./assets/9.png" },
    { name: "10", img: "./assets/10.png" },
    { name: "0", img: "./assets/0.png" },
    { name: "1", img: "./assets/1.png" },
    { name: "2", img: "./assets/2.png" },
    { name: "3", img: "./assets/3.png" },
    { name: "4", img: "./assets/4.png" },
    { name: "5", img: "./assets/5.png" },
    { name: "6", img: "./assets/6.png" },
    { name: "7", img: "./assets/7.png" },
    { name: "8", img: "./assets/8.png" },
    { name: "9", img: "./assets/9.png" },
    { name: "10", img: "./assets/10.png" }
];

let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let pairsFound = 0;

document.querySelector(".score").textContent = score;

function shuffleCards() {
    cardsArray.sort(() => 0.5 - Math.random());
}

function generateCards() {
    shuffleCards();
    gridContainer.innerHTML = "";
    for (let card of cardsArray) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
            <div class="front" style="background-color: #000438;"></div>
            <div class="back">
                <img class="back-image" src=${card.img} />
            </div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flipped");
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    pairsFound++;
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function verificarJogo() {
    if (pairsFound === cardsArray.length / 2) {
        document.getElementById("parabensModal").style.display = "block";
    } else {
        document.getElementById("falhaModal").style.display = "block";
    }
}

function closeParabensModal() {
    document.getElementById("parabensModal").style.display = "none";
}

function closeFalhaModal() {
    document.getElementById("falhaModal").style.display = "none";
}

function shufflePuzzle() {
    pairsFound = 0;
    score = 0;
    document.querySelector(".score").textContent = score;
    generateCards();
}

generateCards();

// Controle de Áudio
const musicaDeFundo = document.getElementById("musicaDeFundo");
const muteButton = document.getElementById("muteButton");
musicaDeFundo.play();

muteButton.addEventListener("click", () => {
    if (musicaDeFundo.paused) {
        musicaDeFundo.play();
        muteButton.textContent = "🔊";
    } else {
        musicaDeFundo.pause();
        muteButton.textContent = "🔇";
    }
});
