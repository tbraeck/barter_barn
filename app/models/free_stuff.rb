class FreeStuff < ApplicationRecord
    belongs_to :user
    belongs_to :post
    has_many :comments 
    has_many :user_comments
end
