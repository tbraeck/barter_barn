class UserComment < ApplicationRecord
  belongs_to :user
  belongs_to :free_stuff

end
