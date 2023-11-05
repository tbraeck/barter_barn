class RemoveColumnsFromUserFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_free_stuffs, :body
    remove_column :user_free_stuffs, :forum_id
    remove_column :user_free_stuffs, :forum_id

  end
end
