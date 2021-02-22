const gameBoard = (function () {
    /*
    DOM will be manipulated from the gameBoard only 
    just the things we can do with the board or are related to the board
    Like : Define the board //2d array

           place(element, position) // where to put what //insert will also manipulate the DOM to check, and insert an element at that position

           isEmpty (position) // if the place where the user wants to click is empty then only the move is valid //might or might not be a private func
                              // preferably it should be a private function. Something like if it returns false then the PLACE func also returns false 
                              // and the user has to choose another option

           clear //func to clear the board

           checkgameOver //func to check whether the game is over or not, if over whther it is a draw or a win. If a win who won.
                `        //this func will return the sign of the winner (ie. X won or O won)
                         //this func has to be in the gameboard itself as we will be defining the board over here, and the board has to be private and unaccesible from outside
                         //preferably a private func where after every turn (ie. after every PLACE) we check whether the game is over or not, and return a boolean accordingly
                         //something like returns false when game is not over, so the game can continue and true when it is over

           
    */
    // return {
    //     place,
    //     clear,
    // }
}())

const player = (function (sign) {
    /*
    Factory function and not a module hence this will not be executed immediately
    DOM will not be manipulated from here
    everything the player can do or related to the player
    Like : Define a const for the sign

           Define an attribute which tells use whether or not the player is a human or not

           Insert (position) //this function will call the gameBoard.place(element, position) function where the element will be the sign   
                             //and the position will be the position. The gameBoard.place func will return an object containing 3 boolean values
                             //win game-over and legal move. In turn this function will return that object into the game function, where depending on the situation
                             //the correct action will be taken (like if game if won, then what to do or if move is illegal then what to do).

                             //can also do something like if object['win'] === true, then we set the win flag for said player as true and then check the win
                             //flag at the game function to determine who has won. And this function will return only object['game-over' and 'legal move'] to the gameboard. Can 
                             //use the object.assign method
            
            giveUp // not an essential function, but if the player clicks on give up the game and the series will be over and the final score of which player has won
                   //more games can be shown
    */

    // return {
    //     insert,
    //     giveUp,
    // }
})

const game = (function () {
    /*
    Will be a module and hence be executed immediately 
    Contains everything that can be done in game or is related to the game
    Like : Define both the players (if user clicks on X then AI is O or if user clicks on O then AI is X)
           
           Define some sort of counter or turn based mechanism which will allow for the players to play one after other 
           //something like a boolean playerOneTurn where if the boolean is true then it is player one's turn else if it player two's turn

           Define gameOver boolean as well and set it to false. Start a while loop that runs while the boolean is not True
           //In the While loop after every players turn set the boolean as the same value as object['game-over'] from the object which will
           //be return after every player inserts his/her value at set position. Before checking for game-over check for player.win after each insert if the insert
           //is a legal move

           getPosition() //this function will return the position of where the user has clicked on the grid, which will be an array of size 2 or something like that 
                         //which will tell us the row and the col in which to insert said element. Can assign each grid block its own unique id, something like 00, 01, 02
                         //and so on, where the first int is the row and the second int is the col. Can use the split function to seperate the two. This function will only be
                         //in use if it is the human players turn. So in the while loop when it is the human players turn. So in the while loop check whether the player is a 
                         //human or not and if the player is a human then before the player.insert function use the getPosition function to find out which position the human
                         //has clicked.
            
            startNewGame() //this function will reset the board and start a new game if the user clicks on the newGame button 
            
            add the startNewGame button eventlistner as a normal object only which will call the startNewGame function. 
            add the select player eventlistener as a normal object as well in which if the player clicks on X, then assign value of X to player and so on
            most if not all of the eventlisteners will be in this function only, ie game difficulty(when implemented) and player sign and all. The getPosition function
            will have the eventlistener to check on which 'block' then user has clicked and then to return the id of said block
    */
}())

const dom = (function() {
    /*
    contains all the functions which will change the dom and the appearance 
    */
   //setting css property so that only the on the inside of the grid are shown
   const gameBoard = document.querySelector(".gameBoard");
   const gameButtons = document.querySelectorAll('.button');


}())

