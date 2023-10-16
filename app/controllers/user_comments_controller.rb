class UserCommentsController < ApplicationController
  before_action :set_user
  before_action :set_user_comment, only: [:index, :show, :create, :update, :destroy]
  skip_before_action :authorize

  # GET /goods
  def index
    user_comments = @current_user.user_comments
    render json: user_comments
  end

  # GET /goods/1
  def show
    render json: @user_comment
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
    @user_comment = @current_user.user_comments.create!(user_comment_params)
    render json: @user_comment, status: :created
  end

  # PATCH/PUT /goods/1
  def update
    @user_comment = set_user_comment
    @user_comment.update!(user_comment_params)
    render json: @user_comment, status: :ok
    
  end

  # DELETE /goods/1
  def destroy
    @user_comment = set_user_comment
    @user_comment.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
       @current_user = User.find(params[:user_id])
    end

    def set_user_comment
      @user_comment = @current_user.user_comments.find_by(id: params[:id])
    end
   
    # Only allow a list of trusted parameters through.
    def user_comment_params
      params.permit(:name, :comment_text, :contact_info, :available_times)
    end
end
