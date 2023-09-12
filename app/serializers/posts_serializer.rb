class PostSerializer < ActiveModel::Serializer
  attributes :id, :adjective, :noun, :verb, :adverb

  has_one :user
  has_one :forum
  has_many :comments, dependent: :destroy
end
