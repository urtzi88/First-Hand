class Provider < User
  belongs_to :service
  has_many :transactions
  validates :service_id, :price_per_hour, presence: true

  def self.retrieve_results(filter)
    if filter == '1'
      self.order(price_per_hour: :asc)
    elsif filter == '2'
      self.order(price_per_hour: :desc)
    elsif filter == '3'
      self.order(average_rating: :desc)
    end
  end
end
