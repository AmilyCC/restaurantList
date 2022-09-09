const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const sortby = require('./modules/sortby')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/sortby', sortby)

module.exports = router