const express = require('express')
const router = express.Router()
const billController = require('../controllers/BillController')

router.get('/', billController.getCreateBillPage);
router.get('/bill/issued', billController.index)
router.get('/bill/create', billController.getCreateBillPage);
router.post('/bill/create', billController.createBill);
router.get('/bill/list', billController.getListBill);
router.get('/bill/detail/:id', billController.showBillDetail);

module.exports = router