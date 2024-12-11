const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/StatisticController');

// API thống kê thu nhập mỗi ngày
router.get('/income', statisticController.showIncome);
router.get('/daily-income', statisticController.dailyIncome);

module.exports = router;
