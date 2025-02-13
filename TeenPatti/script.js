let deck = [];
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let playerCards = [];
let dealerCards = [];
let balance = 1000;
let currentBet = 0;
let betAmountInput = document.getElementById('bet-amount');
let resultMessage = document.getElementById('result-message');

function generateDeck() {
    deck = [];
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ rank, suit, image: `images/${rank}_of_${suit}.png` });
        });
    });
    shuffleDeck();
}

function shuffleDeck() {
    deck = deck.sort(() => Math.random() - 0.5);
}

function dealCards() {
    generateDeck();
    playerCards = [deck.pop(), deck.pop(), deck.pop()];
    dealerCards = [deck.pop(), deck.pop(), deck.pop()];

    document.getElementById('card1').style.backgroundImage = `url(${playerCards[0].image})`;
    document.getElementById('card2').style.backgroundImage = `url(${playerCards[1].image})`;
    document.getElementById('card3').style.backgroundImage = `url(${playerCards[2].image})`;

    document.getElementById('dealer-card1').style.backgroundImage = `url(${dealerCards[0].image})`;
    document.getElementById('dealer-card2').style.backgroundImage = `url(${dealerCards[1].image})`;
    document.getElementById('dealer-card3').style.backgroundImage = `url(${dealerCards[2].image})`;

    checkWinner();
}

function placeBet() {
    const betAmount = parseInt(betAmountInput.value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        resultMessage.textContent = "Invalid bet amount!";
        return;
    }

    currentBet = betAmount;
    balance -= currentBet;
    document.getElementById('balance').textContent = balance;

    // Directly deal cards and check winner without alert
    dealCards();
}

function checkWinner() {
    let playerHand = evaluateHand(playerCards);
    let dealerHand = evaluateHand(dealerCards);

    let resultMessageText = '';

    if (playerHand.rank > dealerHand.rank) {
        resultMessageText = `You win with a ${playerHand.name}! You won ₹${currentBet * 2}`;
        balance += currentBet * 2;
    } else if (playerHand.rank < dealerHand.rank) {
        resultMessageText = `Dealer wins with a ${dealerHand.name}! You lost ₹${currentBet}`;
    } else {
        resultMessageText = `It's a tie with a ${playerHand.name}!`;
        balance += currentBet;  // Return bet in case of a tie
    }

    document.getElementById('balance').textContent = balance;
    resultMessage.textContent = resultMessageText;
}

function evaluateHand(cards) {
    const sortedCards = cards.sort((a, b) => ranks.indexOf(a.rank) - ranks.indexOf(b.rank));

    if (isTrail(sortedCards)) return { rank: 5, name: 'Trail (Three of a Kind)' };
    if (isStraight(sortedCards)) return { rank: 4, name: 'Straight (Run)' };
    if (isFlush(sortedCards)) return { rank: 3, name: 'Flush' };
    if (isPair(sortedCards)) return { rank: 2, name: 'Pair' };
    return { rank: 1, name: 'High Card' };
}

function isTrail(cards) {
    return cards[0].rank === cards[1].rank && cards[1].rank === cards[2].rank;
}

function isStraight(cards) {
    const values = cards.map(card => ranks.indexOf(card.rank));
    values.sort((a, b) => a - b);

    return values[2] - values[1] === 1 && values[1] - values[0] === 1;
}

function isFlush(cards) {
    return cards[0].suit === cards[1].suit && cards[1].suit === cards[2].suit;
}

function isPair(cards) {
    return cards[0].rank === cards[1].rank || cards[1].rank === cards[2].rank || cards[0].rank === cards[2].rank;
}
