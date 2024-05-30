const {companyModel} = require('../companies/company.model');
module.exports = {
    getAllCompaniesDao: async (pipeline) => {
        try {
            return await companyModel.aggregate(pipeline);
        } catch (err) {
            console.log(err)
        }
    },
    getCompanyDao: async (query) => {
        return companyModel.findOne(query);
    },
    createCompanyDao: async (query) => {
        return companyModel(query).save();
    },
    getCompanyByIdDao: async (query) => {
        return companyModel.findById(query);
    },
    deleteCompanyDao: async (id) => {
        return companyModel.findByIdAndDelete(id);
    },
    updateCompanyDao: async (id, data) => {
        const options = {new: true}
        return companyModel.findByIdAndUpdate(id, data, options);
    },
    getCompanyByFilterDao: async (query) => {
        console.log('query', query);
        return companyModel.find(query);
    },
}
