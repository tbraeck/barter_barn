class CreateUserFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    create_table :user_free_stuffs do |t|
      t.references :user
      t.references :free_stuff
      t.timestamps
    end
  end
end
