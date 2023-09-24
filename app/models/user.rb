class User < ApplicationRecord
    has_many :posts
    has_many :comments
    has_many :user_comments
    has_many :user_posts
    has_many :user_goods
    has_many :free_stuffs, class_name: 'FreeStuff'
    
    has_secure_password

    validates :username, presence: true, uniqueness: true
end
