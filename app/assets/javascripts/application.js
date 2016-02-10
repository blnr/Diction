//= require angular-rails-templates
//= require_tree .

angular.module('diction', [
	'ui.router',
	'templates',
	'ui.tree',
	'Devise',
	'angular-loading-bar',
	'ui.bootstrap',
	'diction.controllers',
	'diction.factories'
])

/* 	Routing configuration for various 'states'
 *
*/
.config(['$stateProvider', '$urlRouterProvider',

	// Set state providers
	function($stateProvider, $urlRouterProvider) {$stateProvider

		// homepage
		.state('home', {
		  url: '/home',
		  templateUrl: 'home.html',
		  controller: 'MainCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('user');
	        })
	      }]
		})

		// guest state
	    .state('guest', {
			url: '/dashboard',
			templateUrl: 'dashboard.html',
			controller: 'MainCtrl',
			onEnter: ['$state', 'Auth', function($state, Auth) {
				Auth.currentUser().then(function (){
					$state.go('user');
				})
			}]
	    })

		// Dashboard state
		.state('user', {
			url: '/dashboard',
			templateUrl: 'dashboard.html',
			controller: 'MainCtrl',
			resolve: {
				listPromise: ['lists', function(lists){
			    	return lists.getAll();
			  	}]
			}
		})

		// public accessible link (readonly)
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

	    // account registration
	    .state('register', {
	      url: '/register',
	      templateUrl: 'register.html',
	      controller: 'AuthCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('user');
	        })
	      }]
	    })

		$urlRouterProvider.otherwise('home');
	}
]);
