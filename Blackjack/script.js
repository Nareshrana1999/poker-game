let balance = 1000;
let playerHand = [];
let dealerHand = [];
let deck = [];
let playerBet = 0;
let gameOver = false;

const hitButton = document.getElementById('hit');
const standButton = document.getElementById('stand');
const doubleButton = document.getElementById('double');
const placeBetButton = document.getElementById('place-bet');
const betInput = document.getElementById('bet');
const dealerCards = document.getElementById('dealer-cards');
const playerCards = document.getElementById('player-cards');
const dealerScore = document.getElementById('dealer-score');
const playerScore = document.getElementById('player-score');
const balanceDisplay = document.getElementById('balance');
const gameMessage = document.getElementById('game-message');
const centralMessage = document.getElementById('central-message');

// Generate a deck of cards
function generateDeck() {
  const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
  shuffleDeck();
}

// Shuffle the deck of cards
function shuffleDeck() {
  deck = deck.sort(() => Math.random() - 0.5);
}

// Deal cards to player and dealer
function dealCards() {
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  
  renderCards();
  updateScores();
  
  // Enable buttons after cards are dealt
  hitButton.disabled = false;
  standButton.disabled = false;
  doubleButton.disabled = false;

  showCentralMessage("Game Started! Make Your Move.");
}

// Render cards to the table
function renderCards() {
  dealerCards.innerHTML = '';
  playerCards.innerHTML = '';
  
  for (let card of dealerHand) {
    const img = document.createElement('img');
    img.src = `images/${card.value}_of_${card.suit}.png`;
    img.alt = card.value + ' of ' + card.suit;
    dealerCards.appendChild(img);
  }
  
  for (let card of playerHand) {
    const img = document.createElement('img');
    img.src = `images/${card.value}_of_${card.suit}.png`;
    img.alt = card.value + ' of ' + card.suit;
    playerCards.appendChild(img);
  }
}

// Update scores
function updateScores() {
  dealerScore.textContent = `Score: ${calculateHandScore(dealerHand)}`;
  playerScore.textContent = `Score: ${calculateHandScore(playerHand)}`;
}

// Calculate score of a hand
function calculateHandScore(hand) {
  let score = 0;
  let aces = 0;
  
  for (let card of hand) {
    if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
      score += 10;
    } else if (card.value === 'A') {
      aces++;
      score += 11;
    } else {
      score += parseInt(card.value);
    }
  }
  
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  
  return score;
}

// Show central messages
function showCentralMessage(message) {
  centralMessage.textContent = message;
}

// Start a new round
placeBetButton.addEventListener('click', () => {
  const betAmount = parseInt(betInput.value);
  if (betAmount <= balance) {
    playerBet = betAmount;
    balance -= betAmount;
    balanceDisplay.textContent = `Balance: $${balance}`;
    showCentralMessage("Shuffling Cards...");
    generateDeck();
    setTimeout(dealCards, 1000); // Deal after shuffling
  } else {
    showCentralMessage("Insufficient Balance! Place a smaller bet.");
  }
});

// Hit - Deal one more card to player
hitButton.addEventListener('click', () => {
  if (gameOver) return;

  playerHand.push(deck.pop());
  renderCards();
  updateScores();

  // If player's score exceeds 21, they bust
  if (calculateHandScore(playerHand) > 21) {
    showCentralMessage("You Bust! Dealer Wins.");
    endGame('dealer');
  }
});

// Stand - End player's turn and start dealer's turn
standButton.addEventListener('click', () => {
  if (gameOver) return;

  showCentralMessage("Dealer's Turn...");
  dealerTurn();
});

// Double Down - Double the bet and get one more card
doubleButton.addEventListener('click', () => {
  if (gameOver) return;

  if (playerBet * 2 <= balance) {
    playerBet *= 2;
    balance -= playerBet;
    balanceDisplay.textContent = `Balance: $${balance}`;

    playerHand.push(deck.pop());
    renderCards();
    updateScores();

    showCentralMessage("Dealer's Turn...");
    dealerTurn();
  } else {
    showCentralMessage("Insufficient Funds for Double Down!");
  }
});

// Dealer's Turn Logic (dealer must hit if under 17)
function dealerTurn() {
  while (calculateHandScore(dealerHand) < 17) {
    dealerHand.push(deck.pop());
    renderCards();
    updateScores();
  }

  // Determine winner
  if (calculateHandScore(dealerHand) > 21) {
    showCentralMessage("Dealer Busts! You Win.");
    endGame('player');
  } else {
    const playerScore = calculateHandScore(playerHand);
    const dealerScore = calculateHandScore(dealerHand);

    if (playerScore > dealerScore) {
      showCentralMessage("You Win!");
      endGame('player');
    } else if (playerScore < dealerScore) {
      showCentralMessage("Dealer Wins.");
      endGame('dealer');
    } else {
      showCentralMessage("It's a Tie!");
      endGame('tie');
    }
  }
}

// End the game, declare winner, and reset
function endGame(winner) {
  gameOver = true;
  hitButton.disabled = true;
  standButton.disabled = true;
  doubleButton.disabled = true;

  if (winner === 'player') {
    balance += playerBet * 2; // Player wins their bet back + winnings
  } else if (winner === 'dealer') {
    // Dealer wins, no money for the player
  } else if (winner === 'tie') {
    balance += playerBet; // Tie, return player's bet
  }

  balanceDisplay.textContent = `Balance: $${balance}`;

  // Reset the game after a delay
  setTimeout(() => {
    gameOver = false;
    showCentralMessage("Place your Bet to Start a New Round.");
  }, 2000);
}
