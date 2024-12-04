const express = require('express')
const router = express.Router()

const dishController = require('../controllers/DishController')


router.get('/dish',dishController.index)


module.exports = router