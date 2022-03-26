const Joi = require('joi');

const schemaForm = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const schemaEmail = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});

function isLoginFormValid(email, password) {
    let result = schemaForm.validate({
        email: email,
        password: password,
    });

    return !result.error;
}

function isEmailValid(email) {
    let result = schemaEmail.validate({
        email: email,
    });

    return !result.error;
}

export { isLoginFormValid, isEmailValid };
