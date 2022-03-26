const Joi = require('joi');

const schemaForm = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(3).max(15).required(),
    passwordRepeat: Joi.any().equal(Joi.ref('password')).required(),
});

function isRegisterFormValid(name, email, password, passwordRepeat) {
    let result = schemaForm.validate({
        name: name,
        email: email,
        password: password,
        passwordRepeat: passwordRepeat,
    });

    return [!result.error, result.error];
}

export { isRegisterFormValid };
