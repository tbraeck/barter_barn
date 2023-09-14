class SessionsController < ApplicationController
    # skip_before_action :authorize
  
    def create
      user = User.find_by(username: params[:username]) || User.find_by(email: params[:email])
  
      if user&.authenticate([:password])
        session[:user_id] = user.id
        render json: user, status: :created
      else
        render json: { errors: ["Invalid username, email, or password"] }, status: :unauthorized
      end
    end
  
    def destroy
      session.delete :user_id
      head :no_content
    end
  end
  