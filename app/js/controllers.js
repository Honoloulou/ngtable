'use strict';

// Retrieve data 

app.controller('PolicyListCtrl', function($scope, $http ,$filter) {
	
	var request = $http.get('policies/policies.json').success(function(data){
		$scope.policies = data;
		$scope.groupItems();
	});
	$scope.reverse=true;
	$scope.predicate='';
	$scope.listLimit= 5;
	$scope.pages = 0;
	$scope.currentPage = 0;
	$scope.groupedItems = {};


	$scope.setPage = function(page) {
		$scope.currentPage = page
	}

	$scope.prevPage = function() {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
	}

	$scope.nextPage = function() {
		if ($scope.currentPage < $scope.pages - 1) {
			$scope.currentPage ++;
		}
	}

	// group items to pages
	// param *policies*  - pass in custom data 
	$scope.groupItems = function(policies){
		var policies = policies || $scope.policies;
		$scope.groupedItems = {
			// initialize the first hash
			'0' : []
		};
		$scope.pages = Math.ceil(policies.length / $scope.listLimit);

		var groupIndex = 0;

		for (var i=0, l=policies.length; i<l; i++) {
			if (groupIndex < Math.floor(i/$scope.listLimit)) {
				groupIndex++;
				$scope.groupedItems[''+groupIndex] = [];
			}

			$scope.groupedItems['' + groupIndex].push(policies[i]);
		}
	}

	// search policy
	$scope.searchPolicy = function() {
		// reset the currentPage to 0
		$scope.currentPage = 0;
		// search the policies based on the query, again re-group the items again
		var filteredItems =  $filter('filter')( $scope.policies,$scope.query);

		$scope.predicate ='';
		$scope.reverse = false;
		$scope.groupItems( filteredItems )
		

	}

	$scope.sortBy = function(predicate){
		var tempArr = [];
		// join arrays
		for (var i=0, l=$scope.pages; i<l; i++) {
			tempArr.push.apply(tempArr, $scope.groupedItems[i]);
		}
		$scope.predicate = predicate;
		$scope.reverse = !$scope.reverse;
		$scope.groupItems( $filter('orderBy')(tempArr, $scope.predicate, $scope.reverse) );
	}
	
	
	
}) // PolicyListCtrl

