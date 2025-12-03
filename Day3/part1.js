const fs = require('node:fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const banks = data.split('\r\n');

var total = 0;

banks.forEach((bank) => {
    var max1 = "";
    var max1Index = 0;
    var max2 = "";

    bank.split('').forEach((battery, index) => {
        if(index < bank.length - 1 && (max1 === "" || battery > max1)) {
            max1 = battery;
            max1Index = index;
        }
    });

    bank.split('').forEach((battery, index) => {
        if(index>max1Index && (max2 === "" || battery > max2)) {
            max2 = battery;
        }
    });


    total += parseInt(max1+max2);
})

console.log(total);