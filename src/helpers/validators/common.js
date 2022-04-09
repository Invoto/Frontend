const Joi = require('joi');

const schemaSubscribeEmail = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
});

function isSubscribeEmailValid(email) {
    let result = schemaSubscribeEmail.validate({
        email: email,
    });

    if (!result.error) {
        return [!result.error, ""];
    }
    else {
        return [!result.error, result.error["message"]];
    }
}

export { isSubscribeEmailValid };
