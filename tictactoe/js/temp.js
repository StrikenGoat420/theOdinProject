//checking for left diagonal // right to left 02, 11, 20  or 13,22,31
            //as row increases col = len(col) - row

let board = [['X','X','O'], ['X','O', null], ['O', null, null]];

let same = false;
for (let row = 1; row < board.length; row++){
    let col = board[row].length - row -1;//cuz 0 index and board[row].length will give us 3, but we need 2
    let prevRow = row-1;
    let prevCol = board[row].length - prevRow -1
    console.log(`comparing row : ${row} col : ${col} to prevRow : ${prevRow} prevCol : ${prevCol}`);
    if (board[row][col] != board[prevRow][prevCol] || board[row][col] == null){
        same = false;
        break;
    }
    else if (board[row][col] == board[prevRow][prevCol]){
        same = true;
    }
}
console.log(same)
 //no need to check for same == true, cuz regardless we have to send the output no
//02, 11, 20