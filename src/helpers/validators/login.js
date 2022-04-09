const Joi = require('joi');

const schemaForm = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(3).max(15).required(),
});

const schemaEmail = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
});

function isLoginFormValid(email, password) {
    let result = schemaForm.validate({
        email: email,
        password: password,
    });

    if (!result.error) {
        return [!result.error, ""];
    }
    else {
        return [!result.error, result.error["message"]];
    }
}

function isEmailValid(email) {
    let result = schemaEmail.validate({
        email: email,
    });

    if (!result.error) {
        return [!result.error, ""];
    }
    else {
        return [!result.error, result.error["message"]];
    }
}

export { isLoginFormValid, isEmailValid };
