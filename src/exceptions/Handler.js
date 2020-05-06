class ValidationError extends Error {
    constructor() {
        super();
    }

    // internal server error
    static internalServerErr(req, err) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value ? req.value : {})} | Error : ${err.message}`);
        return 'Something went wrong. Please try again ' + err.message;
    }

    // unable to process
    static unableToProcess(req) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value ? req.value : {})} | Error : unable to process request`);
        return 'unable to process request';
    }

    // Invalid request
    static badRequestErr(req, err) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value ? req.value : {})} | Error : ${err.message}`);
        return 'Invalid request. ' + err.message;
    }

    // Unauthorized
    static unauthorizedErr(req, err) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value ? req.value : {})} | Error : ${err.message}`);
        return 'Unauthorized access. ' + err.message;
    }

    //Login Failed
    static invalidLogin(req, err) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value ? req.value : {})} | Error : ${err.message}`);
        return err.message;
    }

    // payment failed
    static paymentFailed(req) {
        req.appLogger.error(`URL : ${req.protocol}://${req.get('host')}${req.originalUrl} | Request : ${JSON.stringify(req.value ? req.value : {})} | Error : Payment Failed: Amount due`);
        return 'Payment Failed: Amount due';
    }
}

module.exports = ValidationError;
