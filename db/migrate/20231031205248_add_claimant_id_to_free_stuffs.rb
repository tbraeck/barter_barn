class AddClaimantIdToFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    add_column :free_stuffs, :claimant_id, :integer
  end
end
