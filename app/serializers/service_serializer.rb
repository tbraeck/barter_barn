class ServiceSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :description, :good_or_service, :image

  has_one :user
  has_one :forum

  def image
    rails_blob_path(object.main_image, only_path: true) if object.main_image.attached? 
  end
end
