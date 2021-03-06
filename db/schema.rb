# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160523115923) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "services", force: :cascade do |t|
    t.string   "name"
    t.integer  "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.integer  "provider_id"
    t.integer  "client_id"
    t.datetime "date_time"
    t.integer  "duration"
    t.text     "client_feedback"
    t.integer  "client_rating"
    t.text     "provider_feedback"
    t.integer  "provider_rating"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "provider_status",   default: "Pending"
    t.string   "client_status",     default: "Requested"
    t.text     "description"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                                          default: "",  null: false
    t.string   "encrypted_password",                             default: "",  null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                                  default: 0,   null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                                                   null: false
    t.datetime "updated_at",                                                   null: false
    t.string   "name"
    t.string   "surname"
    t.string   "phone_number"
    t.string   "address"
    t.string   "postcode"
    t.string   "city"
    t.string   "type"
    t.integer  "service_id"
    t.integer  "price_per_hour"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.decimal  "average_rating",         precision: 3, scale: 2, default: 0.0
    t.integer  "rating_amount",                                  default: 0
    t.text     "description"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
