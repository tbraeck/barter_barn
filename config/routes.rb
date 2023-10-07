Rails.application.routes.draw do
  # resources :create_free_stuffs
  resources :services
  resources :goods
  resources :free_stuffs
  resources :user_items
  resources :forums
  resources :comments
  resources :users
  resources :comments do
    post 'dual_save', on: :collection
  end 
resources :users do
  resources :services
  resources :goods
  resources :free_stuffs
  resources :user_items
  resources :comments
end

get 'forums/featured', to: 'forums#featured', as: 'featured_forum'
# get '/forums/:forum_id/'
  get "/users/:user_id/user_items", to: "user_items#index"
post "/users/:user_id/user_items", to: "user_items#create"
delete "users/:user_id/user_items/:good_id", to: "user_items#goods_destroy"
patch "/users/:user_id/user_items/:good_id", to: "user_items#goods_update"
delete "users/:user_id/user_items/:service_id", to: "user_items#services_destroy"
patch "/users/:user_id/user_items/:service_id", to: "user_items#services_update"
delete "users/:user_id/user_items/:free_stuffs_id", to: "user_items#free_stuffs_destroy"
patch "/users/:user_id/user_items/:free_stuffs_id", to: "user_items#free_stuffs_update"

# get "/users/:user_id/goods", to: "users#goods_index"
# post "/users/:user_id/goods", to: "users#goods_create"
# delete "users/:user_id/goods/:good_id", to: "users#goods_destroy"
# patch "/users/:user_id/goods/:good_id", to: "users#goods_update"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
