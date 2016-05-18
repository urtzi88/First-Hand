Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [] do
    resources :transactions
  end

  patch '/users/:user_id/transactions/:id/feedback', to: 'transactions#feedback', as: :transaction_feedback

  get '/client/:client_id/search', to: 'users#search', as: :client_search

  get '/provider_list', to: 'users#provider_list'
  get '/provider_list/:service_id', to: 'users#providers_filtered'

  get '/users_index', to: 'tests#index', as: :users_index
  get '/profile', to: 'users#profile'
  root to: 'users#profile'
end
