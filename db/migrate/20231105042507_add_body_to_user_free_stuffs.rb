class AddBodyToUserFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    add_column :user_free_stuffs, :body, :string
  end
end
