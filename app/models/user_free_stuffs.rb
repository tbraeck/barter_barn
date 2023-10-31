class UserFreeStuff < ApplicationRecord
  belongs_to :user
  belongs_to :forum

  has_one_attached :main_image

  validates :body, presence: true
  validates :image_url, presence: true
  validates :forum, presence: true

end
