# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'
require 'bcrypt'

puts "🥷👩‍🦰 Seeding users..."

 User.create!([
    {
      username: "Tate",
      email: "tatebraeckel@gmail.com",
      password: "iscool",
      password_confirmation: "iscool"
    },
    {
      username: Faker::Name.name,
      email: Faker::Internet.email,
      password: "iscool",
      password_confirmation: "iscool"
    },
    {
      username: Faker::Name.name,
      email: Faker::Internet.email,
      password: "iscool",
      password_confirmation: "iscool"
    },
    {
      username: Faker::Name.name,
      email: Faker::Internet.email,
      password: "iscool",
      password_confirmation: "iscool"
    },
    {
      username: Faker::Name.name,
      email: Faker::Internet.email,
      password: "iscool",
      password_confirmation: "iscool"
    },
    {
      username: Faker::Name.name,
      email: Faker::Internet.email,
      password: "iscool",
      password_confirmation: "iscool"
    },
    {
      username: Faker::Name.name,
      email: Faker::Internet.email,
      password: "iscool",
      password_confirmation: "iscool"
    },
    {
      username: Faker::Name.name,
      email: Faker::Internet.email,
      password: "iscool",
      password_confirmation: "iscool"
    }
 ])
  

puts "🥷👩‍🦰 Seeding forum categories..."

Forum.create!([
  { title: "Goods to Trade" },
  { title: "Services to Trade" },
  { title: "Free Stuff" }
])

puts "🤖 Seeding Goods..."

Good.create!([
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        good_or_service: Faker::Construction.trade,
        user_id: 1,
        forum_id: 1,
      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        good_or_service: Faker::Construction.trade,
        user_id: 2,
        forum_id: 1,
        # image: image


      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        good_or_service: Faker::Construction.trade,
        user_id: 3,
        forum_id: 1,
        # image: image


      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        good_or_service: Faker::Construction.trade,
        user_id: 4,
        forum_id: 1,
        # image: image


      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        good_or_service: Faker::Construction.trade,
        user_id: 5,
        forum_id: 1,
        # image: image


      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        good_or_service: Faker::Construction.trade,
        user_id: 6,
        forum_id: 1,
        # image: image


      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        good_or_service: Faker::Construction.trade,
        user_id: 7,
        forum_id: 1,
        # image: image


      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        good_or_service: Faker::Construction.trade,
        user_id: 8,
        forum_id: 1,
        # image: image


      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        good_or_service: Faker::Construction.trade,
        user_id: 1,
        forum_id: 1,
        # image: image


      }
])

Good.all.each do |good|
  image_file_path = Rails.root.join('db/images/stockImage.png')
  image = File.open(image_file_path)
  good.main_image.attach(io: image, filename: 'stockImage.png')
end

puts "🤖 Seeding Services..."

  Service.create!([
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      good_or_service: Faker::Appliance.equipment,
      user_id: 7,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      good_or_service: Faker::Appliance.equipment,
      user_id: 8,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      good_or_service: Faker::Appliance.equipment,
      user_id: 1,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      good_or_service: Faker::Appliance.equipment,
      user_id: 8,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      good_or_service: Faker::Appliance.equipment,
      user_id: 7,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      good_or_service: Faker::Appliance.equipment,
      user_id: 6,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      good_or_service: Faker::Appliance.equipment,
      user_id: 5,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      good_or_service: Faker::Appliance.equipment,
      user_id: 4,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      good_or_service: Faker::Appliance.equipment,
      user_id: 3,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      good_or_service: Faker::Appliance.equipment,
      user_id: 2,
      forum_id: 2
    }
  ])

  Service.all.each do |service|
    image_file_path = Rails.root.join('db/images/barterBarn.png')
    image = File.open(image_file_path)
    service.main_image.attach(io: image, filename: 'barterBarn.png')
  end


puts "🤖 Seeding Free Stuff..."


FreeStuff.create!([
    {
      body: Faker::Appliance.equipment,
      claimant_id: nil,
      user_id: 3,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      claimant_id: nil,
      user_id: 2,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      claimant_id: nil,
      user_id: 4,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      claimant_id: nil,
      user_id: 1,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      claimant_id: nil,
      user_id: 1,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      claimant_id: nil,
      user_id: 4,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      claimant_id: nil,
      user_id: 5,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      claimant_id: nil,
      user_id: 6,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      claimant_id: nil,
      user_id: 7,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      claimant_id: nil,
      user_id: 8,
      forum_id: 3
    }
  ])

  FreeStuff.all.each do |free_stuff|
    image_file_path = Rails.root.join('db/images/calavera.png')
    image = File.open(image_file_path)
    free_stuff.main_image.attach(io: image, filename: 'calavera.png')
  end
  # puts "🤖 Seeding Messages..."

  # Message.create!([
  #   {
  #   sender_id: 2,
  #   recipient_id: 1,
  #   content: Faker::Quote.jack_handey
  #   },
  #   {
  #     sender_id: 3,
  #     recipient_id: 6,
  #     content: Faker::Quote.jack_handey
  #     },
  #     {
  #       sender_id: 8,
  #       recipient_id: 7,
  #       content: Faker::Quote.jack_handey
  #       },
  #       {
  #         sender_id: 6,
  #         recipient_id: 5,
  #         content: Faker::Quote.jack_handey
  #         },
  #         {
  #           sender_id: 4,
  #           recipient_id: 3,
  #           content: Faker::Quote.jack_handey
  #           },
  #           {
  #             sender_id: 1,
  #             recipient_id: 2,
  #             content: Faker::Quote.jack_handey
  #           }
  #           ])
