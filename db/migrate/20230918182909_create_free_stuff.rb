class CreateFreeStuff < ActiveRecord::Migration[7.0]
  def change
    create_table :free_stuffs do |t|
      t.text :body
      t.string :image_url
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end

