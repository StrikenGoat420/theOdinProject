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
        if (_isEmpty(row, col)){
            let gameStatus = _checkGameOver();
            Object.assign(gameStatus, {legal : _isEmpty(row,col)});
            board[row][col] = element;
            //dom.placeElement(element, position) //TODO in the dom module, where the position is just going to be the id of the block where we will be placing
                                                  //the element
            return gameStatus;
        };
        let gameStatus = _checkGameOver();
        Object.assign(gameStatus, {legal : _isEmpty(row,col)});
        return gameStatus;
    };

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
                if (board[row][col] != board[prevRow][prevCol] || board[row][row] == null){
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
        //dom.resetBoard()//TODO this function
    }

    const getBoardState = function () {
        return board;
    }


    return {
        place,
        reset,
        getBoardState,
    };    
}())

const player = (function (sign, isHuman) {
    
    const insert = function (position) {
        if (isHuman) {
            let gameState = gameBoard.place(sign, position);
            return gameState;
        }
        else {
            //position = AI.getAIPosition()//TODO
            let gameState = gameBoard.place(sign, position);
            let aiSelection = document.getElementById(position);
            aiSelection.innerText = sign;
            return gameState;
        }
    }

    const getSign = function () {
        return sign;
    }

    const AI = (function(gameState){
        //doSomething
    });

    return {
        insert,
        getSign,

    }
    
})

const game = (function () {
    let humanPlayer = player('X', true);
    let aiPlayer = player('O', false);
    let humanTurn = true; //first chance is humans is human is X
    //dom.highlightButton('buttonX') //TODO function which highlights the button the user is
    //console.log('initially ' +humanPlayer.getSign(), aiPlayer.getSign());
    const choiceButtons = document.querySelectorAll('.choiceButton');
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id == 'buttonX'){
                humanPlayer = player('X', true);
                aiPlayer = player('O', false);
                gameBoard.reset(); //reset the board after every change
                //dom.highlightButton(button.id) //TODO function which highlights the button the user is
                //dom.removeHighlight('buttonO) //TODO function to remove the highlight from the other button
            }
            else if (button.id == 'buttonO'){
                humanPlayer = player('O', true);
                aiPlayer = player('X', false);
                humansTurn = false //first chance is AI'slet humanTurn = true;
                gameBoard.reset(); //reset the board after every change
                //dom.highlightButton(button.id) //TODO function which highlights the button the user is
                //dom.removeHighlight('buttonX) //TODO function to remove the highlight from the other button
            }
        })
    })

    let gameOver = false;
    let allBlocks = document.querySelectorAll('.button');
    /*
        CAN MAKE IT SUCH THAT EVERYTIME THE HUMAN MAKES A LEGAL MOVE WE LET THE AI MAKE A MOVE AS WELL, THAT WAY WE DO NOT
        HAVE TO USE A WHILE LOOP OR ANYTHING LIKE THAT

        THIS WILL MAKE THE humanTurn VARIABLE OBSOLETE, WE CAN DO SOMETHING LIKE 
        allBlocks.forEach(block () => {
            block.addEvenListener('click', () => {
                if human clicks on a valid button make appropriate symbol appear
                THEN let AI make a move

                ONLY CHANGE DOM AND LET AI MAKE A MOVE IF gameState['win'] and gameState['draw'] == False AND if gameState['legal'] == True
            })
        })
    */
   allBlocks.forEach(block  => {
        block.addEventListener('click', () => {
            let gameState = humanPlayer.insert(block.id);
            if (gameState['legal'] == true){
                block.innerText = humanPlayer.getSign();
                if (gameState['win'] == false && gameState['draw'] == false){
                    console.log('inside this')
                    gameState = aiPlayer.insert('b12'); 
                    /*
                        CONTINUE FROM HERE
                        AFTER THE HUMAN HAS MADE A MOVE, WE HAVE STORED THE GAME STATE IN THE gameState VARIABLE
                        THEN IF THE MOVE IS VALID WE LET THE AI MAKE THE MOVE AND THEN UPDATE THE GAME STATE. CHECK THE
                        UPDATED GAMESTATE ONCE THE AI HAS MADE THE MOVE TO CHECK WHETHER THE GAME IS OVER OR NOT. IF SO THEN 
                        DO APPROPRIATE THING AND RESET THE BOARD AFTER SHOWING A PROMPT OR SOMETHING THAT SAYS THE AI WON.

                        DO THE SAME FOR THE HUMAN PLAYER
                    */
                }
            }
            
        })
   })
}())

const dom = (function() {
    /*
    contains all the functions which will change the dom and the appearance 
    */
   //setting css property so that only the on the inside of the grid are shown
   const gameBoard = document.querySelector(".gameBoard");
   const gameButtons = document.querySelectorAll('.button');


}());