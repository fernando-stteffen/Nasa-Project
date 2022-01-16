const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100

const getAllLaunches = async () => {
  return await launchesDatabase
  .find({}, { '_id': 0, '__v': 0 })
}

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesDatabase
  .findOne({})
  .sort('-flightNumber') //from highest to lower
  
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER
  }

  return latestLaunch.flightNumber;
} 

const saveLaunch = async (launch) => {
  try {
    const planet = await planets.findOne({
      keplerName: launch.target,
    })
    if (!planet) {
      throw new Error('No matching planet found')
    }

    await launchesDatabase.findOneAndUpdate({
      flightNumber: launch.flightNumber,
    }, launch, {
      upsert: true,
    })
  } catch(err) {
    console.error(`Could not save planet ${err}`)
  }
}

const addNewLaunch = async (launch) => {
  const newFlightNumber = await getLatestFlightNumber() + 1
  
  const newLaunch = Object.assign(launch, {
      upcoming: true,
      success: true,
      customer: ['FStteffen','Space-X','NASA'],
      flightNumber: newFlightNumber
  })
  saveLaunch(newLaunch)
}


const isLunchId = async (launchId) => {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  })
}

const abortLaunchById = async (launchId) => {
  return await launchesDatabase.updateOne({
    flightNumber: launchId
  }, {
    upcoming: false,
    success: false
  })
}


const launch = {
  flightNumber: 100,
  mission: 'FSXNA mars recycle',
  rocket: 'FSXNA M011',
  launchDate: new Date('december 26, 2030'),
  target: 'Kepler-442 b', //Kepler-442 b
  customer: ['FStteffen','Space-X','NASA'],
  upcoming: true,
  success: true,
}

saveLaunch(launch)


module.exports = {
  getAllLaunches,
  addNewLaunch,
  isLunchId,
  abortLaunchById
}