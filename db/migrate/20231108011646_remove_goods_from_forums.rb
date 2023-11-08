class RemoveGoodsFromForums < ActiveRecord::Migration[7.0]
  def change
    remove_column :forums, :goods, :string
  end
end
