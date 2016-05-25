class UsersController < ApplicationController
  before_action :authenticate_user!, except: :profile

  def profile
    if user_signed_in?
      @provider = Provider.new
      @transaction = Transaction.new
      @user = current_user
      @transactions = current_user.transactions.order(date_time: :asc)
      if @user.type == "Client"
        render 'users/client_profile'
      elsif @user.type == "Provider"
        render 'users/provider'
      end
    else
      render 'application/landing'
    end
  end

  def search
    @provider = Provider.new
    @user = current_user
    @transactions = current_user.transactions.order(id: :asc)
    render 'users/client_search'
  end

  def provider_list
    @providers = Provider.all
    render json: @providers
  end

  def providers_filtered
    if params[:filter] == '1'
      @providers = Provider.where(service_id: params[:service_id]).order(price_per_hour: :asc)
    elsif params[:filter] == '2'
      @providers = Provider.where(service_id: params[:service_id]).order(price_per_hour: :desc)
    end
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
