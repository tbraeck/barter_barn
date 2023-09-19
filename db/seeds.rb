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

20.times do
    password = Faker::Internet.password(min_length: 8)
    User.create!(
      username: Faker::Name.name,
      email: Faker::Internet.email,
      password: password,
      password_confirmation: password
    )
  end
  
  puts "🥷👩‍🦰 Seeding forum categories..."

    Forum.create!([
      {name: "Will trade carpentry Work"},
      {name: "Will trade house cleaning Work"},
      {name: "Will trade plumbing Work"},
      {name: "Will trade sewing Work"},
      {name: "Will trade painting Work"},
      {name: "Will trade lawnwork"},
      {name: "Will trade accounting Work"}
    ])
  
  # Fetch all users and forums
  users = User.all
  forums = Forum.all

puts "🤡🤠👽🤖 Seeding Forum Categories..." 

20.times do
    user = User.all.sample  # Get a random user
    forum = Forum.all.sample 

    Post.create!(
      title: Faker::Lorem.sentence,
      body: Faker::Lorem.paragraphs.join('\n'),
      user: User.all.sample,  # Assign a random user to the post
      forum: Forum.all.sample  # Assign a random forum to the post
     
    )
  end
  
  puts "🤖 Seeding Free Stuff..." 

  20.times do 
    FreeStuff.create!(
      body: Faker::Appliance.equipment,
      image_url: Faker::Internet.url,
      user: User.all.sample,  
      post: Post.all.sample 
    )
  end



  puts "🤡 Seeding Comments..." 

  30.times do
    Comment.create!(
      body: Faker::Lorem.sentence,
      user: User.all.sample,  # Assign a random user to the comment
      post: Post.all.sample  # Assign a random post to the comment
    )
  end

  puts "🤖 Seeding Services..." 

  20.times do 
    Service.create!(
      title: Faker::Hobby.activity,
      description: Faker::Job.key_skill,
      image_url: Faker::Internet.url,
      user: User.all.sample,  
      forum: Forum.all.sample 
    )
  end

  puts "🤖 Seeding Goods..." 

  20.times do 
    Good.create!(
      title: Faker::House.furniture,
      description: Faker::Construction.material,
      image_url: Faker::Internet.url,
      user: User.all.sample,  
      forum: Forum.all.sample 
    )
  end
