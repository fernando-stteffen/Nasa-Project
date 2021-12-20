const express = require('express')

const launchsRouter = express.Router()
const { 
  httpGetAllLaunches,
  httpAddNewLaunch
} = require('./launchs.controller')

launchsRouter.get('/', httpGetAllLaunches)
launchsRouter.post('/', httpAddNewLaunch)

module.exports = launchsRouter