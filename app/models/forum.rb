class Forum < ApplicationRecord
    has_many :goods, dependent: :destroy
    has_many :services, dependent: :destroy
    has_many :free_stuffs, dependent: :destroy
    has_many :comments, dependent: :destroy
end
    