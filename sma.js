var fs = require('fs');

var obj = require('./AAPL.json');

// Number of days
var d = 5;
 
// Accumulator object
var acc = {};
acc.open = acc.high = acc.low = acc.close = 0;

// An array storing the result
var sma = [];

var i = 0;

// For first d days, only accumulate
for (; i < d; i++) { 
    acc.open = acc.open + obj[i].open / d;
    acc.high = acc.high + obj[i].high / d;
    acc.low = acc.low + obj[i].low / d;
    acc.close = acc.close + obj[i].close / d;
}

// Create a deep copy for the first entry
var temp = Object.assign({}, acc);
temp.date = obj[i].date;
sma.push(temp);

// For rest of the days
for (; i < obj.length; i++) { 
    acc.open = acc.open + obj[i].open / d - obj[i-d].open / d;
    acc.high = acc.high + obj[i].high / d - obj[i-d].high / d;
    acc.low = acc.low + obj[i].low / d - obj[i-d].low / d;
    acc.close = acc.close + obj[i].close / d - obj[i-d].close / d;
    
    temp = Object.assign({}, acc); 
    temp.date = obj[i].date;
    
    sma.push(temp);
}

// Write to sma.json
fs.writeFile('sma.json', JSON.stringify(sma), 'utf8');