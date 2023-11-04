class GoodsController < ApplicationController
  skip_before_action :authorize

  # GET /goods
  def index
    goods = Good.all
    render json: goods
  end

  # GET /goods/1
  def show
    good = find_good
    render json: good
  end

  def create
    @good = Good.new(good_params)

    if @good.save
      render json: @good, status: :created
    else
      render json: { errors: @good.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    good = find_good
    good.update!(good_params)
    render json: good, status: :ok
   
  end

  # DELETE /goods/1
  def destroy
    good = find_good
    good.destroy
    head :no_content
  end

  
  

  private
    def find_good
        Good.find(params[:id])
    end

    def good_params
      params.permit(:title, :description, :main_image,  :good_or_service, :user_id, :forum_id)
    end
end
