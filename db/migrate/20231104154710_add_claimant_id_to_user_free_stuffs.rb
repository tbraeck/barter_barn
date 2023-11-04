class AddClaimantIdToUserFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    add_column :user_free_stuffs, :claimant_id, :integer
  end
end
