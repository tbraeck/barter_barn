class UserFreeStuffsController < ApplicationController
  before_action :set_user
  before_action :set_user_free_stuff, only: [:index, :show, :create, :update, :destroy]
  skip_before_action :authorize


  def index
    user_free_stuffs = @current_user.user_free_stuffs
    render json: user_free_stuffs
  end

  def show
    render json: @user_free_stuff
  end

  def create
    @user_free_stuff = @current_user.user_free_stuffs.new(user_free_stuff_params)
    
    if @user_free_stuff.save
      render json: @user_free_stuff, status: :created
    else
      render json: { errors: @user_free_stuff.errors.full_messages }, status: :unprocessable_entity
    end
  end


    def destroy
    @user_free_stuff = set_user_free_stuff
    @user_free_stuff.destroy
    head :no_content
  end

  private

  def set_user
    user_id = params[:user_id]
    # puts "user_id: #{user_id}"
    @current_user = User.find(user_id)
  end

  def set_user_free_stuff
    user_id = params[:user_id]  
    user_free_stuff_id = params[:id]
    # puts "user_id: #{user_id}, user_free_stuff_id: #{user_free_stuff_id}"
    @user_free_stuff = @current_user.user_free_stuffs.find(user_free_stuff_id)
  end

  def user_free_stuff_params
    params.require(:user_free_stuff).permit(:user_id, :claimant_id, :free_stuff_id, :body, :created_at, :updated_at)
  end
  
end
