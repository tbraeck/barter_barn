class CreateUserFreeStuffs < ActiveRecord::Migration[7.0]
  def change
    create_table :user_free_stuffs do |t|
      t.references :user, null: false, foreign_key: true
      t.references :claimant, null: false, foreign_key: true
      t.references :free_stuff, null: false, foreign_key: true

      t.timestamps
    end
  end
end
