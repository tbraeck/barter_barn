class User < ApplicationRecord
    has_many :goods
    has_many :services
    has_many :free_stuffs
    has_many :user_goods, class_name: 'Good'
    has_many :user_services, class_name: 'Service'
    has_many :user_free_stuffs, class_name: 'FreeStuff'
  
    # has_many :jobs, foreign_key: 'user_id', class_name: 'Task'

    has_many :forums, through: [:goods, :services, :free_stuffs]
   

    has_secure_password
  
    validates :username, presence: true
    validates :password, length: { minimum: 6 }
  end
  