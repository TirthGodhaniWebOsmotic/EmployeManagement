const {getAllEmployeeService, createEmployeeService, deleteEmployeeService, getEmployeeByFilterService, updateEmployeeService, getEmployeeService, setCompanyIdService} = require("../employee/employee.service");
const {employeeValidationSchema} = require("./employeeValidation");
const {successResponse, errorResponse} = require("../common/responseUtils");

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
            const {error, value} = employeeValidationSchema.validate(req.body);
            if (error) {
                errorResponse(res, 400, error.message);
            }
            const result = await createEmployeeService(value);
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

}
