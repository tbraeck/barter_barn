class UsersController < ApplicationController
  skip_before_action :authorize


  def index 
    users = User.includes(:goods, :services, :free_stuffs).all
    render json: users, include: [:goods, :services, :free_stuffs], status: :ok
  end
  
  
  def show
    @current_user = User.includes(:goods, :services, :free_stuffs).find(params[:id])
    render json: @current_user, include: [:goods, :services, :free_stuffs]
  end
  

  # POST /users
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_user
    #   @user = User.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :password, :email)
    end
end
