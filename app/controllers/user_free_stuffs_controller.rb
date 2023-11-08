class UserFreeStuffsController < ApplicationController
  before_action :authorize

  def index
    user_free_stuffs = @current_user.saved_free_stuffs
    render json: user_free_stuffs
  end

  def show
    render json: @user_free_stuff
  end

  def create
    free_stuff = FreeStuff.find(params[:id])
    
    if @current_user.saved_free_stuffs << free_stuff
      render json: free_stuff, status: :created
    else
      render json: { errors: free_stuff.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def claim
    free_stuff = FreeStuff.find(params[:id])
    if free_stuff.claimant_id.nil?
      free_stuff.update(claimant_id: @current_user.id)
      
      @current_user.saved_free_stuffs << free_stuff
      render json: free_stuff, status: :created
    else
      render json: { error: 'Item has already been claimed' }, status: :unprocessable_entity
    end
  end

    def destroy
    user_free_stuff = @current_user.saved_free_stuffs.find_by!(id: params[:id])
    user_free_stuff.destroy
    head :no_content
  end

  private

  def user_free_stuff_params
    params.permit(:user_id, :claimant_id, :main_image, :body, :forum_id)
  end
  
end
