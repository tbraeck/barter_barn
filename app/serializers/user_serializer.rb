class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :free_stuffs
  has_many :goods
  has_many :services
  has_many :user_free_stuffs
  has_many :user_goods
  has_many :user_services
  
end
