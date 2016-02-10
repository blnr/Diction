//= require_self
//= require_tree .

angular.module('diction.controllers', [
	'diction.factories'
])

.controller('MainCtrl', ['$scope', '$stateParams', 'Auth', 'lists', 'apiQueries', '$http', '$window',

	// Main scope (used in views)
	function($scope, $stateParams, Auth, lists, apiQueries, $http, $window) {

		/* 	createList function
		 *	used on the index page to create an initial list
		 *
		*/
		$scope.createList = function(){

			// prevent empty searches
			if(!$scope.word || $scope.word === '')
				return;

			// if no lists exist, create one
			if ($scope.lists.length <= 0) {
				// push new list to array
				$scope.lists.push({
					title: "List A",
					date: new Date(),
					words: []
				});
			}

			// set this list
			$scope.list = $scope.lists[0];

			// add words to this list
			$scope.addWords();
		};

		/* 	addList function
		 * 	creates new list
		 *
		*/
		$scope.addList = function(){

			// if logged in
			if ($scope.user) {
				// call factory function and pass list array param
				lists.create({
					title: "List - " + new Date().toJSON().slice(0,10),
					date: new Date().toJSON().slice(0,10),
					words: []
				});
			}
			// else guest user
			else {
				$scope.lists.push({
					title: "List - " + new Date().toJSON().slice(0,10),
					date: new Date().toJSON().slice(0,10),
					words: []
				});
			}

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
				if ($scope.user)
					lists.delete($scope.list.id);		// delete in database

				$scope.lists.splice($scope.lists.indexOf(list), 1);			// delete on cleint side
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

		/* 	addWords functions
	 	 *	add words to specific list
	 	 *
	 	*/
		$scope.addWords = function(){

			// split multiple words
			var query = $scope.word.split(", ");

			// loop each word
			angular.forEach(query, function(word, key){
				apiQueries.getData(word).then(function(response) {

					if (key >= query.length - 1)
						$window.location.assign('/#/dashboard');

					if ($scope.user) {
						lists.addWord($scope.list.id, {
							title: response['data']['word'],
							// meta
							display: response['data']['syll'],
							date: new Date(),
							speech: response['data']['speech'],
							link: response['data']['link'],
							dictionary: response['data']['data']
						})
						.success(function(word) {
							$scope.list.words.unshift(word);
						});
					}
					else {
						$scope.list.words.unshift({
							title: response['data']['word'],
							// meta
							display: response['data']['syll'],
							date: new Date(),
							speech: response['data']['speech'],
							link: response['data']['link'],
							dictionary: response['data']['data']
						})
					}
				})
			})
			// reset word
			$scope.word = '';
		};

		/*	deleteWord function
		 *	delete word from list
		 *
		*/
		$scope.deleteWord = function(word_id, word) {
			if ($scope.user)
				lists.deleteWord($scope.list.id, word_id);

			// client side
			$scope.list.words.splice($scope.list.words.indexOf(word), 1);
		};

		/* 	deleteList function
		 * 	deletes list based on ID
		 *
		*/
		$scope.updateList = function(list) {
			if ($scope.user) {
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
			}
		};

		/* 	shareList function
		 * 	shares public list
		 *
		*/
		$scope.shareList = function(list){
			if ($scope.user) {
				// load search page
				$window.open('/#/public/' + list['hash_token']);
			}
			else {
				// post list to server
				lists.create({
						title: $scope.list['title'],
						date: new Date().toJSON().slice(0,10),
						words: []
					}
				).success(function(list) {

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

		/* 	updateRange function
		 * 	updates range of definitions displayed
		 *
		*/
		$scope.updateRange = function(range) {
			console.log(range);
			console.log($scope.list.words);

		}

		// on page load
		// ------------------------------------
		// all lists
		$scope.lists = lists.lists;

		// default list used on search page
		$scope.list = $scope.lists[0];

	  // order by options
		$scope.sortOptions = [{name: 'Custom Sort', value : null, reversed : false}, {name: 'A > Z', value : 'title', reversed : false}, {name: 'Z > A', value : 'title', reversed : true}, {name: 'Date', value : 'date', reversed : true},{name: 'Speech', value : 'speech', reversed : true}];

		// get user authentication
		Auth.currentUser().then(function (user){
			$scope.user = user;
		});

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
		$scope.sortOptions = [{name: 'Custom Sort', value : null, reversed : false}, {name: 'A > Z', value : 'title', reversed : false}, {name: 'Z > A', value : 'title', reversed : true}, {name: 'Date', value : 'created_at', reversed : true},{name: 'Speech', value : 'speech', reversed : true}];
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
			  $state.go('user');
			});
		};

		$scope.register = function() {
			Auth.register($scope.user).then(function(){
			  $state.go('home');
			});
		};

	}

]);
