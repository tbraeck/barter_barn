class RemoveImageUrlFromGoods < ActiveRecord::Migration[7.0]
  def change
    remove_column :goods, :image_url, :string
  end
end
