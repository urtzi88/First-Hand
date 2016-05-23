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

  def completed_to_show?(transactions)
    condition = false
    transactions.each do |transaction|
      if transaction.provider_status == "Complete" && transaction.client_status == "Requested" && transaction.provider_rating.blank?
        condition = true
      end
    end
    condition
  end

  def completed_to_show_client?(transactions)
    condition = false
    transactions.each do |transaction|
      if transaction.provider_status == "Complete" && transaction.client_status == "Requested" && transaction.client_rating.blank?
        condition = true
      end
    end
    condition
  end

  def pending_to_show?(transactions)
    condition = false
    transactions.each do |transaction|
      if transaction.provider_status == "Pending" && transaction.client_status == "Requested"
        condition = true
      end
    end
    condition
  end

  def accepted_to_show?(transactions)
    condition = false
    transactions.each do |transaction|
      if transaction.provider_status == "Accepted" && transaction.client_status == "Requested"
        condition = true
      end
    end
    condition
  end

  def rejected_to_show?(transactions)
    condition = false
    transactions.each do |transaction|
      if transaction.provider_status == "Rejected" && transaction.client_status == "Requested"
        condition = true
      end
    end
    condition
  end

  def cancelled_to_show?(transactions)
    condition = false
    transactions.each do |transaction|
      if transaction.client_status == "Cancelled" && transaction.provider_status != "Archived"
        condition = true
      end
    end
    condition
  end

  def get_feedback_condition(logic, transaction)
    feedback = true
    if logic[:feedback] && logic[:user] == "Provider"
      if transaction.provider_rating.present?
        feedback = false
      end
    elsif logic[:feedback] && logic[:user] == "Client"
      if transaction.client_rating.present?
        feedback = false
      end
    end
    feedback
  end

  def get_status_cond(status, transaction)
    if status == transaction.provider_status && transaction.client_status != "Cancelled"
      true
    elsif status == transaction.client_status
      true
    else
      false
    end
  end

  def get_status_for_archived_button(status)
    if status == "Cancelled" && current_user.type == "Client"
      status = "Pending"
    end
    status
  end

end
