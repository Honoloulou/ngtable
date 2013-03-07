'use strict';

/* Directives */



angular.module('policy.directives',[]).
	directive("listLimit", function(){
		return {
			link: function(scope, element, attrs) {
				scope.listLimit = attrs.listLimit;
			}
		} 
	}).
	directive("pagination", function(){
		return {
			templateUrl: "partials/pagination.html"
		}
	})

