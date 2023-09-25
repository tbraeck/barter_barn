class UserServicesController < ApplicationController
    before_action :set_user
    before_action :set_user_services, only: [:show, :edit, :update, :destroy]
    skip_before_action :authorize

    def index
      @user_services = @user.user_services
      render json: @user_services
    end
    
    def show
      render json: @user_services
    end
    
    def create
      @user_service = @user.user_services.create!(user_service_params)
      if @user_service.save
        render json: @user_service, status: :created
      else
        render json: @user_service.errors, status: :unprocessable_entity
      end
    end
    
    def update
      # @user_good = @user.user_goods.find_by(id: params[:good_id])

      if @user_service.update(user_service_params)
        render json: @user_service
      else
        render json: @user_service.errors, status: :unprocessable_entity
      end
    end
    
    def destroy
      @user_service.destroy
      head :no_content
    end
    
    private
    
    def set_user
      @user = User.find(params[:user_id])
    end

    def set_user_services
      @user_service = @user.user_services.find(params[:id])
    end
    
    def user_service_params
      params.require(:user_service).permit(:title, :description, :image_url, :good_or_service)
    end

  end