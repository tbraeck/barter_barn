class UserPostsController < ApplicationController
    before_action :set_user
    before_action :set_user_posts, only: [:show, :update, :destroy]
    # skip_before_action :authorize

    def index
      @user_posts = @user.user_posts
      render json: @user_posts
    end
    
    def show
      render json: @user_posts
    end
    
    def create
      @user_posts = @user.user_posts.create(user_post_params)
      if @user_comments.save
        render json: @user_comments, status: :created
      else
        render json: @user_comment.errors, status: :unprocessable_entity
      end
    end
    
    def update
      if @user_comments.update(user_comment_params)
        render json: @user_comments
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
    
    def set_user_post
      @user_post = @user.user_posts.find(params[:id])
    end
    
    def user_posts_params
      params.require(:user_post).permit(:username, :password_digest, :email)
    end
  end