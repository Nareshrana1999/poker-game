let balance = 1000;

function placeBet(choice) {
    let betAmount = parseInt(document.getElementById("bet-amount").value);
    if (betAmount > balance || betAmount <= 0) {
        alert("Invalid bet amount!");
        return;
    }

    balance -= betAmount;
    document.getElementById("balance").innerText = `$${balance}`;

    // Show all cards immediately after bet
    let winner = playAndarBahar();

    let winMultiplier = {
        "andar": 2,
        "bahar": 2,
        "fullHouse": 5
    };

    // Determine the win message based on the user's bet and the winner
    let resultMessage;
    if (choice === winner) {
        balance += betAmount * winMultiplier[choice];
        resultMessage = `You won! ${capitalizeFirstLetter(winner)} won! Your new balance is $${balance}`;
    } else {
        resultMessage = `You lost! ${capitalizeFirstLetter(winner)} won! Your new balance is $${balance}`;
    }

    document.getElementById("result-text").innerText = resultMessage;

    document.getElementById("balance").innerText = `$${balance}`;

    if (balance <= 0) {
        alert("Game Over! Your balance is zero.");
        resetGame();
    }
}

function playAndarBahar() {
    let houseCard = Math.floor(Math.random() * 13) + 1;
    let andarOrBahar = Math.random() < 0.5 ? "andar" : "bahar";
    let fullHouse = Math.random() < 0.1 ? "fullHouse" : null; // Simulate 10% chance for Full House

    document.getElementById("andar-cards").innerHTML = "";
    document.getElementById("bahar-cards").innerHTML = "";
    document.getElementById("full-house-cards").innerHTML = "";

    // Update to use specific card image names based on your format
    const suits = ["clubs", "hearts", "diamonds", "spades"];
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    function getRandomCard() {
        let rank = ranks[Math.floor(Math.random() * ranks.length)];
        let suit = suits[Math.floor(Math.random() * suits.length)];
        return `${rank}_of_${suit}`;
    }

    // Display Andar and Bahar cards
    for (let i = 0; i < 6; i++) {
        let cardAndar = document.createElement("img");
        cardAndar.src = "images/" + getRandomCard() + ".png";
        cardAndar.classList.add("card");
        document.getElementById("andar-cards").appendChild(cardAndar);

        let cardBahar = document.createElement("img");
        cardBahar.src = "images/" + getRandomCard() + ".png";
        cardBahar.classList.add("card");
        document.getElementById("bahar-cards").appendChild(cardBahar);
    }

    // Display Full House cards (only if Full House is triggered)
    if (fullHouse) {
        for (let i = 0; i < 5; i++) {
            let cardFullHouse = document.createElement("img");
            cardFullHouse.src = "images/" + getRandomCard() + ".png";
            cardFullHouse.classList.add("card");
            document.getElementById("full-house-cards").appendChild(cardFullHouse);
        }
    }

    // Return the winner (Andar, Bahar, or Full House)
    if (fullHouse) {
        return "fullHouse"; // Full House has higher priority, so we return it first
    } else {
        return andarOrBahar; // Return either Andar or Bahar
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
