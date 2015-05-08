//= require angular-rails-templates
//= require_tree .


angular.module('d-angular', ['ui.router', 'templates'])

// Set routing/configuration
// ------------------------------
.config(['$stateProvider', '$urlRouterProvider',

	// Set state providers
	function($stateProvider, $urlRouterProvider) {$stateProvider

		// Home state
		.state('home', {
		  url: '/home',
		  templateUrl: 'home.html',
		  controller: 'MainCtrl',
		  resolve: {
			  listPromise: ['lists', function(lists){
			    return lists.getAll();
			  }]
		  }
		})

		// Lists state
		.state('lists', {
		  url: '/lists/{id}',
		  templateUrl: 'list.html',
		  controller: 'ListsCtrl',
			resolve: {
			  list: ['$stateParams', 'lists', function($stateParams, lists) {
			    return lists.get($stateParams.id);
			  }]
			}
		})

		$urlRouterProvider.otherwise('home');
	}
])


// lists factory
// Factories are used to organize and share code across the app.
// ------------------------------
.factory('lists', ['$http',

	function($http){
		// create new obect with array of lists
		var o = { lists: [] };

	  	// get all lists
		o.getAll = function() {
			return $http.get('/lists.json').success(function(data){
		  		angular.copy(data, o.lists);
			});
		};

		// get specific list
		o.get = function(id) {
		  return $http.get('/lists/' + id + '.json').then(function(res){
		    return res.data;
		  });
		};

		// create list
		o.create = function(post) {
		  return $http.post('/lists.json', post).success(function(data){
		    o.lists.push(data);
		  });
		};

		// add word to list
		o.addWord = function(id, word) {
		  return $http.post('/lists/' + id + '/words.json', word);
		};

	  	return o;

	}
])


// Main controller
// ------------------------------
.controller('MainCtrl', ['$scope', '$stateParams', 'lists', '$http',

	// Main scope (used in views)
	function($scope, $stateParams, lists, $http) {
		
		// array of lists
		$scope.lists = lists.lists;


		// Add list function
		// Creates a new list
		$scope.addList = function(){
			// prevent empty titles
			if(!$scope.title || $scope.title === '') { 
				return;
			}

			lists.create({
				title: $scope.title,
				date: new Date().toJSON().slice(0,10),
			});

			// reset title
			$scope.title = '';
		};


	}

])

// Lists controller
// ------------------------------
.controller('ListsCtrl', ['$scope', 'lists', 'list', '$http',

	// Main scope (used in views)
	function($scope, lists, list, $http){
		// get list by ID
		$scope.list = list;

		// Add word function
		$scope.addWord = function(){

			lists.addWord(list.id, {
			  	title: $scope.title,
				date: new Date().toJSON().slice(0,10),
			})
			.success(function(word) {
				$scope.list.words.push(word);
			});

			$scope.title = '';
		};
	}

]);


