Rails.application.routes.draw do
  resources :services, only: [:index, :show, :create, :update, :destroy]
  resources :goods, only: [:index, :show, :create, :update, :destroy]
  resources :free_stuffs, only: [:index, :show, :create, :update, :destroy]
  resources :forums, only: [:index, :show]
  resources :comments, only: [:index, :show, :create, :update, :destroy]
  resources :posts, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:index, :show, :create]

  resources :users do 
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

  # get  "/login", to: "sessions#new" 
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
