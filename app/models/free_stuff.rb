class FreeStuff < ApplicationRecord
    belongs_to :forum
    belongs_to :user
    # has_many :comments
    
    validates :body, presence: true
    validates :image_url, presence: true

end
