class AddClaimedToFreestuffs < ActiveRecord::Migration[7.0]
  def change
    add_column :free_stuffs, :claimed, :boolean, default: false
  end
end
