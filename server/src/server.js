const http = require('http')

require('dotenv').config()

const app = require('./app')
const { mongoConnect } = require('./services/mongo')
const { loadPlanets } = require('./models/planets.model')
const { loadLaunchData } = require('./models/launchs.model')

const PORT = process.env.PORT || 8000;
const server = http.createServer(app)


async function startSever() {
  await mongoConnect()
  await loadPlanets()
  await loadLaunchData()
  server.listen(PORT, () => {
    console.log(`API Nasa runing at port: ${PORT}`)
  })
}

startSever()