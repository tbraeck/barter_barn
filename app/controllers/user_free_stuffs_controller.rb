class UserFreeStuffsController < ApplicationController
  before_action :authorize


  def index
    user_free_stuffs = @current_user.saved_free_stuffs
    render json: user_free_stuffs
  end

  
  def show
    render json: @user_free_stuff
  end

  # def show
  #   render json: @user_service
  # end
  def create
    free_stuff = FreeStuff.find(params[:id])
    
    if @current_user.saved_free_stuffs << free_stuff
      render json: free_stuff, status: :created
    else
      render json: { errors: free_stuff.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  # def claim
  #   free_stuff = FreeStuff.find(params[:id])
  #   if free_stuff.claimant_id.nil?
  #     free_stuff.update(claimant_id: @current_user.id)
      
  #     @current_user.saved_free_stuffs << free_stuff
  #     render json: free_stuff, status: :created

  #   else
  #     render json: { error: 'Item has already been claimed' }, status: :unprocessable_entity
  #   end
  # end

  def return
    @user_free_stuff = @current_user.saved_free_stuffs.find_by!(id: params[:id])

    if @user_free_stuff.claimant_id 
      @user_free_stuff.update(claimant_id: nil)

      render json: @user_free_stuff
    else
      render json: { error: 'Item could not be returned' }, status: :unprocessable_entity
    end
  end
  
    def destroy
    user_free_stuff = @current_user.saved_free_stuffs.find_by!(id: params[:id])
@current_user.saved_free_stuffs.delete(user_free_stuff)    
render json: @current_user.free_stuffs
  end

  private


  # def set_user_free_stuff
  #   user_id = params[:user_id]
  #   user_free_stuff_id = params[:id]
  #   Rails.logger.info("user_id: #{user_id}, user_free_stuff_id: #{user_free_stuff_id}")
  
  #   @user_free_stuff = @current_user.free_stuffs.find(user_free_stuff_id)
  # end

  def user_free_stuff_params
    params.permit(:user_id, :claimant_id, :main_image, :body, :forum_id)
  end
  
end
