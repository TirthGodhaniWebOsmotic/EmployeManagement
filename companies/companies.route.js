const express = require('express');
const router = express.Router();
const companyController = require("../companies/companies.controller")
const {verifyAccessToken} = require('../Auth/jwt_helper');

router.get('/', verifyAccessToken, companyController.getAllCompaniesList);

router.post('/', verifyAccessToken, companyController.createCompany);

router.get('/:id', verifyAccessToken, companyController.getCompany);

router.delete('/:id', verifyAccessToken, companyController.deleteCompany);

router.patch('/:id', verifyAccessToken, companyController.updateCompany);

module.exports = router;
