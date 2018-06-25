fs=require('fs');
///////////////////////////////////////////////
///////////////////////////////////////////////

binance.prices((error, ticker) => {
	var pairs = [];
    // console.log(ticker.token);
  console.log("Price of BNB: ", ticker.BNBBTC);
  for ( i = 0; i < ticker.length; i++ ) {
	  if (ticker[i].endsWith('BNB')) {
		  pairs.push(ticker[0]);
    console.log(pairs);
	  }
  }

});
	console.log('\033c')	//Windows
	// console.log('\033[2J');  //Linux
	console.log('------------------------------')
	console.log(' BNBBTC; 15 min time frame')
	console.log('------------------------------')

var buyPrice = 0;
var sellPrice = 0;
var profit = 0;
var jPrevCurr = 0;	
var highA = [];  
var lowA = [];  
var closeA = [];  

fs.readFile('./bk_trader/buyPrice.txt', function (err, data) {
	if (err) {
	return console.error(err);
	}
	buyPrice = data.toString();
});

var myInt = setInterval(function () {

// Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
binance.candlesticks("BNBBTC", "15m", function(error, ticks) {
	ticks = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      [1, 1, 2, 3, 2, 4, 4, 6, 8, 9, 10, 10],
      [2, 2, 3, 4, 6, 8, 7, 9, 11, 11, 12, 14]
    ]
	// console.log("candlesticks()", ticks);
	// let last_tick = ticks[ticks.length - 1];
	// let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
	// console.log("BNBBTC last close: "+close);
// var timeA =  ticks.map( tick => (tick[0]) ); //time  

// var highA =  ticks.map( tick => (tick[2]) );  //high price  
// var lowA =  ticks.map( tick => (tick[3]) );  //low price  
// var closeA =  ticks.map( tick => (tick[4]) ); //close price  
var highA = [];  //high price  
var lowA = [];  //low price  
var closeA = []; //close price  


ticks.forEach(function(tick) {
//ticks.reverse();
highA.push(tick[2]);  //high price  
lowA.push(tick[3]);  //low price  
closeA.push(tick[4]); //close price  
});
  
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
    var rsvs = [], ks = [], ds = [], js = [];
    var maximum, minimum;
		// console.log(lowA.slice(0-9));
		// console.log(lowA.slice(0-2));
		// console.log(min(lowA.slice(0-9), 0, 9));
    for (var i = 0; i < ticks.length; i++) {
      maximum = max(highA, i, 9);
      minimum = min(lowA, i, 9);
	  
      if (maximum == minimum) {
        rsvs.push(0);
      } else {
        rsvs.push((closeA[i] - minimum) / (maximum - minimum) * 100);
      }
	}
console.log('\033c');
console.log(rsvs.slice(0-4));
	ks = sma(rsvs, 3)
console.log(ks.slice(0-4));
	ds = sma(ks, 3)
console.log(ds.slice(0-4));
    for (var i = 0; i < ks.length; i++) 
	js.push((3 * ks[i]) - (2 * ds[i]));
console.log(js.slice(0-4));
	  
var jCurr = js[1];
// jCurr = jCurr.toFixed(1);
var jLast = js[2];
// jLast = jLast.toFixed(1);
var jOld = js[3];
// jOld = jOld.toFixed(1);

var currdatetime = new Date();
// if (jPrevCurr != jNow[0] && jPrevCurr != 0) {
if (jPrevCurr != jCurr) {
console.log(closeA[ticks.length - 2], jOld, jLast, jCurr, currdatetime, buyPrice);
jPrevCurr = jCurr;
// bot.sendMessage(USER, "bkobalava", closeA[ticks.length - 2]+ " " + jCurr+ " " + currdatetime);
}
///////////////////////////////////////////////BUY!BUY!BUY!BUY!BUY!BUY!BUY!BUY!

      // if (jCurr < 0 && buyPrice == 0) { /////////////////Algotithm 1
      // if (jOld - jCurr > 10 && buyPrice == 0) { /////////////////Algotithm 2
      if ((jOld > jLast) && (jCurr > jLast) && (jLast < 7) && (buyPrice == 0)) { /////////////////Algotithm 3
	  
buyPrice = closeA[ticks.length - 2]
console.log(buyPrice, jOld, jLast, jCurr, currdatetime, 'BUY!')

fs.writeFile('./bk_trader/buyPrice.txt',buyPrice,function(err){
	if(err)
	console.error(err);
	// console.log('Appended!');
});

fs.appendFile('./bk_trader/register.txt',buyPrice + "\t" + jOld + "\t" + jLast + "\t" + jCurr + "\t" + currdatetime + "\t" + 'BUY!' + "\n",function(err){
	if(err)
	console.error(err);
	// console.log('Appended!');
});

// bot.sendMessage(msg.chat.id, "bkobalava", sbuyPrice + "\t" + jOld + "\t" + jLast + "\t" + jCurr + "\t" + currdatetime + "\t" + 'BUY!' + "\n").then(function () {
    // reply sent!
  // });
}
///////////////////////////////////////////////SELL!SELL!SELL!SELL!SELL!SELL!SELL!
// console.log(buyPrice);	
	  
     if (buyPrice != 0) { 
sellPrice = closeA[ticks.length - 2];
profit = (sellPrice - buyPrice) / buyPrice * 100;
// if (profit < -2 || jCurr > 90) { /////////////////Algotithm 1
// if (profit < -2 || jCurr - jOld > 10) { /////////////////Algotithm 2
if (profit < - 2 || (jLast - jOld > 5 && jLast > jCurr)) { /////////////////Algotithm 3

console.log(sellPrice, jOld, jLast, jCurr, currdatetime, profit.toFixed(2), "%, SELL!");
buyPrice = 0;
fs.writeFile('./bk_trader/buyPrice.txt',buyPrice,function(err){  //
	if(err)
	console.error(err);
	// console.log('Appended!');
});

fs.appendFile('./bk_trader/register.txt',sellPrice + "\t" + jOld + "\t" + jLast + "\t" + jCurr + "\t" + currdatetime + "\t" + 'SELL!' + "\t" + profit.toFixed(2)+ "%\n\n",function(err){
	if(err)
	console.error(err);
	// console.log('Appended!');
});

// bot.sendMessage(msg.chat.id, "bkobalava", sellPrice + "\t" + jAnt + "\t" + jOld + "\t" + jCurr + "\t" + currdatetime + "\t" + 'SELL!' + "\t" + profit.toFixed(2)+ "%\n\n").then(function () {
    // reply sent!
  // });
}
      }
	  
///////////////////////////////////////////////

}, {limit: 500});
// });

}, 30000);

//////////////////////////////////////////////////////////////////////////////////
const isNumber = subject => typeof subject === 'number';

const isArray = Array.isArray;

// Dynamic Weighted Moving Average

// @param {Number|Array.<Number>} alpha
var dma = (data, alpha, noHead) => {

  const length = data.length;

  if (alpha > 1) {
    return Array(length)
  }

  if (alpha === 1) {
    return data.slice()
  }

  const noArrayWeight = !isArray(alpha);
  const ret = [];

  let datum;

  // period `i`
  let i = 0;

  // `s` is the value of the DWMA at any time period `i`
  let s = 0;

  // Handles head
  for (; i < length; i ++) {
    datum = data[i];

    if (
      isNumber(datum)
      && (
        noArrayWeight
        || isNumber(datum)
      )
    ) {

      ret[i] = noHead
        ? 0
        : datum;

      s = datum;
      i ++;

      break
    }
  }

  // Dynamic weights: an array of weights
  // Ref:
  // https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
  // with a dynamic alpha
  if (!noArrayWeight) {
    for (; i < length; i ++) {
      datum = data[i];

      isNumber(datum) && isNumber(alpha[i])
        ? s =
          ret[i] = alpha[i] * datum + (1 - alpha[i]) * s
        : ret[i] = ret[i - 1];
    }

    return ret
  }

  const o = 1 - alpha;

  // Fixed alpha
  for (; i < length; i++) {
    datum = data[i];

    isNumber(datum)
      ? s =
        ret[i] = alpha * datum + o * s
      : ret[i] = ret[i - 1];
  }

  return ret
};

// Smoothed moving average

var sma = (data, size, times = 1) => dma(data, times / size, 1);

// Exponential moving average with 86% total weight

// simple moving average

// Weighted moving average

const error = (
  message
  // code
) => {
  const e = new Error(message);

  // if (code) {
  //   e.code = code
  // }

  throw e
};


const manipulate2Array = (a, b, mutator) => {
  if (a.length !== b.length) {
    error('the length of arrays not match');
  }

  return a.map((x, i) => mutator(x, b[i]))
};


const manipulateArray = (a, b, mutator) => {
  return a.map(x => mutator(x, b))
};


const isArray$1 = (a, b) => [a, b].map(Array.isArray);

const cleanArray = (array) => {
  array.forEach((item, i) => {
    if (item !== item) {
      delete array[i];
    }
  });
};

const orderUnaware = (
  a, b, mutator, mutatorReverse,
  ensureNumber
) => {
  const [A, B] = isArray$1(a, b);

  const ret = A
    ? B
      ? manipulate2Array(a, b, mutator)
      : manipulateArray(a, b, mutator)
    : B
      ? manipulateArray(b, a, mutatorReverse)
      : error('at least one array is required');

  if (ensureNumber) {
    cleanArray(ret);
  }

  return ret
};


const orderAware = (
  a, b, mutator,
  ensureNumber
) => {
  const [A, B] = isArray$1(a, b);

  const ret = A
    ? B
      ? manipulate2Array(a, b, mutator)
      : manipulateArray(a, b, mutator)
    : error('the first argument must be an array');

  if (ensureNumber) {
    cleanArray(ret);
  }

  return ret
};

const sub = (a, b) => a - b;

var sub$1 = (a, b, n) => orderAware(a, b, sub, n);

const mul = (a, b) => a * b;

var mul$1 = (a, b, n) => orderUnaware(a, b, mul, mul, n);

const div = (a, b) => {
  if (b === 0) {
    error('divide by zero');
  }

  return a / b
};

var div$1 = (a, b, n) => orderAware(a, b, div, n);

const compare = (data, size, comparer) => {
  const length = data.length;

  if (size > length) {
    return Array(length)
  }

  if (!size) {
    return data.reduce(comparer)
  }

  if (size <= 1) {
    return data.slice()
  }

  let i = size - 1;
  const ret = [];

  for (; i < length; i ++) {
    ret[i] = reduce(data, i - size + 1, i + 1, comparer);
  }

  return ret
};


// @param {Number} start index to start [
// @param {Number} end index less than )
// -> [start, end)
const reduce = (array, start, end, reducer) => {
  let prev;
  let i = start;

  for (; i < end; i ++) if (i in array) {
    if (prev === undefined) {
      prev = array[i];
      continue
    }
    
    prev = reducer(prev, array[i]);
  }

  return prev
};


const hhv = (data, size) =>
  compare(data, size, (a, b) => Math.max(a, b));

const llv = (data, size) =>
  compare(data, size, (a, b) => Math.min(a, b));

const UPPER = 100;
const LOWER = 0;

const clean = n => Math.min(UPPER, Math.max(LOWER, n));

var index = ((closePrices, lowPrices, highPrices, periods = 9, kPeriods = 3, dPeriods = 3, kTimes = 3, dTimes = 2) => {

  const lowest = llv(lowPrices, periods);
  const highest = hhv(highPrices, periods);

  const u = div$1(mul$1(sub$1(closePrices, lowest, 1), UPPER, 1), sub$1(highest, lowest, 1));

  const ks = sma(u, kPeriods);
  const ds = sma(ks, dPeriods);
  const js = sub$1(mul$1(kTimes, ks, 1), mul$1(dTimes, ds, 1), 1);

  return {
    K: ks.map(clean),
    D: ds.map(clean),
    J: js.map(clean)
  };
});