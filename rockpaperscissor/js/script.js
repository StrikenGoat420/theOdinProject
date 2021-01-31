/*
Now that we have written the basic html and css code using javascript
This file will contain the code to actually run the game properly
*/
function computerChoice(){
    //function returns a random integer in the range (0-2) 
    //0 ==> rock
    //1 ==> paper
    //2 ==> scissor
    let choice = Math.floor(Math.random()*3);
    if (choice == 0){
        return 'rock';
    }
    else if (choice == 1){
        return 'paper';
    }
    else {
        return 'scissor'
    }
}

//getting access to all the required things 
//player side
const player = document.getElementById('playerOne');
const playerScore = player.querySelector('.Score');
const playerButtons = player.querySelector('.Choices');
const playerRock = playerButtons.querySelector('.Rock');
const playerPaper = playerButtons.querySelector('.Paper');
const playerScissor = playerButtons.querySelector('.Scissor');

//computer side
const computer = document.getElementById('playerTwo');
const computerScore = computer.querySelector('.Score');
const computerButtons = computer.querySelector('.Choices');
const computerRock = computerButtons.querySelector('.Rock');
const computerPaper = computerButtons.querySelector('.Paper');
const computerScissor = computerButtons.querySelector('.Scissor');

function getPlayAgainDiv(){
    const playAgainDiv = document.createElement('div');
    playAgainDiv.className = 'playAgain'
    playAgainDiv.style.width = '45em';
    playAgainDiv.style.height = '120px';
    playAgainDiv.style.marginLeft = '30em';
    playAgainDiv.style.marginRight = '45em';
    playAgainDiv.style.backgroundColor = 'gray';
    playAgainDiv.className = 'playAgain';

    const textDiv = document.createElement('div');
    textDiv.textContent = 'Play Again?';
    textDiv.style.paddingBottom = '30px';
    textDiv.style.marginLeft = '300px';
    playAgainDiv.appendChild(textDiv);

    const buttonDiv = document.createElement('div');
    buttonDiv.style.justifyConten = 'center';
    buttonDiv.style.alignItems = 'center';
    const yesButton = document.createElement('button');
    yesButton.className = 'Yes';
    yesButton.style.marginLeft = '280px';
    yesButton.textContent = 'Yes';
    const noButton = document.createElement('button');
    noButton.className = 'No';
    noButton.textContent = 'No, Exit';
    buttonDiv.appendChild(yesButton);
    buttonDiv.appendChild(noButton);

    playAgainDiv.appendChild(buttonDiv);
    playAgainDiv.style.clear = 'both';
    return playAgainDiv;

}

function playAgain(){
    const yesButton = document.querySelector('.Yes');
    yesButton.addEventListener('click', () => {
        playerScore.textContent = 0;
        computerScore.textContent = 0;
        const playAgainNode = document.querySelector('.playAgain');
        playAgainNode.parentNode.removeChild(playAgainNode);
    });
    const noButton = document.querySelector('.No');
    noButton.addEventListener('click', () => {
        window.close();
    });
}


function playGame(userChoice){
    /*
    The userChoice is the event it self, ie. it has all the details about the button the user pressed, the time 
    the user pressed the button and so on.
    The event has many attributes, one of them is the target button itself (ie. the button which was actually pressed)
    Since every button has a class of their own, we can use userChoice.target.className to get the class of the button 
    and hence find out which button did the user actually press
    */
    //console.log(userChoice)
    userChoice = userChoice.target.className.toLowerCase();
    let compChoice = computerChoice();
    console.log(userChoice, compChoice);
    let userScore = Number(playerScore.textContent);
    let compScore = Number(computerScore.textContent);

    if (
        (userChoice == 'rock' && compChoice == 'scissor') || (userChoice == 'paper' && compChoice == 'rock') || 
        (userChoice == 'scissor' && compChoice == 'paper')
    ){
        userScore += 1;
        playerScore.textContent = userScore;
    }
    else if (
        (compChoice == 'rock' && userChoice == 'scissor') || (compChoice == 'paper' && userChoice == 'rock') || 
        (compChoice == 'scissor' && userChoice == 'paper')
    ){
        compScore += 1;
        computerScore.textContent = compScore;
    }

    if (userScore == 5 || compScore == 5){
        let playAgainDiv = getPlayAgainDiv();
        body.appendChild(playAgainDiv);
        playAgain();

    };
}

function intToText(int){

}

//console.log("Hello world");
//playerScore.textContent = Number(playerScore.textContent) + 1

//console.log(playerScore.textContent);
playerRock.addEventListener('click', playGame);
playerPaper.addEventListener('click', playGame);
playerScissor.addEventListener('click', playGame)

