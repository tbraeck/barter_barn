class RemoveFreeStuffsFromForums < ActiveRecord::Migration[7.0]
  def change
    remove_column :forums, :free_stuffs, :string
  end
end
