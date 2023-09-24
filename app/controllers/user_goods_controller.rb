class UserGoodsController < ApplicationController
    before_action :set_user
    before_action :set_user_goods, only: [:show, :update, :destroy]
    skip_before_action :authorize

    def index
      @user_goods = @user.user_goods
      render json: @user_goods
    end
    
    def show
      render json: @user_goods
    end
    
    def create
      @user_goods = @user.user_goods.create(user_good_params)
      if @user_good.save
        render json: @user_good, status: :created
      else
        render json: @user_good.errors, status: :unprocessable_entity
      end
    end
    
    def update
      if @user_goods.update(user_good_params)
        render json: @user_goods
      else
        render json: @user_good.errors, status: :unprocessable_entity
      end
    end
    
    def destroy
      @user_good.destroy
      head :no_content
    end
    
    private
    
    def set_user
      @user = User.find(params[:user_id])
    end
    
    def set_user_good
      @user_good = @user.user_goods.find(params[:id])
    end
    
    def user_goods_params
      params.require(:user_good).permit(:title, :description, :image_url, :good_or_service )
    end
  end