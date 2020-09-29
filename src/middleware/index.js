import {pipe} from 'ramda';

// exporting the entire modules
module.exports = (app) => {
    return pipe(
        require('./cors'),
        require('./bodyParser'),
        require('./boom'),
        require('./helmet'),
        require('./logger'),
        require('./errorHandler'),
        require('./multer'),
        require('./swagger'),
    )(app);
};
