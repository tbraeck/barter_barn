class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :free_stuffs
  has_many :goods
  has_many :services
  has_many :saved_free_stuffs

end
