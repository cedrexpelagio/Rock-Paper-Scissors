const skillCards = document.querySelectorAll('.skill-card');
let humanScore = 0;
let computerScore = 0;

function getComputerchoice(max) {
    return Math.floor(Math.random() * max);
}

function comChoiceConverter(choice) {
    switch (choice) {
        case 0:
            return "Rock";
            break;
        case 1:
            return "Paper";
            break;
        case 2:
            return "Scissor";
            break;
    }
}

function playRound(humanChoice, computerChoice) {
    let bmoStatus = "";
    let win = "";
    let lose = "";
    let bmoExplain = "";
    if (humanChoice === "Rock" && computerChoice === "Scissor" ||
        humanChoice === "Paper" && computerChoice === "Rock" ||
        humanChoice === "Scissor" && computerChoice === "Paper"
    ) {
        bmoStatus = "You Win!";
        win = humanChoice;
        lose = computerChoice;
    }
    else if (computerChoice === "Rock" && humanChoice === "Scissor" ||
        computerChoice === "Paper" && humanChoice === "Rock" ||
        computerChoice === "Scissor" && humanChoice === "Paper"
    ) {
        bmoStatus = "You Lose!";
        win = computerChoice;
        lose = humanChoice;
    }

    bmoExplain = win + " beats " + lose;

    if (humanChoice === "Rock" && computerChoice === "Rock" ||
        humanChoice === "Paper" && computerChoice === "Paper" ||
        humanChoice === "Scissor" && computerChoice === "Scissor"
    ) {
        bmoStatus = "Its a tie!";
        bmoExplain = "Try Again Adventurers";
    }

    document.getElementById('bmo-status').textContent = bmoStatus;
    document.getElementById('bmo-explain').textContent = bmoExplain;

    // update hand images
    document.getElementById('human-hand').src = `./assets/${humanChoice.toLowerCase()}.png`;
    document.getElementById('computer-hand').src = `./assets/enemy-${computerChoice.toLowerCase()}.png`;

}
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const humanChoice = card.dataset.value; // "Rock", "Paper", or "Scissor"
            const computerChoice = comChoiceConverter(getComputerchoice(3));
            playRound(humanChoice, computerChoice);
        });
    });