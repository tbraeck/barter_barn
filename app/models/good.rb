class Good < ApplicationRecord
    belongs_to :user
    belongs_to :forum
    has_many :comments
end