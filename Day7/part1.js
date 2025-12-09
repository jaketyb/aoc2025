const fs = require('node:fs');
const start = Date.now();
const data = fs.readFileSync('./input.txt', 'utf8');

const rows = data.split('\r\n');

const startCol = rows[0].indexOf('S');

var beamPositions = [];

var splitCount = traceBeam(1, startCol);

console.log(splitCount);


function traceBeam(startRowIndex, columnIndex){
    

    for(var r = startRowIndex; r < rows.length; r++){

        if(beamPositions.find(p => p.row === r && p.col === columnIndex)){
            return 0;
        }

        beamPositions.push({row: r, col: columnIndex});
        const beamTarget = rows[r][columnIndex];

        if(beamTarget === '^') {
            var count = 1;
            if(!beamPositions.find(p => p.row === r && p.col === columnIndex-1)){
                count += traceBeam(r, columnIndex-1);
            }
            if(!beamPositions.find(p => p.row === r && p.col === columnIndex+1)){
                count += traceBeam(r, columnIndex+1);
            }
            
            return count;
        }
    }

    return 0;
}