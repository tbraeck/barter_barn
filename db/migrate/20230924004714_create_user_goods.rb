class CreateUserGoods < ActiveRecord::Migration[7.0]
  def change
    create_table :user_goods do |t|
      t.string :title
      t.text :description
      t.string :image_url
      t.string :good_or_service
      t.integer :user_id
      t.integer :forum_id
      t.datetime :datetime

      t.timestamps
    end
    add_index :user_goods, :user_id
    add_index :user_goods, :forum_id
  end
end
