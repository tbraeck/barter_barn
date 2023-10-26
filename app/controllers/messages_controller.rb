class MessagesController < ApplicationController
    skip_before_action :authorize

    def index
        messages = Message.all
        render json: messages
    end 
    
  def create
    @message = @current_user.sent_messages.build(message_params)
    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

# def create
#     @message = @current_user.sent_messages.create!(message_params)
#     render json: @message, status: :created
    
#   end

  private

  def message_params
    params.require(:message).permit(:recipient_id, :content)
  end


end
