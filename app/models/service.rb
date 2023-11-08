class Service < ApplicationRecord
    belongs_to :forum
    belongs_to :user
    
    has_one_attached :main_image, dependent: :destroy
    
    validates :title, presence: true
    validates :description, presence: true
    validates :good_or_service, presence: true
    validates :forum, presence: true
end
