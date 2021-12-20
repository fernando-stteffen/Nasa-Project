const { 
  getAllLaunches,
  addNewLaunch, 
} = require('../../models/launchs.model')


const httpAddNewLaunch = (req, res) => {
  const launch = req.body
  console.log(req.body)
  const requiredParams = [
    'mission',
    'rocket',
    'launchDate',
    'target'
  ]

  for (param of requiredParams) {
    if (!launch[param]) {
      return res.status(400).json({
        error: `Missing required ${param} property`
      })
    }
  } 
  
  launch.launchDate = new Date(launch.launchDate)
  if (launch.launchDate.toString() === 'Invalid Date') {
    return res.status(400).json({
      error: `Invalid Date`
    })
  }
  
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