class FreeStuff < ApplicationRecord
    belongs_to :user
    belongs_to :forum
    has_many :comments 
    # has_many :user_comments
end
