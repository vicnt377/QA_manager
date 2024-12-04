const express = require('express')
const router = express.Router()

const billController = require('../controllers/BillController')


router.get('/create',billController.index)


module.exports = router