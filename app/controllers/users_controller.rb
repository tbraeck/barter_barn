class UsersController < ApplicationController
  skip_before_action :authorize


  def index 
    users = User.includes(:goods, :services, :free_stuffs, :comments).all
    render json: users, include: [:goods, :services, :free_stuffs, :comments], status: :ok
  end
  
 # app/controllers/users_controller.rb

  # ...

  # GET /users/:user_id/user_goods/:good_id/comments
  # def comments
  #   user = User.find(params[:user_id])
  #   good = user.goods.find(params[:good_id])
  #   comments = good.comments

  #   render json: { comments: comments }
  # end

  # # POST /users/goods/:good_id/comments
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
    @current_user = User.includes(:goods, :services, :free_stuffs).find(params[:id])
    render json: @current_user, include: [:goods, :services, :free_stuffs]
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
      params.permit(:username, :password, :email)
    end
end
