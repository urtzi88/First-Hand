class Provider < User
  belongs_to :service
  has_many :transactions
  validates :service_id, :price_per_hour, presence: true
end
