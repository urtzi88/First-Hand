class UsersController < ApplicationController
  before_action :authenticate_user!, except: :profile

  def profile
    if user_signed_in?
      @provider = Provider.new
      @transaction = Transaction.new
      @user = current_user
      @transactions = current_user.transactions.order(date_time: :asc)
      if @user.type == "Client"
        render 'users/client_search'
      elsif @user.type == "Provider"
        render 'users/provider'
      end
    else
      render 'application/landing'
    end
  end

  def client_profile
    @provider = Provider.new
    @user = current_user
    @transactions = current_user.transactions.order(date_time: :asc)
    render 'users/client_profile'
  end

  def provider_list
    @providers = Provider.all
    render json: @providers
  end

  def providers_filtered
    if params[:service_id].to_i == 0
      @providers = Provider.all
    else
      @providers = Provider.where(service_id: params[:service_id])
    end
    @providers = @providers.retrieve_results(params[:filter])
    render json: @providers
  end

  def update_user_rating
    if current_user.type == "Client"
      @user = User.find(params[:provider])
    else
      @user = User.find(params[:client])
    end
    @user.update_rating(params)
    render json: @user
  end

end
