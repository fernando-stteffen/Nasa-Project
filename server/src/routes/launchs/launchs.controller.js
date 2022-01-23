const {
  getAllLaunches,
  addNewLaunch,
  isLunchId,
  abortLaunchById
} = require('../../models/launchs.model')

const {
  getPagination
} = require('../../services/query')


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
  const { skip, limit } = getPagination(req.query)
  return res.status(200).json(await getAllLaunches(skip, limit))
}

const httpAbortLaunch = async (req, res) => {
  const launchId = req.params.id;
  const existsLaunch = await isLunchId(launchId)
  if (!existsLaunch) {
    return res.status(404).json({ error: `Launch number not founded! ` })
  }

  const aborted = await abortLaunchById(launchId)

  if (!aborted) {
    return res.status(400).json({
      error: 'Launch not aborted'
    })
  }

  return res.status(200).json({
    ok: true
  })
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}