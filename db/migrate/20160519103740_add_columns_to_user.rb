class AddColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :average_rating, :decimal, precision: 3, scale: 2, default: 0
    add_column :users, :rating_amount, :integer, default: 0
  end
end
