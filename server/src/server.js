const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')
const { loadPlanets } = require('./models/planets.model')
const { DATABASE_PASSW_CLUSTER } = require('./configs/database')

const PORT = process.env.PORT || 8000;
const MONGO_URL = `mongodb+srv://nasa-api:${DATABASE_PASSW_CLUSTER}/nasa?retryWrites=true&w=majority`
const server = http.createServer(app)

mongoose.connection.on('open', () => {
  console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
  console.error(err)
})

async function startSever() {
  await mongoose.connect(MONGO_URL)
  await loadPlanets()
  server.listen(PORT, () => {
    console.log(`API Nasa runing at port: ${PORT}`)
  })
}

startSever()

