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
    @user_free_stuff = @current_user.user_free_stuffs.create!(user_free_stuff_params)
    render json: @user_free_stuff, status: :created
    
  end
  
  
  # PATCH/PUT /users/:user_id/user_items/:id
  def update
    set_user
    set_user_free_stuffs

    if @user_free_stuff.update(user_free_stuff_params)
      render json: @user_free_stuff
    else
      render json: { error: 'Failed to update the user free stuff' }, status: :unprocessable_entity
    end
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
    @user_free_stuff = @current_user.user_free_stuffs.find_by(id: params[:id])
  end

  def user_free_stuff_params
    params.permit(:body, :image_url, :user_id, :forum_id)
  end
  
  

end