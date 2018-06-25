// var Indicator = require('./bk_trader/indicator.js');
var Indicator = require('./kdj_ind.js');
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
  

var	rslt = [];
// for (var i = 0; i < ticks.length; i++) {
for (var i = ticks.length - 20; i < ticks.length; i++) {

// rslt.push([highA[i], lowA[i], closeA[i], timeA[i]]);
rslt.push([highA[i], lowA[i], closeA[i]]);
}

// var jNow = Indicator.KDJ(rslt).j;
var jNow = Indicator.KDJ(rslt);
// console.log(jNow);
var jCurr = jNow[2];
jCurr = jCurr.toFixed(1);
var jLast = jNow[1];
jLast = jLast.toFixed(1);
var jOld = jNow[0];
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




// testArray = [[9.03, 7.52, 9.03], [9.93, 9.93, 9.93], [10.92, 10.92, 10.92], [12.01, 11.20, 12.01], [11.80, 11.28, 11.46], [12.49, 11.38, 12.19]];
  // console.log(Indicator.KDJ(testArray));
