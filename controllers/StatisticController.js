const Bill = require('../models/Bill');

class StatisticController {
    async showIncome(req, res, next){
        res.render('stats')
    }

    async dailyIncome(req, res, next) {
        try {
            // Lấy dữ liệu hóa đơn, nhóm theo ngày
            const dailyStats = await Bill.aggregate([
                {
                    // Nhóm theo ngày
                    $group: {
                        _id: {
                            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                        },
                        totalIncome: { $sum: "$totalAmount" }, // Tổng thu nhập trong ngày
                        count: { $sum: 1 } // Số hóa đơn trong ngày
                    }
                },
                { $sort: { _id: 1 } } // Sắp xếp theo ngày (tăng dần)
            ]);

            // Trả kết quả
            res.status(200).json({
                success: true,
                data: dailyStats
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Lỗi server khi thống kê thu nhập"
            });
        }
    }
}

module.exports = new StatisticController();
