# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'harrypotter', 
    email: 'harrypotter@gmail.com', 
    password: 'potter'
  )

  User.create!(
    username: 'ronweasley', 
    email: 'ronweasley@gmail.com', 
    password: 'weasley'
  )
  User.create!(
    username: 'hermoinegranger', 
    email: 'hermoinegranger@gmail.com', 
    password: 'hermoine'
  )
  User.create!(
    username: 'siriusblack', 
    email: 'siriusblack@gmail.com', 
    password: 'sirius'
  )
  User.create!(
    username: 'lordvoldemort', 
    email: 'lordvoldemort@gmail.com', 
    password: 'voldemort'
  )
  User.create!(
    username: 'severussnape', 
    email: 'severussnape@gmail.com', 
    password: 'severus'
  )
  User.create!(
    username: 'albusdumbledore', 
    email: 'albusdumbledore@gmail.com', 
    password: 'dumbledore'
  )
  User.create!(
    username: 'ginnyweasley', 
    email: 'ginnyweasley@gmail.com', 
    password: 'weasley'
  )
  User.create!(
    username: 'cedricdiggory', 
    email: 'cedricdiggory@gmail.com', 
    password: 'cedric'
  )
  User.create!(
    username: 'dracomalfoy', 
    email: 'dracomalfoy@gmail.com', 
    password: 'malfoy'
  )
  User.create!(
    username: 'alastormoody', 
    email: 'alastormoody@gmail.com', 
    password: 'alastor'
  )
  User.create!(
    username: 'rubeushagrid', 
    email: 'rubeushagrid@gmail.com', 
    password: 'rubeus'
  )

  # More users

  puts "Done!"
end
