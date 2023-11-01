class AddAttachmentRecordToFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    add_reference :free_stuffs, :attachment_record, null: true, foreign_key: true
  end
end
