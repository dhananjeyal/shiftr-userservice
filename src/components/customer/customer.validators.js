import BaseJoi from 'joi';
import joinDateExtension from 'joi-date-extensions';
import Response from '../../responses/response';

const Joi = BaseJoi.extend(joinDateExtension);

// add joi schema
const schemas = {    

    // CreateDriverProfile: Joi.object().keys({
    //     firstName: Joi.string().max(50).required(),
    //     lastName: Joi.string().max(50).required(),
    //     userAddress: Joi.string().max(200).required(),
    //     type: Joi.number().valid(1, 2, 3).required(),
    //     age: Joi.number().required(),
    //     gender: Joi.string().max(10).required(),
    //     phone: Joi.number().required(),
    //     experience: Joi.number().required(),
    //     previcesexperience: Joi.string().required(),
    //     description: Joi.string().max(200).required()
    // })

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


// export const CreateDriverProfile = (req, res, next) => {
//     let schema = schemas.CreateDriverProfile;
//     let option = options.basic;
//     schema.validate({
//         ...req.body,
//         type: req.headers['user-type'],
//         authorization: req.headers['authorization']
//     }, option).then(() => {
//         next();
//     }).catch(err => {
//         Response.joierrors(req, res, err);
//     });
// }
