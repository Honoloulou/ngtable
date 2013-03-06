'use strict';

/*
// To do:
	
	filter for dollar amount
	pagination
	show amount

*/
// Declare app level module which depends on filters, and services
var app = angular.module('policy', ['policy.filters','policy.directives']);


app.config(['$routeProvider', function($routeProvider){
		$routeProvider.
			when('/list',{templateUrl: 'partials/policytable.html', controller: 'PolicyListCtrl'}).
			otherwise({redirectTo: '/list'})
	}])

