class CreateUserServices < ActiveRecord::Migration[7.0]
  def change
    create_table :user_services do |t|
      t.references :user
      t.references :service
      t.timestamps
    end
  end
end
