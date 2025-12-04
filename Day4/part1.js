const fs = require('node:fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\r\n');

var count = 0;

lines.forEach((row, lineIndex) => {
    row.split('').forEach((val, colIndex) => {
        if(val === '@'){
            var adjacents = countAdjacents(lineIndex, colIndex);

            if(adjacents < 4){
                count++;
            }
        }
    })
})

function countAdjacents(rowIndex, colIndex){
    var number = 0;

    for(var row = rowIndex - 1; row <= rowIndex + 1; row++){
        if(row < 0 || row > lines.length - 1) {
            continue;
        }

        for(var col = colIndex - 1; col <= colIndex + 1; col++){
            if(col < 0 || col > lines[rowIndex].length - 1 || (row == rowIndex && col === colIndex)){
                continue;
            }

            if(lines[row][col] === '@'){
                number++;
            }
        }
    }

    return number;
}

console.log(count);