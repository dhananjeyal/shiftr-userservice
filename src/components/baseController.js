import * as StatusCodes from '../facades/response'

const Exceptions = require('../exceptions/Handler');
import * as MessageTypes from '../responses/types'
import {errors, success} from '../responses/response'
import {error} from '../utils/logging'

/**
 * Base controller class which inherits all util methods
 * to use in the derived classes
 */
class BaseController {

    constructor() {
        this.success = success;
        this.errors = errors;

        this.status = StatusCodes;
        this.messageTypes = MessageTypes;
        this.exceptions = Exceptions;
    }

    internalServerError = (req, res, e) => {
        if (e.code === 'ER_DUP_ENTRY') {
            e.message = this.messageTypes.passMessages.userExists;
            return this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.exceptions.badRequestErr(req, e));
        }

        error(e);
        this.errors(req, res, this.status.HTTP_INTERNAL_SERVER_ERROR, this.exceptions.internalServerErr(req, e));
    };

    userInvalidToken = (req, res) => {
        this.errors(req, res, this.status.HTTP_UNAUTHORIZED, this.exceptions.unauthorizedErr(req, {
            message: this.messageTypes.authMessages.userInvalidToken
        }));
    };

    userNotFound = (req, res) => {
        this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.exceptions.badRequestErr(req, {
            message: this.messageTypes.authMessages.userNotFound
        }));
    };

    userIllegalAccess = (req, res) => {
        this.errors(req, res, this.status.HTTP_FORBIDDEN, this.exceptions.unauthorizedErr(req, {
            message: this.messageTypes.authMessages.userIllegalAccess
        }));
    };
}

export default BaseController
