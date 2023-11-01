class CreateAttachments < ActiveRecord::Migration[7.0]
  def change
    create_table :attachments do |t|
      t.references :record, polymorphic: true, null: false, index: true
      t.string :name, null: false
      t.text :description

      t.timestamps
    end
  end
end
