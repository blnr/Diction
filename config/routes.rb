Rails.application.routes.draw do

	resources :lists, :words, :users

  	root to: 'application#index'	  							# Index Routing
  	post '/search', to: "words#search"							# Search
   	#get 'signup', to: "users#new"

	get    'login', 	to: 'sessions#new'
	post   'login', 	to: 'sessions#create'
	delete 'logout', 	to: 'sessions#destroy'


end
