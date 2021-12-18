const { parse } = require('csv-parse') 
const fs = require('fs');
const path = require('path')

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
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data)
        }
      })
      .on('error', (error) => {
        reject(error)
      })
      .on('end', () => { 
        resolve()
      })
  })
}

module.exports = {
  loadPlanets,
  planets: habitablePlanets
}
