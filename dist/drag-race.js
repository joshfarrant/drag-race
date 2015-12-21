'use strict';

var console = require('better-console');

function clearLine() {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
}

// Basic bubble sort
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
  // Sort results by ascending time
  var sorted = bubbleSort(results);

  // Get the fastest result
  var fastestTime = results[0].time;
  var totalTime = 0;

  for (var i = 0; i < sorted.length; i++) {
    // Iterate through all results and format correctly
    var result = sorted[i];

    // Increase the total time by this result's time
    totalTime += result.time;

    if (i > 0) {
      // If this isn't the first (fastest) result, calculate the diff %
      sorted[i].diff = Math.round(result.time / fastestTime * 100) + '%';
    } else {
      // If this is the first (fastest) result, there is no diff %
      sorted[i].diff = 'N/A';
    }

    // Append the correct unit to the time
    sorted[i].time += 's';
  }

  // Clear the current line
  clearLine();

  // Write the summary
  process.stdout.write(results.length + ' tests completed in ' + totalTime + 's\n');

  // Write the results
  console.table(sorted);

  // Return formatted and ordered results for future use
  return sorted;
}

function dragRace(tests) {
  // Calls given functions (tests) with given arguments
  // Times execution of each

  var results = [];

  clearLine();

  // Write blank summary
  process.stdout.write('Completed 0/' + tests.length + ' tests');

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < tests.length; i++) {
    // Iterate through the given test functions
    var test = tests[i];

    // Store the current (start) hr (high resolution) time
    var startTime = process.hrtime();

    // Run the given test function with the given arguments
    test.apply(this, args);

    // Get the current (end) time and find the elapsed time since the start
    var timeDiff = process.hrtime(startTime);

    // Format the hr time in a readable manner (converted to seconds)
    // process.hrtime() returns a tuple array as [seconds, nanoseconds]
    var timeTaken = timeDiff[0] + Math.floor(timeDiff[1] * 1e9) / 1e18;

    // Use the given test function's name as a lable if it exists
    // If not create a generic name
    var testName = test.name || '_test' + i;

    // Add this result object to the results array
    results.push({
      name: testName,
      time: timeTaken
    });

    // Update the test summary
    clearLine();
    process.stdout.write('Completed ' + (i + 1) + '/' + tests.length + ' tests');
  }

  // Log the results and return them
  return logResults(results);
}

module.exports = dragRace;