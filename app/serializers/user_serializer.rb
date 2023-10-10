class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password
  # has_many :goods
  # has_many :services
  # has_many :free_stuffs
  # has_many :comments
end
