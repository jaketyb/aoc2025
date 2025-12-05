const fs = require('node:fs');

const start = Date.now();

const data = fs.readFileSync('./input.txt', 'utf8');
const [rangeData, ingredientData] = data.split('\r\n\r\n');

const ranges = rangeData.split('\r\n');
const ingredientIds = ingredientData.split('\r\n');

var fresh = [];

ingredientIds.forEach((ingredientId) => {

    var found = false;
    const intIngredientId = parseInt(ingredientId);

    for(var rangeIndex = 0; rangeIndex < ranges.length && !found; rangeIndex++){
        const range = ranges[rangeIndex];

        const [from, to] = range.split('-');

        if(intIngredientId >= parseInt(from) && intIngredientId <= parseInt(to)) {
            fresh.push(ingredientId);
            found = true;
        }
    }

})

console.log(Date.now() - start + "ms");
console.log(fresh.length);

