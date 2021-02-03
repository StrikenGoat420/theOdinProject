let testfunc = function(num, multiplier){
    console.log(num*multiplier);
}

a = [1,2,3,4,5];


for (num of a){
    testfunc(num, 2);
}



//same as changeBackGroundColor = function(item){}
changeBackGroundColor = item => {
    console.log(`in change bckcol len of box is ${box.length}`);
    item.addEventListener('mouseover', () => {
        let currentColor = getComputedStyle(item).getPropertyValue('background-color');
        //console.log(`current color is ${currentColor}`);
        //console.log(n + currentColor);
        //n += 1;
        if (currentColor != 'rgb(255, 255, 255)'){
            //console.log("Chaging color to white now")
            item.style.backgroundColor = 'White';
        }
        else {
            item.style.backgroundColor = getRandomRGB();
        }
    })
}