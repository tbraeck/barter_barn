class CreateServices < ActiveRecord::Migration[7.0]
  def change
    create_table :services do |t|
      t.string :title
      t.text :description
      t.string :image_url
      t.integer :user_id
      t.integer :forum_id
      t.timestamps
    end
  end
end
