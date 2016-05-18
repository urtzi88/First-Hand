class AddStatusToTransaction < ActiveRecord::Migration
  def change
    add_column :transactions, :provider_status, :string, default: "Pending"
    add_column :transactions, :client_status, :string, default: "Requested"
  end
end
