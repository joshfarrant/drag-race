'use strict';

var console = require('better-console');

function clearLine() {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
}

// Basic bubble sort to sort results
function bubbleSort(a) {
  var swapped = undefined;

  do {
    swapped = false;
    for (var i = 0; i < a.length - 1; i++) {
      if (a[i].time > a[i + 1].time) {
        var temp = a[i];
        a[i] = a[i + 1];
        a[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return a;
}

function logResults(results) {
  var sorted = bubbleSort(results);

  var fastestTime = results[0].time;
  var totalTime = 0;

  for (var i = 0; i < sorted.length; i++) {
    var result = sorted[i];

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

  return sorted;
}

function dragRace(tests) {
  var results = [];

  clearLine();

  process.stdout.write('Completed 0/' + tests.length + ' tests');

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < tests.length; i++) {
    var test = tests[i];

    var startTime = new Date();

    test.apply(this, args);

    var endTime = new Date();

    var timeTaken = endTime - startTime;

    var testName = test.name || '_test' + i;

    results.push({
      name: testName,
      time: timeTaken
    });

    clearLine();
    process.stdout.write('Completed ' + (i + 1) + '/' + tests.length + ' tests');
  }

  return logResults(results);
}

module.exports = dragRace;