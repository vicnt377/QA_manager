const express = require('express')
const router = express.Router()

const employeeController = require('../controllers/EmployeeController')

// Hiển thị danh sách nhân viên
router.get('/employee/list',employeeController.getAllEmployees)

// Thêm nhân viên mới
router.post('/employee/add', employeeController.addEmployee);

// Route ẩn nhân viên
router.put('/employee/:id/hide', employeeController.hideEmployee);

// Route lấy danh sách nhân viên ẩn
router.get('/employee/hidden', employeeController.getHiddenEmployees);

// Khôi phục nvien
router.put('/employee/restore/:id', employeeController.restoreEmployee);

// Hiển thị trang chỉnh sửa nhân viên
router.get('/employee/edit/:id', employeeController.editEmployeePage);

// Xử lý cập nhật nhân viên
router.post('/employee/edit/:id', employeeController.editEmployee);

module.exports = router