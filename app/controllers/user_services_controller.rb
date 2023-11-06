  class UserServicesController < ApplicationController
    before_action :authorize

    # GET /users/:user_id/user_items
    def index
      user_services = @current_user.saved_services
      render json: user_services
    end
    
    # GET /users/:user_id/user_items/:id
    def show
      render json: @user_service
    end
    
    # POST /users/:user_id/user_items

    def create
      service = Service.find(params[:id])
      if @current_user.saved_services << service
        render json: service, status: :created
      else
        render json: { errors: service.errors.full_messages }, status: :unprocessable_entity
      end
      
    end
    
    
    # PATCH/PUT /users/:user_id/user_items/:id
    # def update
    #   @user_service = set_user_service
    #   @user_service.update!(user_service_params)
    #   render json: @user_service, status: :ok
  
    # end
    
    # DELETE /users/:user_id/user_items/:id

    def destroy
      user_service = @current_user.saved_services.find_by!(id: params[:id])
        user_service.destroy
        head :no_content
    end
  
    private
    
   

    # def set_user_service
    #   @user_service = @current_user.user_services.find(params[:id])
    # end

    def user_service_params
      params.require(:user_service).permit(:id, :title, :description, :main_image, :good_or_service, :user_id, :forum_id)
    end
  end