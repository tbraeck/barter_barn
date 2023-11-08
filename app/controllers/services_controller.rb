class ServicesController < ApplicationController
  skip_before_action :authorize

  def index
    @services = Service.all
    render json: @services
  end

  def show
    render json: @service
  end

  def create
    service = Service.new(service_params)
  
    if service.save
      render json: service, status: :created
    else
      render json: { errors: service.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @service.update(service_params)
      render json: @service
    else
      render json: @service.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @service.destroy
    head :no_content
  end

  private
    def set_service
      @service = Service.find(params[:id])
    end

    def service_params
      params.permit(:title, :description, :main_image,  :good_or_service, :user_id, :forum_id)
    end
    
end
