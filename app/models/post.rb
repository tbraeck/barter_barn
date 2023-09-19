class Post < ApplicationRecord
  belongs_to :user
  belongs_to :forum
  has_many :comments
  has_many :free_stuff
end
