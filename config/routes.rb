Rails.application.routes.draw do
  resources :create_free_stuffs
  resources :services
  resources :goods
  resources :free_stuffs
  resources :forums
  resources :comments
  resources :comments do
    post 'dual_save', on: :collection
  end 

  resources :users do 
    resources :forums
    resources :goods
    resources :comments
    resources :free_stuffs
    resources :services
  end

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
