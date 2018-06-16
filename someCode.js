//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
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
function max(arr, num) {
  if (!Array.isArray(arr)) {
    throw TypeError('expected first argument to be an array');
  }

  var res = [];
    for (var n = 0; n < arr.length; n++) {
		if ((n + num) > (arr.length - 1)) {
		// res.push(Math.max(arr.slice(n, (arr.length - 1))));
		// res.push(arr.slice(n, (arr.length - 1)).reduce(function(acc, val) { return acc + val; }, 0));
		res.push(Math.max.apply(Math, arr.slice(n, (arr.length))));
		}else{
		// res.push(Math.max(arr.slice(n, (n + num))));
		// res.push(arr.slice(n, (n + num)).reduce(function(acc, val) { return acc + val; }, 0));
		res.push(Math.max.apply(Math, arr.slice(n, (n + num))));
		}
		// res.push(maximum);
  }
  return res;
}
//////////////////////////////////////////////////////////////////////////////////
function min(arr, num) {
  if (!Array.isArray(arr)) {
    throw TypeError('expected first argument to be an array');
  }

  var res = [];
    for (var n = 0; n < arr.length; n++) {
		if ((n + num) > (arr.length - 1)) {
		res.push(Math.min.apply(Math, arr.slice(n, (arr.length))));
		}else{
		res.push(Math.min.apply(Math, arr.slice(n, (n + num))));
		}
		// res.push(res);
  }
  return res;
}
//////////////////////////////////////////////////////////////////////////////////
    // rsvs.push((close - min) / (max - min) * 100);
	// ks = sma(rsvs, 3)
	// ds = sma(ks, 3)
    // for (var i = 0; i < ks.length; i++) js.push(3 * ks[i] - 2 * ds[i]);
//////////////////////////////////////////////////////////////////////////////////
console.log(max([5, 4, 9, 8, 789, 4578, 545, 785, 4589, 998], 3));
console.log(min([5, 4, 9, 8, 789, 4578, 545, 785, 4589, 998], 3));
// console.log(sma([5, 4, 9, 8, 789, 4578, 545, 785, 4589, 998], 3));
