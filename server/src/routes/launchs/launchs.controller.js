const { 
  getAllLaunches,
  addNewLaunch, 
} = require('../../models/launchs.model')


const httpAddNewLaunch = (req, res) => {
  const launch = req.body
  launch.launchDate = new Date(launch.launchDate)
  addNewLaunch(launch)
  return res.status(201).json(launch)
}

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches())
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch
}