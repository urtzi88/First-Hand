FactoryGirl.define do
  factory :transaction, class: 'Transaction' do
    provider_id '222'
    client_id '333'
    date_time Date.today
  end
end

FactoryGirl.define do
  factory :transaction_c, class: 'Transaction' do
    provider_id '111'
    client
    date_time Date.today
  end
end

FactoryGirl.define do
  factory :transaction_p, class: 'Transaction' do
    provider
    client_id '999'
    date_time Date.today
  end
end

FactoryGirl.define do
  factory :pending_transaction, class: 'Transaction' do
    status 'Pending'
  end
end
