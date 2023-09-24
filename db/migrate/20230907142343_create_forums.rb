class CreateForums < ActiveRecord::Migration[7.0]
  def change
    create_table :forums do |t|
      t.string :name
      t.string :goods
      t.string :services
      t.string :free_stuffs

      t.timestamps
    end
  end
end
