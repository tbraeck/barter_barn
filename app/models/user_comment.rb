class UserComment < ApplicationRecord
  belongs_to :user
  belongs_to :goods
  belongs_to :services  
  belongs_to :free_stuffs

end
