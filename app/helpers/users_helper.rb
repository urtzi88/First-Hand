module UsersHelper

  def get_service_name(id)
    Service.find(id).name
  end

  def get_provider_name(id)
    Provider.find(id).name
  end

  def get_client_name(id)
    Client.find(id).name
  end

  def get_client_address(id)
    Client.find(id).address
  end

  def get_client(id)
    Client.find(id)
  end

  def get_provider(id)
    Provider.find(id)
  end

end
