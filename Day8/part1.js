const fs = require('node:fs');

const start = Date.now();

const data = fs.readFileSync('./input.txt', 'utf8');

const boxes = data.split('\r\n').map(row => row.split(',').map(r => parseInt(r)));

const circuits = Array(boxes.length).fill().map((v, i) => Array(1).fill(i));

const distances = []

boxes.forEach((sourceBox, sourceIndex) => {
    boxes.forEach((targetBox, targetIndex) => {
        if(sourceIndex === targetIndex){
            return;
        }

        const distance = distance3D(sourceBox, targetBox);

        distances.push({sourceIndex, targetIndex, distance});
    })
})

distances.sort((d1, d2) => d1.distance - d2.distance);



for(var connectionCount = 0; connectionCount < 1000; connectionCount++){
    var shortest = distances.shift();
    distances.shift(); //Remove the other way around

    var sourceCircuitIndex = circuits.findIndex(c => c.includes(shortest.sourceIndex));

    if(circuits[sourceCircuitIndex].includes(shortest.targetIndex))
    {
        // They're already in a circuit!
        continue;
    }

    var targetCircuitIndex = circuits.findIndex(c => c.includes(shortest.targetIndex));


    circuits[sourceCircuitIndex].push(...circuits[targetCircuitIndex]);

    circuits.splice(targetCircuitIndex, 1);
}


circuits.sort((c1, c2) => c2.length - c1.length);

console.log(circuits[0].length * circuits[1].length * circuits[2].length);
console.log(Date.now() - start + "ms");


function distance3D(p1, p2) {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  const dz = p1[2] - p2[2];
  
  return Math.hypot(dx, dy, dz);
}