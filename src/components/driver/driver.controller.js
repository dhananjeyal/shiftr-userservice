import BaseController from '../baseController';
import LocationController from '../masterdetails/location.controller';
import { raw } from 'objection'
import Users from "../user/model/user.model";
import { decrypt, encrypt } from "../../utils/cipher";
import {
    AddressType,
    DocumentName,
    DocumentStatus,
    DocumentType,
    SignUpStatus,
    phonenumbertype,
    CountryType,
    Typeofdistance
} from "../../constants";
import { genHash, genHmac256, mailer } from "../../utils";
import UserDetails from "../user/model/userDetails.model";
import AddressDetails from "../user/model/address.model";
import FinancialDetails from "./model/financial.model";
import UserDocument from "../user/model/userDocument.model";
import { columns, userAddressColumns, userDocumentColumns, userFinancialColumns, contactInfoDetailsColumns } from "../user/model/user.columns";
import { driverUserDetailsColumns, driverLicenseTypeColumns, driverExperienceColumns, driverSpecialityTrainingColumns, driverLanguageColumns, driverSpecialityDetailsColumns, experienceListColumns, validyearColumns, languageColumns, radiusColumns, radiusDetailsColumns, driverExperienceReference } from "./model/driver.columns";
import { signUpStatus } from '../../utils/mailer';
import ExperienceDetails from './model/experience.model';
import ExperienceReferenceDetails from './model/experienceReference.model';
import LicenseType from './model/licensetype.model';
import SpecialityTraining from './model/speciality.model';
import SpecialityDetails from './model/driverspeciality.model';
import ExperienceList from './model/experienceList.model';
import Language from "./model/language.model";
import AllLanguages from "./model/alllanguages.model";
import Radious from "./model/radious.model";
import ContactInfo from "./model/contactInfo.model";
import Validyear from "./model/validyear.model";
import Province from '../masterdetails/model/province.model'
import { provinceColumns } from '../masterdetails/model/location.columns';
import NotifyService from "../../services/notifyServices";
import BoardingService from "../../services/boardingServices";

let profilePath = `http://${process.env.PUBLIC_UPLOAD_LINK}:${process.env.PORT}/`;


class DriverController extends BaseController {

    constructor() {
        super();
    }

    /**
        * @DESC :Create Driver Profile
        * @param string/Integer/object
        * @return array/json
        */
    CreateDriverProfile = async (req, res) => {
        try {

            let phoneNumbers = [];
            let languagesKnown = [];
            const {
                unit,
                address1,
                address2,
                city,
                provinceId,
                postalCode,
                languages,
                distanceType,
                radious,
                openDistance,
                alcoholTest,
                phones,
                latitude,
                longitude,
                userprofile
            } = req.body;

            let ActiveUser = req.user;

            //Row Exists
            let UserDetailsResponse = await UserDetails.query()
                .findOne('SRU03_USER_MASTER_D', ActiveUser.userId)
                .select(driverUserDetailsColumns);

            //Row exists
            let rowExists = await ContactInfo.query()
                .select('SRU19_CONTACT_INFO_D')
                .where('SRU03_USER_MASTER_D', ActiveUser.userId);


            if (rowExists) {
                await ContactInfo.query()
                    .delete()
                    .where('SRU03_USER_MASTER_D', ActiveUser.userId);
            }

            //Format data
            phones.map((data, index) => {
                phoneNumbers.push({
                    SRU03_USER_MASTER_D: ActiveUser.userId,
                    SRU19_CONTACT_PERSON_N: data.contactPerson,
                    SRU01_TYPE_D: data.phonuemberType,
                    SRU19_PHONE_R: data.phoneNumber
                });
            });
            
            //Insert contact Info
            await ContactInfo.query()
                .insertGraph(phoneNumbers);

            //Row existstG
            let langRowExists = await Language.query()
                .select('SRU11_DRIVER_LANGUAGE_D')
                .where('SRU03_USER_MASTER_D', ActiveUser.userId);

            if (langRowExists) {
                await Language.query()
                    .delete()
                    .where('SRU03_USER_MASTER_D', ActiveUser.userId);
            };

            languages.map((data, index) => {
                languagesKnown.push({
                    SRU03_USER_MASTER_D: ActiveUser.userId,
                    SRU14_LANGUAGE_D:data.languageId,
                    SRU11_LANGUAGE_N: data.languageName
                });
            });

            //Insert language Info
            await Language.query()
                .insertGraph(languagesKnown);


            // Row exists
            let radiusRowExists = await Radious.query()
                .select('SRU03_USER_MASTER_D')
                .where('SRU03_USER_MASTER_D', ActiveUser.userId);

            if (radiusRowExists) {
                await Radious.query()
                    .delete()
                    .where('SRU03_USER_MASTER_D', ActiveUser.userId);
            };

            if (distanceType == Typeofdistance.MILES) {
                var kilometers = radious * Typeofdistance.DEFAULTKM;
            } else {
                var kilometers = radious;
            }

            await Radious.query().insert({
                SRU03_USER_MASTER_D: ActiveUser.userId,
                SRU01_TYPE_D: distanceType,
                SRU10_DISTANCE_RANGE_R: radious,
                SRU10_DISTANCE_KILOMETER_R: kilometers,
                SRU10_OPEN_DISTANCE_F: openDistance,
                SRU10_ALCOHOL_TEST_F: alcoholTest,
                SRU03_CREATED_D: ActiveUser.userId
            });


            if (UserDetailsResponse) {
                await UserDetails.query()
                    .patch({
                        SRU04_UNIT: unit || UserDetailsResponse.unit,
                        SRU04_PROFILE_I: userprofile || UserDetailsResponse.userprofile
                    }).where({
                        SRU03_USER_MASTER_D: ActiveUser.userId
                    });
            }

            //Row Exists Delete 
            await AddressDetails.query().where("SRU03_USER_MASTER_D", ActiveUser.userId).delete();
            //Insert new row
            await AddressDetails.query()
                .insert({
                    SRU03_USER_MASTER_D: ActiveUser.userId,
                    SRU06_LINE_1_N: address1,
                    SRU06_LINE_2_N: address2,
                    SRU06_CITY_N: city,
                    SRU16_PROVINCE_D: provinceId,
                    SRU06_ADDRESS_TYPE_D: AddressType.PERMANENT,
                    SRU06_POSTAL_CODE_N: postalCode,
                    SRU06_LOCATION_LATITUDE_N: latitude,
                    SRU06_LOCATION_LONGITUDE_N: longitude,
                    SRU06_CREATED_D: ActiveUser.userId
                });

            //call back service
            const locationData = {
                locationName: address1,
                latitude: latitude,
                longitude: longitude
            };
            await BoardingService.addLocationdetails(req, res, locationData);//Internal service Call

            return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.successful);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
     * @DESC : Update Driver Experience Details (Callback)
     * @param : req, res
     * @return array/json
     */
    CreateExperienceDetails = async (req, res) => {
        try {
            const user = req.user;
            const experienceDetails = await ExperienceDetails.query().delete().where('SRU03_USER_MASTER_D', user.userId);
            const specialityDetails = await SpecialityDetails.query().delete().where('SRU03_USER_MASTER_D', user.userId);

            let experienceData = [];
            let specialityData = [];
            let experienceDataReference = [];
            const { data, licenseType } = req.body;

            //Experience Details
            data.map((currExpDetails, index) => {
                const { driverExp, countryType } = currExpDetails;
                experienceData.push({
                    SRU03_USER_MASTER_D: user.userId,
                    SRU09_TYPE_N: countryType,
                    SRU09_TOTALEXP_N: driverExp.experience,
                    SRU09_CURRENT_N: driverExp.expInProvince,
                    SRU09_CREATED_D: user.userId,
                    SRU09_UPDATED_D: user.userId,
                    SRU09_SPECIALITY_REFERENCE_N: `${user.userId}SRDS${index}`
                });
                experienceDataReference.push({
                    SRU03_USER_MASTER_D: user.userId,
                    SRU20_COUNTRY_D: countryType,
                    SRU20_EXPERIENCE_D: driverExp.experienceId,
                    SRU20_PROVINCE_D: driverExp.expInProvinceId,
                    SRU20_CREATED_D: user.userId,
                    SRU20_UPDATED_D: user.userId,
                    SRU20_SPECIALITY_REFERENCE_N: `${user.userId}SRDS${index}`
                });

                if (driverExp.driverSpeciality && driverExp.driverSpeciality.length > 0) {
                    driverExp.driverSpeciality.map(currSpeciality => {
                        specialityData.push({
                            SRU03_USER_MASTER_D: user.userId,
                            SRU09_SPECIALITY_REFERENCE_N: `${user.userId}SRDS${index}`,
                            SRU12_SPECIALITY_N: currSpeciality.specialityTraining,
                            SRU11_SPECIALITY_TRAINING_D: currSpeciality.specialityTrainingId,
                            SRU12_VALIDYEAR_N: currSpeciality.year
                        })
                    })
                }
            });

            const experienceResponse = await ExperienceDetails.query().insertGraphAndFetch(experienceData);
            const specialityResponse = await SpecialityDetails.query().insertGraph(specialityData);
            const experienceReferenceResponse = await ExperienceReferenceDetails.query().insertGraph(experienceDataReference);

            
            const userDetailsResponse = await UserDetails.query()
                .update({
                    SRU04_LICENSE_TYPE_R: licenseType,
                    SRU04_SIGNUP_STATUS_D: SignUpStatus.DRIVER_DOCUMENTS
                })
                .where('SRU03_USER_MASTER_D', user.userId);

            return this.success(req, res, this.status.HTTP_OK, null, this.messageTypes.successMessages.added);

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
     * @DESC : Get driver details it is accessible by Admin and Super admin only
     * @return array/json
     * @param req
     * @param res
     */
    updateDriverProfile = async (req, res) => {
        try {

            const {
                userId,
                firstName,
                lastName,
                phone,
                addressId,
                unit,
                address1,
                postalCode,
                latitude,
                longitude,
                experienceDetails,
                specialityDetails
            } = req.body;

            //user - Update
            await Users.query()
                .where('SRU03_USER_MASTER_D', userId)
                .patch({
                    SRU03_FIRST_N: firstName,
                    SRU03_LAST_N: lastName,
                    SRU03_UPDATED_D: req.user.userId
                });

            //user-Details Update
            await UserDetails.query()
                .where('SRU03_USER_MASTER_D', userId)
                .patch({
                    SRU04_PHONE_N: phone,
                    SRU04_UNIT: unit,
                    SRU04_UPDATED_D: req.user.userId
                });

            //Update Address Details
            await AddressDetails.query()
                .where({
                    SRU03_USER_MASTER_D: userId,
                    SRU06_ADDRESS_D: addressId
                })
                .patch({
                    SRU06_LINE_1_N: address1,
                    SRU06_POSTAL_CODE_N: postalCode,
                    SRU06_LOCATION_LATITUDE_N: latitude,
                    SRU06_LOCATION_LONGITUDE_N: longitude,
                    SRU06_UPDATED_D: req.user.userId
                });

            //Update Experience Details
            const driverExperienceDetails = []
            experienceDetails.forEach(expvalue => {
                driverExperienceDetails.push({
                    SRU09_DRIVEREXP_D: expvalue.driverExperienceId,
                    SRU09_TYPE_N: expvalue.experienceType,
                    SRU09_TOTALEXP_N: expvalue.totalExp
                });
            });

            await ExperienceDetails.query()
                .upsertGraph(driverExperienceDetails);

            //Update speciality details
            const DriverspecialityDetails = []
            specialityDetails.forEach(specvalue => {
                DriverspecialityDetails.push({
                    SRU12_DRIVER_SPECIALITY_D: specvalue.specialityId,
                    SRU12_SPECIALITY_N: specvalue.specialityName
                });
            });

            await SpecialityDetails.query()
                .upsertGraph(DriverspecialityDetails);


            return this.success(req, res, this.status.HTTP_OK, null, this.messageTypes.successMessages.updated);

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
     * @DESC : Get driver details it is accessible by Admin and Super admin only
     * @return array/json
     * @param req
     * @param res
     */
    getDriverDetails = async (req, res) => {
        try {
            const userId = req.params.userId;
            const driver = await this._getDriverDetails(req, res, userId);
            if (driver) {
                return this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.successMessages.successful);
            }
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };


    /**
     * @DESC : Delete driver Profile
     * @return array/json
     * @param req
     * @param res
     */
    deleteDriverProfile = async (req, res) => {
        try {
            let ActiveUser = req.user;
            // let userResponse = await UserDetails.query().
            //     delete().
            //     where('SRU03_USER_MASTER_D', ActiveUser.userId);

            await UserDetails.query()
                .update({
                    SRU04_AGE_D: null,
                    SRU04_GENDER_D: null,
                    SRU04_EXPERIENCE_D: null,
                    SRU04_PROFILE_I: null,
                    SRU04_CREATED_D: null,
                    SRU04_UPDATED_D: null,
                    SRU04_PHONE_N: null,
                    SRU04_OTHER_SERVICE_INFO: null,
                    SRU04_SIGNUP_STATUS_D: 5
                })
                .where('SRU03_USER_MASTER_D', ActiveUser.userId);

            // await VehicleDetails.query().delete().where('SRU03_USER_MASTER_D', ActiveUser.userId);
            // await ExperienceDetails.query().delete().where('SRU03_USER_MASTER_D', ActiveUser.userId)
            await AddressDetails.query().delete().where('SRU03_USER_MASTER_D', ActiveUser.userId);

            return this.success(req, res, this.status.HTTP_OK, null, this.messageTypes.successMessages.deleted);

        } catch (e) {
            console.log(e);
            return this.internalServerError(req, res, e);
        }
    }

    /**
    * @DESC : Mobile APP - Financial Details
    * @return array/json
    * @param req
    * @param res
    */
    financialDetails = async (req, res) => {
        try {

            //User Details
            const {
                firstName,
                emailId,
                userId
            } = req.user;

            // Insert financial details
            const {
                bankName,
                accountNumber,
                institutionNumber,
                transitNumber,
                address,
                latitude,
                longitude,
                attachment
            } = req.body;

            // Insert financial attachment if available
            if (attachment) {
                await UserDocument.query().insert({
                    SRU03_USER_MASTER_D: userId,
                    SRU05_NAME: DocumentName.FINANCIAL,
                    SRU01_TYPE_D: DocumentType.FINANCIAL,
                    SRU02_STATUS_D: DocumentStatus.VERIFIED,
                    SRU05_DOCUMENT_I: attachment,
                    SRU05_CREATED_D: userId
                });

                // await FinancialDetails.query().insert({
                //     SRU03_USER_MASTER_D: req.user.userId,
                //     SRU08_ACCOUNT_N: accountNumber,
                //     SRU08_CREATED_D: req.user.userId
                // });

            } else {
                await FinancialDetails.query().delete().where({
                    SRU03_USER_MASTER_D: userId
                })
                await AddressDetails.query().delete().where({
                    SRU03_USER_MASTER_D: userId
                })

                await FinancialDetails.query().insert({
                    SRU03_USER_MASTER_D: userId,
                    SRU08_BANK_N: bankName,
                    SRU08_ACCOUNT_N: accountNumber,
                    SRU08_INSTITUTION_N: institutionNumber,
                    SRU08_TRANSIT_N: transitNumber,
                    SRU08_CREATED_D: userId,
                });

                await AddressDetails.query().insert({
                    SRU03_USER_MASTER_D: userId,
                    SRU06_LINE_1_N: address,
                    SRU06_ADDRESS_TYPE_D: AddressType.FINANCIAL,
                    SRU06_LOCATION_LATITUDE_N: latitude,
                    SRU06_LOCATION_LONGITUDE_N: longitude,
                    SRU06_CREATED_D: userId,
                });
            }

            await UserDetails.query()
                .update({ SRU04_SIGNUP_STATUS_D: SignUpStatus.COMPLETED })
                .where('SRU03_USER_MASTER_D', userId);

            const driver = await this._getDriverDetails(req, res, userId);

            this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.passMessages.driverCreated); return this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.passMessages.driverCreated);

            // TODO: Send the mail
            return await mailer.signUp(
                firstName,
                emailId
            );


        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }


    /**
     * @DESC : Upload driver Documents - Mobile APP
     * @return array/json
     * @param req
     * @param res
     * @param userId
     */
    driverDocuments = async (req, res) => {
        try {
            let documents = [];
            const {
                driverLicense,
                criminalRecord,
                abstract,
                cvor
            } = req.body;

            const { userId } = req.user;
            documents.push(
                {
                    SRU03_USER_MASTER_D: userId,
                    SRU05_NAME: DocumentName.LICENSE,
                    SRU01_TYPE_D: DocumentType.LICENSE,
                    SRU02_STATUS_D: DocumentStatus.PENDING,
                    SRU05_DOCUMENT_I: driverLicense,
                    SRU05_CREATED_D: userId,
                },
                {
                    SRU03_USER_MASTER_D: userId,
                    SRU05_NAME: DocumentName.CRIMINAL,
                    SRU01_TYPE_D: DocumentType.CRIMINAL,
                    SRU02_STATUS_D: DocumentStatus.PENDING,
                    SRU05_DOCUMENT_I: criminalRecord,
                    SRU05_CREATED_D: userId,
                },
                {
                    SRU03_USER_MASTER_D: userId,
                    SRU05_NAME: DocumentName.ABSTRACT,
                    SRU01_TYPE_D: DocumentType.ABSTRACT,
                    SRU02_STATUS_D: DocumentStatus.PENDING,
                    SRU05_DOCUMENT_I: abstract,
                    SRU05_CREATED_D: userId,
                },
                {
                    SRU03_USER_MASTER_D: userId,
                    SRU05_NAME: DocumentName.CVOR,
                    SRU01_TYPE_D: DocumentType.CVOR,
                    SRU02_STATUS_D: DocumentStatus.PENDING,
                    SRU05_DOCUMENT_I: cvor,
                    SRU05_CREATED_D: userId,
                }
            );

            //push additional documents
            Object.keys(req.body).map(current => {
                if (current.startsWith('others')) {
                    documents.push(
                        {
                            SRU03_USER_MASTER_D: userId,
                            SRU05_NAME: DocumentName.OTHERS,
                            SRU01_TYPE_D: DocumentType.OTHERS,
                            SRU02_STATUS_D: DocumentStatus.PENDING,
                            SRU05_DOCUMENT_I: req.body[current],
                            SRU05_CREATED_D: userId,
                        },
                    );
                }
            });

            //Delete Existing documents
            await UserDocument.query().delete().where({
                SRU03_USER_MASTER_D: userId,
            }).whereIn('SRU01_TYPE_D', [DocumentType.CVOR, DocumentType.ABSTRACT, DocumentType.CRIMINAL, DocumentType.LICENSE, DocumentType.OTHERS]);

            //Insert Documents
            await UserDocument.query().insertGraph(documents);

            //Update signup status
            await UserDetails.query()
                .update({ SRU04_SIGNUP_STATUS_D: SignUpStatus.FINANCIAL_DETAILS })
                .where('SRU03_USER_MASTER_D', userId);

            //get All users List (Driver)
            const driver = await this._getDriverDetails(req, res, userId);
            if (driver) {
                this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.passMessages.driverCreated);
            }

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }



    /**
     * @DESC : Upload driver Documents - Mobile APP
     * @return array/json
     * @param string/Integer
     */
    documentUpload = async (req, res) => {
        try {
            let documents = [];
            const {
                attachment,
                DocName,
                DocType
            } = req.body;

            const { userId } = req.user;

            //Delete Existing documents
            await UserDocument.query().delete().where({
                SRU03_USER_MASTER_D: userId,
            }).where('SRU01_TYPE_D', DocType);


            //Insert Documents
            const documentResponse = await UserDocument.query().insert(
                {
                    SRU03_USER_MASTER_D: userId,
                    SRU05_NAME: DocName,
                    SRU01_TYPE_D: DocType,
                    SRU02_STATUS_D: DocumentStatus.PENDING,
                    SRU05_DOCUMENT_I: attachment,
                    SRU05_CREATED_D: userId,
                }
            );

            //Update signup status
            await UserDetails.query()
                .update({ SRU04_SIGNUP_STATUS_D: SignUpStatus.FINANCIAL_DETAILS })
                .where('SRU03_USER_MASTER_D', userId);

            //Response data
            const responseData = {
                documentId: documentResponse.SRU05_DOCUMENT_D,
                documentName: DocName,
                documentType: DocType,
                documentPath: attachment
            }

            return this.success(req, res, this.status.HTTP_OK, responseData, this.messageTypes.passMessages.updated);

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }


    /**
     * @DESC : Upload driver Documents - Mobile APP
     * @return array/json
     * @param string/Integer
     */
    documentDelete = async (req, res) => {
        try {

            const { userId } = req.user;
            const {
                documentId,
                documentName
            } = req.body;

            //Delete Existing documents
            await UserDocument.query().delete()
                .where({
                    SRU05_DOCUMENT_D: documentId,
                    SRU03_USER_MASTER_D: userId
                });

            return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.passMessages.deleted);

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
     * @DESC : Upload Profile Pictures- Mobile APP
     * @return array/json
     * @param string/Integer
     */
    profileUpload = async (req, res) => {
        try {
            await UserDetails.query()
                .patch({
                    SRU04_PROFILE_I: req.body.userprofile
                }).where({
                    SRU03_USER_MASTER_D: req.user.userId
                });
            //get All users List (Driver)
            const driver = await this._getDriverDetails(req, res, req.user.userId);
            if (driver) {
                return this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.passMessages.driverCreated);
            }
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }


    /**
     * @DESC : Get driver details reused method
     * @return array/json
     * @param req
     * @param res
     * @param userId
     */
    _getDriverDetails = async (req, res, userId) => {
        try {
            let driver = await Users.query().findById(userId)
                .eager('[userDetails, addressDetails, experienceDetails,driverspecialityDetails, driverLanguage, financialDetails,radiusDetails, documents]')
                .modifyEager('userDetails', (builder) => {
                    builder.select(driverUserDetailsColumns)
                    // builder.select(raw(`CONCAT("${profilePath}", SRU04_PROFILE_I) as userprofile`))
                }).modifyEager('addressDetails', (builder) => {
                    builder.select(userAddressColumns)
                }).modifyEager('experienceDetails', (builder) => {
                    builder.select(driverExperienceColumns)
                }).modifyEager('financialDetails', (builder) => {
                    builder.select(userFinancialColumns)
                }).modifyEager('documents', (builder) => {
                    builder.select(userDocumentColumns)
                }).modifyEager('driverspecialityDetails', (builder) => {
                    builder.select(driverSpecialityDetailsColumns)
                }).modifyEager('driverLanguage', (builder) => {
                    builder.select(driverLanguageColumns)
                }).modifyEager('radiusDetails', (builder) => {
                    builder.select(radiusColumns)
                }).select(columns);

            if (driver) {
                delete driver.password;
                return new Promise((resolve) => {
                    resolve(driver);
                });
            } else {
                this.userNotFound(req, res);
            }
        } catch (e) {
            this.internalServerError(req, res, e)
        }

        return new Promise((resolve) => {
            resolve(false);
        });
    };

    /**
     * @DESC : Get driver details reused method
     * @return array/json
     * @param req
     * @param res
     * @param userId
     */
    _getAllDriverDetails = async (req, res, userId) => {
        try {
            let driver = await Users.query().findById(userId)
                .eager('[userDetails, contactInfoDetails, addressDetails.provinceDetails, driverspecialityDetails, driverLanguage, financialDetails,radiusDetails, documents, experienceDetails.experienceReferenceDetails]')
                .modifyEager('userDetails', (builder) => {
                    builder.select(driverUserDetailsColumns)
                    // builder.select(raw(`CONCAT("${profilePath}", SRU04_PROFILE_I) as userprofile`))
                }).modifyEager('contactInfoDetails', (builder) => {
                    builder.select(contactInfoDetailsColumns)
                }).modifyEager('addressDetails.provinceDetails', (builder) => {
                    builder.select("*")
                }).modifyEager('financialDetails', (builder) => {
                    builder.select(userFinancialColumns)
                }).modifyEager('documents', (builder) => {
                    builder.select(userDocumentColumns)
                }).modifyEager('driverspecialityDetails', (builder) => {
                    builder.select(driverSpecialityDetailsColumns)
                }).modifyEager('driverLanguage', (builder) => {
                    builder.select(driverLanguageColumns)
                }).modifyEager('radiusDetails', (builder) => {
                    builder.select(radiusDetailsColumns)
                }).modifyEager('experienceDetails.experienceReferenceDetails', (builder) => {
                    builder.select(driverExperienceReference)
                }).select(columns);

            if (driver) {
                delete driver.password;
                return new Promise((resolve) => {
                    resolve(driver);
                });
            } else {
                this.userNotFound(req, res);
            }
        } catch (e) {
            this.internalServerError(req, res, e)
        }

        return new Promise((resolve) => {
            resolve(false);
        });
    };

    /**
     * @DESC : Get driver's master data
     * @return array/json
     * @param req, res
     */
    getMasterData = async (req, res) => {
        try {
            const licenseType = await LicenseType.query().select(driverLicenseTypeColumns);
            const speciality = await SpecialityTraining.query().select(driverSpecialityTrainingColumns);
            const experienceList = await ExperienceList.query().select(experienceListColumns);
            const validYear = await Validyear.query().select(validyearColumns);
            const languageList = await AllLanguages.query().select(languageColumns);

            //State List - Canada
            let canadaprovinceList = await Province.query().select(provinceColumns)
                .where('SRU15_COUNTRY_D', CountryType.CANADA_LIST);

            //state list USA
            let USProvinceList = await Province.query().select(provinceColumns)
                .where('SRU15_COUNTRY_D', CountryType.USA_LIST);

            const result = {
                experienceList,
                licenseType,
                speciality,
                languageList,
                validYear,
                canadaprovinceList,
                USProvinceList
            }
            return this.success(req, res, this.status.HTTP_OK, result, this.messageTypes.successMessages.getAll);
        } catch (e) {
            this.internalServerError(req, res, e)
        }
    };

    /**
         * @DESC : Send Push notification to Users (Active and DeActive)
         * @return array/json
         */
    _notification = async (req, res, userId, status) => {
        let notifyData = {
            title: this.messageTypes.passMessages.title,
            message: this.messageTypes.passMessages.activateUser,
            body: this.messageTypes.passMessages.activateUser,
            type: NotifyType.ACTIVATE_USER,
            userId: userId
        }

        return await NotifyService.sendNotication(req, res, notifyData);
    }


}


export default new DriverController();
