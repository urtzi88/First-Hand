class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :provider_id
      t.integer :client_id
      t.datetime :date_time
      t.integer :duration
      t.text :client_feedback
      t.integer :client_rating
      t.text :provider_feedback
      t.integer :provider_rating
      t.string :status

      t.timestamps null: false
    end
  end
end
