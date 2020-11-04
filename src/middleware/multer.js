const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
console.log(uuidv4());
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY, // ,
    accessKeyId: process.env.AWS_ACCESS_KEY, // process.env.ACCESS_KEY,
    region: process.env.AWS_REGION, // process.env.REGION
    signatureVersion: "v4"
})

let storage = multer.diskStorage({ // local Storage
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

if (true && process.env.AWS_SECRET_KEY) {
    console.log("ProductionS3");
    const s3 = new aws.S3()
    storage = multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        // acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            let folder = "uploads";
            cb(null, `${folder}/${uuidv4().split('-').join('') + path.extname(file.originalname)}`);
        },

    })
}

const filter = (req, res, file, cb) => {
    const formats = ['.png', '.jpg', '.jpeg', '.svg', '.pdf']
    if (formats.includes(path.extname(file.originalname).toLowerCase())) {
        cb(null, true);
    } else {
        cb(null, false);
        if (!req.files.errors) {
            req.files.errors = [];
        }
        req.files.errors.push({
            file,
            reason: "Invalid file type."
        });
    }
};

function validateFile(req, res, next) {
    req.files = {}
    return new Promise((resolve, reject) => {
        multer({
            storage: storage,
            fileFilter: (req, file, cb) => filter(req, res, file, cb),
            limits: { fileSize: 10000000 },
        }).any()(req, res, (err) => {
            if (err && err.message) {
                err.status = 400;
                reject(next(err));
            }
            else {
                let files = req.files;
                if (files && (files.length || typeof files === 'object')) {
                    let details = [];
                    if (files.errors) {
                        req.files.errors.forEach((error) => {
                            let file = error.file;
                            details.push({
                                path: [file.fieldname],
                                message: error.reason
                            })
                        });

                        const data = details.reduce((prev, curr) => {
                            prev[curr.path[0]] = curr.message.replace(/"/g, "");
                            return prev;
                        }, {});
                        let msg = Object.values(data).length ? Object.values(data).join(', ') : "bad request";
                        let err = new Error(msg)
                        err.status = 400
                        reject(next(err));
                    }

                    if (Array.isArray(files)) {
                        files.forEach((file) => {
                            let holder = req.body;
                            let filePath = file.fieldname.split(/\[(.*?)\]/)
                                .filter((item) => item ? item : null);
                            filePath.forEach((item, index) => {
                                if (index + 1 === filePath.length) {
                                    if (true) holder[item] = file.location
                                    else holder[item] = `${process.env.PUBLIC_UPLOAD_LINK1}${file.destination.replace('.', '')}${file.filename}`;
                                } else {
                                    if (!holder[item]) {
                                        holder[item] = {};
                                    }
                                    holder = holder[item];
                                }
                            });
                        });
                    }
                    if (Object.entries(files).length) resolve(true);
                    else resolve(false)
                }
            }
        });
    })

}


module.exports = {
    validateFile: validateFile,
    s3GetSignedURL: async (key) => {
        let isKey = key.split('.')[0];
        if (isKey && isKey.length == 32) {
            const s3 = new aws.S3();
            return s3.getSignedUrl("getObject", {
                Bucket: `${process.env.AWS_BUCKET}/uploads`,
                Key: key,
                Expires: 86400
            });
        } else {
            return key
        }
    },
};