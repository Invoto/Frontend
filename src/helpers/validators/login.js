const Joi = require('joi');

const schemaForm = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(3).max(15).required(),
});

const schemaEmail = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
});

function isLoginFormValid(email, password) {
    let result = schemaForm.validate({
        email: email,
        password: password,
    });

    return [!result.error, result.error];
}

function isEmailValid(email) {
    let result = schemaEmail.validate({
        email: email,
    });

    return [!result.error, result.error];
}

export { isLoginFormValid, isEmailValid };
