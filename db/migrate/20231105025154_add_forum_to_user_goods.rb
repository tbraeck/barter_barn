class AddForumToUserGoods < ActiveRecord::Migration[7.0]
  def change
    add_reference :user_goods, :forum, null: false, foreign_key: true
  end
end
