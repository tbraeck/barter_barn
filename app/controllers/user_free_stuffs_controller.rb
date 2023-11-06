class UserFreeStuffsController < ApplicationController
  before_action :authorize


  def index
    free_stuffs = @current_user.saved_free_stuffs
    render json: free_stuffs
  end

  def show
    render json: @current_user.saved_free_stuffs
  end

  def create
    free_stuff = FreeStuff.find(params[:id])
    
    if @current_user.saved_free_stuffs << free_stuff
      render json: free_stuff, status: :created
    else
      render json: { errors: free_stuff.errors.full_messages }, status: :unprocessable_entity
    end
  end


    def destroy
    user_free_stuff = @current_user.saved_free_stuffs.find_by!(id: params[:id])
    user_free_stuff.destroy
    head :no_content
  end

  private


  def set_user_free_stuff
    user_id = params[:user_id]
    user_free_stuff_id = params[:id]
    Rails.logger.info("user_id: #{user_id}, user_free_stuff_id: #{user_free_stuff_id}")
  
    @user_free_stuff = @current_user.free_stuffs.find(user_free_stuff_id)
  end

  def user_free_stuff_params
    params.require(:user_free_stuff).permit(:user_id, :claimant_id, :free_stuff_id, :body, :created_at, :updated_at, :forum_id)
  end
  
end
