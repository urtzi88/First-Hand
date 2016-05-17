module ApplicationHelper

  def get_services_categ
    categories = Service.where(parent_id: nil)
  end

  def get_services
    services = Service.where.not(parent_id: nil)
  end

  def select_tag_array
    final_array = []
    loader_array = []
    get_services_categ.each do |categ|
      final_array << categ.name
      get_services.each do |service|
        if(service.parent_id == categ.id)
          loader_array << [service.name, service.id]
        end
      end
      final_array << loader_array
      loader_array = []
    end
    final_array
  end

end
