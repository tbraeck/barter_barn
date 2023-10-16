class UserComment < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :comment_text, presence: true
  validates :contact_info, presence: true
  validates :available_times, presence: true

end
