'use strict';

const console = require('better-console');

function clearLine() {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
}

// Basic bubble sort to sort results
function bubbleSort(a) {
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < a.length - 1; i++) {
      if (a[i].time > a[i + 1].time) {
        const temp = a[i];
        a[i] = a[i + 1];
        a[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return a;
}


function logResults(results) {
  const sorted = bubbleSort(results);

  const fastestTime = results[0].time;
  let totalTime = 0;

  for (let i = 0; i < sorted.length; i++) {
    const result = sorted[i];

    totalTime += result.time;

    if (i > 0) {
      sorted[i].diff = Math.round(result.time / fastestTime * 100) + '%';
    } else {
      sorted[i].diff = 'N/A';
    }

    sorted[i].time += 'ms';
  }

  clearLine();

  process.stdout.write(results.length + ' tests completed in ' + totalTime + 'ms\n');

  console.table(sorted);
}


function dragRace(tests, ...args) {
  const results = [];

  clearLine();

  process.stdout.write('Completed 0/' + tests.length + ' tests');

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];

    const startTime = new Date();

    test.apply(this, args);

    const endTime = new Date();

    const timeTaken = endTime - startTime;

    const testName = test.name || '_test' + i;

    results.push({
      name: testName,
      time: timeTaken
    });

    clearLine();
    process.stdout.write('Completed ' + (i + 1) + '/' + tests.length + ' tests');
  }

  logResults(results);

  return results;
}


module.exports = dragRace;
