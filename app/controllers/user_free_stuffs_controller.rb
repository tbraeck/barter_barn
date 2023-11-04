class UserFreeStuffsController < ApplicationController
  before_action :set_user
  before_action :set_user_free_stuffs, only: [:index, :show, :create, :update, :destroy]
  skip_before_action :authorize

  # GET /users/:user_id/user_items
  def index
    user_free_stuffs = @current_user.user_free_stuffs
    
    render json: user_free_stuffs
  end
  
  # GET /users/:user_id/user_items/:id
  def show
    render json: @user_free_stuff
  end
  
  # POST /users/:user_id/user_items

  def create
    @user_free_stuff = @current_user.user_free_stuffs.create!(user_free_stuffs_params)
    if @user_free_stuff.save
      @user_free_stuff.main_image.attach(params[:user_free_stuff][:main_image])
      
    render json: @user_free_stuff, status: :created
    else 
      render json: @user_free_stuff.errors, status: :unprocessable_entity
    end
  end
  
  
  # PATCH/PUT /users/:user_id/user_items/:id
  def update
    @user_free_stuff = set_user_free_stuffs
      @user_free_stuff.update!(user_free_stuffs_params)
      render json: @user_free_stuff, status: :ok
  end

  def destroy
    @user_free_stuff = set_user_free_stuffs
      @user_free_stuff.destroy
      head :no_content
  end

  private
  
  def set_user
    @current_user = User.find(params[:user_id])
  end


  def set_user_free_stuffs
    @user_free_stuff = @current_user.user_free_stuffs.find(params[:id])
  end

<<<<<<< HEAD
  def user_free_stuffs_params
    params.require(:user_free_stuff).permit(:body, :main_image, :claimant_id, :forum_id)
=======
  def user_free_stuff_params
    params.require(:user_free_stuff).permit(:body, :main_image,:created_at, :updated_at, :claimant_id, :user_id, :forum_id, :attachment_record_id,)
>>>>>>> parent of 5a38c15 (commit saturday morning)
  end
  
end