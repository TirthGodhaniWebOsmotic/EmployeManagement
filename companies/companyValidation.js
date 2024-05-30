const Joi = require('joi');

const companyValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': `"Name" should be a type of 'text'`,
        'string.empty': `"Name" cannot be an empty field`,
        'any.required': `"Name" is a required field`
    }),
    email: Joi.string().email().required().lowercase().messages({
        'string.base': `"Email" should be a type of 'text'`,
        'string.empty': `"Email" cannot be an empty field`,
        'any.required': `"Email" is a required field`
    }),
    address: Joi.object({
        line1: Joi.string().required().messages({
            'string.empty': `"Address" cannot be an empty field`,
            'any.required': `"Address" is a required field`
        }),
        line2: Joi.string(),
        city: Joi.string().required().messages({
            'string.empty': `"City" cannot be an empty field`,
            'any.required': `"City" is a required field`
        }),
        state: Joi.string().required().messages({
            'string.empty': `"State" cannot be an empty field`,
            'any.required': `"State" is a required field`
        }),
        country: Joi.string().required().messages({
            'string.empty': `"Country" cannot be an empty field`,
            'any.required': `"Country" is a required field`
        }),
        zip: Joi.number().required().messages({
            'string.empty': `"Zip code" cannot be an empty field`,
            'any.required': `"Zip code" is a required field`
        }),
    }),
    contact: Joi.number().required().min(1000000000).max(9999999999).messages({
        'string.base': `"Contact" should be a type of 'number'`,
        'string.empty': `"Contact" cannot be an empty field`,
        'any.required': `"Contact" is a required field`,
        'string.min': `"Contact" should have a minimum length of 10 characters`,
        'string.max': `"Contact" should have a maximum length of 10 characters`
    }),
    status: Joi.string().valid('ACTIVE', 'INACTIVE').required()
});

module.exports = {companyValidationSchema};
