class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.references :good, foreign_key: true
      t.references :service, foreign_key: true
      t.references :free_stuffs, foreign_key: true

      t.references :user, foreign_key: true
      t.references :forum, foreign_key: true
      t.text :comment_text
      t.string :name
      t.string :contact_info
      t.string :available_times
      t.timestamps
    end
  end
end

