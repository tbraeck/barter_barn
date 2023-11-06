class CreateUserGoods < ActiveRecord::Migration[7.0]
  def change
    create_table :user_goods do |t|
      t.references :user
      t.references :good
      t.timestamps
    end
  end
end
