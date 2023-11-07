class UserGoodsController < ApplicationController
  before_action :authorize  
  # before_action :set_user_good
    
  # 
    # GET /users/:user_id/user_items
    def index
      user_goods = @current_user.saved_goods
      
      render json: user_goods
    end
    
    # GET /users/:user_id/user_items/:id
    def show
      render json: @user_good
    end
    
    # POST /users/:user_id/user_items

    def create
      # byebug
     good = Good.find(params[:id])
    #  byebug
      if @current_user.saved_goods << good
      
        render json: good, status: :created
      else
        render json: { errors: good.errors.full_messages }, status: :unprocessable_entity
      end
      
    end

    
    
    # PATCH/PUT /users/:user_id/user_items/:id
 # PATCH/PUT /users/:user_id/user_items/:id
# def update
#   @user_good = set_user_good
#   @user_good.update!(user_good_params)
#   render json: @user_good, status: :ok
# end

    # DELETE /users/:user_id/user_items/:id

    # def destroy
    #   @user_good = set_user_good
    #     @user_good.destroy
    #     head :no_content
    # end
    def destroy
      user_good = @current_user.saved_goods.find_by!(id: params[:id])
      user_good.destroy
      head :no_content
    end
    
    private
    
   

    # def set_user_good
    #   @user_good = @current_user.user_goods.find(params[:id])
    # end
    
    def user_good_params
      params.permit(:id, :title, :description, :good_or_service, :main_image, :user_id, :forum_id)
    end
    
    

  end