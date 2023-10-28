class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]


  def index 
    users = User.all
    render json: users, status: :ok
  end
  
 
  # def create_comment
  #   user = current_user
  #   good = user.goods.find(params[:good_id])
  #   comment = good.comments.build(comment_params)

  #   if comment.save
  #     render json: { comment: comment }, status: :created
  #   else
  #     render json: { error: 'Failed to save comment' }, status: :unprocessable_entity
  #   end
  # end

  def show
    @current_user = User.find(params[:id])
    render json: @current_user
  end
  
  # POST /users
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  private
   
  
    # def comment_params
    #   params.require(:comment).permit(:text) # Adjust this to match your comment model attributes
    # end

    def user_params
      params.permit(:id, :username, :password, :email)
    end
end
