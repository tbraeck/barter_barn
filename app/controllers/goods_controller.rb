class GoodsController < ApplicationController
  skip_before_action :authorize

  # GET /goods
  def index
<<<<<<< HEAD
    @goods = Good.all
    render json: @goods
=======
    goods = Good.all
    render json: goods
>>>>>>> parent of 5a38c15 (commit saturday morning)
  end

  # GET /goods/1
  def show
    good = find_good
    render json: good
  end

  def create
    # user = User.find(params[:user_id])
    user = @current_user
    good = user.goods.create!(good_params)
    # good.main_image.attach(good_params[:main_image])
    render json: good, status: :created
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
