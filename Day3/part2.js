const fs = require('node:fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const banks = data.split('\r\n');

var total = 0;

banks.forEach((bank) => {
    var prevIndex = -1;
    var maxBank = "";
    for (let index = 11; index >= 0; index--) {
        var {max, maxIndex: prevIndex} = findMaxBattery(bank, index, prevIndex);
        maxBank += max;
    }

    total += parseInt(maxBank);
})

function findMaxBattery(bank, joltageDigitPosition, indexOffset) {
    var max = "";
    var maxIndex = 0;

    bank.split('').forEach((battery, index) => {
        if(index < bank.length - joltageDigitPosition && index > indexOffset && (max === "" || battery > max)) {
            max = battery;
            maxIndex = index;
        }
    });

    return {max, maxIndex};
}

console.log(total);