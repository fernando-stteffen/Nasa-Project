const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL

mongoose.connection.on('open', () => {
  console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
  console.error(err)
})

async function mongoConnect() {
  console.log(`Mongo Connecting`)
  return await mongoose.connect(MONGO_URL)
}
async function mongoDisconnect() {
  console.log(`Mongo Closing`)
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}