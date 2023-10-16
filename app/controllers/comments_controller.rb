class CommentsController < ApplicationController
  skip_before_action :authorize

  # GET /goods
  def index
    @comments = Comment.all
    render json: @comments
  end

  # GET /goods/1
  def show
    render json: @comment
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
    @user_comment = @current_user.user_comments.create!(comment_params)
    render json: @user_comment, status: :created
  end

  # PATCH/PUT /goods/1
  def update
    if @comment.update!(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /goods/1
  def destroy
    comment = find_comment
    comment.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_comment
        Comment.find(params[:id])
    end
    
    def set_comment
      @comment = Comment.find(params[:id])
    end
   
    # Only allow a list of trusted parameters through.
    def comment_params
      params.permit(:name, :comment_text, :contact_info, :available_times)
    end
end
