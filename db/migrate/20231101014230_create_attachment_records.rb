class CreateAttachmentRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :attachment_records do |t|

      t.timestamps
    end
  end
end
