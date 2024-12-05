const express = require('express')
const router = express.Router()
const upload = require('../middlewares/uploads');

const dishController = require('../controllers/DishController')

// lấy danh sách món 
router.get('/list',dishController.getAllDishes)

// Route thêm món ăn
router.post('/dish/add', upload.single('image'), dishController.addDish);

// Route ẩn món (Món tạm hết)
router.put('/:id/hide', dishController.hideDish);

// Route lấy danh sách món tạm hết
router.get('/hidden', dishController.getHiddenDishes);

// Khôi phục món
router.put('/restore/:id', dishController.restoreDish);

// Hiển thị trang chỉnh sửa món
router.get('/edit/:id', dishController.editDishPage);

// Xử lý cập nhật món
router.post('/edit/:id', dishController.editDish);

module.exports = router