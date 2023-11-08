class FreeStuff < ApplicationRecord
    belongs_to :forum
    belongs_to :user
   
    has_one_attached :main_image, dependent: :destroy
    
    validates :body, presence: true
    validates :forum, presence: true
end
