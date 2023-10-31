class RemoveImageUrlFromUserServices < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_services, :image_url, :string
  end
end
