const fs = require('node:fs');

const start = Date.now();

const data = fs.readFileSync('./input.txt', 'utf8');
const [rangeData] = data.split('\r\n\r\n');

const ranges = rangeData.split('\r\n');

const uniqueRanges = [];

ranges.forEach((range) => {
    const [from, to] = range.split('-').map(r => parseInt(r));

    addUniqueRange(from, to, uniqueRanges);
});

var totalCount = 0;
uniqueRanges.map(range => {
    totalCount += range.to - range.from + 1;
})

console.log(Date.now() - start + "ms");

console.log(totalCount);

function addUniqueRange(from, to, uniqueRanges) {
    const overlappingRangeIndex = uniqueRanges.findIndex(r => (from <= r.from && to >= r.from) || (to >= r.to && from <= r.to) || (from >= r.from && to <= r.to));

    if(overlappingRangeIndex > -1) {
        const overlappingRange = uniqueRanges.splice(overlappingRangeIndex, 1)[0];

        overlappingRange.from = from < overlappingRange.from ? from : overlappingRange.from;
        overlappingRange.to = to > overlappingRange.to ? to : overlappingRange.to;

        addUniqueRange(overlappingRange.from, overlappingRange.to, uniqueRanges);
    } else {
        uniqueRanges.push({
            from,
            to
        });
    }
}

