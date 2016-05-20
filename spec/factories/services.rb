FactoryGirl.define do
  factory :service, class: 'Service' do
    name 'Improvements'
    factory :service_with_providers do
      transient do
        provider_count 5
      end
      after(:create) do |service, evaluator|
        create_list(:provider, evaluator.provider_count, service: service)
      end
    end
  end
end

FactoryGirl.define do
  factory :category_service, class: 'Service' do
    name 'Home Services'
    parent_id nil
  end
end

FactoryGirl.define do
  factory :tree_service, class: 'Service' do
    name 'Improvements'
    association :parent_id, factory: :category_service
  end
end
