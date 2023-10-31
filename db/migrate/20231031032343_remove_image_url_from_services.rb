class RemoveImageUrlFromServices < ActiveRecord::Migration[7.0]
  def change
    remove_column :services, :image_url, :string
  end
end
