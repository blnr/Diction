Rails.application.routes.draw do


  devise_for :users
  root to: 'application#angular'	  							# Index Routing

  resources :lists, only: [:create, :index, :show, :destroy] do
    resources :words, only: [:create, :index, :show, :destroy] do
    end
  end



end
