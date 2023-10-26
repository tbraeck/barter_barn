class AddClaimedToFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    add_column :free_stuffs, :claimed, :boolean
  end
end
