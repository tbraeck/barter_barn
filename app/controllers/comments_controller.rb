class CommentsController < ApplicationController
  skip_before_action :authorize

  # GET /comments
  def index
    @comments = Comment.all

    render json: @comments
  end

  def dual_save
    comment = Comment.create!(comment_params)
    user_comment = UserComment.create!(user_comment_params)
  
    if comment.save && user_comment.save
      render json: comment, status: :created
    else
      render json: { error: 'Failed to save comment' }, status: :unprocessable_entity
    end
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end


    def user_comment_params
      params.require(:user_comment).permit(:body, :user_id)
    end
    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:body, :user_id, :free_stuff_id)
    end
end



