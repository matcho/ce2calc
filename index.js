'use strict';

const lib = require("./ce2calc");

console.log("3 + 4 =", lib.plus("3", "4"));
console.log("324 + 6 =", lib.plus("324", "6"));
console.log("324238723 + 6 + 2323 + 1234 + 0 + 1 + 7384734 =", lib.plus("324238723", "6", "2323", "1234", "0", "1", "7384734"));
