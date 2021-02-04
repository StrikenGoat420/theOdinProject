function setCount(numRows){
    //container.appendChild(block.cloneNode(1));

    let blockSizePercent = (1/numRows)*100;
    let gridTemplateString = 'repeat('+numRows+','+blockSizePercent+'%)';
    container.style.gridTemplateColumns = gridTemplateString;
    container.style.gridTemplateRows = gridTemplateString;
    
    while (container.childElementCount != numRows*numRows){
        if (container.childElementCount < numRows*numRows){
            const block = document.createElement('div');
            block.className = 'blocks';
            //console.log(container.childElementCount);
            container.appendChild(block);
        }
        else if (container.childElementCount > numRows*numRows) {
            container.removeChild(container.lastChild);
        }
    }

}

function getRandomRGB(){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    let rgb = "rgb("+[r,g,b].join(",")+")"; // better way of doing the above line
    return rgb;
}

changeBackGroundColor = (item, hoverMode, color) => {
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
                item.style.backgroundColor = getRandomRGB();
            }
            if (color.toLowerCase() == 'black'){
                let currentColor = getComputedStyle(item).getPropertyValue('background-color');
                console.log(currentColor)
                item.style.backgroundColor = 'rgb(0 , 0, 0, 0.1)';
                console.log("new line")
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
                item.style.backgroundColor = getRandomRGB();
            }
            if (color.toLowerCase() == 'black'){
                item.style.backgroundColor = 'black';
                item.style.opacity = '0.1';
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
            COLOR = 'rainbow'
            box = container.querySelectorAll('.blocks');
            for (block of box){
                changeBackGroundColor(block, 1, COLOR);
            };
        })
    }
    else if (button.id == 'B6'){
        button.addEventListener('click', () => {
            COLOR = 'black';
            //console.log("Pressed B6")
            box = container.querySelectorAll('.blocks');
            //box.forEach(changeBackGroundColor);
            for (block of box){
                changeBackGroundColor(block, 1, COLOR);
            };
        })
    }
    else if (button.id == 'B7'){
        button.addEventListener('click', () => {
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
var box = container.querySelectorAll('.blocks'); 

for (block of box){
    changeBackGroundColor(block, 1, COLOR);
};

const allSizeButtons = document.querySelectorAll('.block-size-button');
allSizeButtons.forEach(addSizeListener);

const allColorButtons = document.querySelectorAll('.color-buttons');
allColorButtons.forEach(colorChangeListener)


let n = 1 //for debugging purposes only
let a = 'testString';
console.log(a.slice(0, 4))