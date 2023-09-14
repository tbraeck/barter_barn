class UserCommentsController < ApplicationController
    before_action :set_user
    before_action :set_user_comments, only: [:show, :update, :destroy]
    # skip_before_action :authorize

    def index
      @user_comments = @user.user_comments
      render json: @user_comments
    end
    
    def show
      render json: @user_comments
    end
    
    def create
      @user_comments = @user.user_comments.create(user_comment_params)
      if @user_comments.save
        render json: @user_comments, status: :created
      else
        render json: @user_comments.errors, status: :unprocessable_entity
      end
    end
    
    def update
      if @user_comments.update(user_comment_params)
        render json: @user_comments
      else
        render json: @user_comments.errors, status: :unprocessable_entity
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
    
    def set_user_post
      @user_comment = @user.user_comments.find(params[:id])
    end
    
    def user_comments_params
      params.require(:user_comment).permit(:username, :password_digest, :email)
    end
  end