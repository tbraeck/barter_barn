class User < ApplicationRecord
    has_many :comments
    has_many :goods
    has_many :services
    has_many :free_stuffs, class_name: 'FreeStuff'
    
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, length: { minimum: 6}
end
