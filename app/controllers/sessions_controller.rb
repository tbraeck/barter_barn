class SessionsController < ApplicationController
    skip_before_action :authorize
  
    def create
      login_param = params[:login] # Assuming the login parameter is named 'login'
      password = params[:password]
  
      # Find the user by either username or email
      user = User.find_by(username: login_param) || User.find_by(email: login_param)
  
      if user&.authenticate(password)
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
  