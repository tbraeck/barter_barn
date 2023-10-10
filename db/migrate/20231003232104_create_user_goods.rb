class CreateUserGoods < ActiveRecord::Migration[7.0]
  def change
    create_table :user_goods do |t|
      t.string :title
      t.string :description
      t.string :image_url
      t.string :good_or_service
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
