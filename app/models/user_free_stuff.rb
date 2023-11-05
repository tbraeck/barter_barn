class UserFreeStuff < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :free_stuff, class_name: 'FreeStuff' 
  belongs_to :claimant, class_name: 'User', optional: true

  has_one_attached :main_image, dependent: :destroy

  validates :body, presence: true
  # validates :forum, presence: true

end
