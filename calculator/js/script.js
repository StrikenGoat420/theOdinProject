/*
TODO: Add text wrap for both height and width (DONE expression limit is set at 25 chars)
      Limit number of decimal place so that text doesnt overflow (DONE)
      Let user change sign accordingly (DONE)
      Implement C and AC (in C only num2 will be blank again, in AC both num1 and num2 will be blank) (DONE)

      Currently only supports single digit operations, cuz the moment it is getting num2, the operation is being done. We have to do it
      so that while the equalsTo button OR an operator button is not pressed the operation should not be done. (DONE)
*/

const formatter = new Intl.NumberFormat('en-US', {
    //from https://stackoverflow.com/questions/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript
    minimumFractionDigits: 0,      
    maximumFractionDigits: 2,
 });
 
function addition (a,b){
    return formatter.format(Number(a)+ Number(b));
};

function subtract (a,b){
    return formatter.format(a-b);
};

function multiply (a,b){
    return formatter.format(a*b);
};

function divide (a,b){
    return formatter.format(a/b);
};

function signChange(a){
    //console.log(`a passed into func is ${a}`);
    return -(Number(a));
};


function setDefaultStyle(){
    //function to put each button in their proper place in the grid
    //setting default styles for the number buttons
    let x = 5;
    let y = 1;
    for (let i = 1; i<10; i++){
        let num = document.getElementById('n'+i);
        num.style.gridArea = x+'/'+y+'/'+(x+1)+'/'+(y+1);
        y += 1;
        if (i%3 == 0){
            y = 1;
            x -= 1;
        }
    }

    //setting default style for the operation button
    x = 3;
    y = 4;
    for (let i = 1; i<7; i++){
        let op = document.getElementById('o'+i);
        op.style.gridArea = x+'/'+y+'/'+(x+1)+'/'+(y+1);
        y += 1;
        if (i%2 == 0){
            y = 4;
            x += 1;
        }
    }
};

function doOperation(a,b, op){
    //console.log(`op is ${op} equality check `)
    if (op == '+'){
        a = addition(a, b);
    }
    else if (op == '-'){
        a = subtract(a, b);
    }
    else if (op == '*'){
        a = multiply(a, b);
    }
    else if (op == '/'){
        a = divide(a, b);
    }
    return a;
}

function getPrevState(a,b,prevOp){
    if (prevOp == '+'){
        return a-b;
    }
    else if (prevOp == '-'){
        return a+b;
    }
    else if (prevOp == '*'){
        return a/b;
    }
    else if (prevOp == '/'){
        return a*b;
    }
}

displayFunc = function(button){
    //console.log(button.id, button.className)
    button.addEventListener('click', () =>{
        const resultBox = document.querySelector('.result');
        const expressionBox = document.querySelector('.expression');
        let buttonClass = button.className;

        if ((buttonClass.includes('number') && button.id != 'o7') || button.id == 'o9'){
            //if button pressed is number and not the C button OR if button pressed is the decimal button
            console.log(num1, num2);

            if(button.id != 'o9'){
                //if button pressed is not decimal
                num2 += button.innerText;
                EXPRESSION += button.innerText;   
            }
            else if (button.id == 'o9' && num2.length > 0){
                //if button pressed id decimal and num2 is a number
                if (!num2.includes('.')){
                    num2 += button.innerText;
                    EXPRESSION += button.innerText;  
                }
            }
            else if (button.id == 'o9' && num2.length == 0 && num1.length == 0){
                //if button pressed is decimal and num2 = 0 and num1 is not defined
                num2 = "0."
                EXPRESSION = '0.';
            }
            expressionBox.innerText = EXPRESSION;
            if (EXPRESSION.length >= 25){
                alert('Expression cannot have more than 25 chars, resetting everything');
                num1 = num2 = operator = resultBox.innerText = EXPRESSION = expressionBox.innerText= '';
            }
            
            if (num1 == ''){
                resultBox.innerText = num2;
            }
        }
        if (buttonClass.includes('operator')){
            let lastChar = EXPRESSION[EXPRESSION.length - 1];
            let prevNum2 = num2;
            console.log(num1, num2);
            //for when user presses C and wants to clear the sign as well
            //if user presses two operations at once, the previous one will be replaced
            if ((lastChar == '+' || lastChar == '-' || lastChar == '*' || lastChar == '/') && button.id !='o1'){
                EXPRESSION = EXPRESSION.substring(0, EXPRESSION.length - 1);
                operator = '';
            }
            if (button.id == 'o2'){
                //if button pressed is 'AC'
                num1 = num2 = operator = resultBox.innerText = EXPRESSION = expressionBox.innerText= '';                
            }
            else if (button.id == 'o1'){
                //if button pressed is 'C'
                let lenNum2 = num2.length;
                EXPRESSION = EXPRESSION.substring(0, EXPRESSION.length - lenNum2);
                num2 = ''
            }
            else if (button.id != 'o7' && button.id != 'o1' && button.id != 'o2'){
                //if button is not equal to C AC or =
                EXPRESSION += button.innerText;
            }
            //console.log(num1, num2);
            expressionBox.innerText = EXPRESSION;
            if (num1 != '' && num2 != ''){
                //both num1 and num2 are not empty string, carry out the operation in this if
                //console.log(`num1 is ${num1} and num2 is ${num2} operator is ${operator}`); 
                prevOperator = operator;
                //console.log(`prev operator is ${prevOperator}`)
                num1 = doOperation(num1, num2, operator);               
                resultBox.innerText = num1;
            }
            if (num1 == ''){
                num1 = num2;
            }
            num2 = '';
            if (button.id != 'o7' && button.id != 'o1' && button.id != 'o2'){
                operator = button.innerText;
            }
        }

        if (button.id == 'o8'){
            //button id o8 is for sign change
            if (num1 != ''){
                num1 = signChange(num1);
                resultBox.innerText = num1;
            }
            else {
                num2 = signChange(num2);
                resultBox.innerText = num2;
            }
        }
        
    })
};

var EXPRESSION = '';
var num1 = '';
var num2 = '';
var operator = '';
var prevOperator = '';
setDefaultStyle()

const disButtons = document.querySelectorAll(".display"); //these are all the buttons which will can be in the expression
disButtons.forEach(displayFunc);
