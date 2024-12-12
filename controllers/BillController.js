const Bill = require('../models/Bill');
const Dish = require('../models/Dish');
const { mutipleMongooseToOject } = require('../src/util/mongoose')

const { utcToZonedTime, format } = require('date-fns-tz');


class BillController{
    
    index(req, res, next){
        res.render('bill')
    }

    async getCreateBillPage(req, res, next) {
        Dish.find({ isHidden: false})
            .then(dishes => {
                // Chuyển đổi từ Mongoose object sang Object JavaScript thông thường
                dishes = dishes.map(dish => dish.toObject());
                res.render('create_bill', { dishes });
            })
            .catch(next);
    }

    async createBill(req, res, next) {
        try {
            const { tableNumber, items } = req.body;
    
            // Lấy thông tin món ăn từ cơ sở dữ liệu
            const dishes = await Dish.find({ '_id': { $in: items.map(item => item.dish) } });
    
            // Tính tổng tiền
            let totalAmount = 0;
            items.forEach(item => {
                const dish = dishes.find(d => d._id.toString() === item.dish);
                if (dish) {
                    totalAmount += dish.price * item.quantity;
                }
            });
    
            // Tạo hóa đơn mới
            const newBill = new Bill({
                tableNumber,
                items,
                totalAmount
            });
    
            // Lưu hóa đơn vào cơ sở dữ liệu
            await newBill.save();
    
            // Lấy hóa đơn vừa tạo kèm thông tin món ăn
            const populatedBill = await Bill.findById(newBill._id).populate('items.dish');

            // Render view hiển thị hóa đơn vừa tạo
            res.render('bill', { bill: populatedBill.toObject() });
    
        } catch (error) {
            next(error); // Chuyển lỗi vào middleware xử lý lỗi
        }
    }
    

    async getListBill(req, res, next) {
        try {
            // Sử dụng populate để lấy dữ liệu món ăn từ bảng Dish
            const bills = await Bill.find().populate('items.dish'); // Chỉ cần gọi một lần
    
            // Chuyển đổi từ Mongoose object sang Object JavaScript thông thường
            const billsList = bills.map(bill => bill.toObject());
    
            // Render giao diện với danh sách hóa đơn
            res.render('bill_list', { bills: billsList });
        } catch (error) {
            next(error);  // Nếu có lỗi, chuyển sang middleware xử lý lỗi
        }
    }

    async showBillDetail(req, res, next) {
        try {
            const billId = req.params.id; // Lấy ID hóa đơn từ URL
            const bill = await Bill.findById(billId).populate('items.dish'); // Tìm hóa đơn và populate các món ăn
    
            if (!bill) { // Kiểm tra nếu hóa đơn không tồn tại
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy hóa đơn!'
                });
            }
    
            // Chuyển đối tượng Mongoose thành plain object
            const billData = bill.toObject();
            
            console.log("Bill Data: ", billData); // Kiểm tra dữ liệu hóa đơn trả về

            // Render view với thông tin hóa đơn
            res.render('bill_detail', { bill: billData });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy chi tiết hóa đơn!'
            });
        }
    }
    
    
    
}

module.exports = new BillController();
