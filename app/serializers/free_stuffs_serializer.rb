class FreeStuffsSerializer < ActiveModel::Serializer
  attributes :id, :body, :image_url

  has_one :user
  has_one :forum
end
