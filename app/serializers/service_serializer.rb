class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image_url, :good_or_service

  has_one :user
  has_one :forum
end
