class AddClaimantIdToGoods < ActiveRecord::Migration[7.0]
  def change
    add_column :goods, :claimant_id, :integer
  end
end
