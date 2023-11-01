class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]


  def index 
    users = User.all
    render json: users, include: [:goods, :services, :free_stuffs], status: :ok
  end
  
  def show
   
    render json: @current_user
  end
  
  # POST /usersrails
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  private
   
    def user_params
      params.permit(:id, :username, :password, :email)
    end
end
