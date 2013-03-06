'use strict';

/* Filters */

// ##formatCurrency
// it adds .00 if the input is an interger, ie: 123999 -> $123,999*.00*
angular.module('policy.filters',[]).
	filter('formatCurrency', function(){
		return function(input) {
			input = '' + input; // cast as a string, so it can use split()
			var n;
			if (!isNaN(input)) {
				n = input.split('.');
				n[0] = (parseInt(n[0])).toLocaleString();

				// add $ sign
				(n[0].indexOf('-') === 0) ?
					// negative number : add $ after the minus
					n[0] = n[0].replace('-','-$') : 
					n[0] = '$' + n[0];

				// add .00 if it's an integer
				(n[1] != undefined) ? 
					input = n[0] + '.' +  n[1] :
					input = n[0] + '.00';
			}

			return input;
		}
	}).
	filter('range', function(){
		return function(input, total) {
			total = parseInt(total, 10);
			for (var i=0; i<total; i++) {
				input.push(i);
			}
			return input;
		}
	})


