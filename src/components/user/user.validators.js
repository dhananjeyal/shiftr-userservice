import BaseJoi from 'joi';
import joinDateExtension from 'joi-date-extensions';
import Response from '../../responses/response';
import {DocumentStatus, SignUpStatus, UserRole} from "../../constants";

const Joi = BaseJoi.extend(joinDateExtension);

// add joi schema
const schemas = {
    signUpUser: Joi.object().keys({
        firstName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(50).required(),
        lastName: Joi.string().regex(/^[a-zA-Z]*$/).max(50).required(),
        emailId: Joi.string().email().required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$/).min(8).max(20).required(),
        type: Joi.number().valid(
            UserRole.DRIVER_R,
            UserRole.CUSTOMER_R
        ).required(),
        phoneNo: Joi.when('type', {
            is: UserRole.CUSTOMER_R,
            then: Joi.string().min(10).max(15).required()
        })
    }),
    createUpdateUser: Joi.object().keys({
        firstName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(50).required(),
        lastName: Joi.string().regex(/^[a-zA-Z]*$/).max(50).required(),
        emailId: Joi.string().email().required(),
        phoneNo: Joi.string().min(10).max(15).required()
    }),
    loginUser: Joi.object().keys({
        emailId: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    }),
    forgetPassword: Joi.object().keys({
        emailId: Joi.string().email().required(),
    }),
    resetPassword: Joi.object().keys({
        newPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$/).min(8).max(20).required(),
        authorization: Joi.string().required(),
        tempPassword: Joi.string()
    }),
    verificationStatus: Joi.object().keys({
        emailId: Joi.string().email().required(),
    }),
    updateProfile: Joi.object().keys({
        firstName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(50).required(),
        lastName: Joi.string().regex(/^[a-zA-Z]*$/).max(50).required(),
        phoneNo: Joi.string().min(10).max(15),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$/).min(8).max(20),
    }),
    updateSignUpStatus: Joi.object().keys({
        signUpStatus: Joi.number().valid(
            SignUpStatus.VERIFIED,
            SignUpStatus.REJECTED
        ).required(),
        reason: Joi.string(),
        license: Joi.number().valid(
            DocumentStatus.VERIFIED,
            DocumentStatus.REJECTED
        ),
        pcc: Joi.number().valid(
            DocumentStatus.VERIFIED,
            DocumentStatus.REJECTED
        ),
        insurance: Joi.number().valid(
            DocumentStatus.VERIFIED,
            DocumentStatus.REJECTED
        ),
        ownership: Joi.number().valid(
            DocumentStatus.VERIFIED,
            DocumentStatus.REJECTED
        ),
    }),
    existingEmail: Joi.object().keys({
        emailId: Joi.string().email().required()
    })
};

export const options = {
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true
    },
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: {
            objects: true
        }
    }
};

export const signUpUser = (req, res, next) => {
    let schema = schemas.signUpUser;
    let option = options.basic;
    schema.validate({
        ...req.body,
        type: req.headers['user-type']
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};

export const createUpdateUser = (req, res, next) => {
    let schema = schemas.createUpdateUser;
    let option = options.basic;
    schema.validate({
        ...req.body
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};

export const loginUser = (req, res, next) => {
    let schema = schemas.loginUser;
    let option = options.basic;
    schema.validate({
        ...req.body,
        type: req.headers['user-type']
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};

export const forgetPassword = (req, res, next) => {
    let schema = schemas.forgetPassword;
    let option = options.basic;
    schema.validate({
        ...req.body
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};

export const resetPassword = (req, res, next) => {
    let schema = schemas.resetPassword;
    let option = options.basic;
    schema.validate({
        ...req.body,
        authorization: req.headers['authorization']
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};

export const verificationStatus = (req, res, next) => {
    let schema = schemas.verificationStatus;
    let option = options.basic;
    schema.validate({
        ...req.query,
    }, option).then(() => {
        req.body = req.query;
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};

export const updateProfile = (req, res, next) => {
    let schema = schemas.updateProfile;
    let option = options.basic;
    schema.validate({
        ...req.body
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};

export const updateSignUpStatus = (req, res, next) => {
    let schema = schemas.updateSignUpStatus;
    let option = options.basic;
    schema.validate({
        ...req.body
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};

export const existingEmail = (req, res, next) => {
    let schema = schemas.existingEmail;
    let option = options.basic;
    schema.validate({
        ...req.params
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};
