import BaseJoi from 'joi';
import joinDateExtension from 'joi-date-extensions';
import Response from '../../responses/response';
import {options} from "../user/user.validators";

const Joi = BaseJoi.extend(joinDateExtension);

// add joi schema
const schemas = {
    createRule: Joi.object().keys({})
};


export const createRule = (req, res, next) => {
    let schema = schemas.createRule;
    let option = options.basic;

    schema.validate({
        ...req.body,
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
};
