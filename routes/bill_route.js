const express = require('express')
const router = express.Router()

const billController = require('../controllers/BillController')
const dishController = require('../controllers/DishController')

router.get('/index', billController.index)
router.get('/create', billController.getCreateBillPage);
router.post('/create', billController.createBill);
router.get('/list', billController.getListBill);

module.exports = router