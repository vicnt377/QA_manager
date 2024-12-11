const express = require('express')
const router = express.Router()
const billController = require('../controllers/BillController')

router.get('/bill/issued', billController.index)
router.get('/', billController.getCreateBillPage);
router.get('/bill/create', billController.getCreateBillPage);
router.post('/bill/create', billController.createBill);
router.get('/bill/list', billController.getListBill);

module.exports = router