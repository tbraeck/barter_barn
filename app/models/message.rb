# app/models/message.rb
class Message < ApplicationRecord
    belongs_to :sender, class_name: 'User'
    belongs_to :recipient, class_name: 'User'
  
    validates :body, presence: true
    validates :is_sent, inclusion: { in: [true, false] }
  end
  
