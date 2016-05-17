class TestsController < ApplicationController

  def index
    @clients = Client.all
    @providers = Provider.all
    @services = Service.all
    @transactions = Transaction.all
  end

end
