/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(from, to) {
	var i,
		divisor,
		maxDivisor,
		isPrime,
		arr = [];
	if(typeof(from) === 'undefined' || typeof(to) === 'undefined'){
		throw new Error();
	}
	from = +from;
	to = +to;
	for(i = from; i <= to; i += 1){
		if(isNaN(i)){
			throw new Error();
		}
		maxDivisor = Math.sqrt(i);
		isPrime = true;
		for(divisor = 2; divisor <= maxDivisor; divisor += 1){
			if(!(i % divisor)){
				isPrime = false;
				break;
			}
		}
		if(isPrime && i > 1){
			arr.push(i);
		}
	}
	return arr;
}

module.exports = findPrimes;
