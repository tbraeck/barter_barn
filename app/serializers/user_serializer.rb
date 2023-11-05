class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :free_stuffs
  has_many :goods
  has_many :services
  
end
