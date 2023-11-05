class UserGoodsController < ApplicationController
    before_action :set_user
    before_action :set_user_good, only: [:show, :edit, :update, :destroy]
    skip_before_action :authorize

    # GET /users/:user_id/user_items
    def index
      user_goods = @current_user.user_goods
      render json: user_goods
    end
    
    # GET /users/:user_id/user_items/:id
    def show
      render json: @user_good
    end
    
    # POST /users/:user_id/user_items

    def create
      # byebug
      @user_good = @current_user.user_goods.new (user_good_params)
      if @user_good.save
        # byebug
        render json: @user_good, status: :created
      else
        render json: { errors: @user_good.errors.full_messages }, status: :unprocessable_entity
      end
      
    end

    
    
    # PATCH/PUT /users/:user_id/user_items/:id
 # PATCH/PUT /users/:user_id/user_items/:id
def update
  @user_good = set_user_good
  @user_good.update!(user_good_params)
  render json: @user_good, status: :ok
end

    # DELETE /users/:user_id/user_items/:id

    # def destroy
    #   @user_good = set_user_good
    #     @user_good.destroy
    #     head :no_content
    # end
    def destroy
      @user_good = set_user_good
      @user_good.destroy
      head :no_content
    end
    
    private
    
    def set_user
      @current_user = User.find(params[:user_id])
    end


    def set_user_good
      @user_good = @current_user.user_goods.find(params[:id])
    end
    
    

    def user_good_params
      params.require(:user_good).permit(:id, :title, :description, :good_or_service, :main_image, :user_id, :forum_id)
    end
    
    

  end