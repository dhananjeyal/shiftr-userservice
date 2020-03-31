import BaseJoi from 'joi';
import joinDateExtension from 'joi-date-extensions';
import Response from '../../responses/response';
import { options } from "../user/user.validators";
import { Gender, UserRole,booleanType } from "../../constants";
import { validateFile } from "../../utils";

const Joi = BaseJoi.extend(joinDateExtension);

const CreateExperienceSchema = {
    licenseType: Joi.string(),
    driverExp: Joi.object({
        experience: Joi.string().required(),
        expInProvince: Joi.string().required(),
        driverSpeciality: Joi.array().items({
            specialityTraining: Joi.string().required(),
            year: Joi.string().required()
        })
    }).required(),
    countryType: Joi.number().required(),
}

const phone = {    
    phones: Joi.object({
        phoneNumber: Joi.number().required()        
    })
}

const lang = {    
    languages: Joi.object({
        language: Joi.number().required()        
    })
}


// add joi schema
const schemas = {

    CreateDriverProfile: (isImage = true) => {
        const rule = {
            unit: Joi.number().required(),
            street1: Joi.string().required(),
            street2: Joi.string(),
            city: Joi.string().required(),
            province: Joi.string().required(),
            postalCode: Joi.string().required(),
            // languages: Joi.array().items(lang),
            radious: Joi.string().required(),
            // phones: Joi.array().items(phone),
            km: Joi.number().valid(booleanType.YES, booleanType.NO),
            miles: Joi.number().valid(booleanType.YES, booleanType.NO),
            openDistance: Joi.number().valid(booleanType.YES, booleanType.NO),
            alcoholTest: Joi.number().valid(booleanType.YES, booleanType.NO),
            latitude: Joi.number().required(),
            longitude: Joi.number().required()
        }
        if (isImage) {
            rule.userprofile = Joi.string().required()
        }
        return Joi.object().keys(rule)
    },
    
    CreateExperienceDetails: Joi.object().keys({
        data: Joi.array().items(CreateExperienceSchema).min(1)
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
            // accountNumber: Joi.string().required()
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
    driverDocuments: Joi.object().keys({
        driverLicense: Joi.string().required(), 
        criminalRecord: Joi.string().required(),
        abstract: Joi.string().required(), 
        cvor: Joi.string().required()
    }), 

    /**Mobile App Driver - Upload Document*/
    documentUpload: Joi.object().keys({
        attachment: Joi.string().required(), 
        DocName: Joi.string().required(),
        DocType: Joi.number().required()
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


export const CreateExperienceDetails = (req, res, next) => {
    const schema = schemas.CreateExperienceDetails;
    const option = options.basic;
    schema.validate({
        ...req.body,
        type: req.headers['user-type'],
        authorization: req.header['authorization']
    }, option).then(() => {
        next();
    }).catch(err => {
        Response.joierrors(req, res, err);
    })
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
 * Upload Driver Documents - MobileApp
 */
export const driverDocuments = (req, res, next) => {
    // Validate file
    if (validateFile(req, res)) {
        let schema = schemas.driverDocuments;
        let option = options.basic;
        schema.validate({
            ...req.body,
        }, option).then(() => {
            next();
        }).catch(err => {
            Response.joierrors(req, res, err);
        });
    } 
    // else {
    //     let schema = schemas.driverDocuments;
    //     let option = options.basic;
    //     schema.validate({
    //         ...req.body,
    //     }, option).then(() => {
    //         next();
    //     }).catch(err => {
    //         Response.joierrors(req, res, err);
    //     });
    // }
};


/**
 * Upload Driver Documents - MobileApp
 */
export const documentUpload = (req, res, next) => {
    // Validate file
    if (validateFile(req, res)) {
        let schema = schemas.documentUpload;
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