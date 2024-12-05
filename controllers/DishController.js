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
            const { name, description, price } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : ''; // Lấy đường dẫn file ảnh
    
            const newDish = new Dish({ name, category, price, image });
            await newDish.save();
    
            res.redirect('/dish/list');
        } catch (error) {
            next(error);
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
    async editDishPage(req, res, next) {}

    // Cập nhật món
    async editDish(req, res, next) {}
    
}

module.exports = new DishController();
