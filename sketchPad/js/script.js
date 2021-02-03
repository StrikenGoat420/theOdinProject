function setCount(numRows){
    //n is the number of rows and coloumns. Both will be the same
    //when in default count, number of boxes will be 4*4
    //color scheme will be rainbow
    //container.appendChild(block.cloneNode(1)); //check this method out later

    //container.style.gridTemplateColumns = 'repeat(10,10%)'
    let blockSizePercent = (1/numRows)*100;
    let gridTemplateString = 'repeat('+numRows+','+blockSizePercent+'%)';
    //console.log('num rows is ' +numRows);
    container.style.gridTemplateColumns = gridTemplateString;
    container.style.gridTemplateRows = gridTemplateString;
    
    while (container.childElementCount != numRows*numRows){
        if (container.childElementCount < numRows*numRows){
            //console.log('inside first if')
            const block = document.createElement('div');
            block.className = 'blocks';
            //console.log(container.childElementCount);
            container.appendChild(block);
        }
        else if (container.childElementCount > numRows*numRows) {
            //console.log("inisde else");
            container.removeChild(container.lastChild);
        }
    }

}

function getRandomRGB(){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    //let rgb = "rgb(" + a + "," + b + "," + c + ")"; 
    let rgb = "rgb("+[r,g,b].join(",")+")"; // better way of doing the above line
    return rgb;
}


//same as changeBackGroundColor = function(item){}
changeBackGroundColor = (item, hoverMode, color) => {
    //item is the block whose color has to be changed
    /*
    item : the block whose color has to be changed

    mode : There will be two modes essentially, 
           hoverMode == true : where the color of the blocks change 
                       only when we hover over them (ie. rainbow, black, custom, and eraser).
           hoverMode == false:  The second mode is all the blocks have to change color and become white, this mode will
                       be used when the user changes the size of the grid, so everything resets and all the blocks become white.

    color : It is the color which the block should be.
    */
    if (hoverMode){
        item.addEventListener('mouseover', () => {
            //let currentColor = getComputedStyle(item).getPropertyValue('background-color');
            if (color.toLowerCase() == 'rainbow'){
                //console.log(hoverMode == true);
                item.style.backgroundColor = getRandomRGB();
            }
            if (color.toLowerCase() == 'black'){
                item.style.backgroundColor = 'black';
            }
            if (color.toLowerCase() == 'eraser'){
                item.style.backgroundColor = 'white';
            }
        })
    }
    else{
        item.style.backgroundColor = 'white';

        item.addEventListener('mouseover', () => {
            //let currentColor = getComputedStyle(item).getPropertyValue('background-color');
            if (color.toLowerCase() == 'rainbow'){
                //console.log(hoverMode == true);
                item.style.backgroundColor = getRandomRGB();
            }
            if (color.toLowerCase() == 'black'){
                item.style.backgroundColor = 'black';
            }
            if (color.toLowerCase() == 'eraser'){
                item.style.backgroundColor = 'white';
            }
        })
    }
    
}

addSizeListener = button => {
    if (button.id == 'B1'){
        button.addEventListener('click', () => {
            //console.log('button 1 is pressed');
            setCount(4);
            box = container.querySelectorAll('.blocks');
            //box.forEach(changeBackGroundColor);
            for (block of box){
                changeBackGroundColor(block, 0, COLOR);
            };
        })
    }
    else if (button.id == 'B2'){
        button.addEventListener('click', () => {
            setCount(16);
            box = container.querySelectorAll('.blocks');
            //box.forEach(changeBackGroundColor);
            for (block of box){
                changeBackGroundColor(block, 0, COLOR);
            };
        })
    }
    else if (button.id == 'B3'){
        button.addEventListener('click', () => {
            setCount(32);
            box = container.querySelectorAll('.blocks');
            //box.forEach(changeBackGroundColor);
            for (block of box){
                changeBackGroundColor(block, 0, COLOR);
            };
        })
    }
    else if (button.id == 'B4'){
        button.addEventListener('click', () => {
            setCount(64);
            box = container.querySelectorAll('.blocks');
            //box.forEach(changeBackGroundColor);
            for (block of box){
                changeBackGroundColor(block, 0, COLOR);
            };
        })
    }
}

colorChangeListener = button => {
    if (button.id == 'B5'){
        button.addEventListener('click', () => {
            //console.log('button 5 is pressed');
            COLOR = 'rainbow'
            box = container.querySelectorAll('.blocks');
            //box.forEach(changeBackGroundColor);
            for (block of box){
                changeBackGroundColor(block, 1, COLOR);
            };
        })
    }
    else if (button.id == 'B6'){
        button.addEventListener('click', () => {
            //console.log('button 6 is pressed');
            COLOR = 'black';
            box = container.querySelectorAll('.blocks');
            //box.forEach(changeBackGroundColor);
            for (block of box){
                changeBackGroundColor(block, 1, COLOR);
            };
        })
    }
    else if (button.id == 'B7'){
        button.addEventListener('click', () => {
            //console.log('button 7 is pressed');
            COLOR = 'eraser';
            box = container.querySelectorAll('.blocks');
            //box.forEach(changeBackGroundColor);
            for (block of box){
                changeBackGroundColor(block, 1, COLOR);
            };
        })
    }
    else if (button.id == 'B8'){
        button.addEventListener('click', () => {
            //console.log('button 8 is pressed');
            COLOR = 'black';
            box = container.querySelectorAll('.blocks');
            //box.forEach(changeBackGroundColor);
            for (block of box){
                changeBackGroundColor(block, 1, COLOR);
            };
        })
    }
    else if (button.id == 'B9'){
        button.addEventListener('click', () => {
            //console.log('button 8 is pressed');
            box = container.querySelectorAll('.blocks');
            //box.forEach(changeBackGroundColor);
            for (block of box){
                changeBackGroundColor(block, 0, COLOR);
            };
        })
    }
}

var COLOR = 'rainbow';
const container = document.querySelector('.container');
setCount(4); //stays as default setting

//box is var cuz its value needs to be changed from within a function as well
var box = container.querySelectorAll('.blocks'); //contains all the divs in the grid
//Essentially what this does is pass each element in box to the changeBackGround color function
//Better explanation of forEach at the end of the file
//box.forEach(changeBackGroundColor);

for (block of box){
    changeBackGroundColor(block, 1, COLOR);
};




const allSizeButtons = document.querySelectorAll('.block-size-button');
//console.log(allSizeButtons);
allSizeButtons.forEach(addSizeListener);

const allColorButtons = document.querySelectorAll('.color-buttons');
allColorButtons.forEach(colorChangeListener)


let n = 1 //for debugging purposes only

/*
Better explanation of forEach
check the following link for better understanding of what exactly is happening in the forEach:
    https://briggs.dev/blog/understanding-callbacks

Essentially we are calling each element in 'box' as an item, then we define a function which takes in 
that 'item' as a parameter then adds an even listener to those items.

ie. 
    box.forEach(function(item) => {
    item.addEventListener('mouseover', () => {
        item.style.backgroundColor = 'blue';
    })
})

is the same as 

    box.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.backgroundColor = 'blue';
    })
}) 
*/