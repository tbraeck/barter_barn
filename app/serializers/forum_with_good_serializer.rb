class ForumWithGoodSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :goods
 

end
