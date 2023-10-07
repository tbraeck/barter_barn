class CreateUserItems < ActiveRecord::Migration[7.0]
  def change
    create_table :user_items do |t|
      t.string :goods
      t.string :services
      t.string :free_stuffs
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
