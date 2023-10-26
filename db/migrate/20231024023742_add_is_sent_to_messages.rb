class AddIsSentToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :is_sent, :boolean
  end
end
