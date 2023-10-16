class UserService < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :description, presence: true
  validates :image_url, presence: true
  validates :good_or_service, presence: true

end
