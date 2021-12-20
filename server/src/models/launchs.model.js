const launches = new Map()

let latestFlightNumber = 100

const launch = {
  flightNumber: 100,
  mission: 'FSXNA mars recycle',
  rocket: 'FSXNA M011',
  launchDate: new Date('december 26, 2030'),
  target: 'Kepler-442 b',
  customer: ['FStteffen','Space-X','NASA'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch)

const getAllLaunches = () => {
  return Array.from(launches.values())
}

const addNewLaunch = (launch) => {
  latestFlightNumber++
  launches.set(
    latestFlightNumber, 
    Object.assign(launch, {
      upcoming: true,
      success: true,
      customer: ['FStteffen','Space-X','NASA'],
      flightNumber: latestFlightNumber
    })
  )
}

module.exports = {
  getAllLaunches,
  addNewLaunch
}