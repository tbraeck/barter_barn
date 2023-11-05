class UserFreeStuff < ApplicationRecord
  belongs_to :user
  belongs_to :claimant
  belongs_to :free_stuff
end
