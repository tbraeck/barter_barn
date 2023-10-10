class GoodsController < ApplicationController
  skip_before_action :authorize

  # GET /goods
  def index
    @goods = Good.all

    render json: @goods
  end

  # GET /goods/1
  def show
    render json: @good
  end

  # POST /goods
  # def create
  #   @good = Good.new(good_params)

  #   if @good.save
  #     render json: @good, status: :created, location: @good
  #   else
  #     render json: @good.errors, status: :unprocessable_entity
  #   end
  # end


 
  def create
    @user_item = @current_user.user_items.create!(good_params)
    render json: @user_item, status: :created
  end

  # PATCH/PUT /goods/1
  def update
    if @good.update(good_params)
      render json: @good
    else
      render json: @good.errors, status: :unprocessable_entity
    end
  end

  # DELETE /goods/1
  def destroy
    good = find_good
    good.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_good
        Good.find(params[:id])
    end
    def set_good
      @good = Good.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def good_params
      params.permit(:title, :description, :image_url, :good_or_service)
    end
end
