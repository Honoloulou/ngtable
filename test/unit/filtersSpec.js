'use strict';

/* jasmine specs for filters go here */

describe('filters', function() {
  beforeEach(module('policy.filters'));

  describe('formatCurrency', function(){
  	it('should format a string to currency format', 
  		inject(function(formatCurrencyFilter){
  			expect(formatCurrencyFilter('123000')).toEqual('$123,000.00')
  			expect(formatCurrencyFilter(123000)).toEqual('$123,000.00')
  			expect(formatCurrencyFilter(123000.1)).toEqual('$123,000.1')
  			expect(formatCurrencyFilter(-0)).toEqual('$0.00')
  			expect(formatCurrencyFilter(-10)).toEqual('-$10.00')
  			expect(formatCurrencyFilter(-100000)).toEqual('-$100,000.00')
  		})
  	);
  })

  describe('range', function(){
    it('should create an array', inject(function($filter){
      expect( $filter('range')([],3)) .toEqual([0,1,2]);
    }));
  })


});
