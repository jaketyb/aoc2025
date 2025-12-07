const fs = require('node:fs');

const start = Date.now();

const data = fs.readFileSync('./input.txt', 'utf8');

const rows = data.split('\r\n');

var result = 0;

var operationValues = [];

for(var colIndex = rows[0].length - 1; colIndex >= 0; colIndex--){
    var builtValue = '';
    for(var rowIndex = 0; rowIndex < rows.length; rowIndex++){
        const value = rows[rowIndex][colIndex];

        if(value === '*' || value === '+') {
            operationValues.push(parseInt(builtValue));
            builtValue = '';

            result += value === '*' ? operationValues.reduce((prev, cur) => prev * cur) : operationValues.reduce((prev, cur) => prev + cur);

            operationValues = [];
        } else if(value !== ' ') {
            builtValue += value;
        }
    }

    if(builtValue !== '') {
        operationValues.push(parseInt(builtValue));
        builtValue = '';
    }
    
}

console.log(Date.now() - start + "ms");

console.log(result);

