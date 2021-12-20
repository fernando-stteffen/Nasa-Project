const express = require('express')

const launchsRouter = express.Router()
const { 
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
} = require('./launchs.controller')

launchsRouter.get('/', httpGetAllLaunches)
launchsRouter.post('/', httpAddNewLaunch)
launchsRouter.delete('/:id', httpAbortLaunch)

module.exports = launchsRouter