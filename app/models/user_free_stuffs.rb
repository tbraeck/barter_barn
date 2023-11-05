class UserFreeStuff < ApplicationRecord
  belongs_to :user
  # belongs_to :forum
  belongs_to :claimant, class_name: 'User', optional: true

  has_one_attached :main_image, dependent: :destroy

  validates :body, presence: true
  # validates :forum, presence: true

end
