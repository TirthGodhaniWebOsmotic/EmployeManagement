const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const {verifyAccessToken} = require('../Auth/jwt_helper');

// Register
router.post('/register', authController.registerUser);

// Login
router.post('/login', authController.loginUser);

// Refresh Token API
router.get('/refresh-token', verifyAccessToken, authController.refreshToken);

module.exports = router;
