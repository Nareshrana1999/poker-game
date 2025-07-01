
# Poker Game Collection


This repository contains a collection of classic card games implemented in JavaScript, HTML, and CSS. Each game is self-contained in its own folder with all necessary assets and logic.

**▶️ [Play Online Instantly](https://nareshrana1999.github.io/poker-game/)**

The games included are:

- **Blackjack**
- **Teen Patti**
- **Andar-Bahar**

## Table of Contents
- [Project Structure](#project-structure)
- [Game Details](#game-details)
  - [Blackjack](#blackjack)
  - [Teen Patti](#teen-patti)
  - [Andar-Bahar](#andar-bahar)
- [How to Run](#how-to-run)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

```
index.html                # Main menu or landing page
images/                   # Preview images for each game
Andar-Bahar/
  game.js                 # Game logic
  index.html              # Game UI
  style.css               # Styling
  images/                 # Card images
Blackjack/
  script.js               # Game logic
  index.html              # Game UI
  style.css               # Styling
  images/                 # Card images
TeenPatti/
  script.js               # Game logic
  index.html              # Game UI
  style.css               # Styling
  images/                 # Card images
```

## Game Details

### Blackjack
- Classic 21 card game against the dealer.
- Features: Hit, Stand, Double Down, betting system, balance tracking.
- UI updates dynamically with card images and messages.
- Dealer follows standard rules (hits under 17).

### Teen Patti
- Indian poker game, each player gets 3 cards.
- Hand rankings: Trail (Three of a Kind), Straight, Flush, Pair, High Card.
- Place bets, balance updates, and results shown after each round.

### Andar-Bahar
- Simple betting game: bet on "Andar" or "Bahar" (or rare "Full House").
- Randomly determines winner and displays cards for each side.
- Balance is updated based on bet and outcome.

## How to Run

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Nareshrana1999/poker-game.git
   ```
2. **Open the project folder.**
3. **Open `index.html` in your web browser.**
   - You can double-click the file or use a local server (recommended for best results).
   - For a local server, you can use VS Code Live Server extension or run:
     ```sh
     # Python 3.x
     python -m http.server
     # or
     npx serve .
     ```
   - Then visit `http://localhost:8000` (or the port shown) in your browser.

## Features
- Modular structure: each game is self-contained.
- All card images included for realistic visuals.
- Simple, intuitive UI for each game.
- Balance and betting system for added challenge.
- No backend required—runs entirely in the browser.

## Requirements
- Modern web browser (Chrome, Firefox, Edge, Safari, etc.)
- No installation or dependencies required for basic use.

## Contributing
Pull requests are welcome! If you want to add new games, improve code structure, or fix bugs, please fork the repo and submit a PR.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Additional Notes
- All game logic is implemented in plain JavaScript for maximum compatibility and learning value.
- Deck generation and shuffling are currently duplicated in each game; future refactoring could modularize this logic for maintainability.
- No user data is stored or sent to any server. All gameplay is local and private.
- For any issues, suggestions, or feature requests, please open an issue or pull request on the [GitHub repository](https://github.com/Nareshrana1999/poker-game).

## Author & Contact

Created and maintained by **Naresh Rana**  
GitHub: [Nareshrana1999](https://github.com/Nareshrana1999)  
Email: nareshrana1999@outlook.com

---

## License

MIT License

Copyright (c) 2025 Naresh Rana

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
