import BaseController from '../baseController';
import UserController from '../user/user.controller';
import { raw } from 'objection'
import Users from "../user/model/user.model";
import { decrypt, encrypt } from "../../utils/cipher";
import {
    AddressType,
    DocumentName,
    DocumentStatus,
    DocumentType,
    EmailStatus,
    SignUpStatus,
    UserRole,
    UserStatus
} from "../../constants";
import { genHash, genHmac256, mailer } from "../../utils";
import UserDetails from "../user/model/userDetails.model";
import AddressDetails from "../user/model/address.model";
import VehicleDetails from "./model/vehicle.model";
import FinancialDetails from "./model/financial.model";
import UserDocument from "../user/model/userDocument.model";
import screenCanada from '../../interserviceApi/screeningCanada/screeningCanadaApi'

import { columns, userAddressColumns, userDocumentColumns, userFinancialColumns } from "../user/model/user.columns";
import { driverUserDetailsColumns, driverVehicleColumns } from "./model/driver.columns";
import { signUpStatus } from '../../utils/mailer';

let profilePath = `http://${process.env.PUBLIC_UPLOAD_LINK}:${process.env.PORT}/`;

//Screening Canada
const SC_REDIRECTURL = process.env.SC_REDIRECT_URL;

class DriverController extends BaseController {

    constructor() {
        super();
    }

    /**
     * @DESC : Create driver
     * @return array/json
     * @param req
     * @param res
     */
    createDriver = async (req, res) => {
        try {
            // Create user
            let result = await Users.query().insert({
                SRU03_FIRST_N: req.body.firstName,
                SRU03_LAST_N: req.body.lastName,
                SRU03_EMAIL_N: req.body.emailId,
                SRU03_TYPE_D: UserRole.DRIVER_R,
                SRU03_STATUS_D: UserStatus.ACTIVE,
                SRU03_PASSWORD_N: genHash(req.body.password),
                SRU03_CREATED_D: req.user.userId
            });

            let insertResult = {
                userId: result.SRU03_USER_MASTER_D,
                firstName: result.SRU03_FIRST_N,
                lastName: result.SRU03_LAST_N,
                emailId: result.SRU03_EMAIL_N,
                activeStatus: result.SRU03_STATUS_D,
            };

            // Insert user details
            const {
                phone,
                age,
                gender,
                experience,
                profilePicture,
                workingWithOthers,
                otherServiceInfo
            } = req.body.personalDetails;

            await UserDetails.query().insert({
                SRU03_USER_MASTER_D: insertResult.userId,
                SRU04_PHONE_N: phone,
                SRU04_AGE_D: age,
                SRU04_GENDER_D: gender,
                SRU04_EXPERIENCE_D: experience,
                SRU04_PROFILE_I: profilePicture,
                SRU04_WORKING_WITH_OTHERS: workingWithOthers || 0,
                SRU04_OTHER_SERVICE_INFO: otherServiceInfo,
                SRU04_CREATED_D: req.user.userId,
                SRU04_EMAIL_STATUS_D: EmailStatus.VERIFIED,
                SRU04_SIGNUP_STATUS_D: SignUpStatus.VERIFIED,
            });
            insertResult.profilePicture = profilePicture;

            // Insert address details
            const {
                address
            } = req.body.personalDetails;

            await AddressDetails.query().insert({
                SRU03_USER_MASTER_D: insertResult.userId,
                SRU06_LINE_1_N: address,
                SRU06_ADDRESS_TYPE_D: AddressType.PERMANENT,
                SRU06_CREATED_D: req.user.userId,
            });

            // Insert vehicle details
            const {
                type,
                make,
                model,
                vin,
                color,
                licensePlate,
                seatsUp,
                seatsDown
            } = req.body.vehicleDetails;

            await VehicleDetails.query().insert({
                SRU03_USER_MASTER_D: insertResult.userId,
                SRU07_TYPE_N: type,
                SRU07_MAKE_N: make,
                SRU07_MODEL_N: model,
                SRU07_VIN_N: vin,
                SRU07_COLOR_N: color,
                SRU07_LICENSE_PLATE_N: licensePlate,
                SRU07_SEATS_UP_N: seatsUp,
                SRU07_SEATS_DOWN_N: seatsDown,
                SRU07_CREATED_D: req.user.userId,
            });

            // Insert financial details
            const {
                bankName,
                accountNumber,
                institutionNumber,
                transitNumber,
                attachment
            } = req.body.financialDetails;

            await FinancialDetails.query().insert({
                SRU03_USER_MASTER_D: insertResult.userId,
                SRU08_BANK_N: bankName,
                SRU08_ACCOUNT_N: accountNumber,
                SRU08_INSTITUTION_N: institutionNumber,
                SRU08_TRANSIT_N: transitNumber,
                SRU08_CREATED_D: req.user.userId,
            });

            let documents = [];
            // Insert financial attachment if available
            if (attachment) {
                documents.push({
                    SRU03_USER_MASTER_D: insertResult.userId,
                    SRU05_NAME: "Financial document",
                    SRU01_TYPE_D: DocumentType.FINANCIAL,
                    SRU02_STATUS_D: DocumentStatus.VERIFIED,
                    SRU05_DOCUMENT_I: attachment,
                    SRU05_CREATED_D: req.user.userId,
                });
            }

            //TODO: Batch insert not supported it fires multiple queries :)
            // Insert driver documents
            const {
                license,
                pcc,
                insurance,
                ownership,
            } = req.body.driverDocuments;
            documents.push(
                {
                    SRU03_USER_MASTER_D: insertResult.userId,
                    SRU05_NAME: "License document",
                    SRU01_TYPE_D: DocumentType.LICENSE,
                    SRU02_STATUS_D: DocumentStatus.VERIFIED,
                    SRU05_DOCUMENT_I: license,
                    SRU05_CREATED_D: req.user.userId,
                },
                {
                    SRU03_USER_MASTER_D: insertResult.userId,
                    SRU05_NAME: "PCC document",
                    SRU01_TYPE_D: DocumentType.PCC,
                    SRU02_STATUS_D: DocumentStatus.VERIFIED,
                    SRU05_DOCUMENT_I: pcc,
                    SRU05_CREATED_D: req.user.userId,
                },
                {
                    SRU03_USER_MASTER_D: insertResult.userId,
                    SRU05_NAME: "Insurance document",
                    SRU01_TYPE_D: DocumentType.INSURANCE,
                    SRU02_STATUS_D: DocumentStatus.VERIFIED,
                    SRU05_DOCUMENT_I: insurance,
                    SRU05_CREATED_D: req.user.userId,
                },
                {
                    SRU03_USER_MASTER_D: insertResult.userId,
                    SRU05_NAME: "Ownership document",
                    SRU01_TYPE_D: DocumentType.OWNERSHIP,
                    SRU02_STATUS_D: DocumentStatus.VERIFIED,
                    SRU05_DOCUMENT_I: ownership,
                    SRU05_CREATED_D: req.user.userId,
                }
            );

            await UserDocument.query().insertGraph(documents);

            const driver = await this._getDriverDetails(req, res, insertResult.userId);
            if (driver) {
                this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.passMessages.driverCreated);

                let resetToken = UserController.createResetPasswordToken({
                    emailId: insertResult.emailId,
                    userId: insertResult.userId
                });

                let setPasswordLink = `${process.env.RESET_PASSWORD_LINK}?token=${resetToken}`;

                // TODO: Send email with link and token:
                return await mailer.accountCreated({
                    firstName: result.SRU03_FIRST_N,
                    emailId: result.SRU03_EMAIL_N,
                    password: req.body.password,
                    typeId: UserRole.DRIVER_R
                }, setPasswordLink);
            }

        } catch (e) {
            return this.internalServerError(req, res, e);
        }

    };

    /**
     * @DESC : Update driver
     * @return array/json
     * @param req
     * @param res
     */
    updateDriver = async (req, res) => {
        try {
            const userId = req.params.userId;
            const updatedBy = req.user.userId;

            let result = await Users.query().patchAndFetchById(userId, {
                SRU03_FIRST_N: req.body.firstName,
                SRU03_LAST_N: req.body.lastName,
                SRU03_UPDATED_D: updatedBy
            });

            if (result) {

                let updateResult = {
                    userId: result.SRU03_USER_MASTER_D,
                    firstName: result.SRU03_FIRST_N,
                    lastName: result.SRU03_LAST_N,
                    emailId: result.SRU03_EMAIL_N,
                    activeStatus: result.SRU03_STATUS_D,
                };

                // Update user details
                const {
                    phone,
                    age,
                    gender,
                    experience,
                    profilePicture,
                    workingWithOthers
                } = req.body.personalDetails;

                await UserDetails.query().patch({
                    SRU04_PHONE_N: phone,
                    SRU04_AGE_D: age,
                    SRU04_GENDER_D: gender,
                    SRU04_EXPERIENCE_D: experience,
                    SRU04_PROFILE_I: profilePicture,
                    SRU04_UPDATED_D: updatedBy,
                    SRU04_EMAIL_STATUS_D: EmailStatus.VERIFIED,
                    SRU04_WORKING_WITH_OTHERS: workingWithOthers || 0,
                }).where({
                    SRU03_USER_MASTER_D: userId
                });

                updateResult.profilePicture = profilePicture;

                // Update address details
                const {
                    address,
                    latitude,
                    longitude
                } = req.body.personalDetails;

                await AddressDetails.query().patch({
                    SRU06_LINE_1_N: address,
                    SRU06_UPDATED_D: updatedBy,
                    SRU06_LOCATION_LATITUDE_N: latitude,
                    SRU06_LOCATION_LONGITUDE_N: longitude,
                }).where({
                    SRU03_USER_MASTER_D: userId
                });

                // Update vehicle details
                const {
                    type,
                    make,
                    model,
                    vin,
                    color,
                    licensePlate,
                    seatsUp,
                    seatsDown
                } = req.body.vehicleDetails;

                await VehicleDetails.query().patch({
                    SRU07_TYPE_N: type,
                    SRU07_MAKE_N: make,
                    SRU07_MODEL_N: model,
                    SRU07_VIN_N: vin,
                    SRU07_COLOR_N: color,
                    SRU07_LICENSE_PLATE_N: licensePlate,
                    SRU07_SEATS_UP_N: seatsUp,
                    SRU07_SEATS_DOWN_N: seatsDown,
                    SRU07_UPDATED_D: updatedBy,
                }).where({
                    SRU03_USER_MASTER_D: userId
                });

                // Update financial details
                let {
                    bankName,
                    accountNumber,
                    institutionNumber,
                    transitNumber,
                    attachment
                } = req.body.financialDetails;


                await FinancialDetails.query().patch({
                    SRU08_BANK_N: bankName,
                    SRU08_ACCOUNT_N: accountNumber,
                    SRU08_INSTITUTION_N: institutionNumber,
                    SRU08_TRANSIT_N: transitNumber,
                    SRU08_UPDATED_D: updatedBy,
                }).where({
                    SRU03_USER_MASTER_D: userId
                });

                // Update financial attachment if available
                if (attachment) {
                    let updatedAttachment = await UserDocument.query().patch({
                        SRU05_DOCUMENT_I: attachment,
                        SRU05_UPDATED_D: updatedBy,
                    }).where({
                        SRU03_USER_MASTER_D: userId,
                        SRU01_TYPE_D: DocumentType.FINANCIAL,
                    });
                    if (!updatedAttachment) {
                        await UserDocument.query().insert({
                            SRU03_USER_MASTER_D: userId,
                            SRU05_NAME: "Financial document",
                            SRU02_STATUS_D: DocumentStatus.VERIFIED,
                            SRU01_TYPE_D: DocumentType.FINANCIAL,
                            SRU05_DOCUMENT_I: attachment,
                            SRU05_CREATED_D: updatedBy,
                        });
                    }

                } else {
                    await UserDocument.query().delete().where({
                        SRU03_USER_MASTER_D: userId,
                        SRU01_TYPE_D: DocumentType.FINANCIAL,
                    });
                }

                if (req.body.driverDocuments) {

                    //TODO: Batch insert not supported it fires multiple queries :)
                    // Update driver documents
                    const {
                        license,
                        pcc,
                        insurance,
                        ownership,
                    } = req.body.driverDocuments;

                    // Update license document if available
                    if (license) {
                        await UserDocument.query().patch({
                            SRU05_DOCUMENT_I: license,
                            SRU05_UPDATED_D: updatedBy,
                        }).where({
                            SRU03_USER_MASTER_D: userId,
                            SRU01_TYPE_D: DocumentType.LICENSE,
                        });
                    }

                    // Update PCC document if available
                    if (pcc) {
                        await UserDocument.query().patch({
                            SRU05_DOCUMENT_I: pcc,
                            SRU05_UPDATED_D: updatedBy,
                        }).where({
                            SRU03_USER_MASTER_D: userId,
                            SRU01_TYPE_D: DocumentType.PCC,
                        });
                    }

                    // Update Insurance document if available
                    if (insurance) {
                        await UserDocument.query().patch({
                            SRU05_DOCUMENT_I: insurance,
                            SRU05_UPDATED_D: updatedBy,
                        }).where({
                            SRU03_USER_MASTER_D: userId,
                            SRU01_TYPE_D: DocumentType.INSURANCE,
                        });
                    }

                    // Update Ownership document if available
                    if (ownership) {
                        await UserDocument.query().patch({
                            SRU05_DOCUMENT_I: ownership,
                            SRU05_UPDATED_D: updatedBy,
                        }).where({
                            SRU03_USER_MASTER_D: userId,
                            SRU01_TYPE_D: DocumentType.OWNERSHIP,
                        });
                    }
                }

                const driver = await this._getDriverDetails(req, res, userId);
                if (driver) {
                    return this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.passMessages.driverUpdated);
                }
            }

            this.userNotFound(req, res);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC :Create Driver Profile
     * @param string/Integer/object
     * @return array/json
     */
    CreateDriverProfile = async (req, res) => {//fromApp
        try {
            // Insert user details
            const {
                userAddress,
                phone,
                age,
                gender,
                experience,
                workingWithOthers,
                otherServiceInfo,
                latitude,
                longitude,
                userprofile,
                postalCode
            } = req.body;

            let ActiveUser = req.user;
            let UserDetailsResponse = await UserDetails.query()
                .findOne('SRU03_USER_MASTER_D', ActiveUser.userId).select(driverUserDetailsColumns)

            if (UserDetailsResponse) {
                await UserDetails.query()
                    .patchAndFetchById(UserDetailsResponse.detailsId, {
                        SRU04_AGE_D: age || UserDetailsResponse.age,
                        SRU04_GENDER_D: gender || UserDetailsResponse.gender,
                        SRU04_EXPERIENCE_D: parseInt(experience),
                        SRU04_CREATED_D: req.user.userId,
                        SRU04_UPDATED_D: req.user.userId,
                        SRU04_PROFILE_I: userprofile,
                        SRU04_WORKING_WITH_OTHERS: workingWithOthers && 1 || 0, //(workingWithOthers !== "no" || workingWithOthers !== "false") && 1 || 0,
                        SRU04_PHONE_N: phone,
                        SRU04_OTHER_SERVICE_INFO: workingWithOthers ? otherServiceInfo : null, //(workingWithOthers !== "no" || workingWithOthers !== "false") && otherServiceInfo || null,                        
                    });

            } else {
                await UserDetails.query().insert({
                    SRU03_USER_MASTER_D: ActiveUser.userId,
                    SRU04_AGE_D: age,
                    SRU04_GENDER_D: gender,
                    SRU04_EXPERIENCE_D: parseInt(experience),
                    SRU04_PROFILE_I: userprofile,
                    SRU04_CREATED_D: ActiveUser.userId,
                    SRU04_UPDATED_D: ActiveUser.userId,
                    SRU04_WORKING_WITH_OTHERS: workingWithOthers && 1 || 0,//(workingWithOthers !== "no" || workingWithOthers !== "false") && 1 || 0,
                    SRU04_PHONE_N: phone,
                    SRU04_OTHER_SERVICE_INFO: workingWithOthers ? otherServiceInfo : null, // (workingWithOthers !== "no" || workingWithOthers !== "false") && otherServiceInfo || null,
                    // SRU04_EMAIL_STATUS_D: EmailStatus.PENDING, //TODO:  Temporary for testing
                    SRU04_SIGNUP_STATUS_D: signUpStatus.VEHICLE_DETAILS,
                }).select(driverUserDetailsColumns);
            }

            let addressResponse = await AddressDetails.query()
                .findOne('SRU03_USER_MASTER_D', ActiveUser.userId).select(userAddressColumns)


            if (addressResponse) {
                let userAddressResponse = await AddressDetails.query()
                    .patchAndFetchById(addressResponse.addressId, {
                        SRU03_USER_MASTER_D: ActiveUser.userId,
                        SRU06_LINE_1_N: userAddress,
                        SRU06_ADDRESS_TYPE_D: AddressType.PERMANENT,
                        SRU06_POSTAL_CODE_N: postalCode || null,
                        SRU06_LOCATION_LATITUDE_N: latitude,
                        SRU06_LOCATION_LONGITUDE_N: longitude,
                        SRU06_CREATED_D: ActiveUser.userId,
                        SRU06_UPDATED_D: ActiveUser.userId,
                    });
            } else {
                // User Address
                let userAddressResponse = await AddressDetails.query().insert({
                    SRU03_USER_MASTER_D: req.user.userId,
                    SRU06_LINE_1_N: userAddress,
                    SRU06_ADDRESS_TYPE_D: AddressType.PERMANENT,
                    SRU06_POSTAL_CODE_N: postalCode || null,
                    SRU06_LOCATION_LATITUDE_N: latitude,
                    SRU06_LOCATION_LONGITUDE_N: longitude,
                    SRU06_CREATED_D: ActiveUser.userId,
                    SRU06_UPDATED_D: ActiveUser.userId,
                });
            }
            return this.success(req, res, this.status.HTTP_OK, {
                ...req.body,
                userprofile: req.body.userprofile
            }, this.messageTypes.successMessages.added);


        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
     * @DESC : Update Driver Details (Callback)
     * @param string/Integer/object
     * @return array/json
     */
    CreateVehicleDetails = async (req, res) => {
        try {

            let ActiveUser = req.user;
            let vehicleDetails = await VehicleDetails.query().delete().where('SRU03_USER_MASTER_D', ActiveUser.userId);

            let uservehiclesResponse = await VehicleDetails.query().insert({
                SRU03_USER_MASTER_D: ActiveUser.userId,
                SRU07_TYPE_N: req.body.vehicleType,
                SRU07_MAKE_N: req.body.make,
                SRU07_MODEL_N: req.body.model,
                SRU07_VIN_N: req.body.vin,
                SRU07_COLOR_N: req.body.color,
                SRU07_LICENSE_PLATE_N: req.body.licensePlate,
                SRU07_SEATS_UP_N: req.body.seatsUp,
                SRU07_SEATS_DOWN_N: req.body.seatsDown,
                SRU07_CREATED_D: ActiveUser.userId,
                SRU07_UPDATED_D: ActiveUser.userId
            });

            let userDetailsResponse = await UserDetails.query()
                .update({ SRU04_SIGNUP_STATUS_D: SignUpStatus.DRIVER_DOCUMENTS })
                .where('SRU03_USER_MASTER_D', ActiveUser.userId);

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

            await VehicleDetails.query().delete().where('SRU03_USER_MASTER_D', ActiveUser.userId);
            await AddressDetails.query().delete().where('SRU03_USER_MASTER_D', ActiveUser.userId);

            return this.success(req, res, this.status.HTTP_OK, null, this.messageTypes.successMessages.deleted);

        } catch (e) {
            console.log(e);
            return this.internalServerError(req, res, e);
        }
    }

    driverDocuments = async (req, res) => {
        try {
            const token = encrypt(JSON.stringify({
                emailId: req.user.emailId,
                userId: req.user.userId,
                for: "SC"
            }));
            let result = await screenCanada.createFiles(req, token)

            // let string = `GET\\996b9958c54363f99876844c6efc2ce8\\ntext/html\\n1569607203`;
            // console.log(string);

            // let key = "02b6ce79-3ad4-4a5b-97c8-0b38d0899270"
            // let data = crypto.createHmac('sha256', key).update(string).digest("hex");
            // let buff = new Buffer(data);
            // let base64data = buff.toString('base64');

            // console.log(encodeURIComponent(base64data));

            let redirectUrl = `${SC_REDIRECTURL}/or1.0/v1/driver/sc_redirect_url?token=${token}`
            if (result && result.data && result.data.confirmationUrl) {
                let hmacString = genHmac256(result.data.confirmationUrl.split('/activate/')[1])
                let data = {
                    consentUrl: `${result.data.consentUrl}?${hmacString}`,
                    confirmationUrl: `${result.data.confirmationUrl}?${hmacString}`,
                    consentUrlTest: result.data.consentUrl,
                    confirmationUrlTest: result.data.confirmationUrl,
                    redirectUrl: redirectUrl
                }

                result.data = { ...data, }

            } else {
                return this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.messageTypes.errors.badRequest);
            }


            return this.success(req, res, this.status.HTTP_OK, result.data, this.messageTypes.successMessages.successful);


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

                await FinancialDetails.query().insert({
                    SRU03_USER_MASTER_D: req.user.userId,
                    SRU08_ACCOUNT_N: accountNumber,
                    SRU08_CREATED_D: req.user.userId
                });

            } else {
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
                return this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.passMessages.driverCreated);
            }

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    //FROM SCREENING CANADA
    updateSC_Status = async (req, res) => {
        try {
            const token = req.query.token;
            if (token) {
                let decrypted = decrypt(token);
                if (decrypted) {
                    let payload = JSON.parse(decrypted);
                    if (payload.for === "SC") {
                        let result = await UserDetails.query().patch({
                            SRU04_SIGNUP_STATUS_D: SignUpStatus.SC_VERIFICATION,
                        }).where({
                            SRU03_USER_MASTER_D: payload.userId
                        });
                        if (result) {
                            return this.success(req, res, this.status.HTTP_OK, null, this.messageTypes.passMessages.driverUpdated);
                        }
                    }
                }
            }
            this.userInvalidToken(req, res);
        } catch (e) {
            this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Upload driver Documents - Mobile APP
     * @return array/json
     * @param req
     * @param res
     * @param userId
     */
    UploaddriverDocuments = async (req, res) => {
        try {
            let documents = [];
            const {
                driverDocument,
                ownership,
            } = req.body;
            documents.push(
                {
                    SRU03_USER_MASTER_D: req.user.userId,
                    SRU05_NAME: DocumentName.INSURANCE,
                    SRU01_TYPE_D: DocumentType.INSURANCE,
                    SRU02_STATUS_D: DocumentStatus.PENDING,
                    SRU05_DOCUMENT_I: driverDocument,
                    SRU05_CREATED_D: req.user.userId,
                },
                {
                    SRU03_USER_MASTER_D: req.user.userId,
                    SRU05_NAME: DocumentName.OWNERSHIP,
                    SRU01_TYPE_D: DocumentType.OWNERSHIP,
                    SRU02_STATUS_D: DocumentStatus.PENDING,
                    SRU05_DOCUMENT_I: ownership,
                    SRU05_CREATED_D: req.user.userId,
                }
            );

            await UserDocument.query().insertGraph(documents);

            await UserDetails.query()
                .update({ SRU04_SIGNUP_STATUS_D: SignUpStatus.FINANCIAL_DETAILS })
                .where('SRU03_USER_MASTER_D', req.user.userId);

            const driver = await this._getDriverDetails(req, res, req.user.userId);
            if (driver) {
                this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.passMessages.driverCreated);
            }


        } catch (e) {
            console.log(e);
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
                .eager('[userDetails, addressDetails, vehicleDetails, financialDetails, documents]')
                .modifyEager('userDetails', (builder) => {
                    builder.select(driverUserDetailsColumns)
                    // builder.select(raw(`CONCAT("${profilePath}", SRU04_PROFILE_I) as userprofile`))
                }).modifyEager('addressDetails', (builder) => {
                    builder.select(userAddressColumns)
                }).modifyEager('vehicleDetails', (builder) => {
                    builder.select(driverVehicleColumns)
                }).modifyEager('financialDetails', (builder) => {
                    builder.select(userFinancialColumns)
                }).modifyEager('documents', (builder) => {
                    builder.select(userDocumentColumns)
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
}


export default new DriverController();
