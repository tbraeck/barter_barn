class UserFreeStuff < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :forum

  has_many :comments

end
