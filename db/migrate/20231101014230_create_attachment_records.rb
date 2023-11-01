class CreateAttachmentRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :attachment_records do |t|
      t.references :record, polymorphic: true, index: true
      t.timestamps
    end
  end
end
