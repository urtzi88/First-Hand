class Client < User
  has_many :transactions
  validates :price_per_hour, absence: true
end
