# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_05_235940) do
  create_table "comments", force: :cascade do |t|
    t.string "body"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "forums", force: :cascade do |t|
    t.string "title"
    t.string "goods"
    t.string "services"
    t.string "free_stuffs"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "free_stuffs", force: :cascade do |t|
    t.text "body"
    t.string "image_url"
    t.integer "user_id"
    t.integer "forum_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "goods", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "image_url"
    t.integer "user_id"
    t.integer "forum_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "good_or_service"
  end

  create_table "services", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "image_url"
    t.integer "user_id"
    t.integer "forum_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "good_or_service"
  end

  create_table "user_items", force: :cascade do |t|
    t.string "goods"
    t.string "services"
    t.string "free_stuffs"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_items_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "user_items", "users"
end
