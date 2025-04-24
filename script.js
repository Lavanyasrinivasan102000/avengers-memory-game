const heroes = [
    'ironman', 'thor', 'hulk', 'cap',
    'spiderman', 'blackwidow', 'wanda', 'loki',
    'hawkeye', 'vision', 'groot', 'starlord'
  ];
  
  let matchCount = 0;
  let firstCard = null;
  let secondCard = null;
  let moves = 0;
  let time = 0;
  let timerInterval = null;
  let boardLocked = false;
  
  const totalMatches = heroes.length;
  const gameBoard = document.getElementById('gameBoard');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const winMessage = document.getElementById('win-message');
  const restartBtn = document.getElementById('restartBtn');
  
  // Shuffle deck
  const cardDeck = [...heroes, ...heroes].sort(() => 0.5 - Math.random());
  
  // Create and append cards
  cardDeck.forEach(hero => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-name', hero);
    card.innerHTML = `
      <div class="front"></div>
      <div class="back" style="background-image: url('images/${hero}.jpg')"></div>
    `;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
  
  function flipCard() {
    if (boardLocked) return;
    if (this.classList.contains('flip')) return;
  
    this.classList.add('flip');
  
    if (!firstCard) {
      firstCard = this;
      if (moves === 0 && time === 0) startTimer();
      return;
    }
  
    secondCard = this;
    moves++;
    updateScore();
  
    checkForMatch();
  }
  
  function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  
    if (isMatch) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
  
      matchCount++;
  
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
  
      resetTurn();
  
      if (matchCount === totalMatches) {
        clearInterval(timerInterval);
        const winSound = document.getElementById('win-sound');
        winSound.currentTime = 0;
        winSound.play(); // 🎵 Play that Marvel victory
        setTimeout(() => {
          winMessage.style.display = 'block';
          restartBtn.style.display = 'inline-block';
        }, 500);
      }
      
    } else {
      boardLocked = true;
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetTurn();
      }, 1000);
    }
  }
  
  function resetTurn() {
    [firstCard, secondCard] = [null, null];
    boardLocked = false;
  }
  
  function updateScore() {
    scoreDisplay.textContent = `Moves: ${moves}`;
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      time++;
      timerDisplay.textContent = `Time: ${time}s`;
    }, 1000);
  }
  