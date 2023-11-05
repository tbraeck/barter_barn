  class UserServicesController < ApplicationController
    before_action :set_user
    before_action :set_user_service, only: [:index, :show, :create, :update, :destroy]
    skip_before_action :authorize

    # GET /users/:user_id/user_items
    def index
      user_services = @current_user.user_services
      render json: user_services
    end
    
    # GET /users/:user_id/user_items/:id
    def show
      render json: @user_service
    end
    
    # POST /users/:user_id/user_items

    def create
      # byebug
      @user_service = @current_user.user_services.new (user_service_params)
      if @user_service.save
        # byebug
        render json: @user_service, status: :created
      else
        render json: { errors: @user_service.errors.full_messages }, status: :unprocessable_entity
      end
      
    end
    
    
    # PATCH/PUT /users/:user_id/user_items/:id
    def update
      @user_service = set_user_service
      @user_service.update!(user_service_params)
      render json: @user_service, status: :ok
  
    end
    
    # DELETE /users/:user_id/user_items/:id

    def destroy
      @user_service = set_user_service
        @user_service.destroy
        head :no_content
    end
  
    private
    
    def set_user
      @current_user ||= User.find(params[:user_id])
    end

    def set_user_service
      @user_service = @current_user.user_services.find(params[:id])
    end

    def user_service_params
      params.require(:user_service).permit(:id, :title, :description, :main_image, :good_or_service, :user_id, :forum_id, :created_at, :updated_at)
    end

  end