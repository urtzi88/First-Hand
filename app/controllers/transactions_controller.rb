class TransactionsController < ApplicationController

  def create
    provider = Provider.find(params[:user_id])
    transaction = provider.transactions.create(
      provider_id: provider.id,
      client_id: current_user.id,
      date_time: params[:date_time],
      description: params[:description]
    );
    render json: transaction
  end

  def update
    transaction = Transaction.find(params[:id])
    status = params[:status][:provider_status]
    if current_user.type == "Client"
      if status == "Cancelled" || status == "Requested" || status == "Archived"
        transaction.update(client_status: status)
      else
        transaction.update(client_status: "Requested", provider_status: "Pending")
      end
    elsif current_user.type == "Provider"
      transaction.update(provider_status: status)
    end
    render json: transaction
  end

  def feedback
    transaction = Transaction.find(params[:transaction_id])
    if current_user.type == "Provider"
      transaction.update(provider_feedback: params[:rat_feed][:feedback], provider_rating: params[:rat_feed][:rating])
    elsif current_user.type == "Client"
      transaction.update(client_feedback: params[:rat_feed][:feedback], client_rating: params[:rat_feed][:rating])
    end
    render json: transaction
  end

end
