'use strict';

// Retrieve data 

app.controller('PolicyListCtrl', function($scope, $http ,$filter) {
	
	var request = $http.get('policies/policies.json').success(function(data){
		$scope.policies = data;
		// convert properties to Date objects
		$scope.groupItems();
	});
	$scope.reverse=false;
	$scope.predicate='';
	$scope.listLimit= 5;
	$scope.pages = 0;
	$scope.currentPage = 0;
	$scope.groupedItems = {};

	// predefined properties that are dates
	$scope.dateProps = {
		'receivedDate' : 1,
		'policyEffectiveDate' : 1
	}


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
		// negate reverse if it's a same predicate, otherwise set to false
		$scope.reverse = $scope.predicate == predicate ? !$scope.reverse : false;
		$scope.predicate = predicate;
		// convert the date prop string to Date object on the fly, so it can compare 2 dates correctly
		// leave original string intact so it's searchable
		$scope.groupItems( 
			$filter('orderBy')
				( $scope.policies, 
					function(item){
						return $scope.dateProps.hasOwnProperty(predicate) ? new Date( item[predicate] ) : item[predicate];
					}, 
					$scope.reverse
				) 
		)		
	}


	// a helper to add class "dsc" or "asc" to the header column when it's being sorted
	$scope.selectedColumn = function(predicate) {
		if ($scope.predicate === predicate) {
			return $scope.reverse ? 'dsc' : 'asc';
		}
	}	
	
}) // PolicyListCtrl

