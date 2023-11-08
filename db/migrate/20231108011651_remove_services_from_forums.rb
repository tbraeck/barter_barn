class RemoveServicesFromForums < ActiveRecord::Migration[7.0]
  def change
    remove_column :forums, :services, :string
  end
end
