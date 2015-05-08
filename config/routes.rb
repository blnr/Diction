Rails.application.routes.draw do


  root to: 'application#angular'	  							# Index Routing

  resources :lists, only: [:create, :index, :show] do
    resources :words, only: [:show, :create] do
    end
  end



end
