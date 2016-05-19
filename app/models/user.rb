class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "64x64>" }, default_url: '/images/:style/profile.jpg'
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  self.inheritance_column = :type

  def self.types
    %w(Client Provider)
  end

  def as_json(options={})
    if self.type == "Client"
      super(except: [:created_at, :updated_at],
            include: [:transactions])
    else
      super(except: [:created_at, :updated_at],
            include: [:service, :transactions])
    end
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
