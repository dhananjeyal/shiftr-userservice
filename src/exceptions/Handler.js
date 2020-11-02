class ValidationError extends Error {
    constructor() {
        super();
    }

    // internal server error
    static internalServerErr(req, err) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | ${req.method} | Request : ${JSON.stringify(req.body ? req.body : {})} | Error : ${err.message}`);
        return 'Something went wrong. Please try again ' + err.message;
    }

    // unable to process
    static unableToProcess(req) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | ${req.method} | Request : ${JSON.stringify(req.body ? req.body : {})} | Error : unable to process request`);
        return 'unable to process request';
    }

    // Invalid request
    static badRequestErr(req, err) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | ${req.method} | Request : ${JSON.stringify(req.body ? req.body : {})} | Error : ${err.message}`);
        return 'Invalid request. ' + err.message;
    }

    // Unauthorized
    static unauthorizedErr(req, err) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | ${req.method} | Request : ${JSON.stringify(req.body ? req.body : {})} | Error : ${err.message}`);
        return 'Unauthorized access. ' + err.message;
    }

    //Login Failed
    static invalidLogin(req, err) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | ${req.method} | Request : ${JSON.stringify(req.body ? req.body : {})} | Error : ${err.message}`);
        return err.message;
    }

    // payment failed
    static paymentFailed(req) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | ${req.method} | Request : ${JSON.stringify(req.body ? req.body : {})} | Error : Payment Failed: Amount due`);
        return 'Payment Failed: Amount due';
    }
}

module.exports = ValidationError;
