  class UserServicesController < ApplicationController
    before_action :authorize

    def index
      user_services = @current_user.saved_services
      render json: user_services
    end
    
    def show
      render json: @user_service
    end
    
    def create
      service = Service.find(params[:id])
      if @current_user.saved_services << service
        render json: service, status: :created
      else
        render json: { errors: service.errors.full_messages }, status: :unprocessable_entity
      end 
    end
    
    def destroy
      user_service = @current_user.saved_services.find_by!(id: params[:id])
        user_service.destroy
        head :no_content
    end
  
    private
  
    def user_service_params
      params.permit(:id, :title, :description, :main_image, :good_or_service, :user_id, :forum_id)
    end
  end