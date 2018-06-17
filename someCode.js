//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////
// const TeleBot = require('telebot');
// const TOKEN = '579762785:AAH0u9I-puuHw6ZeWmBKLJ9_d9ho_6XSyhg';
// const USER = 522244663; //bkobalava
// const bot = new TeleBot(TOKEN);
// bot.sendMessage(USER, "Hello!");


// var token = '579762785:AAH0u9I-puuHw6ZeWmBKLJ9_d9ho_6XSyhg';
// var Bot = require('node-telegram-bot-api'),
    // bot = new Bot(token, { polling: true });
// console.log('bot server started...');
// bot.onText(/^\/hi (.+)$/, function (msg, match) {
  // var name = match[1];
  // bot.sendMessage(msg.chat.id, 'Hello Sir' + name + '!').then(function () {
    // reply sent!
  // });
// });

// https://api.telegram.org/bot579762785:AAH0u9I-puuHw6ZeWmBKLJ9_d9ho_6XSyhg/getUpdates
//"id":522244663,"is_bot":false,"first_name":"Badri","last_name":"Kobalava","username":"bkobalava"
///////////////////////////////////////////////


fs=require('fs');
///////////////////////////////////////////////
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});///////////////////////////////////////////////
	
	const binance = require('node-binance-api');
binance.options({
  'APIKEY':'<api key>',
  'APISECRET':'<api secret>'
});
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
    var lastK, lastD, curK, curD;
	
    for (var i = 0; i < ticks.length; i++) {
      maximum = max(highA, i, 9);
      minimum = min(lowA, i, 9);
	  
      if (maximum == minimum) {
        rsvs.push(0);
      } else {
        rsvs.push((closeA[i] - minimum) / (maximum - minimum) * 100);
      }
	}
	
	ks = sma(rsvs, 3)
	ds = sma(ks, 3)
    for (var i = 0; i < ks.length; i++) js.push(3 * ks[i] - 2 * ds[i]);
	  
var output = js.slice(js.length-4, js.length-1) // ძალიან ძველი, ძველი, წინა, ახალი (მერყევი)


var jCurr = js[js.length-1];
jCurr = jCurr.toFixed(1);
var jLast = js[js.length-2];
jLast = jLast.toFixed(1);
var jOld = js[js.length-3];
jOld = jOld.toFixed(1);

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
function kdj(ticks) {
    var high = [], low = [], close = [];
    var rsvs = [], ks = [], ds = [], js = [];
    var maximum, minimum;
    var lastK, lastD, curK, curD;
	
    for (var i = 0; i < ticks.length; i++) {
	  high.push(ticks[i][0]);	
	  low.push(ticks[i][1]);	
	  close.push(ticks[i][2]);
	}
	
    for (var i = 0; i < ticks.length; i++) {
      maximum = max(high, i, 9);
      minimum = min(low, i, 9);
	  
      if (maximum == minimum) {
        rsvs.push(0);
      } else {
        rsvs.push((close[i] - minimum) / (maximum - minimum) * 100);
      }
	}


	
	ks = sma(rsvs, 3)
	ds = sma(ks, 3)
    for (var i = 0; i < ks.length; i++) js.push(3 * ks[i] - 2 * ds[i]);
	  
var output = js.slice(js.length-4, js.length-1) // ძალიან ძველი, ძველი, წინა, ახალი (მერყევი)
// var output = js.slice(0, 20)
	// return {"k": ks, "d": ds, "j": js};
console.log(js);
    return output;
  };
  
//////////////////////////////////////////////////////////////////////////////////
function sma(arr, num) {
  if (!Array.isArray(arr)) {
    throw TypeError('expected first argument to be an array');
  }

  var res = [];
    for (var n = 0; n < arr.length; n++) {
		if ((n + num) > (arr.length - 1)) {
		var avg = arr.slice(n, (arr.length)).reduce(function(acc, val) { return acc + val; }, 0) / (arr.length - n);
		}else{
		var avg = arr.slice(n, (n + num)).reduce(function(acc, val) { return acc + val; }, 0) / num;
		}
		res.push(avg);
  }
  return res;
}

//////////////////////////////////////////////////////////////////////////////////
function max(arr, n, num) {
  if (!Array.isArray(arr)) {
    throw TypeError('expected first argument to be an array');
  }

  var res = [];
		if ((n + num) > (arr.length - 1)) {
		// res.push(Math.max(arr.slice(n, (arr.length - 1))));
		// res.push(arr.slice(n, (arr.length - 1)).reduce(function(acc, val) { return acc + val; }, 0));
		// res.push(Math.max.apply(Math, arr.slice(n, (arr.length))));
		return Math.max.apply(Math, arr.slice(n, (arr.length)));
		}else{
		// res.push(Math.max(arr.slice(n, (n + num))));
		// res.push(arr.slice(n, (n + num)).reduce(function(acc, val) { return acc + val; }, 0));
		// res.push(Math.max.apply(Math, arr.slice(n, (n + num))));
		return Math.max.apply(Math, arr.slice(n, (n + num)));
		}
		// res.push(maximum);
  // return res;
}
//////////////////////////////////////////////////////////////////////////////////
function min(arr, n, num) {
  if (!Array.isArray(arr)) {
    throw TypeError('expected first argument to be an array');
  }

  var res = [];
		if ((n + num) > (arr.length - 1)) {
		// res.push(Math.min.apply(Math, arr.slice(n, (arr.length))));
		return Math.min.apply(Math, arr.slice(n, (arr.length)));
		}else{
		// res.push(Math.min.apply(Math, arr.slice(n, (n + num))));
		return Math.min.apply(Math, arr.slice(n, (n + num)));
		}
		// res.push(res);
  // return res;
}
//////////////////////////////////////////////////////////////////////////////////
    // rsvs.push((close - min) / (max - min) * 100);
	// ks = sma(rsvs, 3)
	// ds = sma(ks, 3)
    // for (var i = 0; i < ks.length; i++) js.push(3 * ks[i] - 2 * ds[i]);
//////////////////////////////////////////////////////////////////////////////////
// console.log(max([5, 4, 9, 8, 789, 4578, 545, 785, 4589, 998], 3));
// console.log(min([5, 4, 9, 8, 789, 4578, 545, 785, 4589, 998], 3));
// console.log(sma([5, 4, 9, 8, 789, 4578, 545, 785, 4589, 998], 3));
