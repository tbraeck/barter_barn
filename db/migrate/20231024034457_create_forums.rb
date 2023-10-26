class CreateForums < ActiveRecord::Migration[6.1]
  def change
    create_table :forums do |t|
      t.string :title
      t.string :goods
      t.string :services
      t.string :free_stuffs

      t.timestamps
    end
  end
end
