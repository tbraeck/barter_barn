class CreateGoods < ActiveRecord::Migration[7.0]
  def change
    create_table :goods do |t|
     
          t.string :title
          t.text :description
          t.string :image_url
          t.references :user, null: false, foreign_key: true
          t.references :forum, null: false, foreign_key: true
          t.timestamps
        
        end
      end
    end
 
