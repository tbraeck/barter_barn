class UserGoodsController < ApplicationController
  before_action :authorize  
    
    def index
      user_goods = @current_user.saved_goods
      render json: user_goods
    end
    
    def show
      render json: @user_good
    end
    
    def create
     good = Good.find(params[:id])
      if @current_user.saved_goods << good
      
        render json: good, status: :created
      else
        render json: { errors: good.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      user_good = @current_user.saved_goods.find_by!(id: params[:id])
      user_good.destroy
      head :no_content
    end
    
    private
  
    def user_good_params
      params.permit(:id, :title, :description, :good_or_service, :main_image, :user_id, :forum_id)
    end
    
    

  end