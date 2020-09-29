import axios from 'axios';

export const newAxios = (req, res, option) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        const client = axios.create({
            headers: {
                'authorization': token
            },
            json: true
        });
        return client(option).catch(function (error) {
            return Promise.reject(error);
        });
    } else {
        let error = new Error("Authorization token is required!");
        error.code = 401;
        return Promise.reject(error);
    }
};
