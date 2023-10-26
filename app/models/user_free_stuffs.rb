class UserFreeStuff < ApplicationRecord
  belongs_to :user
  belongs_to :forum

  validates :body, presence: true
  validates :image_url, presence: true

end
