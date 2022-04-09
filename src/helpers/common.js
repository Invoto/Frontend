import { isSubscribeEmailValid } from "../helpers/validators/common";

const axios = require('axios').default;

function subscribeToMailingList(email, onSuccess, onFailure) {
    const params = new URLSearchParams();
    params.append("email", email);

    let vdResults = isSubscribeEmailValid(email);

    if (!vdResults[0]) {
        onFailure(vdResults[1]);
    }
    else {
        axios({
            method: "POST",
            baseURL: process.env.REACT_APP_BACKEND_URL,
            url: "/public/subscribe",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: params,
            validateStatus: () => true,
        }).then((response) => {
            if (response.data.status) {
                onSuccess();
            }
            else {
                onFailure({
                    message: response.data.message,
                });
            }
        }).catch((error) => {
            onFailure(error);
        });
    }
}

export { subscribeToMailingList };
