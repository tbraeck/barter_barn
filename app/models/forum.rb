class Forum < ApplicationRecord
  has_many :goods, class_name: 'Good', foreign_key: 'forum_id', dependent: :destroy
  has_many :services, class_name: 'Service', foreign_key: 'forum_id', dependent: :destroy
  has_many :free_stuffs, class_name: 'FreeStuff', foreign_key: 'forum_id', dependent: :destroy

    has_many :users, through: [:goods, :services, :free_stuffs]
    # has_many :user_goods
    # has_many :users, through: [:goods, :services, :free_stuffs]

    # has_many :user_services
  end
    
    