class ForumWithCommentsSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :goods
  has_many :services
  has_many :free_stuffs
 

end
