class User < ApplicationRecord
    has_many :posts
    has_many :comments

    has_secure_password

    validates :password, length: { minimum: 8 }, allow_nil: true
end
