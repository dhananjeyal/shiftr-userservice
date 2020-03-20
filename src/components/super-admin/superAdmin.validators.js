import BaseJoi from 'joi';
import joinDateExtension from 'joi-date-extensions';
import Response from '../../responses/response';
import {options} from "../user/user.validators";

const Joi = BaseJoi.extend(joinDateExtension);

// add joi schema
const schemas = {
    createUpdateAdmin: (isCreateRule = true) => {
        const rule = {
            firstName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(50).required(),
            lastName: Joi.string().regex(/^[a-zA-Z]*$/).max(50).required(),
            emailId: Joi.string().email().required(),
            phoneNo: Joi.string().min(10).max(15).required(),
        };

        if (isCreateRule) {
            rule['password'] = Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$/).min(8).max(20).required();
        }

        return Joi.object().keys(rule)
    }
};

export const createAdmin = (req, res, next) => {
    let schema = schemas.createUpdateAdmin();
    let option = options.basic;
    schema.validate({
        ...req.body,
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};

export const updateAdmin = (req, res, next) => {
    let schema = schemas.createUpdateAdmin(false);
    let option = options.basic;
    schema.validate({
        ...req.body,
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};
