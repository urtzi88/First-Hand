class UsersController < ApplicationController
  before_action :authenticate_user!

  def profile
    @provider = Provider.new
    @user = current_user
    @transactions = current_user.transactions.order(id: :asc)
    if @user.type == "Client"
      render 'users/profile'
    elsif @user.type == "Provider"
      render 'users/provider'
    end
  end

  def provider_list
    @providers = Provider.all
    render json: @providers
  end

  def providers_filtered
    @providers = Provider.where(service_id: params[:service_id])
    render json: @providers
  end

end
