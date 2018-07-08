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

//////////////////////////////////////////////////////////////////////////////////

