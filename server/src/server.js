const http = require('http')
const app = require('./app')
const { loadPlanets } = require('./models/planets.model')

const PORT = process.env.PORT || 8000;
const server = http.createServer(app)

async function startSever() {
  await loadPlanets()
  server.listen(PORT, () => {
    console.log(`API Nasa runing at port: ${PORT}`)
  })
}

startSever()

