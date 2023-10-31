class RemoveClaimantIdFromGoods < ActiveRecord::Migration[7.0]
  def change
    remove_column :goods, :claimant_id, :integer
  end
end
