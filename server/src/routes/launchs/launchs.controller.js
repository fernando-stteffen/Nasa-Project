const { 
  getAllLaunches,
  addNewLaunch, 
  isLunchId,
  abortLaunchById
} = require('../../models/launchs.model')


const httpAddNewLaunch = async (req, res) => {
  const launch = req.body
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
  
  await addNewLaunch(launch)
  return res.status(201).json(launch)
}

const httpGetAllLaunches = async (req, res) => {
  return  res.status(200).json( await getAllLaunches())
}

const httpAbortLaunch = async (req, res) => {
  const launchId = req.params.id;
  const existsLaunch = await isLunchId(launchId)
  if (!existsLaunch) {
    return res.status(404).json({ error: `Launch number not founded! `})
  }
  const aborted = await abortLaunchById(launchId)
  return res.status(200).json({aborted})
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}