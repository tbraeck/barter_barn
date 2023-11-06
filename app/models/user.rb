class User < ApplicationRecord
    has_many :goods
    has_many :services
    has_many :free_stuffs
    has_many :user_services
    has_many :user_goods
    has_many :user_free_stuffs
    has_many :saved_goods, through: :user_goods, source: :good
    has_many :saved_services, through: :user_services, source: :service 
    has_many :saved_free_stuffs, through: :user_free_stuffs, source: :free_stuff
    has_many :claimed_stuffs, foreign_key: :claimant_id, class_name: 'FreeStuff'

    

  
    # has_many :jobs, foreign_key: 'user_id', class_name: 'Task'

    has_many :forums, through: [:goods, :services, :free_stuffs]
   

    has_secure_password
  
    validates :username, presence: true
    validates :password, length: { minimum: 6 }
  end
  