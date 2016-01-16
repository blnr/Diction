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
		  controller: 'GuestCtrl',
	      onEnter: ['$state', 'Auth', function($state, Auth) {
	        Auth.currentUser().then(function (){
	          $state.go('dashboard');
	        })
	      }]
		})

		// guest dashboard
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

		// user dashboard
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
]);