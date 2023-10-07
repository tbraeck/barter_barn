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
      body: Faker::Lorem.sentence,
      user_id: 3
    },
    {
      body: Faker::Lorem.sentence,
      user_id: 2
    },
    {
      body: Faker::Lorem.sentence,
      user_id: 1
    },
    {
      body: Faker::Lorem.sentence,
      user_id: 8
    },
    {
      body: Faker::Lorem.sentence,
      user_id: 7
    },
    {
      body: Faker::Lorem.sentence,
      user_id: 6
    },
    {
      body: Faker::Lorem.sentence,
      user_id: 5
    },
    {
      body: Faker::Lorem.sentence,
      user_id: 1
    },
    {
      body: Faker::Lorem.sentence,
      user_id: 4
    },
    {
      body: Faker::Lorem.sentence,
      user_id: 3
    },
    {
      body: Faker::Lorem.sentence,
      user_id: 2
    }
])
