class AddForumIdToUserFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    add_column :user_free_stuffs, :forum_id, :integer
  end
end
