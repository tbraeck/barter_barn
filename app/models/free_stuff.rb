class FreeStuff < ApplicationRecord
    belongs_to :forum
    belongs_to :user
   
    has_one_attached :main_image

    validates :body, presence: true
    validates :image_url, presence: true

end
