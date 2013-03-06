'use strict';

// Retrieve data 

app.controller('PolicyListCtrl', function($scope, $http ,$filter) {
	
	var request = $http.get('policies/policies.json').success(function(data){
		$scope.policies = data;
		$scope.groupItems();
		console.log('get json success');
	});

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

		console.log('groupItems executed length: ' + policies.length )
		var groupIndex = 0;

		for (var i=0, l=policies.length; i<l; i++) {
			if (groupIndex < Math.floor(i/$scope.listLimit)) {
				groupIndex++;
				console.log('groupIndex ' + groupIndex)
				$scope.groupedItems[''+groupIndex] = [];
			}

			$scope.groupedItems['' + groupIndex].push(policies[i]);
		}
	}

	
	//

	
}) // PolicyListCtrl

