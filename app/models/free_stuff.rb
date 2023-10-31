class FreeStuff < ApplicationRecord
    belongs_to :forum
    belongs_to :user
    belongs_to :claimant, class_name: 'User', foreign_key: 'claimant_id', optional: true

    has_one_attached :main_image
    
    validates :body, presence: true
    # validates :image_url, presence: true
    validates :forum, presence: true
end
