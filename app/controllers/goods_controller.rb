class GoodsController < ApplicationController
  before_action :authorize

  def index
    goods = Good.all
    render json: goods
  end

  def show
    good = find_good
    render json: good
  end

  def create
    good = Good.new(good_params)
    if good.save
      render json: good, status: :created
    else
      render json: { errors: good.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    good = find_good
    if good.update(good_params)
      render json: good, status: :ok
    else
      render json: { errors: good.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
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
      params.permit(:id, :title, :description, :main_image,  :good_or_service, :user_id, :forum_id)
    end
end
