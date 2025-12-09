const fs = require('node:fs');
const start = Date.now();
const data = fs.readFileSync('./input.txt', 'utf8');

const rows = data.split('\r\n');

const startCol = rows[0].indexOf('S');

var timelines = Array(rows.length).fill().map(() => Array(rows[0].length).fill(0))

timelines[1][startCol] = 1;

for(var row = 2; row < rows.length; row++){
    for(var col = 0; col < rows[row].length; col++){
        const target = rows[row][col];

        if(target === '.'){
            timelines[row][col] += timelines[row-1][col];
        } else if (target === '^') {
            timelines[row][col-1] += timelines[row-1][col];
            timelines[row][col+1] += timelines[row-1][col];
        }
    }
}

console.log(timelines[timelines.length - 1].reduce((prev, cur) => prev + cur));
