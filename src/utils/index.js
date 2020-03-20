import bcrypt from "bcryptjs";
import Response from "../responses/response";
import crypto from "crypto";
import moment from "moment";
import MD5 from 'md5'
import querystring from 'querystring'

module.exports = {
    logging: require('./logging'),
    errorHandler: require('./errorHandler'),
    genHash: function (data) {
        let salt = bcrypt.genSaltSync(8);
        return bcrypt.hashSync(data, salt)
    },
    mailer: require('./mailer'),
    validateFile: validateFile,
    genHmac256: (data) => {

        // let string = `GET\\996b9958c54363f99876844c6efc2ce8\\ntext/html\\n1569607203`;

        // let key = "02b6ce79-3ad4-4a5b-97c8-0b38d0899270"
        // let data = crypto.createHmac('sha256', key).update(string).digest("hex");
        // let buff = new Buffer(data);
        // let base64data = buff.toString('base64');

        // console.log(encodeURIComponent(base64data));
        // console.log("datadata",data);
        

        let md5Content = MD5(data)
        let currentTime = moment().unix()

        let string = `GET\\n${md5Content}\\ntext/html\\n${currentTime}`;
        let key = process.env.SC_API_KEY
        let hmac = crypto.createHmac('sha256', key).update(string).digest('hex');
        let buff = new Buffer(hmac);
        let base64data = buff.toString('base64');
        let encoded = encodeURIComponent(base64data)

        let querString = {
            'hmac': encoded,
            'hmac-date': currentTime
        }
        // console.log(querString);

        // console.log("########");
        // console.log(querystring.stringify(querString))
        
        
        return querystring.stringify(querString)
    }
};

function validateFile(req, res) {
    let files = req.files;
    if (files && files.length) {
        let details = [];
        if (files.errors) {
            req.files.errors.forEach((error) => {
                let file = error.file;
                details.push({
                    path: [file.fieldname],
                    message: error.reason
                })
            });
            Response.joierrors(req, res, {
                details: details,
            });
            return false;
        }

        if (Array.isArray(files)) {
            files.forEach((file) => {
                let holder = req.body;
                let filePath = file.fieldname.split(/\[(.*?)\]/)
                    .filter((item) => item ? item : null);
                filePath.forEach((item, index) => {
                    if (index + 1 === filePath.length) {
                        holder[item] = `${process.env.PUBLIC_UPLOAD_LINK1}/${file.path}`;
                    } else {
                        if (!holder[item]) {
                            holder[item] = {};
                        }
                        holder = holder[item];
                    }
                });
            });
        }
        return true;
    }
}
