//= require angular-rails-templates
//= require_tree .


angular.module('diction', ['ui.router', 'templates', 'ui.tree', 'ui.gravatar', 'Devise', 'angular-loading-bar', 'ui.bootstrap'])

/* 	Routing configuration for various 'states'
 *
*/
.config(['$stateProvider', '$urlRouterProvider',

	// Set state providers
	function($stateProvider, $urlRouterProvider) {$stateProvider

		// Splash state
		.state('home', {
		  url: '/home',
		  templateUrl: 'home.html',
		  controller: 'GuestCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('dashboard');
	        })
	      }]
		})

		// Search state
	    .state('search', {
	      url: '/search',
	      templateUrl: 'search.html',
	      controller: 'GuestCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('dashboard');
	        })
	      }]
	    })

		// Public state
	    .state('public', {
	      url: '/public/:hash_key',
	      templateUrl: 'public.html',
	      controller: 'PublicCtrl',
		  resolve: {
			  listPromise: ['lists', '$stateParams', function(lists, $stateParams){
			    return lists.get_public($stateParams['hash_key']);
			  }]
		  }
	    })

		// Dashboard state
		.state('dashboard', {
		  url: '/dashboard',
		  templateUrl: 'dashboard.html',
		  controller: 'UserCtrl',
		  resolve: {
			  listPromise: ['lists', function(lists){
			    return lists.getAll();
			  }]
		  }
		})

	    // Register state
	    .state('register', {
	      url: '/register',
	      templateUrl: '_register.html',
	      controller: 'AuthCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('dashboard');
	        })
	      }]
	    })

		$urlRouterProvider.otherwise('home');
	}
])


/* 	Lists factory
 * 	all HTTP post, get requests for list and word objects from the server
 *
*/
.factory('lists', ['$http', '$state',

	function($http, $state){
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

		// get specific list
		o.get_public = function(hash_key) {
			return $http.get('/public/' + hash_key + '.json').then(function(data){
		  		// only return if param matches public list hash
		  		if (data['data'] == 'null') {
					$state.go('home');
		  		}
		  		else {
			  		angular.copy(data, o.lists);
		  		}
			});
		};

		// create list
		o.create = function(post) {
		  return $http.post('/lists.json', post).success(function(data){
		    o.lists.push(data);
		  });
		};

		// update list
		o.update = function(id, post) {
			$http.put('/lists/' + id + '.json', post);
		}

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


/* 	UserCtrl controller 
 * 	User controller for dashboard access, allows users to CRUD items and lists
 *
*/
.controller('UserCtrl', ['$scope', '$stateParams', 'Auth', 'lists', '$http', '$window',

	// Main scope (used in views)
	function($scope, $stateParams, Auth, lists, $http, $window) {

		/* 	addList function 
		 * 	creates new list
		 *
		*/
		$scope.addList = function(){

			// call factory function and pass list array param
			lists.create({
				title: "List - " + new Date().toJSON().slice(0,10),
				date: new Date().toJSON().slice(0,10),
				words: []
			});

			// reset title
			$scope.title = '';

			// update to this list
			$scope.list = $scope.lists[$scope.lists.length - 1];
		};

		/* 	deleteList function 
		 * 	deletes list based on ID
		 *
		*/
		$scope.deleteList = function(list) {
			// confirm delete
			var confirmDelete = confirm("Are you sure you want to delete this list?");

			if (confirmDelete) {
				lists.delete($scope.list.id);							// delete in database

				$scope.lists.splice($scope.lists.indexOf(list), 1);		// delete on cleint side
				$scope.list.words.splice(0, $scope.list.words.length);	// delete all words

				// update current list selection
				if ($scope.lists.length > 0) {
					$scope.list = $scope.lists[0];
				}
				else {
					$scope.list = undefined;
				}
			}
		};

		/* 	shareList function 
		 * 	shares list based on ID
		 *
		*/
		$scope.shareList = function(list) {
			// load search page
			$window.open('/#/public/' + list['hash_token']);
		};

		/* 	addWords functions
		 *	add words to specific list
		 *
		*/ 
		$scope.addWords = function(){

			// split multiple words
			var split = $scope.word.split(", ");

			// loop each word
			angular.forEach(split, function(split, key){

				// API URL
				var google_api_url = "https://www.googleapis.com/scribe/v1/research?key=AIzaSyDqVYORLCUXxSv7zneerIgC2UYMnxvPeqQ&dataset=dictionary&dictionaryLanguage=en&query=" + split;

					// get data from API
					$http.get(google_api_url)

						.success(function (response) {

							// if data found
							if (response.data) {
								// push new word to array
								lists.addWord($scope.list.id, {
									title: response.data[0]["groupResult"]["query"],
									// meta
									display: response.data[0]["groupResult"]["displayName"].replace("<b>", "").replace("</b>", ""),
									date: new Date(),
									speech: response.data[0]["dictionaryData"]["definitionData"][0]["pos"].toLowerCase(),
									definitions: response.data[0]["dictionaryData"]["definitionData"][0]["meanings"]
								})
								.success(function(word) {
									$scope.list.words.push(word);
								});
							}
							else {
								console.log('error with response');
							}

							$scope.word = '';
						}) 
			})
		};

		/*	deleteWord function
		 *	delete word from list
		 *
		*/
		$scope.deleteWord = function(word_id, word) {
			lists.deleteWord($scope.list.id, word_id);						// delete from database
			$scope.list.words.splice($scope.list.words.indexOf(word), 1);	// delete on cleint side
		};

		/* 	updateList function 
		 * 	updates list based on ID
		 *
		*/
		$scope.updateList = function(list) {
			// prevent put request on list change/selection
			if (list['title'] == undefined) {
				// only update on client side
				$scope.list = $scope.lists[list];
			}
			else {
				// update on client side
				$scope.list = $scope.lists[$scope.lists.indexOf(list)];

				// call factory function and pass list array param
				lists.update($scope.list.id, angular.toJson($scope.list));
			}
		};

		/* 	updateSort function 
		 * 	updates sort options when element is dragged
		 *
		*/
		$scope.updateSort = function(index) {
			if (index === undefined) {
				var index = 0;
			}
			// set custom order
			$scope.selectedOrder = $scope.sortOptions[index];
		}

		// on page load
		// ------------------------------------
		// all lists
		$scope.lists = lists.lists;

		// default list used on search page
		$scope.list = $scope.lists[0];

		// order by options
		$scope.sortOptions = [{name: 'Custom Sort', value : null, reversed : false}, {name: 'A > Z', value : 'title', reversed : false}, {name: 'Z > A', value : 'title', reversed : true}, {name: 'Date', value : 'created_at', reversed : true}, {name: 'Speech', value : 'speech', reversed : true}];

		// set default order
		$scope.selectedOrder = $scope.sortOptions[3];

	}

])



/* 	Public Controller 
 * 	controller for publically accessible lists
 *
*/
.controller('PublicCtrl', ['$scope', '$stateParams', 'Auth', 'lists', '$http',

	// Main scope (used in views)
	function($scope, $stateParams, Auth, lists, $http) {

		// on page load
		// ------------------------------------
		// get this public list
		$scope.list = lists.lists['data'];

		// order by options
		$scope.sortOptions = [{name: 'Custom Sort', value : null, reversed : false}, {name: 'A > Z', value : 'title', reversed : false}, {name: 'Z > A', value : 'title', reversed : true}, {name: 'Date', value : 'created_at', reversed : true}, {name: 'Speech', value : 'speech', reversed : true}];

		// set default order
		//$scope.selectedOrder = $scope.sortOptions[3];
	}

])

/* 	Guest Controller 
 * 	controller for static clientside for guest users
 *
*/
.controller('GuestCtrl', ['$scope', '$stateParams', 'Auth', 'lists', '$http', '$window',

	// Main scope (used in views)
	function($scope, $stateParams, Auth, lists, $http, $window) {

		/* 	createList function
		 *	used on the index page to create an initial list
		 *
		*/
		$scope.createList = function(){

			// if no lists exist, create one
			if ($scope.lists.length <= 0) {
				// push new list to array
				$scope.lists.push({
					title: "List A", 
					date: new Date(),
					value: 0,
					words: []
				});
			}	

			// prevent empty searches
			if(!$scope.word || $scope.word === '') { 
				return;
			}
			else {

				// split multiple words
				var split = $scope.word.split(", ");

				// loop each word
				angular.forEach(split, function(split, key){

					// API URL
					var google_api_url = "https://www.googleapis.com/scribe/v1/research?key=AIzaSyDqVYORLCUXxSv7zneerIgC2UYMnxvPeqQ&dataset=dictionary&dictionaryLanguage=en&query=" + split;

						// get data from API
						$http.get(google_api_url)

							// handle successful
							.success(function (response) {
								// if data found
								if (response.data) {
									// push new word to array
									$scope.lists[0].words.unshift({
										title: response.data[0]["groupResult"]["query"],
										// meta
										display: response.data[0]["groupResult"]["displayName"].replace("<b>", "").replace("</b>", ""),
										date: new Date(),
										speech: response.data[0]["dictionaryData"]["definitionData"][0]["pos"].toLowerCase(),
										definitions: response.data[0]["dictionaryData"]["definitionData"][0]["meanings"]
									});
									// clear word
									$scope.word = "";
								}
								else {
									console.log('error with response');
								}

								// load search page
								$window.location.assign('/#/search');

								$scope.word = '';
								$('#search-word').val("");
							}) 
					})
				}
		};

		/* 	addList function 
		 * 	creates new list
		 *
		*/
		$scope.addList = function(){

			$scope.lists.push({
				title: "List - " + new Date().toJSON().slice(0,10),
				date: new Date().toJSON().slice(0,10),
				words: []
			});

			// reset title
			$scope.title = '';

			// update to this list
			$scope.list = $scope.lists[$scope.lists.length - 1];
		};

		/* 	deleteList function 
		 * 	deletes list based on ID
		 *
		*/
		$scope.deleteList = function(list) {
			// confirm delete
			var confirmDelete = confirm("Are you sure you want to delete this list?");

			if (confirmDelete) {
				// delete on client side
				$scope.lists.splice($scope.lists.indexOf(list), 1);
				// delete all words in list on client side
				$scope.list.words.splice(0, $scope.list.words.length);

				// update current list selection
				if ($scope.lists.length > 0) {
					$scope.list = $scope.lists[0];
				}
				else {
					$scope.list = undefined;
				}
			}
		};

		/* 	addWords functions
	 	 *	add words to specific list
	 	 *
	 	*/ 
		$scope.addWords = function(){

			// split multiple words
			var query = $scope.word.split(", ");

			// loop each word
			angular.forEach(query, function(words, key){

				// API URL
				var google_api_url = "https://www.googleapis.com/scribe/v1/research?key=AIzaSyDqVYORLCUXxSv7zneerIgC2UYMnxvPeqQ&dataset=dictionary&dictionaryLanguage=en&query=" + words;

					// get data from API
					$http.get(google_api_url)

						// handle successful
						.success(function (response) {

							// if data found
							if (response.data) {
								// push new word to array
								$scope.list.words.unshift({
									title: response.data[0]["groupResult"]["query"],
									// meta
									display: response.data[0]["groupResult"]["displayName"].replace("<b>", "").replace("</b>", ""),
									date: new Date(),
									speech: response.data[0]["dictionaryData"]["definitionData"][0]["pos"].toLowerCase(),
									definitions: response.data[0]["dictionaryData"]["definitionData"][0]["meanings"]
								});
								// clear word
								$scope.word = "";
							}
							else {
								// try wikipedia API for footnotes
								var wikipedia_api_url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=cell%20biology";

								// append multiple words to the url
								/*angular.forEach(words, function(word, key){

									// if more than one word
									if (key >= 1) {
										wikipedia_api_url += "%20" + word;
									}
									else {
										wikipedia_api_url += word.toLowerCase();
									}
								})*/


								// get data from API
								$http.get(wikipedia_api_url)

									// handle successful
									.success(function (response) {
										console.log(wikipedia_api_url);
										console.log(response);
									})
								

								//console.log('Error with response');
							}
				})
			})
		};

		/*	deleteWord function
		 *	delete word from list
		 *
		*/
		$scope.deleteWord = function(word_id, word) {
			$scope.list.words.splice($scope.list.words.indexOf(word), 1);	// delete on cleint side
		};

		/* 	deleteList function 
		 * 	deletes list based on ID
		 *
		*/
		$scope.updateList = function(index) {
			// update on client side
			$scope.list = $scope.lists[index];
			//$scope.lists[list].title = $scope.list.title;
		};

		/* 	shareList function 
		 * 	shares public list
		 *
		*/
		$scope.shareList = function(){

			// post list to server
			lists.create({
				title: $scope.list['title'],
				date: new Date().toJSON().slice(0,10),
				words: []
			})
			.success(function(list) {
				// get returned list ID, add it to client list
				$scope.list['id'] 		= list['id'];
				$scope.list['hash_token'] = list['hash_token']; 

				angular.forEach($scope.list.words, function(word, key){
					// Add to server list
					lists.addWord($scope.list.id, angular.toJson(word));
				})

				// load search page
				$window.open('/#/public/' + $scope.list['hash_token']);			

			});


		};

		/* 	updateSort function 
		 * 	updates sort options when element is dragged
		 *
		*/
		$scope.updateSort = function(index) {
			if (index === undefined) {
				var index = 0;
			}
			// set custom order
			$scope.selectedOrder = $scope.sortOptions[index];
		}

		// on page load
		// ------------------------------------
		// all lists
		$scope.lists = lists.lists;

		// default list used on search page
		$scope.list = $scope.lists[0];

	  	// order by options
		$scope.sortOptions = [{name: 'Custom Sort', value : null, reversed : false}, {name: 'A > Z', value : 'title', reversed : false}, {name: 'Z > A', value : 'title', reversed : true}, {name: 'Date', value : 'date', reversed : true}, {name: 'Speech', value : 'speech', reversed : true}];
		
		// set default order
		//$scope.selectedOrder = $scope.sortOptions[3];
	}
])


/* 	Nav Controller 
 * 	Used for controlling sessions
 *
*/
.controller('NavCtrl', ['$scope', 'Auth', '$window', 'lists',

	// Main scope (used in views)
	function($scope, Auth, $window, lists) {

		$scope.signedIn = Auth.isAuthenticated;
		$scope.logout = Auth.logout;

		Auth.currentUser().then(function (user){
			$scope.user = user;
		});

		$scope.$on('devise:new-registration', function (e, user){
			$scope.user = user;

			// create a default empty list
			lists.create({
				title: "List - " + new Date().toJSON().slice(0,10),
				date: new Date().toJSON().slice(0,10),
				words: []
			});
		});

		$scope.$on('devise:login', function (e, user){
			$scope.user = user;
		});

		$scope.$on('devise:logout', function (e, user){
			$scope.user = {};
			$window.location.assign('http://diction.help');		// redirect to home page
		});
	}

])

/* 	Auth Controller 
 * 	Used for authentication (login/register)
 *
*/
.controller('AuthCtrl', ['$scope', '$state', 'Auth',

// Main scope (used in views)
function($scope, $state, Auth) {

	$scope.login = function() {
		Auth.login($scope.user).then(function(){
		  $state.go('dashboard');
		});
	};

	$scope.register = function() {
		Auth.register($scope.user).then(function(){
		  $state.go('home');
		});
	};

}

]);

