class CreateUserComments < ActiveRecord::Migration[7.0]
  def change
    create_table :user_comments do |t|
      t.string :body
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
