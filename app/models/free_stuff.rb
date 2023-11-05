class FreeStuff < ApplicationRecord
    belongs_to :forum
    belongs_to :user
    belongs_to :claimant, class_name: 'User', foreign_key: 'claimant_id', optional: true
    # belongs_to :attachment_record, as: :record, dependent: :destroy
      # app/models/free_stuff.rb
      has_many :user_free_stuffs, dependent: :destroy
      
    has_one_attached :main_image, dependent: :destroy
    
    validates :body, presence: true
    # validates :image_url, presence: true
    validates :forum, presence: true
end
