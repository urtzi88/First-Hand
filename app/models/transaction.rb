class Transaction < ActiveRecord::Base
  belongs_to :client
  belongs_to :provider

  def as_json(options={})
    super(except: [:created_at, :updated_at],
          include: [:provider])
  end
end
