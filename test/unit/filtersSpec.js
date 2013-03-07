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

  describe('should sort Date objects with orderBy filter', function(){
    it('orderBy', inject(function($filter){
      var orderBy = $filter('orderBy');

      expect(orderBy([
        {a:new Date('1/12/1980'), b: 1},
        {a:new Date('1/6/1980'), b: 2}
      ],['a'])).toEqual([{a:new Date('1/6/1980'), b:2}, {a:new Date('1/12/1980'), b: 1}])

    }))
  })
  


});
