class Forum < ApplicationRecord
    has_many :goods
    has_many :services
    has_many :free_stuffs
    has_many :users, through: [:goods, :services, :free_stuffs]
    has_many :user_goods
    # validates :forum, presence: true
  end
  
    