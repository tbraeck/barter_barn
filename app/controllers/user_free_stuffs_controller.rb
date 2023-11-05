class UserFreeStuffsController < ApplicationController
  before_action :authorize

  # Create a new UserFreeStuff entry when a user claims free stuff
  def create
    @user_free_stuff = UserFreeStuff.new(user_free_stuff_params)
    
    if @user_free_stuff.save
      render json: @user_free_stuff, status: :created
    else
      render json: { errors: @user_free_stuff.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Update a UserFreeStuff entry (if needed)

  # Destroy a UserFreeStuff entry when a user unclaims or deletes it
  def destroy
    @user_free_stuff = UserFreeStuff.find(params[:id])
    @user_free_stuff.destroy
    head :no_content
  end

  private

  def user_free_stuff_params
    params.require(:user_free_stuff).permit(:body, :user_id, :claimant_id, :free_stuff_id, :id, :created_at, :updated_at)
  end
end
  