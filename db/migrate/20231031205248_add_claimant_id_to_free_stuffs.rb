class AddClaimantIdToFreeStuffs < ActiveRecord::Migration[6.0]
  def change
    add_column :free_stuffs, :claimant_id, :integer
    add_index :free_stuffs, :claimant_id
  end
end
