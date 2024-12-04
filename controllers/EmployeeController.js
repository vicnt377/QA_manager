const Employee = require('../models/Employee');
const { mutipleMongooseToOject } = require('../src/util/mongoose');

class EmployeeController {
    // Lấy tất cả nhân viên không bị ẩn
    getAllEmployees(req, res, next) {
        Employee.find({ isBlocked: false})
            .then(employees => {
                // Chuyển đổi từ Mongoose object sang Object JavaScript thông thường
                employees = employees.map(employee => employee.toObject());
                res.render('employee', { employees });
            })
            .catch(next);
    }

    // Thêm nhân viên
    addEmployee(req, res, next) {
        const { name, email, position } = req.body;
        if (!name || !email || !position) {
            return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
        }
    
        const newEmployee = new Employee({ name, email, position, isBlocked: false });
        newEmployee.save()
            .then(() => res.redirect('/employee/list'))
            .catch(err => {
                console.error('Lỗi khi thêm nhân viên:', err);
                res.status(500).json({ error: 'Không thể thêm nhân viên' });
            });
    }

    // Ẩn nhân viên
    async hideEmployee(req, res, next) {
        try {
            const employeeId = req.params.id; // Lấy ID từ route params
            const employee = await Employee.findByIdAndUpdate(
                employeeId,
                { isBlocked: true }, // Cập nhật trạng thái ẩn
                { new: true }       // Trả về document sau khi cập nhật
            );

            if (!employee) {
                return res.status(404).send('Nhân viên không tồn tại')
            }

            res.redirect('/employee/list')
        } catch (error) {
            next(error);
        }
    }

    // Hiển thị danh sách nhân viên ẩn
    async getHiddenEmployees(req, res, next) {
        try {
            const hiddenEmployees = await Employee.find({ isBlocked: true })
            const employees = hiddenEmployees.map(employee => employee.toObject())
            res.render('employee_hidden', { employees })
        } catch (error) {
            next(error)
        }
    }

    // Khôi phục nhân viên đã ẩn
    async restoreEmployee(req, res, next) {
        try {
            const employeeId = req.params.id; // Lấy ID nhân viên từ URL
            const employee = await Employee.findByIdAndUpdate(
                employeeId,
                { isBlocked: false }, // Đặt isBlocked về false để khôi phục
                { new: true }         // Trả về document sau khi cập nhật
            );
    
            if (!employee) {
                return res.status(404).send('Nhân viên không tồn tại');
            }
    
            res.redirect('/employee/hidden'); // Chuyển hướng về danh sách nhân viên ẩn
        } catch (error) {
            next(error);
        }
    }

    // Chỉnh sửa nhân viên
    // async editEmployee(req, res, next) {
    //     try {
    //         const employeeId = req.params.id;
    //         const updatedData = req.body;
            
    //         // Cập nhật nhân viên
    //         const employee = await Employee.findByIdAndUpdate(employeeId, updatedData, { new: true });
    
    //         // Nếu không tìm thấy nhân viên
    //         if (!employee) {
    //             return res.status(404).send('Nhân viên không tồn tại');
    //         }
    
    //         // Nếu muốn hiển thị lại danh sách nhân viên sau khi cập nhật
    //         const employees = await Employee.find({}); // Lấy lại danh sách tất cả nhân viên
    //         const employeeList = employees.map(emp => emp.toObject()); // Chuyển tất cả nhân viên thành object
    //         res.render('employee_list', { employees: employeeList });
    
    //     } catch (error) {
    //         next(error);
    //     }
    //}
    
    
}

module.exports = new EmployeeController();
