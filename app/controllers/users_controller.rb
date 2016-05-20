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
    @providers = Provider.where(service_id: params[:service_id])
    render json: @providers
  end

  def update_user_rating
    if current_user.type == "Client"
      @user = User.find(params[:provider])
    else
      @user = User.find(params[:client])
    end
    @avg_rat = @user.average_rating.to_f
    @rat_am = @user.rating_amount.to_i
    @new_rat_am = @rat_am + 1
    if current_user.type == "Client"
      @new_rating = params[:rating][:client_rating].to_f
    elsif current_user.type == "Provider"
      @new_rating = params[:rating][:provider_rating].to_f
    end
    @new_avg_rat = (@avg_rat * @rat_am / @new_rat_am) + (@new_rating / @new_rat_am)
    @user.update(average_rating: @new_avg_rat, rating_amount: @new_rat_am)
    render json: @user
  end

end
