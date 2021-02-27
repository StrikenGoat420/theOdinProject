
/*
TODO: Implement MINIMAX Algorithm for the AI
*/
const DOM = (function() {
    /*
    contains all the functions which will change the dom and the appearance 
    */
   const resetBoard = (function () {
       for (let i = 0; i < 3; i++){
           for (let j = 0; j < 3; j++){
               let id = 'b'+i+j;
               let element = document.getElementById(id);
               element.innerText = '';
           }
       }
   });

   const placeElement = (function(sign, id){
       let element = document.getElementById(id);
       element.innerText = sign;
   });

   const highlightButton = (function (buttonId) {
        let button = document.getElementById(buttonId);
        button.style.border = '3px solid';
   })

   const removeHighlight = (function (buttonId){
        let button = document.getElementById(buttonId);
        button.style.border = 'none';
   })

   const removeElement = (function (buttonId) {
       let button = document.getElementById(buttonId);
       button.innerText = '';
   })

   return {
       resetBoard,
       placeElement,
       highlightButton,
       removeHighlight,
       removeElement,
   }
}());

const gameBoard = (function () {

    const _getEmptyBoard = function() {
        let board = [];
        for(let i = 0; i<3; i++){
            let row = [null,null,null];
            board.push(row);
        }
        return board;
    }

    let board = _getEmptyBoard();

    const place = function(element, position){
        //function takes in the element and the position where the element has to be inserted at.
        //position is in the form of a string, such as b00, b01 and so on so we have to use substring method.

        //func returns an object containing 3 attributes, draw, win, and legal 
        let row = Number(position[1]);
        let col = Number(position[2]);
        //console.log(`row is ${row} and col is ${col} isEmpty check output is ${_isEmpty(row,col)}`);
        if (_isEmpty(row, col)){
            board[row][col] = element;
            let gameStatus = _checkGameOver();
            Object.assign(gameStatus, {legal : true});
            if (gameStatus['win'] == true){
                Object.assign(gameStatus, {winner : element});
            }
            DOM.placeElement(element, position)
            return gameStatus;
        };
        //let gameStatus = _checkGameOver();
        //Object.assign(gameStatus, {legal : false});
        return {legal : false};
    };

    const placeForAI = function (element, position){
        let row = Number(position[1]);
        let col = Number(position[2]);
        //console.log(`row is ${row} and col is ${col} isEmpty check output is ${_isEmpty(row,col)}`);
        if (_isEmpty(row, col)){
            board[row][col] = element;
            let gameStatus = _checkGameOver();
            Object.assign(gameStatus, {legal : true});
            if (gameStatus['win'] == true){
                Object.assign(gameStatus, {winner : element});
            }
            return gameStatus;
        };
        //let gameStatus = _checkGameOver();
        //Object.assign(gameStatus, {legal : false});
        return {legal : false};
    }

    const removeElement = function(position){
        let row = Number(position[1]);
        let col = Number(position[2]);
        board[row][col] = null;
        //DOM.removeElement(position);
    }

    const _isEmpty = function(row, col){
        if (board[row][col] === null){
            return true;
        }
        return false;
    };

    const _checkGameOver = function(){
        let win = _checkWin();
        let draw = _checkDraw();
        return {
            win,
            draw,
        }
        //returns Object with 2 attributes win and draw
    };

    const _checkWin = function(){
        _checkCols = (function () { //function to check whther the winner is in cols
            let same = false; //boolean value, which if true means that the winner has won by having 3 consecutives values in a col
            for (let col = 0; col < board[0].length; col++){ 
                for(let row = 1; row < board.length; row++){
                    if(board[row][col] != board[row-1][col]){
                        same = false;
                        break;
                    }
                    else if (board[row][col] != null){ 
                        same = true;
                    }
                }
                if (same == true){
                    return same; 
                }
            }
            return same;
        });
    
        _checkRows = (function () { //function to check whther the winner is in rows
            let same = false;
            for (let row = 0; row < board.length; row++){
                for (let col = 1; col < board[row].length; col++){
                    if(board[row][col] != board[row][col-1]){
                        same = false;
                        break;
                    }
                    else if (board[row][col] != null){ //
                        same = true;
                    }
                }
                if (same == true){
                    return same;
                }
            }
            return same;
        });

        _checkDiag = (function () { //function to check whther the winner is in diags
            let same = false;
            
            //checking for right diagolnal //left to right 00,11,22
            for (let row = 1; row<board.length; row++){
                if (board[row][row] != board[row-1][row-1] || board[row][row] == null){
                    same = false;
                    break;
                }
                else if(board[row][row] == board[row-1][row-1]){
                    same = true;
                }
            }

            if (same == true){ //if right diagonal is the winner then no need to check left diagonal
                return same;
            };
            
            //checking for left diagonal // right to left 02, 11, 20  or 13,22,31
            //as row increases col = len(col) - row
            for (let row = 1; row < board.length; row++){
                let col = board[row].length - row -1;//cuz 0 index and board[row].length will give us 3, but we need 2
                let prevRow = row-1;
                let prevCol = board[row].length - prevRow -1
                if (board[row][col] != board[prevRow][prevCol] || board[row][col] == null){
                    same = false;
                    break;
                }
                else if (board[row][col] == board[prevRow][prevCol]){
                    same = true;
                }
            }
            return same; //no need to check for same == true, cuz regardless we have to send the output now
        });

        
        
        return _checkCols() || _checkRows() || _checkDiag();
    };

    const _checkDraw = function(){
        for (let i = 0; i<board.length; i++){
            for (let j = 0; j<board[i].length; j++){
                if(_isEmpty(i, j)){
                    return false; // if even a single block is empty that means the game isn't a draw
                }
            }
        }
        return true; //if nothing is return in the for loops then that means that all the blocks are full and hence game is a draw
    }

    const reset = function(){
        //function to reset the game board, to be used when user clicks on the play again button
        board = _getEmptyBoard();
        DOM.resetBoard()//TODO this function
        // for (let i = 0; i)
    }

    const getBoardState = function () {
        return board;
    }

    // place('X', 'b00');
    // place('X', 'b01');
    // place('O', 'b11');
    // place('O', 'b02');
//    place('X', 'b10');
//    place('X', 'b12');


    return {
        place,
        reset,
        getBoardState,
        removeElement,
        placeForAI,
    };    
}())

const player = (function (sign, isHuman) {
    //if ai is O, then isMaximizing will be false
    //if ai is X, then isMaximizing will be true    
    const insert = function (position) {
        if (isHuman) {
            let gameState = gameBoard.place(sign, position);
            return gameState;        
        }
        else {
            position = AI.getBestMove()
            let gameState = gameBoard.place(sign, position);
            return gameState;
            // position = AI.genRandomMove();
            // let gameState = gameBoard.place(sign, position);
            // if (gameState['legal'] == true){
            //     return gameState;
            // }
            // else {
            //     while (gameState['legal'] != true){
            //         position = AI.genRandomMove();
            //         gameState = gameBoard.place(sign, position);
            //         console.log('in while')
            //     };
            //     return gameState;
            // }
        }
    }

    const getSign = function () {
        return sign;
    }

    const AI = (function(){
       const genRandomMove = function () {
           let col = Math.floor(Math.random()*3);
           let row = Math.floor(Math.random()*3);
           return 'b'+String(row)+String(col);
       };

       const signPoints = {
           //the player who is X will try to maximize the points and the player who is O will try to minimize the points
           X : 10,
           O : -10,
           Draw : 0
       }

       const getBestMove = (function () {
           let move;
           let isMax = false || (sign == 'X'); //X will maximize and O will minimize
           let bestScore;

           if(isMax == false){
               bestScore = Infinity
           }
           else {
               bestScore = -Infinity;
           }

           for (i = 0; i < 3; i++){
               for (j = 0; j<3; j++){
                   let position = 'b'+i+j;
                   let gameState = gameBoard.placeForAI(sign, position);
                   if (gameState['legal'] == true){
                       let score = miniMax(0, !isMax, gameState); //not isMax cuz if AI is X, then it has already made the first move, so the next move will be of
                                                                  //the minimizing player. And Vice-versa
                       console.log(`score for i : ${i} j : ${j} is ${score}`);
                       console.log('-----')
                       gameBoard.removeElement(position);
                       if (isMax == false && score < bestScore){
                            bestScore = score;
                            move = {i,j};
                       }
                       else if (isMax == true && score > bestScore){
                           bestScore = score;
                           move = {i,j}
                       }
                   }
               }
           }
           return 'b'+move.i+move.j;
       })

       const miniMax = function (depth, isMax, gameState){
           if (gameState['win'] == true){
               return signPoints[gameState.winner];
           }
           else if (gameState['draw'] == true){               
               return signPoints['Draw']
           }
           
           if (isMax){
               let bestScore = -Infinity;
               for (let i = 0; i < 3; i++){
                   for (let j = 0; j < 3; j++){
                       let position = 'b'+i+j;
                       let gameState = gameBoard.placeForAI('X', position); //only X will be maximizing
                       if (gameState['legal'] == true){
                           let score = miniMax(depth+1, false, gameState);
                           //console.log(`for ${i}${j} score is ${score}`);                           
                           gameBoard.removeElement(position);
                           bestScore = Math.max(score, bestScore);
                       }                     
                   }
               }
               return bestScore;
           }

           else {
               let bestScore = Infinity;
               for (let i = 0; i < 3; i++){
                   for (let j = 0; j < 3; j++){
                       let position = 'b'+i+j;
                       let gameState = gameBoard.placeForAI('O', position);
                       if (gameState['legal'] == true){
                           let score = miniMax(depth+1, true, gameState);
                        //    console.log(`isMin score is ${score} for move ${i} ${j}`);
                           gameBoard.removeElement(position);
                           bestScore = Math.min(score, bestScore);
                       }                       
                   }
               }
               return bestScore;
           }
       }

        

       return {
           genRandomMove,
           getBestMove,
       }
    })();

    return {
        insert,
        getSign,

    }
    
})

const game = (function () {
    let humanPlayer = player('X', true);
    let aiPlayer = player('O', false);
    DOM.highlightButton('buttonX') //function which highlights the button the user is
    const choiceButtons = document.querySelectorAll('.choiceButton');
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id == 'buttonX'){
                humanPlayer = player('X', true);
                aiPlayer = player('O', false);
                gameBoard.reset(); //reset the board after every change
                DOM.highlightButton(button.id) //TODO function which highlights the button the user is
                DOM.removeHighlight('buttonO') //TODO function to remove the highlight from the other button
            }
            else if (button.id == 'buttonO'){
                humanPlayer = player('O', true);
                aiPlayer = player('X', false);
                gameBoard.reset(); //reset the board after every change 
                DOM.highlightButton(button.id) 
                DOM.removeHighlight('buttonX')
                aiPlayer.insert(); //first chance is the AI's if AI is X, so inserting AI's choice first
            }
        })
    })
    let allBlocks = document.querySelectorAll('.button');
    allBlocks.forEach(block  => {
        block.addEventListener('click', () => {
            let gameState = humanPlayer.insert(block.id);
            if (gameState['legal'] == true){ //only let the AI move once the human makes a legal game move
                let gameOver = checkGameOver(gameState);
                if (!gameOver){
                    gameState = aiPlayer.insert(); 
                    gameOver = checkGameOver(gameState);
                    if (gameOver && aiPlayer.getSign() == 'X'){
                        aiPlayer.insert();
                    }
                };                
            }
            
        })
   })

    const checkGameOver = function (gameState){
        if (gameState['win'] == true){
            alert(gameState['winner'] + ' has won');
            gameBoard.reset();
            return true;
        };
        if (gameState['draw'] == true){
            alert('game drawn');
            gameBoard.reset();
            return true;
        };
        return false;
   }
}())


