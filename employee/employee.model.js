const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address']
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum: ["MANAGER", "TEAM_LEADER", "DEVELOPER"],
        required: true
    },
    companyId: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        required: true
    }
});

const employeeModel = mongoose.model('employee', employeeSchema);

module.exports = {employeeModel};
