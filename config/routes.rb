Rails.application.routes.draw do
  resources :services, only: [:index, :show, :create, :update, :destroy]
  resources :goods, only: [:index, :show, :create, :update, :destroy]
  resources :free_stuffs, only: [:index, :show, :create, :update, :destroy]
  resources :forums, only: [:index, :show]
  resources :comments, only: [:index, :show, :create, :update, :destroy]
  resources :comments do
    post 'dual_save', on: :collection
  end
  resources :posts, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:index, :show, :create]

  resources :users do 
    resources :goods, controller: 'user_goods'

    resources :user_posts
    resources :user_comments
    resources :user_free_stuff
    resources :user_services
    resources :user_goods
  end
  # resources :categories, only: [:index, :show]
  # resources :users do
  #   resources :user_drawings
  # end

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

get "/users/:user_id/posts", to: "user_posts#index"
post "/users/:user_id/posts", to: "user_posts#create"
delete "users/:user_id/posts/:post_id", to: "user_posts#destroy"
patch "/users/:user_id/posts/:post_id", to: "user_posts#update"

get "/users/:user_id/comments", to: "user_comments#index"
post "/users/:user_id/comments", to: "user_comments#create"
delete '/users/:user_id/user_comments/:comment_id', to: 'user_comments#destroy'
patch "/users/:user_id/posts/:comment_id", to: "user_comments#update"

get "/users/:user_id/goods", to: "user_goods#index"
post "/users/:user_id/goods", to: "user_goods#create"
delete '/users/:user_id/goods/:good_id', to: 'user_goods#destroy'
patch "/users/:user_id/goods/:good_id", to: "user_goods#update"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
