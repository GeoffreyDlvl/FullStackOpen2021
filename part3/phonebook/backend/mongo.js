const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> [<name> <number>]')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.rr62c.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    let output = 'phonebook:\n'
    persons.forEach(person => output += person.name + ' ' + person.number + '\n')
    console.log(output)
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {

  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name,
    number
  })

  // eslint-disable-next-line no-unused-vars
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
