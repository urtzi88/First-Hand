require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the UsersHelper. For example:
#
# describe UsersHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe UsersHelper, type: :helper do

  describe 'pending_to_show?(transactions)' do
    before :each do
      create( :pending_transaction )
    end

    pending 'returns true if the status of the transaction is Pending' do
      expect(pending_to_show?(:pending_transaction)).to be(true)
    end

  end

end
