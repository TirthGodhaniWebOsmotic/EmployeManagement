const {getAllCompaniesService, createCompanyService, getCompanyService, deleteCompanyService, updateCompanyService, getCompaniesByFilterService} = require("../companies/companies.service");
const {companyValidationSchema} = require("./companyValidation");
const {successResponse, errorResponse} = require("../common/responseUtils");
module.exports = {
    getAllCompaniesList: async (req, res, next) => {
        try {
            const filters = {};
            let result;
            // Filter by name
            if (req.query.name) {
                filters.name = req.query.name;
            }
            if (req.query.status) {
                filters.status = req.query.status;
            }
            if (req.query.email) {
                filters.email = req.query.email;
            }
            if (req.query.address) {
                filters.address = req.query.address;
            }


            if (Object.keys(filters).length === 0) {
                result = await getAllCompaniesService();
            } else {
                console.log('filters ==>', filters)
                result = await getCompaniesByFilterService(filters);
            }
            console.log('result ==>', result);
            successResponse(res, result, 200);
        } catch (err) {
            errorResponse(res, 400, err.message);
        }
    },
    createCompany: async (req, res, next) => {
        try {
            const {error, value} = companyValidationSchema.validate(req.body);
            if (error) {
                errorResponse(res, 400, error.message);
            }
            const result = await createCompanyService(value);
            successResponse(res, result, 201);
        } catch (err) {
            errorResponse(res, 400, err.message);
        }
    },
    getCompany: async (req, res, next) => {
        try {
            const companyId = req.params.id;
            const result = await getCompanyService(companyId);
            successResponse(res, result, 200);
        } catch (err) {
            errorResponse(res, 400, err.message);
        }
    },
    deleteCompany: async (req, res, next) => {
        try {
            const companyId = req.params.id;
            const result = await deleteCompanyService(companyId);
            successResponse(res, result, 200);
        } catch (err) {
            errorResponse(res, 400, err.message);
        }
    },
    updateCompany: async (req, res, next) => {
        try {
            const companyId = req.params.id;
            const companyUpdatedData = req.body;
            const result = await updateCompanyService(companyId, companyUpdatedData);
            successResponse(res, result, 200);
        } catch (err) {
            errorResponse(res, 400, err.message);
        }
    }
}
