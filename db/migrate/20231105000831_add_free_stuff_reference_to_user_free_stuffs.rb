class AddFreeStuffReferenceToUserFreeStuffs < ActiveRecord::Migration[6.0]
  def change
    add_reference :user_free_stuffs, :free_stuff, foreign_key: true
  end
end
