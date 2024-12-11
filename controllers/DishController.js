const Dish = require('../models/Dish');
const { mutipleMongooseToOject } = require('../src/util/mongoose');

class DishController{
    // Lấy tất cả món không bị ẩn
    getAllDishes(req, res, next) {
        Dish.find({ isHidden: false})
            .then(dishes => {
                // Chuyển đổi từ Mongoose object sang Object JavaScript thông thường
                dishes = dishes.map(dish => dish.toObject());
                res.render('dish', { dishes });
            })
            .catch(next);
    }

    // Thêm món
    async addDish(req, res, next) {
        try {
            const { name, price, description } = req.body;
    
            // Kiểm tra file ảnh
            // if (!req.file) {
            //     return res.status(400).send('Vui lòng tải lên ảnh món ăn.');
            // }
    
            // Tạo món ăn mới
            const newDish = new Dish({
                name,
                price,
                description
            });
    
            await newDish.save(); // Lưu vào database
            res.redirect('/dish/list'); // Chuyển hướng sau khi thêm thành công
        } catch (error) {
            next(error); // Xử lý lỗi
        }
    }
    


    // Ẩn món (Món tạm hết)
    async hideDish(req, res, next) {
        try {
            const dishId = req.params.id;
            const dish = await Dish.findByIdAndUpdate(
                dishId,
                { isHidden: true },
                { new: true }
            );

            if (!dish) {
                return res.status(404).send('Món không tồn tại')
            }

            res.redirect('/dish/list')
        } catch (error) {
            next(error);
        }
    }

    // Hiển thị danh sách món tạm hết
    async getHiddenDishes(req, res, next) {
        try {
            const hiddenDishes = await Dish.find({ isHidden: true })
            const dishes = hiddenDishes.map(dish => dish.toObject())
            res.render('dish_hidden', { dishes })
        } catch (error) {
            next(error)
        }
    }

    // Khôi phục món tạm hết
    async restoreDish(req, res, next) {
        try {
            const dishId = req.params.id; 
            const dish = await Dish.findByIdAndUpdate(
                dishId,
                { isHidden: false },
                { new: true }
            );
    
            if (!dish) {
                return res.status(404).send('Món không tồn tại');
            }
    
            res.redirect('/dish/hidden');
        } catch (error) {
            next(error);
        }
    }

    // Hiển thị trang chỉnh sửa món
    async editDishPage(req, res, next) {
        try {
            const dishId = req.params.id;
            const dish = await Dish.findById(dishId);
            if (!dish) {
                return res.status(404).send('Món ăn không tồn tại.');
            }
            res.render('dish_edit', { dish: dish.toObject() });
        } catch (error) {
            next(error);
        }
    }

    // Cập nhật món
    async editDish(req, res, next) {
        try {
            const dishId = req.params.id;
            const { name, price, description } = req.body;

            // Cập nhật thông tin món ăn
            await Dish.findByIdAndUpdate(dishId, { name, price, description });

            // Chuyển hướng về danh sách món ăn
            res.redirect('/dish/list');
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new DishController();
