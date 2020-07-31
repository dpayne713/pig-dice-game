/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

///////////         DECLARE VARIABLES               ///////////////

let gameOver = false;  
let scores = [0,0];
let roundScore = 0; 
let activePlayer = Math.floor(Math.random()*2);
document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
let diceDOM = document.querySelector('.dice');

let p1ScoreDisplay = document.getElementById('score-0');
let p2ScoreDisplay = document.getElementById('score-1');
let p1CurrentScoreDisplay = document.getElementById('current-0');
let p2CurrentScoreDisplay = document.getElementById('current-1');

diceDOM.style.display = 'none';
diceDOM.classList.remove('looser');

function initializeScores() {
    p1ScoreDisplay.textContent = scores[0];
    p2ScoreDisplay.textContent = scores[1];

    p1CurrentScoreDisplay.textContent = '0';
    p2CurrentScoreDisplay.textContent = '0';
};
initializeScores();

///////////           ROLL DICE BUTTON               /////////////
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameOver === false) {
        ///////////       generate random number     
        let dice = Math.floor(Math.random() * 6 + 1);
        ///////////        DISPLAY APPROPRIATE DICE 
        diceDOM.style.display = 'block';
        diceDOM.src = 'images/dice-' + dice + '.png'; 
        ///////////        ADD TO ROUND SCORE          
        if (dice !== 1) {
            roundScore += dice; 
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else {
            diceDOM.classList.add('looser')
            setTimeout(switchPlayers, 1500)
            
        }
    } else {
        ///         HOLD Game           ///
        ///         Wait for reset      ///
    }      
});    
///////////           HOLD BUTTON                 /////////////
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameOver === false) {
        //UPDATE ACTIVE PLAYER SCORE
        scores[activePlayer] += roundScore; 
        p1ScoreDisplay.textContent = scores[0];
        p2ScoreDisplay.textContent = scores[1];    
    
        if (scores[activePlayer] >= 100) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('.player-name');
            gameOver = true; 
        } else {
            switchPlayers()
        }
    } else {
        ///         HOLD Game           ///
        ///         Wait for reset      ///
    }    
});
///////////           NEW GAME BUTTON                 /////////////
document.querySelector('.btn-new').addEventListener('click', function() {
    gameOver = false;  
    scores = [0,0];
    roundScore = 0; 
    activePlayer = Math.floor(Math.random()*2);

    initializeScores();

    diceDOM.style.display= 'none';

    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0  ? activePlayer = 1 : activePlayer = 0; 
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('.player-name');
})


///////////          Callable FUNCTIONS                /////////////
function switchPlayers() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0  ? activePlayer = 1 : activePlayer = 0; 
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    roundScore = 0; 
    p1CurrentScoreDisplay.textContent = '0';
    p2CurrentScoreDisplay.textContent = '0';
    diceDOM.classList.remove('looser')
    diceDOM.style.display= 'none';
    
}
