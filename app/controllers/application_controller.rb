class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!, except: :landing

  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :surname, :phone_number, :address, :postcode, :city, :type, :service_id, :price_per_hour, :avatar, :description])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :surname, :phone_number, :address, :postcode, :city, :type, :service_id, :price_per_hour, :avatar, :average_rating, :rating_amount, :description])
    end
end
