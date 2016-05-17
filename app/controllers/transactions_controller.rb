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
      status: "Pending",
      date_time: params[:date_time]
    );
    render json: transaction
  end

  def update
    client = Client.find(params[:user_id])
    transaction = client.transactions.find(params[:id])
    transaction.update(status: params[:status])
    render json: transaction
  end

  def destroy
    provider = Provider.find(params[:user_id])
    transaction = provider.transactions.find(params[:id])
    transaction.destroy
    render json: transaction
  end

end
