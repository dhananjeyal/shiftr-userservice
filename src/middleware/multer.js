import multer from 'multer'
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const filter = (req, res, file, cb) => {    
    if (path.extname(file.originalname).toLowerCase() === ".png" || path.extname(file.originalname).toLowerCase() === ".jpg" || path.extname(file.originalname).toLowerCase() === ".jpeg") {
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

module.exports = (app) => {
    app.use(function (req, res, next) {
        req.files = {};
        multer({
            storage: storage,
            fileFilter: (req, file, cb) => filter(req, res, file, cb),
            limits: { fileSize: 10000000 },
        }).any()(req, res, next);
    });

    return app;
};

