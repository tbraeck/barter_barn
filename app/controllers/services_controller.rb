class ServicesController < ApplicationController
  skip_before_action :authorize

  # GET /services
  def index
    @services = Service.all

    render json: @services
  end

  # GET /services/1
  # def show
  #   render json: @service
  # end

  # POST /services
  def create
    # byebug
    @service = Service.new(service_params)
    # byebug
    if @service.save

      @service.main_image.attach(params[:main_image])
      render json: @service

      # redirect_to @free_stuff, notice: 'Free stuff was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /services/1
  def update
    if @service.update(service_params)
      render json: @service
    else
      render json: @service.errors, status: :unprocessable_entity
    end
  end

  # DELETE /services/1
  def destroy
    @service.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_service
      @service = Service.find(params[:id])
    end


    def set_goods
      @good = Good.find(params[:id])
    end
    # Only allow a list of trusted parameters through.
    def service_params
      params.require(:service).permit(:title, :description, :main_image,  :good_or_service,  :user_id, :forum_id)
    end
    
end
