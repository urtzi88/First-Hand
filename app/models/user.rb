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

  def avatar_url
    avatar.url(:medium)
  end

  def as_json(options={})
    if self.type == "Client"
      super(except: [:created_at, :updated_at],
            include: [:transactions],
            methods: [:avatar_url])
    else
      super(except: [:created_at, :updated_at],
            include: [:service, :transactions],
            methods: [:avatar_url])
    end
  end

  def update_rating(params)
    avg_rat = self.average_rating.to_f
    rat_am = self.rating_amount.to_i
    new_rat_am = rat_am + 1
    if self.type == "Provider"
      new_rating = params[:rating][:client_rating].to_f
    elsif self.type == "Client"
      new_rating = params[:rating][:provider_rating].to_f
    end
    new_avg_rat = (avg_rat * rat_am / new_rat_am) + (new_rating / new_rat_am)
    self.update(average_rating: new_avg_rat, rating_amount: new_rat_am)
  end
end
