Rails.application.routes.draw do
  root to: 'users#profile'
  devise_for :users

  resources :users, only: [] do
    collection do
      get :search, to: 'users#client_profile', as: :client_search
      patch '/feedback', to: 'users#update_user_rating'
      get '/provider_list', to: 'users#provider_list'
      get '/provider_list/:service_id', to: 'users#providers_filtered'
      get '/profile', to: 'users#profile'
    end
    resources :transactions, only: [:create, :update] do
      patch '/feedback', to: 'transactions#feedback', as: :transaction_feedback
    end
  end

end
