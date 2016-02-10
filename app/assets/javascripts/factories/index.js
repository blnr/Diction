//= require_self
//= require_tree .

angular.module('diction.factories', [])

/* 	Lists factory
 * 	RESTful requests for list and word objects
 *
*/
.factory('lists', ['$http', '$state',

	function($http, $state){

		// create new obect with array of lists
		var listsObject = { lists: [] };

	  	// get all lists
		listsObject.getAll = function() {
			return $http.get('/lists.json').success(function(data){
		  		angular.copy(data, listsObject.lists);
			});
		};

		// get specific list
		listsObject.get = function(id) {
		  return $http.get('/lists/' + id + '.json').then(function(res){
		    return res.data;
		  });
		};

		// get specific list
		listsObject.get_public = function(hash_key) {
			return $http.get('/public/' + hash_key + '.json').then(function(data){
		  		// only return if param matches public list hash
		  		if (data['data'] == 'null') {
					$state.go('home');
		  		}
		  		else {
			  		angular.copy(data, listsObject.lists);
		  		}
			});
		};

		// create list
		listsObject.create = function(post) {
		  return $http.post('/lists.json', post).success(function(data){
		    listsObject.lists.push(data);
		  });
		};

		// update list
		listsObject.update = function(id, post) {
			$http.put('/lists/' + id + '.json', post);
		}

		// delete list
		listsObject.delete = function(id) {
			$http.delete('/lists/' + id + '.json');
		}

		// add word to list
		listsObject.addWord = function(id, word) {
		  return $http.post('/lists/' + id + '/words.json', word);
		};

		listsObject.deleteWord = function(id, word) {
			$http.delete('/lists/' + id + '/words/' + word + '.json');
		}

	  	return listsObject;

	}
])


/* 	apiQueries factory
 *	Makes request to API and returns response as an object
*/
.factory('apiQueries', ['$http', '$state', '$window', function($http, $state, $window){

	// create new obect with array of words
	var responseObject = { words: [] };

	// Google API
	responseObject.getData = function(word) {
		return $http.get("/api/" + word);
	}

	return responseObject;

}]);
