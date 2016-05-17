class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  self.inheritance_column = :type

  def self.types
    %w(Client Provider)
  end

  def as_json(options={})
    super(except: [:created_at, :updated_at],
          include: [:service, :transactions])
  end
end

class Client < User
  has_many :transactions
  validates :price_per_hour, absence: true
end

class Provider < User
  belongs_to :service
  has_many :transactions
  validates :service_id, :price_per_hour, presence: true
end
