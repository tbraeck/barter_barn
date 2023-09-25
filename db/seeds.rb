# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'
require 'bcrypt'

puts "🥷👩‍🦰 Seeding forum categories..."

    Forum.create!([
      {name: "Goods to Trade"},
      {name: "Services to Trade"},
      {name: "Free Stuff"},
      
    ])

puts "🥷👩‍🦰 Seeding users..."

20.times do
    password = Faker::Internet.password(min_length: 8)
    User.create!(
      username: Faker::Name.name,
      email: Faker::Internet.email,
      password: password,
      password_confirmation: password
    )
  end
  
  
  
  puts "🤖 Seeding Free Stuff..." 

  20.times do
    free_stuff = FreeStuff.create!(
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user: User.all.sample,
      forum: Forum.all.sample
    )
  end

  puts "🤖 Seeding Services..." 

  10.times do 
    Service.create!(
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Appliance.equipment,
      user: User.all.sample,  
      forum: Forum.all.sample 
    )
  end

  puts "🤖 Seeding Goods..." 

  10.times do 
    Good.create!(
      title: Faker::House.furniture,
      description: Faker::Construction.material,
      image_url: Faker::Internet.url,
      good_or_service: Faker::Construction.trade,
      user: User.all.sample,  
      forum: Forum.all.sample 
    )
  end


  puts "🤡 Seeding Comments..."
  
  30.times do
    comment = Comment.new(
      body: Faker::Lorem.sentence,
      user: User.all.sample,
    )
  end
  