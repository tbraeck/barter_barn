class CommentSerializer < ActiveModel::Serializer
  attributes :id, :name, :comment_text, :contact_info, :available_times

  has_one :user
end
