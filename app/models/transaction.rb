class Transaction < ActiveRecord::Base
  belongs_to :client
  belongs_to :provider

  validates :date_time, presence: true

  def as_json(options={})
    super(except: [:created_at, :updated_at],
          include: [:provider])
  end
end
