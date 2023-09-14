class PostsController < ApplicationController
  # skip_before_action :authorize

  def index
    posts = Post.all
    render json: posts, status: :ok
  end

  def show
    post = find_post
    render json: post, status: :ok
  end

  def create
    user = User.find(params[:user_id])
    post = user.posts.create!(post_params)
    render json: post, status: :created
  end

  def update
    post = find_post
    post.update!(post_params)
    render json: post, status: :ok
  end

  def destroy
    post = find_post
    post.destroy
    head :no_content
  end

  private
    def find_post
      Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :body, :user_id, :forum_id)
    end
end
