class TransactionsController < ApplicationController

  def index

  end

  def new

  end

  def create
    provider = Provider.find(params[:user_id])
    transaction = provider.transactions.create(
      provider_id: provider.id,
      client_id: current_user.id,
      date_time: params[:date_time]
    );
    render json: transaction
  end

  def update
    user = User.find(params[:user_id])
    transaction = user.transactions.find(params[:id])
    provider_status = params[:status][:provider_status]
    client_status = params[:status][:client_status]
    if provider_status.blank? && client_status.present?
      transaction.update(client_status: client_status)
    elsif client_status.blank? && provider_status.present?
      transaction.update(provider_status: provider_status)
    elsif client_status.present? && provider_status.present?
      transaction.update(provider_status: provider_status, client_status: client_status)
    end
    render json: transaction
  end

  def feedback
    transaction = Transaction.find(params[:id])
    if current_user.type == "Provider"
      transaction.update(provider_feedback: params[:rat_feed][:feedback], provider_rating: params[:rat_feed][:rating])
    elsif current_user.type == "Client"
      transaction.update(client_feedback: params[:rat_feed][:feedback], client_rating: params[:rat_feed][:rating])
    end
    render json: transaction
  end

  # def destroy
  #   provider = Provider.find(params[:user_id])
  #   transaction = provider.transactions.find(params[:id])
  #   transaction.destroy
  #   render json: transaction
  # end

end
