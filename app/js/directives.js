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
			templateUrl: "partials/pagination.html",
			link: function(scope, element, attrs) {
				scope.pages = Math.ceil(scope.policies.length / scope.listLimit);
				console.log('directive pagination ' + scope.pages);
			}
		}
	})

