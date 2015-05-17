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

		// delete list
		o.delete = function(id) {
			$http.delete('/lists/' + id + '.json');
		}

		// add word to list
		o.addWord = function(id, word) {
		  return $http.post('/lists/' + id + '/words.json', word);
		};

		o.deleteWord = function(id, word) {
			$http.delete('/lists/' + id + '/words/' + word + '.json');
		}

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

		$scope.deleteList = function(index) {
			lists.delete($scope.list.id);		// delete in database
			$scope.lists.splice(index, 1);		// delete client side
		};

		// Add word function
		$scope.addWord = function(){

			// API URL
			var api_url = "https://www.googleapis.com/scribe/v1/research?key=AIzaSyDqVYORLCUXxSv7zneerIgC2UYMnxvPeqQ&dataset=dictionary&dictionaryLanguage=en&query=";

			// get data from API
			$http.get(api_url + $scope.word)
			.success(function (response) {

				// push new word to array
				lists.addWord($scope.list.id, {
				  	title: 			$scope.word,
				  	pronunciation: 	response.data[0]["groupResult"]["displayName"].replace("<b>", "").replace("</b>", ""),
				  	speech: 		response.data[0]["dictionary"]["definitionData"][0]["wordForms"][0]["form"],
					definitions: 	response.data[0]["dictionary"]["definitionData"][0]["meanings"]
				})
				.success(function(word) {
					$scope.list.words.push(word);
				});

				// reset title
				$scope.word = '';
			});

		};

		$scope.deleteWord = function(word_id, word) {
			lists.deleteWord($scope.list.id, word_id);		// delete from database
			$scope.list.words.splice($scope.list.words.indexOf(word), 1);				// delete on cleint side

		};


	}

]);



