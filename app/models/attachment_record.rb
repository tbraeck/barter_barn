class AttachmentRecord < ApplicationRecord
    has_many_attached :attachments
  end
  