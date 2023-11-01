class FreeStuffsSerializer < ActiveModel::Serializer
  attributes :id, :body, :main_image

  has_one :user
  has_one :forum

  def main_image
    rails_blob_path(object.main_image, only_path: true) if object.main_image.attached?
  end
end
