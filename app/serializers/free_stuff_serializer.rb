class FreeStuffSerializer < ActiveModel::Serializer
include Rails.application.routes.url_helpers
  attributes :id, :body, :claimant_id, :image, :created_at, :updated_at
  belongs_to :user
  belongs_to :claimant, class_name: 'User', optional: true
  has_many :user_free_stuffs

has_one :forum

  def image
    rails_blob_path(object.main_image, only_path: true) if object.main_image.attached?
  end
end



