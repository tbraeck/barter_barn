Rails.application.routes.draw do
  # resources :create_free_stuffs
  resources :services, only: [:index, :show, :create, :update, :destroy]
  resources :goods, only: [:index, :show, :create, :update, :destroy]
  resources :free_stuffs, only: [:index, :show, :create, :update, :destroy]

  resources :forums, only: [:index, :show]
  resources :comments
  resources :users, only: [:show]
  resources :comments do
    post 'dual_save', on: :collection
  end 

resources :users do
  resources :user_goods
  resources :user_services
  resources :user_free_stuffs
  resources :user_comments
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

get "/users/:user_id/user_comments", to: "user_comments#index"
post "/users/:user_id/user_comments", to: "user_comments#create"
delete "users/:user_id/user_comments/:comment_id", to: "user_comments#destroy"
patch "/users/:user_id/user_comments/:comment_id", to: "user_comments#update"

# delete "users/:user_id/user_goods/:service_id", to: "user_#services_destroy"
# patch "/users/:user_id/user_items/:service_id", to: "user_items#services_update"
# delete "users/:user_id/user_items/:free_stuffs_id", to: "user_items#free_stuffs_destroy"
# patch "/users/:user_id/user_items/:free_stuffs_id", to: "user_items#free_stuffs_update"

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
