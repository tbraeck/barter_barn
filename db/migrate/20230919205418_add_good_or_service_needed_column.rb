class AddGoodOrServiceNeededColumn < ActiveRecord::Migration[7.0]
    def change
      add_column :goods, :good_or_service, :string
    
  end
end
