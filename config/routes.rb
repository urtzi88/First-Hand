Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [] do
    resources :transactions
  end

  get '/provider_list', to: 'users#provider_list'
  get '/provider_list/:service_id', to: 'users#providers_filtered'

  get '/users_index', to: 'tests#index', as: :users_index
  get '/profile', to: 'users#profile'
  root to: 'users#profile'
end
