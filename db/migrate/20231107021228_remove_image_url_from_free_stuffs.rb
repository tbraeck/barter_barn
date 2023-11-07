class RemoveImageUrlFromFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    remove_column :free_stuffs, :image_url, :string
  end
end
