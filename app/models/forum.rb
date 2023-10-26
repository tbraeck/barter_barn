class Forum < ApplicationRecord
    has_many :goods, dependent: :destroy
    has_many :services, dependent: :destroy
    has_many :free_stuffs, dependent: :destroy
    # has_many :comments, dependent: :destroy
    # has_many :user_comments
    # has_many :user_comments, through: :services
    # has_many :user_comments, through: :free_stuffs

    has_many :users, through: [:goods, :services, :free_stuffs]
    has_many :user_goods
    has_many :user_free_stuffs
    # validates :forum, presence: true
  end
  
    