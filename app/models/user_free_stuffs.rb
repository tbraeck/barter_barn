class UserFreeStuff < ApplicationRecord
  belongs_to :user

  validates :body, presence: true
  validates :image_url, presence: true

end
