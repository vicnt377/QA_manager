const express = require('express')
const router = express.Router()

const employeeController = require('../controllers/EmployeeController')

// Hiển thị danh sách nhân viên
router.get('/list',employeeController.getAllEmployees)

// Thêm nhân viên mới
router.post('/add', employeeController.addEmployee);

// Route ẩn nhân viên
router.put('/:id/hide', employeeController.hideEmployee);

// Route lấy danh sách nhân viên ẩn
router.get('/hidden', employeeController.getHiddenEmployees);

// Khôi phục nvien
router.put('/restore/:id', employeeController.restoreEmployee);

// // Hiển thị trang chỉnh sửa nhân viên
// router.get('/edit/:id', employeeController.editEmployeePage);

// Xử lý cập nhật nhân viên
// router.post('/edit/:id', employeeController.editEmployee);


module.exports = router