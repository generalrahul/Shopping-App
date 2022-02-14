const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        isSeller: Joi.boolean().required(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(data)
};

module.exports.registerValidation = registerValidation;