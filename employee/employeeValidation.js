const Joi = require('joi');

const employeeValidationSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.base': `"First Name" should be a type of 'text'`,
        'string.empty': `"First Name" cannot be an empty field`,
        'any.required': `"First Name" is a required field`
    }),
    lastName: Joi.string().required().messages({
        'string.base': `"Last Name" should be a type of 'text'`,
        'string.empty': `"Last Name" cannot be an empty field`,
        'any.required': `"Last Name" is a required field`
    }),
    email: Joi.string().email().required().lowercase().messages({
        'string.base': `"Email" should be a type of 'text'`,
        'string.empty': `"Email" cannot be an empty field`,
        'any.required': `"Email" is a required field`
    }),
    password: Joi.required().messages({
        'string.empty': `"Password" cannot be an empty field`,
        'any.required': `"Password" is a required field`
    }),
    designation: Joi.string().valid('MANAGER', 'TEAM_LEADER', 'DEVELOPER').required(),
    companyId: Joi.string().optional(),
    isVerified: Joi.boolean().required()
});

module.exports = {employeeValidationSchema};
