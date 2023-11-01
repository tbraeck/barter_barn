class CreateFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    create_table :free_stuffs do |t|
      t.text :body
      t.string :image_url
      t.integer :user_id
      t.integer :forum_id

      t.timestamps
    end
  end
end

