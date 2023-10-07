class User < ApplicationRecord
    has_many :comments
    has_many :user_items
    
    has_many :user_goods, class_name: 'Good'
    has_many :user_services, class_name: 'Service'
    has_many :user_free_stuffs, class_name: 'FreeStuff'
    
    has_many :goods, through: :user_goods, source: :forum
    has_many :services, through: :user_services, source: :forum
    has_many :free_stuffs, through: :user_free_stuffs, source: :forum
  
    has_secure_password
  
    validates :username, presence: true
    validates :password, length: { minimum: 6 }
  end
  