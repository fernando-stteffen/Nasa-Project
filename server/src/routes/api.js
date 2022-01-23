const express = require('express')

const planetsRouter = require('./planets/planets.router')
const launchsRouter = require('./launchs/launchs.router')

const api = express.Router()

api.use('/planets', planetsRouter)
api.use('/launches', launchsRouter)


module.exports = api