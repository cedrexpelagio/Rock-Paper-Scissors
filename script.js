const skillCards = document.querySelectorAll('.skill-card');
let humanScore = 0;
let computerScore = 0;
let currentRound = 1;
const totalRound = 5;

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


function showFinalResult() {
    let bmoStatus = "";
    let bmoExplain = "";

    if (humanScore > computerScore) {
        bmoStatus = "Congratulation Adventurer!";
        bmoExplain = "You Win this Game!";
    } else if (computerScore > humanScore) {
        bmoStatus = "Try Again Adventurer!";
        bmoExplain = "You Lose this Game!";
    } else if (humanScore === computerScore) {
        bmoStatus = "Legendary Draw!";
        bmoExplain = "The Game is Tie!";
    }

    document.getElementById('bmo-status').textContent = bmoStatus;
    document.getElementById('bmo-explain').textContent = bmoExplain;

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
        humanScore++;
    }
    else if (computerChoice === "Rock" && humanChoice === "Scissor" ||
        computerChoice === "Paper" && humanChoice === "Rock" ||
        computerChoice === "Scissor" && humanChoice === "Paper"
    ) {
        bmoStatus = "You Lose!";
        win = computerChoice;
        lose = humanChoice;
        computerScore++;
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

    // update scoreboard
    document.getElementById('humanScore').textContent = humanScore;
    document.getElementById('computerScore').textContent = computerScore;
}

function playGame(humanChoice, computerChoice) {

    const humanHand = document.getElementById('human-hand');
    const computerHand = document.getElementById('computer-hand');

    // reset images to rock 
    humanHand.src = './assets/rock.png';
    computerHand.src = './assets/enemy-rock.png';

    if (currentRound <= totalRound) {
        // start shake animation
        humanHand.classList.add('shaking');
        computerHand.classList.add('shaking');

        // after the shake finishes, remove animation class and reveal choices
        setTimeout(() => {
            humanHand.classList.remove('shaking');
            computerHand.classList.remove('shaking');
            playRound(humanChoice, computerChoice);
        }, 600); // match this to the animation duration above
         currentRound++;
    } else {
        showFinalResult();
        document.getElementById('bmo-try-again').textContent = 'Refresh the page to try again or press F5';
    }
}

skillCards.forEach(card => {
    card.addEventListener('click', () => {
        const humanChoice = card.dataset.value;
        const computerChoice = comChoiceConverter(getComputerchoice(3));

        playGame(humanChoice, computerChoice);
    });
});