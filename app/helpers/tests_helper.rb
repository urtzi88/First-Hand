module TestsHelper

  def get_parent_name(service)
    Service.find(service.parent_id).name
  end

  def get_service_name(provider)
    Service.find(provider.service_id).name
  end

  def get_client_name_tests(transaction)
    Client.find(transaction.client_id).name
  end

  def get_provider_name_tests(transaction)
    Provider.find(transaction.provider_id).name
  end

  def get_provider_service(transaction)
    Service.find(Provider.find(transaction.provider_id).service_id).name
  end

end
