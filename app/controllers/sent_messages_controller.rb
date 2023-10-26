# app/controllers/sent_messages_controller.rb
class SentMessagesController < ApplicationController
    before_action :set_user
  
    def index
      sent_messages = @user.sent_messages
      render json: sent_messages
    end
  
    def create
      @message = @user.sent_messages.build(message_params)
      if @message.save
        render json: @message, status: :created
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_user
      @user = User.find(params[:user_id])
    end
  
    def message_params
      params.require(:message).permit(:recipient_id, :content, :is_sent)
    end

  end
  
