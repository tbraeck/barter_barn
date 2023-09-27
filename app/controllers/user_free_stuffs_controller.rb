class UserFreeStuffsController < ApplicationController
    before_action :set_user
    before_action :set_user_free_stuffs, only: [:show, :edit, :update, :destroy]
    skip_before_action :authorize

    def index
      @user_free_stuffs = @user.user_free_stuffs
      render json: @user_free_stuffs
    end
    
    def show
      render json: @user_free_stuffs
    end
    
    def create
      @user_free_stuff = @user.user_free_stuffs.create!(user_free_stuff_params)
      if @user_free_stuff.save
        render json: @user_free_stuff, status: :created
      else
        render json: @user_free_stuff.errors, status: :unprocessable_entity
      end
    end
    
    def update
      # @user_good = @user.user_goods.find_by(id: params[:good_id])

      if @user_free_stuff.update(user_free_stuff_params)
        render json: @user_free_stuff
      else
        render json: @user_free_stuff.errors, status: :unprocessable_entity
      end
    end
    
    def destroy
      @user_free_stuff.destroy
      head :no_content
    end
    
    private
    
    def set_user
      @user = User.find(params[:user_id])
    end

    def set_user_free_stuffs
      @user_free_stuff = @user.user_free_stuffs.find(params[:id])
    end
    
    def user_free_stuff_params
      params.require(:user_free_stuff).permit(:body, :image_url)
    end

  end