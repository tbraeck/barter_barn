class ForumWithServicesSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :services
 

end
