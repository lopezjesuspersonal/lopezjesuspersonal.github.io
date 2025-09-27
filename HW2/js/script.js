// Event Listeners
document.querySelector("#betBtn").addEventListener("click", play);
document.querySelector("#hitBtn").addEventListener("click", hit);
document.querySelector("#standBtn").addEventListener("click", stand);
document.querySelector("#brokeBtn").addEventListener("click", buyIn);

// Global Variables
let money;
let globalBet;
let deck = 
[
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
];
let sDeck = [];

let dealerCards = [];
let dealerCardsShowcase = document.querySelector("#dealerCards");
let yourCards = [];
let yourCardsShowcase = document.querySelector("#yourCards");

let hands = document.querySelector("#handsImage");

let yourTotal;
let dealerTotal;

initGame();

async function initGame() {
    for (let i = 0; i < 8; i++) {
        let tempDeck = _.shuffle(deck);
        sDeck = sDeck.concat(tempDeck);
    }
    console.log(sDeck);

    money = 1000;

    // Hide Buttons
    document.querySelector("#hitBtn").style.display = "none";
    document.querySelector("#standBtn").style.display = "none";
    document.querySelector("#betBtn").style.display = "none";
    document.querySelector("#brokeBtn").style.display = "none";

    document.querySelector("#moneyRemaining").textContent = "$" + money;

    yourCardsShowcase.textContent = "Warning: Aces cannot change value and will stay either 1 or 11, whichever assigned first"
    await sleep(5000);
    yourCardsShowcase.textContent = ""

    // Show Bet Button
    document.querySelector("#betBtn").style.display = "inline";

    document.querySelector("#playerBet").focus();
}

function play() {
    yourCardsShowcase.style.color = "darkred";
    hands.src = "img/handsNeutral.png";
    let bet = document.querySelector("#playerBet").value;
    globalBet = bet;
    console.log("Bet is: " + bet);

    if (isNaN(bet) || bet == "" || bet <= 0 || bet > money) {
        console.log("Enter valid bet");
        document.querySelector("#playerBetRes").textContent = "Error: Enter valid bet.";
        return;
    }

    document.querySelector("#playerBet").style.display = "none";
    document.querySelector("#betBtn").style.display = "none";
    document.querySelector("#playerBetRes").textContent = "$" + bet;
    document.querySelector("#moneyRemaining").textContent = "$" + (money - bet);

    document.querySelector("#hitBtn").style.display = "inline";
    document.querySelector("#standBtn").style.display = "inline";

    money = money - bet;

    dealerCards.push(sDeck.pop());
    dealerCards.push(sDeck.pop());
    dealerTotal = worthDealer(dealerCards[0]) + worthDealer(dealerCards[1]);
    console.log(dealerCards);
    console.log("Dealer's total: " + dealerTotal);

    dealerCardsShowcase.textContent = "XX " + dealerCards[1];

    yourCards.push(sDeck.pop());
    yourCards.push(sDeck.pop());
    yourTotal = worth(yourCards[0]) + worth(yourCards[1]);
    console.log(yourCards);
    console.log("Your total: " + yourTotal);

    yourCardsShowcase.textContent = yourCards[0] + " " + yourCards[1];


}

function hit() {
    card = sDeck.pop();
    yourCards.push(card);
    yourCardsShowcase.textContent += " " + card;
    yourTotal += worth(card);
    console.log(yourCards);
    console.log("Your total: " + yourTotal);
    if (yourTotal > 21) {
        bust();
    }
}

async function stand() {
    document.querySelector("#hitBtn").style.display = "none";
    document.querySelector("#standBtn").style.display = "none";
    dealerCardsShowcase.textContent = dealerCards[0] + " " + dealerCards[1];
    await sleep(2000);
    while (dealerTotal < 17) {
        card = sDeck.pop();
        dealerCards.push(card);
        dealerCardsShowcase.textContent += " " + card;
        dealerTotal += worthDealer(card);
        console.log(dealerCards);
        console.log("Dealer's total: " + dealerTotal);
        await sleep(2000);
    }
    if (dealerTotal > 21 || yourTotal > dealerTotal) {
        win();
    } else if (dealerTotal == yourTotal) {
        tie();
    } else {
        bust();
    }
}

async function bust() {
    hands.src = "img/handsHappy.png";
    console.log("Busted");
    yourCards = [];
    yourCardsShowcase.textContent = "Busted.";
    yourCardsShowcase.style.color = "red";

    document.querySelector("#hitBtn").style.display = "none";
    document.querySelector("#standBtn").style.display = "none";

    await sleep(2000);
    dealerCards = [];
    dealerCardsShowcase.textContent = "";

    yourTotal = 0;
    dealerTotal = 0;

    if (money <= 0) {
        document.querySelector("#brokeBtn").style.display = "inline";
    } else {
        document.querySelector("#moneyRemaining").textContent = "";
        document.querySelector("#moneyRemaining").textContent = "$" + money;

        document.querySelector("#playerBetRes").textContent = "";

        document.querySelector("#playerBet").style.display = "inline";
        document.querySelector("#betBtn").style.display = "inline";
    }
}

async function win() {
    hands.src = "img/handsAngry.png";
    console.log("Win");
    yourCards = [];
    yourCardsShowcase.textContent = "Won this round.";
    yourCardsShowcase.style.color = "lime";

    document.querySelector("#hitBtn").style.display = "none";
    document.querySelector("#standBtn").style.display = "none";

    await sleep(2000);
    dealerCards = [];
    dealerCardsShowcase.textContent = "";

    money += globalBet * 2;
    yourTotal = 0;
    dealerTotal = 0;

    document.querySelector("#moneyRemaining").textContent = "";
    document.querySelector("#moneyRemaining").textContent = "$" + money;

    document.querySelector("#playerBetRes").textContent = "";

    document.querySelector("#playerBet").style.display = "inline";
    document.querySelector("#betBtn").style.display = "inline";
}

async function tie() {
    hands.src = "img/handsNeutral.png";
    console.log("Tie");
    yourCards = [];
    yourCardsShowcase.textContent = "Tied this round.";
    yourCardsShowcase.style.color = "yellow";

    document.querySelector("#hitBtn").style.display = "none";
    document.querySelector("#standBtn").style.display = "none";

    await sleep(2000);
    dealerCards = [];
    dealerCardsShowcase.textContent = "";

    money = money + parseInt(globalBet);
    yourTotal = 0;
    dealerTotal = 0;

    document.querySelector("#moneyRemaining").textContent = "";
    document.querySelector("#moneyRemaining").textContent = "$" + money;

    document.querySelector("#playerBetRes").textContent = "";

    document.querySelector("#playerBet").style.display = "inline";
    document.querySelector("#betBtn").style.display = "inline";
}

function buyIn() {
    money = 1000;

    document.querySelector("#brokeBtn").style.display = "none";

    document.querySelector("#moneyRemaining").textContent = "";
    document.querySelector("#moneyRemaining").textContent = "$" + money;

    document.querySelector("#playerBetRes").textContent = "";

    document.querySelector("#playerBet").style.display = "inline";
    document.querySelector("#betBtn").style.display = "inline";
}

function worth(value) {
    if (value == "J" || value == "Q" || value == "K") {
        return 10;
    }
    if (value == "A") {
        if (yourTotal + 11 > 21) {
            return 1;
        } else {
            return 11;
        }
    }
    return parseInt(value);
}

function worthDealer(value) {
    if (value == "J" || value == "Q" || value == "K") {
        return 10;
    }
    if (value == "A") {
        console.log("ace");
        if (dealerTotal + 11 > 21) {
            return 1;
        } else {
            return 11;
        }
    }
    return parseInt(value);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}