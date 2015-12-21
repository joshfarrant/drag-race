# drag-race
A simple JavaScript code execution speed test.

Drag race takes a given array of functions and runs them all with the arguments provided. It times the execution of each function, and then prints the ordered results to the console.

![Drag Race example](https://raw.github.com/joshfarrant/drag-race/master/images/drag-race.gif)

## Installation

```
git clone git@github.com:joshfarrant/drag-race.git
npm install
```
## Usage

To use Drag Race simply require it, define an array of functions to test, and call the `dragRace()` function.

The `dragRace()` function takes your array of functions as the first parameter, and any arguments to be passed to each function as further parameters.

```js
dragRace(funcArray, arg1, arg2, arg3, etc...);
```

```js
var dragRace = require('drag-race');

// Array of functions to test
var functions = [

  function myFunc1(arg1, arg2) {
    /*
      ...
    */
  },

  function myFunc2(arg1, arg2) {
    /*
      ...
    */
  }

];

dragRace(functions, arg1, arg2);
```
