class ForumWithServiceSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :services
 

end
