class FreeStuffSerializer < ActiveModel::Serializer
include Rails.application.routes.url_helpers
  attributes :id, :body, :claimant_id, :image, :user_id, :forum_id, :user, :forum

has_one :user
has_one :forum

def image
  if object.main_image.attached?
    Rails.application.routes.url_helpers.rails_blob_path(object.main_image, only_path: true)
  else
    nil 
  end
end
end



