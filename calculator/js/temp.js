function alternateSetDefaultStyle(){
    let start_col = 1;
    let start_row = 4;
    for (let i = 1; i<10; i++){
        let sCol = start_col;
        let eCol = sCol+1;
        let sRow = start_row;
        let eRow = sRow+1;
        let id = 'n'+i
        let num = document.getElementById(id);
        num.style.grid
        num.style.gridColumnStart = sCol;
        num.style.gridColumnEnd = eCol;
        num.style.gridRowStart = sRow;
        num.style.gridRowEnd = eRow;
        //console.log(`Num ${i} Col ${sCol} - ${eCol} Row ${sRow} - ${eRow}`);
        start_col += 1;
        if (i%3 == 0){
            start_row -= 1;
            start_col = 1;
        }
    }
}
//<div class="number" id="n7" style="grid-area: 2 / 1 / 3 / 2;">7</div>