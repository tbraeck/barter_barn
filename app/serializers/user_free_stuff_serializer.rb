class UserFreeStuffSerializer < ActiveModel::Serializer
include Rails.application.routes.url_helpers
  attributes :id, :body, :image, :claimant_id, :free_stuff_id

  has_one :user
  has_one :forum

  def image
    rails_blob_path(object.main_image, only_path: true) if object.main_image.attached?
  end
  
end
