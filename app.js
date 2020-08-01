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
let AI= false;  
let scores = [0,0];
let roundScore = 0; 
let activePlayer = Math.floor(Math.random()*2);
document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
let diceDOM = document.querySelector('.dice');


let p1ScoreDisplay = document.getElementById('score-0');
let p2ScoreDisplay = document.getElementById('score-1');
let p1CurrentScoreDisplay = document.getElementById('current-0');
let p2CurrentScoreDisplay = document.getElementById('current-1');
let p2Name = document.getElementById('name-1');

diceDOM.style.display = 'none';
diceDOM.classList.remove('looser');

function initializeScores() {
    p1ScoreDisplay.textContent = scores[0];
    p2ScoreDisplay.textContent = scores[1];

    p1CurrentScoreDisplay.textContent = '0';
    p2CurrentScoreDisplay.textContent = '0';
};

initializeScores();

function runGame() {
    document.querySelector('.btn-roll').removeEventListener('click', roll);   
    document.querySelector('.btn-hold').removeEventListener('click', hold);
    if (AI === true && activePlayer === 1){
        setTimeout(function() {
            if (roundScore < 15) {
                roll();
            } else {
                hold();
            };
        },750);
                
    } else {
        document.querySelector('.btn-roll').addEventListener('click', roll);
        document.querySelector('.btn-hold').addEventListener('click', hold);  
    } 
};
runGame(); 

///////////           NEW GAME BUTTONS                /////////////
document.querySelector('.btn-new').addEventListener('click', function() {
    AI = false; 
    p2Name.textContent= 'Player 2'
    newGame();
});

document.querySelector('.btn-new-ai').addEventListener('click', function() {
     AI = true; 
    p2Name.textContent= 'AI';
    newGame();
   
});

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
    runGame();
    
}

function roll() {
    if (gameOver === false) {
        ///////////       generate random number     
        let dice = Math.floor(Math.random() * 6 + 1);
        console.log(dice)
        ///////////        DISPLAY APPROPRIATE DICE 
        diceDOM.style.display = 'block';
        diceDOM.src = 'images/dice-' + dice + '.png'; 
        ///////////        ADD TO ROUND SCORE          
            if (dice !== 1) {
                roundScore += dice; 
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                runGame();
            } else {
                diceDOM.classList.add('looser')
                setTimeout(switchPlayers, 1500) 
            }
            document.querySelector('.btn-roll').removeEventListener('click', function() {
                roll();   
            });    
    } else {
        ///         HOLD Game           ///
        ///         Wait for reset      ///
    }   
}
function hold() {
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
            switchPlayers();
        }
        document.querySelector('.btn-hold').removeEventListener('click', function() {
            hold();
        });
    } else {
        ///         HOLD Game           ///
        ///         Wait for reset      ///
    }    
}

function newGame() {
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
    runGame();
}