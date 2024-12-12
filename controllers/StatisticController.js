const Bill = require('../models/Bill');

class StatisticController {
    async showIncome(req, res, next){
        res.render('stats')
    }

    async dailyIncome(req, res, next) {
        try {
            const stats = await Bill.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        totalIncome: { $sum: "$totalAmount" },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } } // Sắp xếp theo ngày tăng dần
            ]);
            res.json(stats);
        } catch (err) {
            res.status(500).json({ error: 'Lỗi khi lấy thống kê thu nhập' });
        }
    }
}

module.exports = new StatisticController();
