# Service table
hs = Service.create(name: "Home Services")
pc = Service.create(name: "Personal Care")
ev = Service.create(name: "Events")
ld = Service.create(name: "Legal and Documents")
car = Service.create(name: "Cars")
hs.children.create(name: "Improvements")
hs.children.create(name: "Plumbing")
hs.children.create(name: "Cleaning")
hs.children.create(name: "Moving")
pc.children.create(name: "Hairdressing")
pc.children.create(name: "Massaging")
pc.children.create(name: "Personal Training")
ev.children.create(name: "Photography")
ev.children.create(name: "Planner")
ld.children.create(name: "Translations")
ld.children.create(name: "Designs")
car.children.create(name: "Repairs")
car.children.create(name: "Cleaning")

10.times do |i|
  fname = Faker::Name::first_name
  fsurname = Faker::Name::last_name
  fnumber = Faker::PhoneNumber::phone_number
  faddress = "Calle Bravo Murillo"
  fpostcode = ['28015', '28003', '28020'].sample
  fcity = "Madrid"
  favatar = Faker::Avatar.image

  Client.create(
    name: fname,
    surname: fsurname,
    email: "#{fname.downcase}@clientmail.com",
    password: "123456",
    phone_number: fnumber,
    address: faddress,
    postcode: fpostcode,
    city: fcity,
    avatar: favatar
  )

  puts("New client created: Name: " + fname + fsurname + ", #{fname.downcase}@clientmail.com, " + fnumber + faddress + fpostcode + fcity)
end

10.times do |i|
  fname = Faker::Name::first_name
  fsurname = Faker::Name::last_name
  fnumber = Faker::PhoneNumber::phone_number
  faddress = "Calle Bravo Murillo"
  fpostcode = ['28015', '28003', '28020'].sample
  fcity = "Madrid"
  service = rand(6..18)
  price = rand(6..15)
  favatar = Faker::Avatar.image

  Provider.create(
    name: fname,
    surname: fsurname,
    email: "#{fname.downcase}@providermail.com",
    password: "123456",
    phone_number: fnumber,
    address: faddress,
    postcode: fpostcode,
    city: fcity,
    service_id: service,
    price_per_hour: price,
    avatar: favatar
  )

  puts("New provider created: Name: #{fname} #{fsurname} #{fname.downcase}@providermail.com, #{fnumber} #{faddress} #{fpostcode} #{fcity}, Service: #{service}, Price: #{price}")
end
