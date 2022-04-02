const axios = require('axios').default;

async function assessTokenValidity(token) {
    try {
        let res = await axios({
            method: "GET",
            url: process.env.REACT_APP_BACKEND_URL + "/auth",
            headers: {
                "Authorization": "Bearer " + token,
            },
            validateStatus: () => true,
        });

        if (res.data.status) {
            return true;
        }
        else {
            return false;
        }
    }

    catch (err) {
        return false;
    }
}

export { assessTokenValidity };
