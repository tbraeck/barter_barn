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
  

puts "🤡🤠👽🤖 Seeding Forum Categories..." 

20.times do
    Post.create!(
      title: Faker::Lorem.sentence,
      content: Faker::Lorem.paragraphs.join('\n'),
      user: User.all.sample # Assign a random user to each post
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


UserDrawing.create!([
    {
        adjective: "smelly",
        noun: "cat",
        verb: "swam",
        adverb: "happily",
        user_id: 2,
    },
    {
        adjective: "jolly",
        noun: "witch",
        verb: "laughed",
        adverb: "angrily",
        user_id: 1,
    },
    {
        adjective: "tall",
        noun: "carrot",
        verb: "slept",
        adverb: "quickly",
        user_id: 3,
    },
    {
        adjective: "short",
        noun: "giraffe",
        verb: "ate",
        adverb: "sadly",
        user_id: 6,
    },
    {
        adjective: "stinky",
        noun: "alien",
        verb: "surfed",
        adverb: "backwards",
        user_id: 5,
    },
    {
        adjective: "strange",
        noun: "cupcake",
        verb: "hid",
        adverb: "like a ninja",
        user_id: 4,
    },
    {
        adjective: "hairy",
        noun: "skeleton",
        verb: "danced",
        adverb: "merrily",
        user_id: 3,
    },
    {
        adjective: "frustrated",
        noun: "baby",
        verb: "kissed",
        adverb: "puppies",
        user_id: 2,
    },
    {
        adjective: "tired",
        noun: "werewolf",
        verb: "chased",
        adverb: "butterflies",
        user_id: 1,
    },
    {
        adjective: "tired",
        noun: "werewolf",
        verb: "chased",
        adverb: "butterflies",
        user_id: 8,
    }
])