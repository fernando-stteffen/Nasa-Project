const fs = require('fs');
const path = require('path')
const { parse }  = require('csv-parse') 
const planets = require('./planets.mongo');
const { Mongoose } = require('mongoose');

const habitablePlanets = []

const isHabitablePlanet = (planet) => planet['koi_disposition'] === 'CONFIRMED'
  && planet['koi_insol'] > 0.33 && planet['koi_insol'] < 1.11
  && planet['koi_prad'] < 1.6

function loadPlanets() { 
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '../data/kapler_data_12_21.csv'))
      .pipe(parse({
        comment: '#',
        columns: true
      }))
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data)
        }
      })
      .on('error', (error) => {
        reject(error)
      })
      .on('end', async () => { 
        const countPlanetsFound = (await getAllPlanets()).length
        console.log(`${countPlanetsFound} habitable planets found!`)
        resolve()
      })
  })
}

async function savePlanet(planet) {
  try {
    await planets.updateOne({
      keplerName: planet.kepler_name
    }, {
      keplerName: planet.kepler_name
    }, {
      upsert: true,
    })
  } catch(err) {
    console.error(`Could not save planet ${err}`)
  }
}

async function getAllPlanets() {
  return await planets.find({}, { '_id': 0, '__v': 0 })
}

module.exports = {
  loadPlanets,
  getAllPlanets,
}

