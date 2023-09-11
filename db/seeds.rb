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
    user = User.all.sample  # Get a random user
    forum = Forum.all.sample 

    Post.create!(
      title: Faker::Lorem.sentence,
      body: Faker::Lorem.paragraphs.join('\n'),
      user: User.all.sample,  # Assign a random user to the post
      forum: Forum.all.sample,  # Assign a random forum to the post
      created_at: Faker::Time.between(from: 2.years.ago, to: Time.now, format: :default),
      updated_at: Faker::Time.between(from: 2.years.ago, to: Time.now, format: :default)
    )
    if post.save
        puts "Created post with title: #{post.title}"
      else
        puts "Failed to create post with title: #{post.title}"
        puts "Errors: #{post.errors.full_messages}"
      end
  end

  puts "🤡 Seeding Comments..." 

  30.times do
    Comment.create!(
      body: Faker::Lorem.sentence,
      user: User.all.sample,  # Assign a random user to the comment
      post: Post.all.sample  # Assign a random post to the comment
    )
  end


