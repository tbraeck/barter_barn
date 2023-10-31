class RemoveImageUrlFromUserGoods < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_goods, :image_url, :string
  end
end
