class UserService < ApplicationRecord
  belongs_to :user
  belongs_to :forum

  has_one_attached :main_image, dependent: :destroy

  validates :title, presence: true
  validates :description, presence: true
  # validates :image_url, presence: true
  validates :good_or_service, presence: true
  validates :forum, presence: true

end
