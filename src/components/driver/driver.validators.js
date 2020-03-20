import BaseJoi from 'joi';
import joinDateExtension from 'joi-date-extensions';
import Response from '../../responses/response';
import { options } from "../user/user.validators";
import { Gender, UserRole,booleanType } from "../../constants";
import { validateFile } from "../../utils";

const Joi = BaseJoi.extend(joinDateExtension);

// add joi schema
const schemas = {
    createUpdateDriver: (isCreateRule = true) => {
        const rule = {
            firstName: Joi.string().regex(/[a-zA-Z][a-zA-Z\s]*$/).max(50).required(),
            lastName: Joi.string().regex(/^[a-zA-Z]*$/).max(50).required(),
            personalDetails: Joi.object().keys({
                profilePicture: Joi.string().required(),
                address: Joi.string().required(),
                age: Joi.number().min(18).required(),
                gender: Joi.number().valid(
                    Gender.MALE,
                    Gender.FEMALE,
                ).required(),
                phone: Joi.string().min(10).max(15).required(),
                experience: Joi.string().max(2).required(),
                workingWithOthers: Joi.number(),
                otherServiceInfo: Joi.when('workingWithOthers', {
                    is: true,
                    then: Joi.string().required().max(60)
                })
            }).required(),
            vehicleDetails: Joi.object().keys({
                type: Joi.string().max(80).required(),
                make: Joi.string().max(80).required(),
                model: Joi.string().max(80).required(),
                vin: Joi.string().length(17).required(),
                color: Joi.string().regex(/^[\w\s]*$/).max(80).required(),
                licensePlate: Joi.string().regex(/^[a-zA-Z0-9\-]*$/).required(),
                seatsUp: Joi.string(),
                seatsDown: Joi.string(),
            }).required(),
            financialDetails: Joi.object().keys({
                bankName: Joi.string().max(50).allow('', null),
                accountNumber: Joi.string().min(12).max(19).allow('', null),
                institutionNumber: Joi.string().length(3).allow('', null),
                transitNumber: Joi.string().length(5).allow('', null),
                attachment: Joi.string().allow('', null)
            }).required(),
        };

        if (isCreateRule) {
            rule.password = Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$/).min(8).max(20).required();
            rule.emailId = Joi.string().email().required();
            rule.driverDocuments = Joi.object().keys({
                license: Joi.string().required(),
                pcc: Joi.string().required(),
                insurance: Joi.string().required(),
                ownership: Joi.string().required(),
            }).required()
        }

        return Joi.object().keys(rule)
    },
    CreateDriverProfile: (isImage = true) => {
        const rule = {
            userAddress: Joi.string().max(200).required(),
            type: Joi.number().valid(UserRole.DRIVER_R).required(),
            age: Joi.number().min(18).required(),
            // gender: Joi.string().valid(
            //     Gender.MALE,
            //     Gender.FEMALE,
            // ).required(),
            phone: Joi.string().min(10).max(15).required(),
            experience: Joi.string().required(),
            // workingWithOthers: Joi.string().valid(booleanType.YES, booleanType.NO),
            // otherServiceInfo: Joi.when('workingWithOthers', {
            //     is: booleanType.YES,
            //     then: Joi.string().required().max(60)
            // })
        }

        if (isImage) {
            rule.userprofile = Joi.string().required()
        }
        return Joi.object().keys(rule)
    },

    CreateVehicleDetails: Joi.object().keys({
        vehicleType: Joi.string().max(100).required(),
        make: Joi.string().max(100).required(),
        vin: Joi.string().max(100).required(),
        color: Joi.string().max(100).required(),
        licensePlate: Joi.string().max(100).required(),
        seatsUp: Joi.string().max(100).required(),
        seatsDown: Joi.string().max(100).required()
    }),

    updateDriverProfile: Joi.object().keys({        
        userAddress: Joi.string().max(200).required(),
        type: Joi.number().valid(1, 2, 3).required(),
        age: Joi.number().required(),
        gender: Joi.string().max(10).required(),
        phone: Joi.number().required(),
        experience: Joi.number().required(),
        workingWithOthers: Joi.string().valid(booleanType.YES,booleanType.NO).required(),
        latitude:Joi.string().required(),
        longitude:Joi.string().required()
    }),
    
 /**Mobile APP- Financial Details */
 financialDetails(bodydata) {
    let rule = {};
    if (bodydata.attachment) {
        rule = {
            attachment: Joi.string(),
            accountNumber: Joi.string().required()
        };
    } else {
         rule = {
            bankName: Joi.string().max(50),
            accountNumber: Joi.string().required(),
            institutionNumber: Joi.string().required(),
            transitNumber: Joi.string().required(),
            address: Joi.string().required(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required()
        }
    }

    return Joi.object().keys(rule);
},

 /**Mobile App Driver Documents */
 UploaddriverDocuments: Joi.object().keys({
    driverDocument: Joi.string(), 
    ownership: Joi.string()
}),

};

export const CreateDriverProfile = (req, res, next) => {

    let option = options.basic;
    // Validate file
    if (validateFile(req, res)) {        
        let schema = schemas.CreateDriverProfile();
        schema.validate({
            ...req.body,
            type: req.headers['user-type'],
            authorization: req.headers['authorization']
        }, option).then(() => {
            next();
        }).catch(err => {
            Response.joierrors(req, res, err);
        });
    } else {        
        let schema = schemas.CreateDriverProfile(false);
        schema.validate({
            ...req.body,
            type: req.headers['user-type'],
            authorization: req.headers['authorization']
        }, option).then(() => {
            next();
        }).catch(err => {
            Response.joierrors(req, res, err);
        });
    }

}

export const CreateVehicleDetails = (req, res, next) => {
    let schema = schemas.CreateVehicleDetails;
    let option = options.basic;
    schema.validate({
        ...req.body,
        type: req.headers['user-type'],
        authorization: req.headers['authorization']
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
}


export const updateDriverProfile = (req, res, next) => {
    let schema = schemas.updateDriverProfile;
    let option = options.basic;
    schema.validate({
        ...req.body,
        type: req.headers['user-type'],
        authorization: req.headers['authorization']
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    });
}

export const createDriver = (req, res, next) => {
    let schema = schemas.createUpdateDriver();
    let option = options.basic;
    // Validate file
    if (validateFile(req, res)) {
        schema.validate({
            ...req.body,
        }, option).then(() => {
            next();
        }).catch(err => {
            Response.joierrors(req, res, err);
        });
    }
};

export const updateDriver = (req, res, next) => {
    let schema = schemas.createUpdateDriver(false);
    let option = options.basic;
    // Validate file
    if (validateFile(req, res)) {
        schema.validate({
            ...req.body,
        }, option).then(() => {
            next();
        }).catch(err => {
            Response.joierrors(req, res, err);
        });
    } else {
        schema.validate({
            ...req.body,
        }, option).then(() => {
            next();
        }).catch(err => {
            Response.joierrors(req, res, err);
        });
    }
};


/**
 * Financial Details - Mobile APP
 */
export const financialDetails = (req, res, next) => {
    // Validate file
    if (validateFile(req, res)) {
        let schema = schemas.financialDetails(req.body);
        let option = options.basic;
        schema.validate({
            ...req.body,
        }, option).then(() => {
            next();
        }).catch(err => {
            Response.joierrors(req, res, err);
        });
    } else {
        let schema = schemas.financialDetails(req.body);
        let option = options.basic;
        schema.validate({
            ...req.body,
        }, option).then(() => {
            next();
        }).catch(err => {
            Response.joierrors(req, res, err);
        });
    }
};

/**
 * Upload Driver Documents
 */
export const UploaddriverDocuments = (req, res, next) => {
    // Validate file
    if (validateFile(req, res)) {
        let schema = schemas.UploaddriverDocuments;
        let option = options.basic;
        schema.validate({
            ...req.body,
        }, option).then(() => {
            next();
        }).catch(err => {
            Response.joierrors(req, res, err);
        });
    } else {
        let schema = schemas.UploaddriverDocuments;
        let option = options.basic;
        schema.validate({
            ...req.body,
        }, option).then(() => {
            next();
        }).catch(err => {
            Response.joierrors(req, res, err);
        });
    }
};