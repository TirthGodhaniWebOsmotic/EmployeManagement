const {getAllEmployeeService, createEmployeeService, deleteEmployeeService, getEmployeeByFilterService, updateEmployeeService, getEmployeeService, setCompanyIdService} = require("../employee/employee.service");
const {employeeValidationSchema} = require("./employeeValidation");
const {successResponse, errorResponse} = require("../common/responseUtils");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage }).single("user_profile");

module.exports = {
    getAllEmployeeList: async (req, res, next) => {
        try {
            const filters = {};
            let result;

            if (req.query.designation) {
                filters.designation = req.query.designation;
            }
            if (req.query.email) {
                filters.email = req.query.email;
            }
            if (req.query.firstName) {
                filters.firstName = req.query.firstName;
            }

            if (req.query.address) {
                filters.address = req.query.address;
            }

            if (Object.keys(filters).length === 0) {
                result = await getAllEmployeeService();
            } else {
                result = await getEmployeeByFilterService(filters);
            }
            successResponse(res, result, 200);
        } catch (err) {
            errorResponse(res, 400, err.message);
        }
    },
    createEmployee: async (req, res, next) => {
        try {
            if(!req.files) {
                errorResponse(res, 400, 'No File Upload');
            }
            const {error, value} = employeeValidationSchema.validate(req.body);
            if (error) {
                errorResponse(res, 400, error.message);
            }
            const payload  = {...value, employee_profile: req.files['employee_profile'][0]['path']}   
            const result = await createEmployeeService(payload);
            successResponse(res, result, 201);
        } catch (err) {
            errorResponse(res, 400, err.message);
        }
    },
    getEmployee: async (req, res, next) => {
        try {
            const employeeId = req.params.id;
            const result = await getEmployeeService(employeeId);
            successResponse(res, result, 200);
        } catch (err) {
            errorResponse(res, 400, err.message);
        }
    },
    deleteEmployee: async (req, res, next) => {
        try {
            const employeeId = req.params.id;
            const result = await deleteEmployeeService(employeeId);
            successResponse(res, result, 200);
        } catch (err) {
            errorResponse(res, 400, err.message);
        }
    },
    updateEmployee: async (req, res, next) => {
        try {
            const employeeId = req.params.id;
            const employeeUpdatedData = req.body;
            const result = await updateEmployeeService(employeeId, employeeUpdatedData);
            successResponse(res, result, 200);
        } catch (err) {
            errorResponse(res, 400, err.message);
        }
    },
    uploadEmployeeProfileImage: async (req, res, next) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                errorResponse(res, 500, err.message);
            } else if (err) {
                errorResponse(res, 500, err.message);
            } else {
                const fileName = req.file.originalname;
                successResponse(res, { message: 'File uploaded successfully' }, 200);
            }
        });
    }
}
