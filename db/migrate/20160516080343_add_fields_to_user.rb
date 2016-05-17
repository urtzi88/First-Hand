class AddFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :name, :string
    add_column :users, :surname, :string
    add_column :users, :phone_number, :string
    add_column :users, :address, :string
    add_column :users, :postcode, :string
    add_column :users, :city, :string
    add_column :users, :type, :string
    add_column :users, :service_id, :integer
    add_column :users, :price_per_hour, :integer
  end
end
