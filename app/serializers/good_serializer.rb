class GoodSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :good_or_service, :main_image

  has_one :user
  has_one :forum

  def main_image
    rails_blob_path(object.main_image, only_path: true) if object.main_image.attached?
  end
end
