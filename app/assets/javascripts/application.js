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
		  },

		})

		// Lists state
		.state('lists', {
		  url: '/lists{id}',
		  templateUrl: 'lists.html',
		  controller: 'ListsCtrl'
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

		// get list by ID
		$scope.list = lists.lists[$stateParams.id];

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

		// Add word function
		// Adds word to specific list based on list scope
		$scope.addWord = function(){

			// API URL
			var api_url = "https://www.googleapis.com/scribe/v1/research?key=AIzaSyDqVYORLCUXxSv7zneerIgC2UYMnxvPeqQ&dataset=dictionary&dictionaryLanguage=en&query=";

			// get data from API
			$http.get(api_url + $scope.word)

				// handle successful
				.success(function (response) {
					// push new word to array
					$scope.list.words.push({
						title: $scope.word,
						date: new Date().toJSON().slice(0,10),
						// meta
						display: response.data[0]["groupResult"]["displayName"],
						sound: "",
						speech: "",
						definitions: response.data[0]["dictionary"]["definitionData"][0]["meanings"]
					});

					// reset title
					$scope.word = '';
				});

		};
	}

])

// Lists controller
// ------------------------------
.controller('ListsCtrl', ['$scope', '$stateParams', 'lists', '$http',

	// Main scope (used in views)
	function($scope, $stateParams, lists, $http){
		// get list by ID
		$scope.list = lists.lists[$stateParams.id];

		// Add comment function
		$scope.addWord = function(){

			// API URL
			var api_url = "https://www.googleapis.com/scribe/v1/research?key=AIzaSyDqVYORLCUXxSv7zneerIgC2UYMnxvPeqQ&dataset=dictionary&dictionaryLanguage=en&query=";

			// get data from API
			$http.get(api_url + $scope.title)
				// handle successful
				.success(function (response) {
					// push new list to array
					$scope.list.words.push({
						title: $scope.title,
						date: new Date().toJSON().slice(0,10),
						// meta
						display: response.data[0]["groupResult"]["displayName"],
						sound: "",
						speech: "",
						definitions: response.data[0]["dictionary"]["definitionData"][0]["meanings"]
					});
				});
		};
	}

]);
