const {createEmployeeDao, deleteEmployeeDao, getAllEmployeeDao, getEmployeeByFilterDao, getEmployeeByIdDao, getEmployeeDao, updateEmployeeDao, setCompanyIdDao} = require('./employee.dao')

module.exports = {
    getAllEmployeeService: async () => {
        try {
            const pipeline = [
                {$sort: {firstName: 1}},
                {$addFields: {id: '$_id'}},
                {$skip: 0},
                {$limit: 15},
                {$project: {__v: 0, _id: 0}},
            ];
            return getAllEmployeeDao(pipeline);
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },

    createEmployeeService: async (payload) => {
        try {
            let employee = await getEmployeeDao({email: payload.email});
            if (employee) {
                throw {
                    status: 400,
                    message: 'Email/Name Already Exist..!'
                }
            }
            return await createEmployeeDao(payload);
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },

    getEmployeeService: async (id) => {
        try {
            let company = await getEmployeeByIdDao(id);
            if (!company) {
                throw {
                    status: 400,
                    message: 'Company not exist..!'
                }
            }
            return company;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },

    deleteEmployeeService: async (id) => {
        try {
            return await deleteEmployeeDao(id)
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },

    updateEmployeeService: async (id, data) => {
        try {
            // return await updateEmployeeDao(id, data);

            const updatedData = await updateEmployeeDao(id, data);
            console.log('Updated data:', updatedData); // Check if updatedData is received

            if (!updatedData) {
                throw new Error('Employee not found or could not be updated');
            }
            return updatedData; // Return the updated data
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },

    getEmployeeByFilterService: async (filters) => {
        try {
            let employee = await getEmployeeByFilterDao(filters);
            console.log('employee', !employee)
            if (!employee || !employee?.length) {
                throw {
                    status: 400,
                    message: 'Employee not exist..!'
                }
            }
            return employee;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },
}
