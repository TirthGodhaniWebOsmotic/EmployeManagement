const express = require('express');
const router = express.Router();
const employeeController = require("../employee/employee.controller")
const {verifyAccessToken} = require('../Auth/jwt_helper');
const {multerError, upload} = require('../utils/multerConfig');

router.get('/', verifyAccessToken, employeeController.getAllEmployeeList);

router.post('/', upload.fields([{name: 'employee_profile', maxCount: 1}]), multerError, verifyAccessToken, employeeController.createEmployee);

router.get('/:id', verifyAccessToken, employeeController.getEmployee);

router.delete('/:id', verifyAccessToken, employeeController.deleteEmployee);

router.patch('/:id', verifyAccessToken, employeeController.updateEmployee);

router.post('/upload', verifyAccessToken ,employeeController.uploadEmployeeProfileImage);

module.exports = router;
