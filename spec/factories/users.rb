FactoryGirl.define do
  factory :client, class: 'Client' do
    sequence(:email) {|n| "person#{n}@client.com" }
    password '12345678'
    password_confirmation '12345678'
    name 'testclientname'
    surname 'testclientsurname'
    phone_number '666777888'
    address 'no name address'
    postcode '28000'
    city 'madrid'
    type 'Client'
    factory :client_with_transactions do
      transient do
        transaction_count 5
      end
      after(:create) do |client, evaluator|
        create_list(:transaction_c, evaluator.transaction_count, client: client)
      end
    end
  end
end

FactoryGirl.define do
  factory :provider, class: 'Provider' do
    sequence(:email) {|n| "person#{n}@provider.com" }
    password '12345678'
    password_confirmation '12345678'
    name 'testprovidername'
    surname 'testprovidersurname'
    phone_number '666777888'
    address 'no name address'
    postcode '28000'
    city 'madrid'
    type 'Provider'
    service
    price_per_hour '10'
    factory :provider_with_transactions do
      transient do
        transaction_count 5
      end
      after(:create) do |provider, evaluator|
        create_list(:transaction_p, evaluator.transaction_count, provider: provider)
      end
    end
  end
end
