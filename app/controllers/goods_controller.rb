class GoodsController < ApplicationController
  skip_before_action :authorize

  # GET /goods
  def index
    @goods = Good.all
    render json: goods
  end

  # GET /goods/1
  # def show
  #   good = find_good
  #   render json: good
  # end

  def create
    @good = Good.new(good_params)
    if @good.save
      @good.main_image.attach(params[:main_image])
      render json: @good
    else
      render :new
    end
  end

  def update
    if @good.update(good_params)
      render json: @good
    else
      render json: @good.errors, status: :unprocessable_entity
    end
  end

  # DELETE /goods/1
  def destroy
    @good.destroy
    head :no_content
  end

  private
    def find_good
        Good.find(params[:id])
    end

    def set_goods
      @good = Good.find(params[:id])
    end

    def good_params
      params.permit(:title, :description, :main_image, :good_or_service, :user_id, :forum_id)
    end
end
