//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////
// const TeleBot = require('telebot');
// const TOKEN = '579762785:AAH0u9I-puuHw6ZeWmBKLJ9_d9ho_6XSyhg';
// const USER = 522244663; //bkobalava
// const bot = new TeleBot(TOKEN);
// bot.sendMessage(USER, "Hello!");


var token = '579762785:AAH0u9I-puuHw6ZeWmBKLJ9_d9ho_6XSyhg';
var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });
console.log('bot server started...');
bot.onText(/^\/hi (.+)$/, function (msg, match) {
  var name = match[1];
  bot.sendMessage(msg.chat.id, 'Hello Sir' + name + '!').then(function () {
    reply sent!
  });
});

// https://api.telegram.org/bot579762785:AAH0u9I-puuHw6ZeWmBKLJ9_d9ho_6XSyhg/getUpdates
//"id":522244663,"is_bot":false,"first_name":"Badri","last_name":"Kobalava","username":"bkobalava"
///////////////////////////////////////////////
process.stdin.setEncoding('utf8');
fs=require('fs');
///////////////////////////////////////////////
// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
  // console.log(`Server running at http://${hostname}:${port}/`);
// });
///////////////////////////////////////////////
	
	const binance = require('node-binance-api');
binance.options({
  'APIKEY':'<api key>',
  'APISECRET':'<api secret>'
});
///////////////////////////////////////////////

binance.prices('BNBBTC', (error, ticker) => {
  console.log("Price of BNB: ", ticker.BNBBTC);
});

	console.log('\033c')	//Windows
	// console.log('\033[2J');  //Linux
	console.log('------------------------------')
	console.log(' BNBBTC; 15 min time frame')
	console.log('------------------------------')

var buyPrice = 0;
var sellPrice = 0;
var profit = 0;
var bank = 0;
var prevCurr = 0;	
bot.sendMessage('Bot lounched!');
fs.readFile('buyPrice.txt', function (err, data) {
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


// highA = [28.94, 28.38, 28.98, 29.16, 28.46, 27.9, 28.07, 27.65, 27.43, 27.17, 27, 27.2, 26.81, 27.18, 27.13, 26.97, 26.74, 26.58, 26.08, 25.32, 25.14, 25.08, 25.04, 25.06, 25.45, 25.23, 25.56, 26.05, 26.28, 26.16, 26.27, 26.03, 25.2, 25.25, 25.25, 25.37, 25.46, 25.33, 25.14, 24.58, 24.86, 24.63, 23.39, 23.39, 23.58, 23.54, 23.59, 23.46, 23.5, 23.54, 23.56, 23.54, 23.5, 23.56, 23.46, 23.62, 23.57, 23.38, 23.25, 23.18, 23.92, 23.87, 23.73, 23.66, 23.97, 24.1, 24.67, 25.33, 25.1, 25.16, 25.05, 24.73, 25.18, 25.55, 25.33, 25.95, 26.25, 26.67, 27.09, 26.5, 26.46, 26.19];
// lowA = [27.82, 27.3, 27.88, 28.06, 27.6, 26.83, 27.01, 26.86, 26.97, 26.68, 25.7, 26, 26.21, 26.41, 26.68, 26.05, 26.28, 25.85, 24.51, 24.78, 24.8, 24.52, 24.79, 24.75, 24.85, 24.93, 25.1, 25.08, 25.53, 25.7, 25.84, 24.97, 24.9, 25.02, 25.01, 25.04, 25.18, 25.02, 24.14, 24.21, 24.31, 23.2, 23.04, 22.73, 23.15, 23.25, 23.39, 23.22, 23.2, 23.33, 23.26, 23.34, 23.36, 23.39, 23.27, 23.31, 23.19, 23.14, 22.96, 22.76, 23.11, 23.58, 23.45, 23.3, 23.47, 23.75, 24, 24.55, 24.7, 24.78, 24.35, 24.37, 24.35, 25, 24.85, 25, 25.65, 25.88, 26.06, 26.02, 25.68, 25.91];
// closeA = [28.05, 28.18, 28.73, 28.59, 28.07, 27.47, 27.68, 27.14, 27.2, 27.09, 26.99, 26.36, 26.6, 27.05, 26.79, 26.38, 26.46, 26.08, 25.32, 25.03, 24.96, 24.95, 24.82, 24.88, 25.34, 25.19, 25.47, 26, 26, 26.13, 25.94, 25.13, 25.02, 25.19, 25.13, 25.31, 25.31, 25.04, 24.3, 24.49, 24.63, 23.28, 23.37, 23.3, 23.45, 23.44, 23.49, 23.35, 23.4, 23.4, 23.39, 23.44, 23.47, 23.42, 23.42, 23.48, 23.28, 23.21, 23, 23.16, 23.85, 23.72, 23.57, 23.64, 23.74, 23.91, 24.51, 24.93, 24.95, 24.85, 24.47, 24.5, 25.15, 25.41, 25.13, 25.94, 26.01, 26.56, 26.2, 26.3, 26.45, 25];
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
    var rsvs = [], ks = [], ds = [], js = [], sma = [];
    var maximum = [], minimum = [];
    var lastK, lastD, curK, curD;
	var period = 9;
    for (var i = 0; i < highA.length; i++) {
      		if (i < period) {
		// maximum = Math.max.apply(Math, highA.slice(0, i + 1));
		maximum.push(Math.max.apply(i, highA.slice(0, i + 1)));
// console.log(i, maximum, highA.slice(0, i + 1));
		}else{
		// maximum = Math.max.apply(Math, highA.slice(i - period + 1, i + 1));
		maximum.push(Math.max.apply(i, highA.slice(i - period + 1, i + 1)));
// console.log(i, maximum, highA.slice(i - period + 1, i + 1));
		}

				if (i < period) {
		// minimum = Math.min.apply(Math, lowA.slice(0, i + 1));
		minimum.push(Math.min.apply(i, lowA.slice(0, i + 1)));
// console.log(i, minimum, lowA.slice(0, i + 1));
		}else{
		// minimum = Math.min.apply(Math, lowA.slice(i - period + 1, i + 1));
		minimum.push(Math.min.apply(i, lowA.slice(i - period + 1, i + 1)));
// console.log(i, minimum, lowA.slice(i - period + 1, i + 1));
		}

	  
      if (maximum[i] == minimum[i]) {
        rsvs.push(0);
      } else {
        rsvs.push(100 * (closeA[i] - minimum[i]) / (maximum[i] - minimum[i]));
      }


		if (i < period - 1) {
		ks.push(0);
		ds.push(0);
		js.push(0);
		sma.push(0);
		} else if (i == period - 1) {
		ks.push(50);
		ds.push(50);
		js.push(50);
		sma.push(0);
		} else {
//EMA:
		ks.push((2 / 3 * ks[ks.length - 1]) + (1 / 3 * rsvs[i]));
		ds.push((2 / 3 * ds[ds.length - 1]) + (1 / 3 * ks[i]));
//Period-based EMA:
		// ks.push(( (rsvs[i] - ks[ks.length - 1] ) * (2 / (1 + period))) + ks[ks.length - 1]);
		// ds.push(( (ks[i] - ds[ds.length - 1] ) * (2 / (1 + period))) + ds[ds.length - 1]);
// Modified Moving Average:
		// ks.push(ks[ks.length - 1] + ((rsvs[i] -  ks[ks.length - 1]) / period));
		// ds.push(ds[ds.length - 1] + ((ks[i] -  ds[ds.length - 1]) / period));
//SMA 3
		// ks.push((rsvs[i - 2] + rsvs[i - 1] + rsvs[i]) / 3);
		// ds.push((ks[i - 2] + ks[i - 1] + ks[i]) / 3);

		// ks.push(rsvs[i]);
		// ds.push((ks[i - 2] + ks[i - 1] + ks[i]) / 3);

//(x + (3 * xx)) / 3
		// ks.push((rsvs[i] + (3 * rsvs[i-1])) / 3);
		// ds.push((ks[i] + (3 * ks[i-1])) / 3);

		js.push((3 * ks[i]) - (2 * ds[i]));
//SMA25:		
		var sum = 0;
		for (var n = i - 25; n < i + 1; n++) {
		sum += Number(closeA[n]);  
		}
		sma.push(sum / 25);

		}


// console.log(minimum, maximum, closeA[i], rsvs[i], ks[ks.length - 1])


// EMA(current) = ( (Price(current) - EMA(prev) ) x Multiplier) + EMA(prev)
// For a percentage-based EMA, "Multiplier" is equal to the EMA's specified percentage.
// For a period-based EMA, "Multiplier" is equal to 2 / (1 + N) where N is the specified number of periods.
		// ks.push(( (rsvs[i] - ks[ks.length - 1] ) * (2 / (1 + 3))) + ks[ks.length - 1]);
		// ds.push(( (ks[i] - ds[ks.length - 1] ) * (2 / (1 + 3))) + ds[ks.length - 1]);
		// js.push((3 * ks[i]) - (2 * ds[i]));
// Modified Moving Average
// MMA = previous moving average value + ((current price – previous moving average value) / n)



	  }
	
    // for (var i = rsvs.length - 30 ; i < rsvs.length; i++) {
// console.log(highA[i], maximum[i], lowA[i], minimum[i], closeA[i]);
	// }

var trend = (sma[sma.length - 2] - sma[sma.length - 27]) / sma[sma.length - 2] * 100;
/////////////////////////////////////////////////////////
function volatility(n) {  //ბოლო n სანთელში მაქსიმუმ რამდენი პროცენტის მოგების შანსია (რამდენი პროცენტით მერყეობს ფასი)
var mnm = closeA[closeA.length - (n + 1)];
var mxm = closeA[closeA.length - (n + 1)];
for (i = closeA.length - n; i < closeA.length; i++) {
	if(closeA[i] < mnm) mnm = closeA[i];
	if(closeA[i] > mxm) mxm = closeA[i];
}
rslt = (mxm - mnm) / mnm * 100;
return rslt.toFixed(1);
}
/////////////////////////////////////////////////////////

// console.log(volatility(30));

		
// console.log('\033c');
    // for (var i = rsvs.length - 30 ; i < rsvs.length; i++) {
// console.log(closeA[i], "k:", ks[i].toFixed(1), "d:", ds[i].toFixed(1), "j:", js[i].toFixed(1));
	// }

// console.log(js[js.length-4].toFixed(1), js[js.length-3].toFixed(1), js[js.length-2].toFixed(1), js[js.length-1].toFixed(1), trend.toFixed(2));

var jHot = js[js.length-1];
jHot = jHot.toFixed(1);
var jCurr = js[js.length-2];
jCurr = jCurr.toFixed(1);
var jLast = js[js.length-3];
jLast = jLast.toFixed(1);
var jOld = js[js.length-4];
jOld = jOld.toFixed(1);
var jArch = js[js.length-5];
jArch = jArch.toFixed(1);


var currdatetime = new Date();
// if (prevCurr != jNow[0] && prevCurr != 0) {
if (prevCurr != jCurr) {
// console.log(prevCurr, jCurr);
console.log(closeA[closeA.length - 2], jArch, jOld, jLast, jCurr, "T:", trend.toFixed(2), "V:", volatility(30), currdatetime, buyPrice);
prevCurr = jCurr;
}
///////////////////////////////////////////////BUY!BUY!BUY!BUY!BUY!BUY!BUY!BUY!

      // if (jCurr < 0 && buyPrice == 0) { /////////////////Algotithm 1
      // if (jOld - jCurr > 10 && buyPrice == 0) { /////////////////Algotithm 2
      // if ((jOld > jLast) && (jCurr > jLast) && (jLast < 10) && (buyPrice == 0)) { /////////////////Algotithm 3
      // if (jArch >= jOld && jOld > jLast && jCurr - jLast > 5 && buyPrice == 0 && trend >= 0) { /////////////////Algotithm 4
      // if (jArch > jOld && jOld > jLast && jCurr - jLast > 5 && buyPrice == 0 && jCurr < 30) { /////////////////Algotithm 5
      if (jArch > jOld && jOld > jLast && jCurr > jLast && buyPrice == 0) { /////////////////Algotithm 5
	  
buyPrice = closeA[closeA.length - 1]; //hotPrice
console.log(buyPrice, jArch, jOld, jLast, jCurr, "T:", trend.toFixed(2), "V:", volatility(30), currdatetime, 'BUY!');
bot.sendMessage(buyPrice, jArch, jOld, jLast, jCurr, "T:", trend.toFixed(2), "V:", volatility(30), currdatetime, 'BUY!');

fs.writeFile('buyPrice.txt',buyPrice,function(err){
	if(err)
	console.error(err);
	// console.log('Appended!');
});

fs.appendFile('register.txt',buyPrice + "\t" + jArch + "\t" + jOld + "\t" + jLast + "\t" + jCurr + "\tTrend:" + trend.toFixed(2) + "\t" + "\tVolatility:" + volatility(30) + "\t" + currdatetime + "\t" + 'BUY!' + "\n",function(err){
	if(err)
	console.error(err);
	// console.log('Appended!');
});

// bot.sendMessage(msg.chat.id, "bkobalava", buyPrice + "\t" + jArch + "\t" + jOld + "\t" + jLast + "\t" + jCurr + "\tTrend:" + trend.toFixed(2) + "\t" + "\tVolatility:" + volatility(30) + "\t" + currdatetime + "\t" + 'BUY!' + "\n").then(function () {
    // reply sent!
  // });
}
///////////////////////////////////////////////SELL!SELL!SELL!SELL!SELL!SELL!SELL!
// console.log(buyPrice);	
	  
     if (buyPrice != 0) { 
sellPrice = closeA[closeA.length - 1]; //hotPrice
profit = ((sellPrice - buyPrice) / buyPrice * 100) - 0.1;

  // process.stdout.clearLine();  // clear current text
  // process.stdout.cursorTo(0);  // move cursor to beginning of line
  // process.stdout.write(buyPrice+"/"+sellPrice+" Profit:"+profit.toFixed(2)+" J:"+jCurr+'\r');
// console.log(buyPrice, "/", sellPrice, " Profit:", profit.toFixed(2), " J:", jCurr);
  
// if (profit < -2 || jCurr > 90) { /////////////////Algotithm 1
// if (profit < -2 || jCurr - jOld > 10) { /////////////////Algotithm 2
// if (profit < - 2 || (jLast > jOld && jLast > jCurr && jLast > 90)) { /////////////////Algotithm 3
// if (profit < - 2 || ((jArch >= jOld && jLast > jOld && jLast - jCurr > 5) || profit >= 0.1)) { /////////////////Algotithm 4
if (profit < -1 || (profit >= 0.5 && closeA[closeA.length - 3] > closeA[closeA.length - 2])) { /////////////////Algotithm 5

console.log(sellPrice, jArch, jOld, jLast, jCurr, "T:", trend.toFixed(2), "V:", volatility(30), currdatetime, "Profit:", profit.toFixed(2), "%, SELL!");
bot.sendMessage(sellPrice, jArch, jOld, jLast, jCurr, "T:", trend.toFixed(2), "V:", volatility(30), currdatetime, "Profit:", profit.toFixed(2), "%, SELL!");
buyPrice = 0;
fs.writeFile('buyPrice.txt',buyPrice,function(err){  //
	if(err)
	console.error(err);
	// console.log('Appended!');
});
// bank = bank + profit - 0.1
fs.appendFile('register.txt',sellPrice + "\t" + jArch + "\t" + jOld + "\t" + jLast + "\t" + jCurr + "\tTrend:" + trend.toFixed(2) + "\t" + "\tVolatility:" + volatility(30) + "\t" + currdatetime + "\t" + 'SELL!' + "\t" + "Profit:" + profit.toFixed(2)+ "% \n\n",function(err){
	if(err)
	console.error(err);
	// console.log('Appended!');
});

// bot.sendMessage(msg.chat.id, "bkobalava", sellPrice + "\t" + jArch + "\t" + jOld + "\t" + jLast + "\t" + jCurr + "\tTrend:" + trend.toFixed(2) + "\t" + "\tVolatility:" + volatility(30) + "\t" + currdatetime + "\t" + 'SELL!' + "\t" + "Profit:" + profit.toFixed(2)+ "% \n\n").then(function () {
    // reply sent!
  // });
}
      }
	  
///////////////////////////////////////////////

}, {limit: 500});
// });

}, 30000);

//////////////////////////////////////////////////////////////////////////////////

