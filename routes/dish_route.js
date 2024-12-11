const express = require('express')
const router = express.Router()
const upload = require('../middlewares/uploads');
const Dish = require('../models/Dish');
const dishController = require('../controllers/DishController')

// lấy danh sách món 
router.get('/dish/list',dishController.getAllDishes)

// Route thêm món ăn
router.post('/dish/add', upload.single('image'), dishController.addDish);

// Route ẩn món (Món tạm hết)
router.put('/dish/:id/hide', dishController.hideDish);

// Route lấy danh sách món tạm hết
router.get('/dish/hidden', dishController.getHiddenDishes);

// Khôi phục món
router.put('/dish/restore/:id', dishController.restoreDish);

// Hiển thị trang chỉnh sửa món
router.get('/dish/edit/:id', dishController.editDishPage);

// Xử lý cập nhật món
router.post('/dish/edit/:id', dishController.editDish);

module.exports = router