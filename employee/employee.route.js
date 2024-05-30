const express = require('express');
const router = express.Router();
const employeeController = require("../employee/employee.controller")
const {verifyAccessToken} = require('../Auth/jwt_helper');

router.get('/', verifyAccessToken, employeeController.getAllEmployeeList);

router.post('/', verifyAccessToken, employeeController.createEmployee);

router.get('/:id', verifyAccessToken, employeeController.getEmployee);

router.delete('/:id', verifyAccessToken, employeeController.deleteEmployee);

router.patch('/:id', verifyAccessToken, employeeController.updateEmployee);

module.exports = router;
