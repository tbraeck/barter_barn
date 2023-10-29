class Service < ApplicationRecord
    belongs_to :forum
    belongs_to :user
   
    has_one_attached :main_image

    validates :title, presence: true
    validates :description, presence: true
    validates :image_url, presence: true
    validates :good_or_service, presence: true

end
