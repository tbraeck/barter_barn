class AddGoodOrServiceNeededColumnServices < ActiveRecord::Migration[7.0]
    def change
      add_column :services, :good_or_service, :string
  end
end
