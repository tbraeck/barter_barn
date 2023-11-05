class AddForumIdToUserServices < ActiveRecord::Migration[7.0]
  def change
    add_reference :user_services, :forum, null: false, foreign_key: true
  end
end
