const Joi = require('joi');

const schemaForm = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(3).max(15).required().label('Password'),
    passwordRepeat: Joi.any().equal(Joi.ref('password')).required().label('Confirmation').messages({ 'any.only': '{{#label}} does not match' }),
});

function isRegisterFormValid(name, email, password, passwordRepeat) {
    let result = schemaForm.validate({
        name: name,
        email: email,
        password: password,
        passwordRepeat: passwordRepeat,
    });

    if (!result.error) {
        return [!result.error, ""];
    }
    else {
        return [!result.error, result.error["message"]];
    }
}

export { isRegisterFormValid };
