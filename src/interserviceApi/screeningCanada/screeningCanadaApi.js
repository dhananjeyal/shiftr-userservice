import request from 'request'
import querystring from 'querystring'
import { resolve } from 'url';
import { screeningcanadastatus } from "../../constants";
const BASEURL = process.env.SC_BASEURL
const GRANT_TYPE = process.env.SC_GRANT_TYPE
const CLIENT_ID = process.env.SC_CLIENT_ID
const CLIENT_SECRET = process.env.SC_CLIENT_SECRET

const REDIRECTURL = process.env.SC_REDIRECT_URL
// const WEBHOOK_URL = process.env.WEBHOOK_URL;
const SEARCHES = JSON.parse(process.env.SC_SEARCHES)

class ScreeningCanada {
    getToken = async () => {
        try {
            const URL = `${BASEURL}/connect/token`
            let formData = querystring.stringify({
                grant_type: GRANT_TYPE,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            })
            let obj = {
                uri: URL,
                form: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json'
                },
                method: 'POST'
            }

            return this.requestTo(obj)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    createFiles = async (req, token) => {
        try {
            let formObj = {
                // "clientId": CLIENT_ID, //without client(POD client) id as a individually can do
                "candidate": {
                    "firstName": req.user.firstName,
                    "lastName": req.user.lastName,
                    // "dateOfBirth": null,
                    "redirectUrl": `${REDIRECTURL}/or1.0/v1/driver/sc_redirect_url?token=${token}`,
                    "contactInfo": {
                        "email": req.user.emailId
                    }
                },
                "searches": SEARCHES.map(x => ({
                    "id": x,
                    "searchData": {}
                }))
            }

            const URL = `${BASEURL}/v1.1/files`

            let authToken = await this.getToken()

            if (authToken) {
                let { token_type, access_token } = JSON.parse(authToken.data)
                authToken = `${token_type} ${access_token}`

                let obj = {
                    url: URL,
                    json: formObj,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': authToken
                    },
                    method: 'POST'
                }

                return this.requestTo(obj)
            }

        } catch (error) {
            console.log(error);

            throw new Error(error.message)
        }
    }



    /**
     * @DESC: screening canada results update
     * @param : string/integer
     * @response: array/json
     */

    fileDetails = async (req, res) => {
        try {
            // var resultData = this.webhookscallback(req, res)

            var _this = this;
            const URL = `${BASEURL}/v1.1/files/`
            let authToken = await this.getToken();

            if (authToken && req.event == screeningcanadastatus.FILE_COMPLETED) {

                let { token_type, access_token } = JSON.parse(authToken.data)
                authToken = `${token_type} ${access_token}`

                let obj = {
                    url: URL + `${req.fileId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': authToken
                    },
                    method: 'GET'
                }

                return this.requestTo(obj);
            }

    } catch(error) {
        console.log(error);

        throw new Error(error.message)
    }
}



/**
 * @DESC: screening canada - Webhooks Results
 * @param : string/integer
 * @response: array/json
 */
webhookscallback = async (req, res) => {
    try {

        // https://webhook.site/#!/96fd3aa0-c547-4e85-8c28-f08cc271a696/b01e31f3-e95f-4f67-8be8-963a0d72f737/1

        let { token_type, access_token } = JSON.parse(authToken.data)
        authToken = `${token_type} ${access_token}`

        let obj = {
            url: WEBHOOK_URL,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': authToken
            },
            method: 'GET'
        }

        return this.requestTo(obj);


    } catch (error) {
        console.log(error);

        throw new Error(error.message)
    }
}



requestTo = async (obj) => {
    console.log(obj);

    return new Promise((resolve, reject) => {
        request(obj, function (error, response, body) {
            // console.log(body);

            if (body) {
                resolve({
                    success: true,
                    data: body
                });
            } else {
                console.log(error);

                reject({
                    success: error
                });
            }
        })
    })
}

}
module.exports = new ScreeningCanada();