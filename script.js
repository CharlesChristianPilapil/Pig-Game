'use strict';

// select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const swithPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // console.log(dice);
      
        if (dice !== 1) {
          currentScore += dice;
          document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } 
        
        else {
          swithPlayer();
        }
    }

});


btnHold.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    
        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            alert(`Player ${activePlayer+1} wins...`);
            diceEl.classList.add('hidden');
        } else {
            swithPlayer();
        }
    }
});

btnNew.addEventListener('click', () => {

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    

    for (let i = 0; i < 2; i++) {
        scores[i] *= 0;
        playing = true;
        currentScore  *= 0;
        document.querySelector(`#current--${i}`).textContent = 0;
        document.querySelector(`#score--${i}`).textContent = 0;
    }

    activePlayer = 0;

});