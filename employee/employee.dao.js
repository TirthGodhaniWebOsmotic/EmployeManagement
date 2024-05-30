const {employeeModel} = require('../employee/employee.model');
module.exports = {
    getAllEmployeeDao: async (pipeline) => {
        try {
            return await employeeModel.aggregate(pipeline);
        } catch (err) {
            console.log(err)
        }
    },
    getEmployeeDao: async (query) => {
        return employeeModel.findOne(query);
    },
    createEmployeeDao: async (query) => {
        return employeeModel(query).save();
    },
    getEmployeeByIdDao: async (query) => {
        return employeeModel.findById(query);
    },
    deleteEmployeeDao: async (id) => {
        return employeeModel.findByIdAndDelete(id);
    },
    updateEmployeeDao: async (id, data) => {
        const options = {new: true}
        return employeeModel.findByIdAndUpdate(id, data, options);
    },
    getEmployeeByFilterDao: async (query) => {
        console.log('query', query);
        return employeeModel.find(query);
    },
}
