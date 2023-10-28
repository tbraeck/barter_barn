Rails.application.routes.draw do
  resources :forums, only: [:index, :show]
  resources :services, only: [:index, :show, :create, :update, :destroy]
  resources :goods, only: [:index, :show, :create, :update, :destroy]
  resources :free_stuffs, only: [:index, :show, :create, :update, :destroy]
  
  # resources :users, only: [:show]
  resources :users do
    resources :goods
    resources :services
    resources :free_stuffs
    resources :user_goods
    resources :user_services
    resources :user_free_stuffs
  end

  resources :free_stuffs do
    member do
      post 'claim'
      post 'return'
    end
  end

get 'forums/featured', to: 'forums#featured', as: 'featured_forum'

get "/users/:user_id/user_goods", to: "user_goods#index"
post "/users/:user_id/user_goods", to: "user_goods#create"
delete "users/:user_id/user_goods/:good_id", to: "user_goods#destroy"
patch "/users/:user_id/user_goods/:good_id", to: "user_goods#update"

get "/users/:user_id/user_services", to: "user_services#index"
post "/users/:user_id/user_services", to: "user_services#create"
delete "users/:user_id/user_services/:good_id", to: "user_services#destroy"
patch "/users/:user_id/user_services/:good_id", to: "user_services#update"

get "/users/:user_id/user_free_stuffs", to: "user_free_stuffs#index"
post "/users/:user_id/user_free_stuffs", to: "user_free_stuffs#create"
delete "users/:user_id/user_free_stuffs/:free_stuff_id", to: "user_free_stuffs#destroy"
patch "/users/:user_id/user_free_stuffs/:free_stuff_id", to: "user_free_stuffs#update"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
