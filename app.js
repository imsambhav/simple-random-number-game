// Game Values
let min = 1,
  max = 10,
  winNum = getRandomNum(min, max),
  guessLeft = 3;

// UI Element
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  gussBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play agin event listner
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
gussBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  // Game over win!!
  // Check if win
  if (guess == winNum) {
    gameOver(true, `${winNum} is correct!, YOU WON!!`);
  } else {
    // Wrong number
    guessLeft -= 1;

    if (guessLeft === 0) {
      gameOver(false, `Game over, you lost. The correct number was ${winNum}!`);
    } else {
      // Game continue - answer wrong
      // Change border color
      guessInput.style.borderColor = 'red';
      // Clear input
      guessInput.value = '';
      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessLeft} guesses left.`, 'red');
    }
  }
});

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again?
  gussBtn.value = 'Play Again';
  gussBtn.className += 'play-again';
}

// Get winning number - Random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
