import bcrypt from "bcryptjs";
import Response from "../responses/response";

module.exports = {
    logging: require('./logging'),
    errorHandler: require('./errorHandler'),
    genHash: function (data) {
        let salt = bcrypt.genSaltSync(8);
        return bcrypt.hashSync(data, salt)
    },
    mailer: require('./mailer'),
    validateFile: validateFile
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
