const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address']
    },
    address: {
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        }
    },
    contact: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        required: true
    }
});

const companyModel = mongoose.model('companies', companySchema);

module.exports = {companyModel};
