class ForumSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :posts 

end
