class FreeStuffsSerializer < ActiveModel::Serializer
  attributes :id, :body, :image_url, :main_image

  has_one :user
  has_one :forum

  def main_image
    rails_blob_path(object.main_image, only_path: true) if object.image.attached?
  end
end
