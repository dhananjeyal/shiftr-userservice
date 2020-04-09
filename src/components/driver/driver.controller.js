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
    CountryType
} from "../../constants";
import { genHash, genHmac256, mailer } from "../../utils";
import UserDetails from "../user/model/userDetails.model";
import AddressDetails from "../user/model/address.model";
import FinancialDetails from "./model/financial.model";
import UserDocument from "../user/model/userDocument.model";
import { columns, userAddressColumns, userDocumentColumns, userFinancialColumns } from "../user/model/user.columns";
import { driverUserDetailsColumns, driverLicenseTypeColumns, driverExperienceColumns, driverSpecialityColumns, driverLanguageColumns, driverSpecialityDetailsColumns, experienceListColumns, validyearColumns,allLanguageColumns } from "./model/driver.columns";
import { signUpStatus } from '../../utils/mailer';
import ExperienceDetails from './model/experience.model';
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
                street1,
                street2,
                city,
                province,
                postalCode,
                languages,
                radious,
                km,
                miles,
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
                .select('SRU09_PHONE_D')
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
                    SRU01_TYPE_D: phonenumbertype.HOME,
                    SRU09_PHONE_R: phones[index]
                });
            });

            //Insert contact Info
            await ContactInfo.query()
                .insertGraph(phoneNumbers);

            //Row exists
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
                    SRU11_LANGUAGE_N: languages[index]
                });
            });

            //Insert language Info
            await Language.query()
                .insertGraph(languagesKnown);

            if (UserDetailsResponse) {
                await UserDetails.query()
                    .patch({
                        SRU04_UNIT: unit || UserDetailsResponse.unit,
                        SRU04_PROFILE_I: userprofile
                    }).where({
                        SRU03_USER_MASTER_D: ActiveUser.userId
                    });

                await AddressDetails.query()
                    .patch({
                        SRU06_LINE_1_N: street1,
                        SRU06_LINE_2_N: street2,
                        SRU06_POSTAL_CODE_N: postalCode,
                        SRU06_CITY_N: city,
                        SRU06_PROVINCE_N: province,
                        SRU06_LOCATION_LATITUDE_N: latitude,
                        SRU06_LOCATION_LONGITUDE_N: longitude
                    }).where({
                        SRU03_USER_MASTER_D: ActiveUser.userId
                    });

                await Radious.query()
                    .patch({
                        SRU10_KM: km,
                        SRU10_MAILS: miles,
                        SRU10_DISTANCE_RANGE: radious,
                        SRU10_OPEN_DISTANCE: openDistance,
                        SRU10_ALCOHOL_TEST: alcoholTest
                    }).where({
                        SRU03_USER_MASTER_D: ActiveUser.userId
                    });

            } else {
                await AddressDetails.query()
                    .insert({
                        SRU03_USER_MASTER_D: ActiveUser.userId,
                        SRU06_LINE_1_N: street1,
                        SRU06_LINE_2_N: street2,
                        SRU06_CITY_N: city,
                        SRU06_PROVINCE_N: province,
                        SRU06_ADDRESS_TYPE_D: AddressType.PERMANENT,
                        SRU06_POSTAL_CODE_N: postalCode,
                        SRU06_LOCATION_LATITUDE_N: latitude,
                        SRU06_LOCATION_LONGITUDE_N: longitude,
                        SRU06_CREATED_D: ActiveUser.userId
                    });

                await Radious.query().insert({
                    SRU10_KM: km,
                    SRU10_MAILS: miles,
                    SRU10_DISTANCE_RANGE: radious,
                    SRU10_OPEN_DISTANCE: openDistance,
                    SRU10_ALCOHOL_TEST: alcoholTest
                })
            }

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
            const { data } = req.body;

            //Experience Details
            data.map((currExpDetails, index) => {
                const { licenseType, driverExp, countryType } = currExpDetails;
                experienceData.push({
                    SRU03_USER_MASTER_D: user.userId,
                    SRU09_TYPE_N: countryType,
                    SRU09_LICENSE_TYPE_N: licenseType,
                    SRU09_TOTALEXP_N: driverExp.experience,
                    SRU09_CURRENT_N: driverExp.expInProvince,
                    SRU09_CREATED_D: user.userId,
                    SRU09_UPDATED_D: user.userId,
                    SRU09_SPECIALITY_KEY_D: `${user.userId}SRDS${index}`
                });

                if (driverExp.driverSpeciality && driverExp.driverSpeciality.length > 0) {
                    driverExp.driverSpeciality.map(currSpeciality => {
                        specialityData.push({
                            SRU03_USER_MASTER_D: user.userId,
                            SRU09_DRIVEREXP_D: `${user.userId}SRDS${index}`,
                            SRU12_SPECIALITY_N: currSpeciality.specialityTraining,
                            SRU12_VALIDYEAR_N: currSpeciality.year,
                        })
                    })
                }
            });

            const experienceResponse = await ExperienceDetails.query().insertGraph(experienceData);
            const specialityResponse = await SpecialityDetails.query().insertGraph(specialityData);

            const userDetailsResponse = await UserDetails.query()
                .update({ SRU04_SIGNUP_STATUS_D: SignUpStatus.DRIVER_DOCUMENTS })
                .where('SRU03_USER_MASTER_D', user.userId);

            return this.success(req, res, this.status.HTTP_OK, null, this.messageTypes.successMessages.added);

        } catch (e) {
            console.log(e);
            if (e.code === 'ER_DUP_ENTRY') {
                e.message = this.messageTypes.passMessages.userExists;
                return this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.exceptions.badRequestErr(req, e));
            }
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

            let userId = req.user.userId;
            let rowExists = await AddressDetails.query()
                .select('SRU06_ADDRESS_D')
                .where('SRU03_USER_MASTER_D', userId);

            if (rowExists.length > 0) {
                await AddressDetails.query()
                    .findById(userId)
                    .patch({
                        SRU03_USER_MASTER_D: userId,
                        SRU06_LINE_1_N: req.body.userAddress,
                        SRU06_ADDRESS_TYPE_D: AddressType.PERMANENT,
                        SRU06_LOCATION_LATITUDE_N: req.body.latitude,
                        SRU06_LOCATION_LATITUDE_N: req.body.longitude,
                        SRU06_UPDATED_D: userId
                    });
            } else {
                // User Address
                await AddressDetails.query().insert({
                    SRU03_USER_MASTER_D: userId,
                    SRU06_LINE_1_N: req.body.userAddress,
                    SRU06_ADDRESS_TYPE_D: AddressType.PERMANENT,
                    SRU06_LOCATION_LATITUDE_N: req.body.latitude,
                    SRU06_LOCATION_LONGITUDE_N: req.body.longitude,
                    SRU06_CREATED_D: userId
                });
            }

            await UserDetails.query().where('SRU03_USER_MASTER_D', userId)
                .patch({
                    SRU04_GENDER_D: req.body.gender,
                    SRU04_PHONE_N: req.body.phone,
                    SRU04_EXPERIENCE_D: req.body.experience,
                    SRU04_WORKING_WITH_OTHERS: req.body.workingWithOthers,
                    SRU04_OTHER_SERVICE_INFO: req.body.otherServiceInfo
                });

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
                    SRU03_USER_MASTER_D: req.user.userId,
                    SRU05_NAME: DocumentName.FINANCIAL,
                    SRU01_TYPE_D: DocumentType.FINANCIAL,
                    SRU02_STATUS_D: DocumentStatus.VERIFIED,
                    SRU05_DOCUMENT_I: attachment,
                    SRU05_CREATED_D: req.user.userId
                });

                // await FinancialDetails.query().insert({
                //     SRU03_USER_MASTER_D: req.user.userId,
                //     SRU08_ACCOUNT_N: accountNumber,
                //     SRU08_CREATED_D: req.user.userId
                // });

            } else {
                await FinancialDetails.query().delete().where({
                    SRU03_USER_MASTER_D: req.user.userId
                })
                await AddressDetails.query().delete().where({
                    SRU03_USER_MASTER_D: req.user.userId
                })

                await FinancialDetails.query().insert({
                    SRU03_USER_MASTER_D: req.user.userId,
                    SRU08_BANK_N: bankName,
                    SRU08_ACCOUNT_N: accountNumber,
                    SRU08_INSTITUTION_N: institutionNumber,
                    SRU08_TRANSIT_N: transitNumber,
                    SRU08_CREATED_D: req.user.userId,
                });

                await AddressDetails.query().insert({
                    SRU03_USER_MASTER_D: req.user.userId,
                    SRU06_LINE_1_N: address,
                    SRU06_ADDRESS_TYPE_D: AddressType.FINANCIAL,
                    SRU06_LOCATION_LATITUDE_N: latitude,
                    SRU06_LOCATION_LONGITUDE_N: longitude,
                    SRU06_CREATED_D: req.user.userId,
                });
            }

            await UserDetails.query()
                .update({ SRU04_SIGNUP_STATUS_D: SignUpStatus.COMPLETED })
                .where('SRU03_USER_MASTER_D', req.user.userId);

            const driver = await this._getDriverDetails(req, res, req.user.userId);

            if (driver) {

                let emailToken = encrypt(JSON.stringify({
                    emailId: req.user.emailId,
                    userId: req.user.userId
                }));

                const token = encrypt(JSON.stringify({
                    emailId: req.user.emailId,
                    userId: req.user.userId,
                    for: "BEAMS"
                }));

                let host = req.protocol + '://' + req.get('host');
                driver.verifyEmailLink = `${host}/or1.0/v1/api/user/verify_email?token=${emailToken}`;
                driver.beamstoken = token

                this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.passMessages.driverCreated);
            }

            //TODO: Send the mail
            return await mailer.signUp(
                req.user.firstName,
                req.user.emailId,
                req.user.verifyEmailLink
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
            await UserDocument.query().insert(
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

            //get All users List (Driver)
            const driver = await this._getDriverDetails(req, res, userId);
            if (driver) {
                return this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.passMessages.updated);
            }

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
                .eager('[userDetails, addressDetails, experienceDetails,DriverspecialityDetails,DriverLanguage,financialDetails, documents]')
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
                }).modifyEager('DriverspecialityDetails', (builder) => {
                    builder.select(driverSpecialityDetailsColumns)
                }).modifyEager('DriverLanguage', (builder) => {
                    builder.select(driverLanguageColumns)
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
            const speciality = await SpecialityTraining.query().select(driverSpecialityColumns);
            const experienceList = await ExperienceList.query().select(experienceListColumns);
            const validYear = await Validyear.query().select(validyearColumns);
            const languageList = await AllLanguages.query().select(allLanguageColumns);
             console.log(languageList);
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
}


export default new DriverController();
