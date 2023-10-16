class ForumWithFreeStuffsSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :free_stuffs
 

end
