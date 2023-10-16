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
        image_url: Faker::Internet.url,
        good_or_service: Faker::Construction.trade,
        user_id: 1,
        forum_id: 1
      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        image_url: Faker::Internet.url,
        good_or_service: Faker::Construction.trade,
        user_id: 2,
        forum_id: 1

      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        image_url: Faker::Internet.url,
        good_or_service: Faker::Construction.trade,
        user_id: 3,
        forum_id: 1

      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        image_url: Faker::Internet.url,
        good_or_service: Faker::Construction.trade,
        user_id: 4,
        forum_id: 1

      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        image_url: Faker::Internet.url,
        good_or_service: Faker::Construction.trade,
        user_id: 5,
        forum_id: 1

      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        image_url: Faker::Internet.url,
        good_or_service: Faker::Construction.trade,
        user_id: 6,
        forum_id: 1

      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        image_url: Faker::Internet.url,
        good_or_service: Faker::Construction.trade,
        user_id: 7,
        forum_id: 1

      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        image_url: Faker::Internet.url,
        good_or_service: Faker::Construction.trade,
        user_id: 8,
        forum_id: 1

      },
      {
        title: Faker::House.furniture,
        description: Faker::Construction.material,
        image_url: Faker::Internet.url,
        good_or_service: Faker::Construction.trade,
        user_id: 1,
        forum_id: 1

      }
])


puts "🤖 Seeding Services..."

  Service.create!([
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user_id: 7,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user_id: 8,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user_id: 1,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user_id: 8,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user_id: 7,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user_id: 6,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user_id: 5,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user_id: 4,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user_id: 3,
      forum_id: 2
    },
    {
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user_id: 2,
      forum_id: 2
    }
  ])

puts "🤖 Seeding Free Stuff..."
  
FreeStuff.create!([
    {
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user_id: 3,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user_id: 2,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user_id: 4,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user_id: 1,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user_id: 1,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user_id: 4,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user_id: 5,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user_id: 6,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user_id: 7,
      forum_id: 3
    },
    {
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user_id: 8,
      forum_id: 3
    }
  ])

puts "🤡 Seeding Comments..."

  Comment.create!([
    {
      name: "Frank",
      comment_text: Faker::Lorem.sentence,
      contact_info: Faker::PhoneNumber.cell_phone,
      available_times: "9:00AM - 12:00PM",
      user_id: 3,
      forum_id: 2

    },
    {
      name: "Fred",
      comment_text: Faker::Lorem.sentence,
      contact_info: Faker::PhoneNumber.cell_phone,
      available_times: "9:00AM - 12:00PM",
      user_id: 2,
      forum_id: 1

    },
    {
      name: "Ted",
      comment_text: Faker::Lorem.sentence,
      contact_info: Faker::PhoneNumber.cell_phone,
      available_times: "9:00AM - 12:00PM",
      user_id: 1,
      forum_id: 1

    },
    {
      name: "Blake",
      comment_text: Faker::Lorem.sentence,
      contact_info: Faker::PhoneNumber.cell_phone,
      available_times: "9:00AM - 12:00PM",
      user_id: 4,
      forum_id: 3

    },
    {
      name: "Sarah",
      comment_text: Faker::Lorem.sentence,
      contact_info: Faker::PhoneNumber.cell_phone,
      available_times: "9:00AM - 12:00PM",
      user_id: 5,
      forum_id: 3

    },
    {
      name: "Sarah",
      comment_text: Faker::Lorem.sentence,
      contact_info: Faker::PhoneNumber.cell_phone,
      available_times: "9:00AM - 12:00PM",
      user_id: 5,
      forum_id: 1

    },
    {
      name: "Jerry",
      comment_text: Faker::Lorem.sentence,
      contact_info: Faker::PhoneNumber.cell_phone,
      available_times: "9:00AM - 12:00PM",
      user_id: 6,
      forum_id: 1

    },
    {
      name: "John",
      comment_text: Faker::Lorem.sentence,
      contact_info: Faker::PhoneNumber.cell_phone,
      available_times: "9:00AM - 12:00PM",
      user_id: 7,
      forum_id: 2

    },
    {
      name: "Jessica", 
      comment_text: Faker::Lorem.sentence,
      contact_info: Faker::PhoneNumber.cell_phone,
      available_times: "9:00AM - 12:00PM",
      user_id: 8,
      forum_id: 3

    }
])
