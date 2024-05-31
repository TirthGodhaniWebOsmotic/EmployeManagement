const {getAllCompaniesDao, getCompanyDao, createCompanyDao, getCompanyByIdDao, deleteCompanyDao, updateCompanyDao, getCompanyByFilterDao} = require('./companies.dao')

module.exports = {
    getAllCompaniesService: async () => {
        try {
            const pipeline = [
                {$sort: {name: 1}},
                {$addFields: {id: '$_id'}},
                {$skip: 0},
                {$limit: 5},
                {$project: {__v: 0, _id: 0}},
            ];
            return getAllCompaniesDao(pipeline);
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },

    createCompanyService: async (payload) => {
        try {
            let company = await getCompanyDao({email: payload.email});
            if (company) {
                throw {
                    status: 400,
                    message: 'Email/Name Already Exist..!'
                }
            }
            return await createCompanyDao(payload);
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },

    getCompanyService: async (id) => {
        try {
            let company = await getCompanyByIdDao(id);
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

    deleteCompanyService: async (id) => {
        try {
            return await deleteCompanyDao(id)
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },

    updateCompanyService: async (id, data) => {
        try {
            return await updateCompanyDao(id, data);
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    },

    getCompaniesByFilterService: async (filters) => {
        try {
            let company = await getCompanyByFilterDao(filters);
            // console.log('company', !company)
            if (!company || !company?.length) {
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
}
