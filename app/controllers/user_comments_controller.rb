class UserCommentsController < ApplicationController
  before_action :set_user
  before_action :set_user_comment, only: [:show, :update, :destroy]
  skip_before_action :authorize

  def index
    @user_comments = @user.user_comments
    render json: @user_comments
  end

  def show
    # @user_comment = User.find(params[:id])
    render json: @user_comment
  end

  def create
    @user_comment = @user.user_comments.create!(user_comment_params)
    if @user_comment.save
      render json: @user_comment, status: :created
    else
      render json: @user_comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user_comment.update(user_comment_params)
      render json: @user_comment
    else
      render json: @user_comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user_comment.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_user_comment
    @user_comment = @user.user_comments.find(params[:id])
  end

  def user_comment_params
    params.require(:comment).permit(:body, :user_id)
  end
end 
