/*
A basic gui for a rock paper scissor game. The idea is that inside the body element we will have two divs side by side.
The divs will be side by side using the float left css property. The two divs will belong to the user and the computer.

Both the divs will be given the same class named "players"
Both the players class will be similar. 

Inside the player class we will a heading denoting whether a player is a computer of a human.
We will also have another div inside the player class, the class of this div will be called 'score'

The 'score' div will be used to maintain the score of each player

Below the 'score' div we will have another div with the class named 'options'
This div will have all the options the user can select

The options themselves will be 3 buttons placed side using the float left css property again
*/

function getPlayer(name){
    //since both the players div is going to be the same this function will return those divs respectively
    //the name parameter is passed by the user, so that the appropriate title can be used ie. "Player" as the heading of the player side 
    //and "Comp" as the heading of the computer side
    const player = document.createElement('div');
    //player.style.backgroundColor = 'white'
    player.className = 'Players';
    player.style.height = '250px';
    player.style.width = '45em';
    player.style.float = 'left';

    if (name.toLowerCase() == 'player'){
        //player.style.float = 'left';
        player.style.paddingLeft = '5em' ;
        player.style.paddingRight = '5em' ;
        player.id = 'playerOne';
    }
    else {
        //player.style.paddingRight = '250px';
        //player.style.paddingLeft = '10em' ;
        //player.style.paddingRight = '30em' ;
        //player.style.float = 'left';
        player.style.paddingLeft = '5em' ;
        player.style.paddingRight = '5em' 
        player.id = 'playerTwo';
    };

    const pname = document.createElement('h2');
    pname.style.marginBottom = '10px'
    
    pname.style.backgroundColor = 'gray';
    pname.textContent = name;
    pname.style.align = 'center';

    player.appendChild(pname)

    //todo later
    const score = document.createElement('div');
    score.style.backgroundColor = 'gray'
    score.style.paddingLeft = '2em';
    score.style.paddingRight = '2em';
    score.style.height = '5em';
    score.className = 'Score';
    score.style.textAlign = 'right';
    score.textContent = 0;
    //score.textContent.align = 'right';
    player.appendChild(score);

    const choices = document.createElement('div');
    choices.className = 'Choices'
    const rock = document.createElement('button');
    //wrong - need to give the buttons an id as well
    //two elements cannot have the same id, hence each button should have a class
    rock.className =  'Rock';
    rock.textContent = 'rock';
    const paper = document.createElement('button');
    paper.className = 'Paper';
    paper.textContent = 'paper';
    const scissor = document.createElement('button');
    scissor.className = 'Scissor';
    scissor.textContent = 'scissor';

    let choicesArr = [rock, paper, scissor];
    
    for(let i = 0; i<choicesArr.length; i++){
        //choicesArr[i].style.float= 'left';
        choices.appendChild(choicesArr[i]);
    };
    player.appendChild(choices);
    
    return player;
    
}

//all the other elements will be a child of this element
const body = document.querySelector('body');
body.style.backgroundColor = 'black';
const human = getPlayer('Player');
const comp = getPlayer('Comp');
body.appendChild(human);
body.appendChild(comp);

/*
const player = document.createElement('div');
player.style.height = '100px';
player.style.width = '100px';
player.style.paddingLeft = '150px'

//player.style.border = '5px'
player.className = "Player";
player.style.float = 'left';

let pname = document.createElement('h2');
pname.textContent = "Player";
player.appendChild(pname);;
body.appendChild(player);

const temp = document.createElement('div');
temp.style.float = 'left';
player.className = "Player";

pname = document.createElement('h2');
pname.textContent = "Comp";
temp.appendChild(pname);;
body.appendChild(temp);
*/

/*
goal of this project is to learn to manipulate the dom using javascript properly, hence the whole html and css template is created using this file only
*/