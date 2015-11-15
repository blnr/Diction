Rails.application.routes.draw do
  
  # Index Routing
  root to: 'application#angular'
  
  # match hash token for public URL's
  match "/public/:hash_token" => "lists#public_list", as: "public", via: [:get], :defaults => { :format => 'json' }

  # authenication
  devise_for :users

  resources :lists, only: [:create, :index, :show, :destroy] do
    resources :words, only: [:create, :index, :show, :destroy] do
    end
  end



end
