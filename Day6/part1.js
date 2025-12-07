const fs = require('node:fs');

const start = Date.now();

const data = fs.readFileSync('./input.txt', 'utf8');

const rowsCols = data.split('\r\n').map(row => row.split(' ').map(r => r.trim()).filter(v => v !== ''));

var result = 0;


for(var colIndex = 0; colIndex < rowsCols[0].length; colIndex++){
    const operationValues = [];
    for(var rowIndex = 0; rowIndex < rowsCols.length; rowIndex++){
        const value = rowsCols[rowIndex][colIndex];
        const intValue = parseInt(value);

        if(isNaN(intValue)){
            // add em up
            switch(value) {
                case '*':
                    result += operationValues.reduce((prev, cur) => prev * cur);
                    break;
                case '+':
                    result += operationValues.reduce((prev, cur) => prev + cur);
                    break;
            }
        }
        else {
            operationValues.push(intValue);
        }
        
    }
}

console.log(result);

