class Forum < ApplicationRecord
    has_many :goods, dependent: :destroy
    has_many :services, dependent: :destroy
    has_many :free_stuffs, dependent: :destroy

    has_many :users, through: [:goods, :services, :free_stuffs]
    has_many :user_goods
    has_many :user_services
    has_many :user_free_stuffs
  end
  
    