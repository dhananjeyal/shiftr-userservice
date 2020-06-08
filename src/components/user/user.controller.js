import { decrypt, encrypt } from "../../utils/cipher";
import moment from "moment";
import { raw } from 'objection';
import BaseController from '../baseController';
import DriverController from '../driver/driver.controller';
import Users from './model/user.model'
import UserDetails from './model/userDetails.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { adminListColumns, columns, userAddressColumns, userDetailsColumns, userListColumns, userEmailDetails, usersColumns, tripUserDetailsColumns, adminReportListColumns } from "./model/user.columns";
import { DocumentType, EmailStatus, SignUpStatus, UserRole, UserStatus, NotifyType, AddressType, CountryType, booleanType, WebscreenType, phonenumbertype, EmailContents, tripTypes, subscriptionStatus } from "../../constants";
import { genHash, mailer } from "../../utils";
import UserDocument from "./model/userDocument.model";
import VehicleDetails from "../driver/model/vehicle.model";
import NotifyService from "../../services/notifyServices";
import ExperienceDetails from "../driver/model/driverExperience.model";
import FinancialDetails from "../driver/model/financial.model";
import AddressDetails from "../user/model/address.model";
import { driverFinancialColumns, driverExperienceColumns, driverExpSpecialityColumns, contactInfoColumns, driverSpecialityTrainingColumns, driverLanguageColumns, omitDriverSpecialityColumns, reportsDriverExperienceColumns } from "../driver/model/driver.columns";
import SpecialityDetails from "../driver/model/driverspeciality.model";
import ContactInfo from "../driver/model/contactInfo.model";
import Language from "../driver/model/language.model";

let profilePath = `http://${process.env.PUBLIC_UPLOAD_LINK}:${process.env.PORT}/`;


class UserController extends BaseController {

    constructor() {
        super();
    }

    createResetPasswordToken = (data) => {
        return encrypt(JSON.stringify({
            ...data,
            createdAt: moment()
        }));
    };

    /**
     * @DESC : Sign up for Driver and Customer
     * @return array/json
     * @param req
     * @param res
     */
    signUp = async (req, res) => {
        try {

            const userType = parseInt(req.headers['user-type']);

            // Create user
            let result = await Users.query().insert({
                SRU03_FIRST_N: req.body.firstName,
                SRU03_LAST_N: req.body.lastName,
                SRU03_EMAIL_N: req.body.emailId,
                SRU03_PASSWORD_N: genHash(req.body.password),
                SRU03_TYPE_D: userType,
                SRU03_STATUS_D: UserStatus.ACTIVE,
            });

            let insertResult = {
                userId: result.SRU03_USER_MASTER_D,
                firstName: result.SRU03_FIRST_N,
                lastName: result.SRU03_LAST_N,
                emailId: result.SRU03_EMAIL_N,
            };

            let signUpStatus = SignUpStatus.COMPLETED;

            if (userType === UserRole.DRIVER_R) {
                signUpStatus = SignUpStatus.PERSONAL_DETAILS;
            }
            // Insert user details
            await UserDetails.query().insert({
                SRU03_USER_MASTER_D: insertResult.userId,
                SRU04_PHONE_N: req.body.phoneNo,
                SRU04_EMAIL_STATUS_D: EmailStatus.PENDING,
                SRU04_SIGNUP_STATUS_D: signUpStatus,
            });

            let emailToken = encrypt(JSON.stringify({
                emailId: insertResult.emailId,
                userId: insertResult.userId
            }));

            const token = encrypt(JSON.stringify({
                emailId: insertResult.emailId,
                userId: insertResult.userId,
                for: "BEAMS"
            }));

            let host = req.protocol + '://' + req.get('host');
            insertResult.verifyEmailLink = `${host}/or1.0/v1/api/user/verify_email?token=${emailToken}`;
            insertResult.beamstoken = token



            this.success(req, res, this.status.HTTP_OK, insertResult, this.messageTypes.passMessages.userCreated);

            // TODO: Send the mail
            return await mailer.signUp(
                insertResult.firstName,
                insertResult.emailId,
                insertResult.verifyEmailLink
            );

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Busowner /Travels signup
     * @return array/json
     * @param req
     * @param res
     */
    travelsSignup = async (req, res) => {
        try {

            const userType = parseInt(req.headers['user-type']);

            // Create user
            let result = await Users.query().insert({
                SRU03_FIRST_N: req.body.firstName,
                SRU03_LAST_N: req.body.lastName,
                SRU03_EMAIL_N: req.body.emailId,
                SRU03_PASSWORD_N: genHash(req.body.password),
                SRU03_TYPE_D: userType,
                SRU03_STATUS_D: UserStatus.ACTIVE,
            });

            let insertResult = {
                userId: result.SRU03_USER_MASTER_D,
                firstName: result.SRU03_FIRST_N,
                lastName: result.SRU03_LAST_N,
                emailId: result.SRU03_EMAIL_N,
            };

            let signUpStatus = SignUpStatus.COMPLETED;

            // Insert user details
            await UserDetails.query().insert({
                SRU03_USER_MASTER_D: insertResult.userId,
                SRU04_COMPANY_NAME_N: req.body.compnayName,
                SRU04_NUMBER_OF_BUSES_R: req.body.numberofBuses,
                SRU04_PHONE_N: req.body.phoneNo,
                SRU04_EMAIL_STATUS_D: EmailStatus.PENDING,
                SRU04_SIGNUP_STATUS_D: signUpStatus,
                SRU04_ACTIVE_SUBSCRIPTION_PLAN_F: subscriptionStatus.GUESTUSER
            });

            const phoneNumbers = [];
            //Format data
            req.body.phones.map((data) => {
                phoneNumbers.push({
                    SRU03_USER_MASTER_D: insertResult.userId,
                    SRU01_TYPE_D: data.phonuemberType,
                    SRU19_CONTACT_PERSON_N: data.contactPerson,
                    SRU19_PHONE_R: data.phoneNumber
                });
            });

            //Insert contact Info
            await ContactInfo.query()
                .insertGraph(phoneNumbers);

            await AddressDetails.query()
                .insert({
                    SRU03_USER_MASTER_D: insertResult.userId,
                    SRU06_LINE_1_N: req.body.address1,
                    SRU06_LINE_2_N: req.body.address2,
                    SRU06_POSTAL_CODE_N: req.body.postalCode,
                    SRU06_ADDRESS_TYPE_D: AddressType.RESIDENTIAL,
                    SRU06_LOCATION_LATITUDE_N: req.body.latitude,
                    SRU06_LOCATION_LONGITUDE_N: req.body.longitude
                });

            let emailToken = encrypt(JSON.stringify({
                emailId: insertResult.emailId,
                userId: insertResult.userId
            }));

            const token = encrypt(JSON.stringify({
                emailId: insertResult.emailId,
                userId: insertResult.userId,
                for: "BEAMS"
            }));

            let host = req.protocol + '://' + req.get('host');
            insertResult.verifyEmailLink = `${host}/or1.0/v1/api/user/verify_email?token=${emailToken}`;
            insertResult.token = token

            this.success(req, res, this.status.HTTP_OK, insertResult, this.messageTypes.passMessages.userCreated);

            //TODO: Send the mail
            return await mailer.signUp(
                insertResult.firstName,
                insertResult.emailId,
                insertResult.verifyEmailLink
            );

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Busowner /Travels Update
     * @return array/json
     * @param req
     * @param res
     */
    travelsUpdate = async (req, res) => {
        try {

            const userId = req.user.userId;

            const {
                screenType,
                firstName,
                lastName,
                compnayName,
                numberofBuses,
                contactInfo,
                contactDetails,
                addressId,
                address1,
                postalCode,
                latitude,
                longitude,
                userprofile,
                notificationflag
            } = req.body;

            if (screenType == WebscreenType.PROFILE) {

                // update user
                await Users.query()
                    .where("SRU03_USER_MASTER_D", userId)
                    .update({
                        SRU03_FIRST_N: firstName,
                        SRU03_LAST_N: lastName
                    });

                if (userprofile) {
                    // Update UserDetails
                    await UserDetails.query()
                        .where('SRU03_USER_MASTER_D', userId)
                        .update({
                            SRU04_PROFILE_I: userprofile,
                            SRU04_UPDATED_D: req.user.userId
                        });
                }

                if (contactInfo.length > 0) {
                    //Update contact Info
                    const contactInfoData = [];
                    contactInfo.forEach(contactvalue => {
                        contactInfoData.push({
                            SRU19_CONTACT_INFO_D: contactvalue.contactinfoId,
                            SRU03_USER_MASTER_D: userId,
                            SRU19_CONTACT_PERSON_N: contactvalue.contactPerson,
                            SRU19_PHONE_R: contactvalue.phoneNumber,
                            SRU01_TYPE_D: contactvalue.phoneNumberType
                        });
                    });

                    await ContactInfo.query()
                        .upsertGraph(contactInfoData);
                }

                if (contactDetails.length > 0) {
                    //Insert contact Info
                    const contactInfodetailsData = [];
                    contactDetails.forEach(contactvalue => {
                        contactInfodetailsData.push({
                            SRU03_USER_MASTER_D: userId,
                            SRU19_CONTACT_PERSON_N: contactvalue.contactPerson,
                            SRU19_PHONE_R: contactvalue.phoneNumber,
                            SRU01_TYPE_D: contactvalue.phoneNumberType
                        });
                    });
                    await ContactInfo.query()
                        .insertGraph(contactInfodetailsData);
                }

            }

            if (screenType == WebscreenType.COMPANY) {
                // Insert user details
                await UserDetails.query()
                    .where('SRU03_USER_MASTER_D', userId)
                    .update({
                        SRU04_COMPANY_NAME_N: compnayName,
                        SRU04_NUMBER_OF_BUSES_R: numberofBuses,
                        SRU04_UPDATED_D: userId
                    });

                //Address Update
                await AddressDetails.query()
                    .where({
                        SRU06_ADDRESS_D: addressId,
                        SRU03_USER_MASTER_D: userId
                    })
                    .update({
                        SRU06_LINE_1_N: address1,
                        SRU06_POSTAL_CODE_N: postalCode,
                        SRU06_LOCATION_LATITUDE_N: latitude,
                        SRU06_LOCATION_LONGITUDE_N: longitude,
                        SRU06_UPDATED_D: userId
                    });
            }

            if (screenType == WebscreenType.SETTINGS) {
                // Update UserDetails
                await UserDetails.query()
                    .where('SRU03_USER_MASTER_D', userId)
                    .update({
                        SRU04_NOTIFICATION_SETTINGS_F: notificationflag
                    });
            }

            return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.updated);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Delete Contact Info
     * @return array/json
     * @param req
     * @param res
     */
    deleteContactInfo = async (req, res) => {
        try {

            const userId = req.user.userId;

            const { contactId } = req.params;

            await ContactInfo.query()
                .where({
                    SRU19_CONTACT_INFO_D: contactId,
                    SRU03_USER_MASTER_D: userId
                })
                .update({
                    SRU19_DELETED_F: booleanType.YES
                });
            return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.deleted);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
    * @DESC : Get user Contact Info
    * @return array/json
    * @param req
    * @param res
    */
    getContactInfo = async (req, res) => {
        try {
            const { userId } = req.params;

            const responseData = await UserDetails.query()
                .where({ SRU03_USER_MASTER_D: userId })
                .eager(`[userAddressDetails, contactInfo]`)
                .modifyEager('userAddressDetails', (builder) => {
                    builder.where({ SRU06_ADDRESS_TYPE_D: AddressType.FINANCIAL })
                        .orWhere({ SRU06_ADDRESS_TYPE_D: AddressType.PERMANENT })
                        .orWhere({ SRU06_ADDRESS_TYPE_D: AddressType.RESIDENTIAL })
                        .first()
                        .select(userAddressColumns)
                })
                .modifyEager('contactInfo', (builder) => {
                    builder.where({ SRU01_TYPE_D: phonenumbertype.OFFICE })
                        .orWhere({ SRU01_TYPE_D: phonenumbertype.PERSONAL })
                        .orWhere({ SRU01_TYPE_D: phonenumbertype.HOME })
                        .first()
                        .select('SRU19_PHONE_R as contactNumber')
                }).select("SRU04_PROFILE_I as profileImage");

            return this.success(req, res, this.status.HTTP_OK, responseData, this.messageTypes.successMessages.getAll);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
   * @DESC : Get user busOnwers address
   * @return array/json
   * @param req
   * @param res
   */
    busDriverDetailsReport = async (req, res) => {
        try {
            this._getAllReports(req, res, UserRole.DRIVER_R);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
    * @DESC : Get user busOnwers address
    * @return array/json
    * @param req
    * @param res
    */
    busOwnerDetailsReport = async (req, res) => {
        try {
            this._getAllReports(req, res, UserRole.CUSTOMER_R);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
    * @DESC : user report details.
    * @return array/json
    * @param req
    * @param res
    */

    _getAllReports = async (req, res, userType) => {
        try {

            const page = req.body.pagination.page;
            const chunk = req.body.pagination.chunk;

            let { startDate, endDate } = req.body.date;

            const threeMonthsBefore = moment(Date.now()).subtract(3, 'months').format('YYYY-MM-DD HH:mm:ss')

            startDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : threeMonthsBefore;
            endDate = endDate ? moment(endDate).format('YYYY-MM-DD HH:mm:ss') : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

            let where = {
                SRU03_TYPE_D: userType,
                "SRU03_USER_MASTER.SRU03_DELETED_F": null,
                "SRU04_USER_DETAIL.SRU04_SIGNUP_STATUS_D": SignUpStatus.COMPLETED
            };

            let userQuery = Users.query().where(where)
                .where(`SRU03_CREATED_AT`, '>=', startDate)
                .where(`SRU03_CREATED_AT`, '<=', endDate)
                .join(UserDetails.tableName,
                    `${UserDetails.tableName}.SRU03_USER_MASTER_D`,
                    `${Users.tableName}.SRU03_USER_MASTER_D`
                );

            let columnList = adminReportListColumns;

            if (userType === UserRole.DRIVER_R) {
                userQuery = userQuery.join(AddressDetails.tableName, `${AddressDetails.tableName}.SRU03_USER_MASTER_D`, `${Users.tableName}.SRU03_USER_MASTER_D`)
                    .where({ SRU06_ADDRESS_TYPE_D: AddressType.PERMANENT })
                    .groupBy(`${AddressDetails.tableName}.SRU03_USER_MASTER_D`);

                userQuery = userQuery.join(ExperienceDetails.tableName, `${ExperienceDetails.tableName}.SRU03_USER_MASTER_D`, `${Users.tableName}.SRU03_USER_MASTER_D`)
                    .groupBy(`${ExperienceDetails.tableName}.SRU03_USER_MASTER_D`);


                columnList = [...columnList, ...userAddressColumns, ...reportsDriverExperienceColumns];
            }

            if (userType === UserRole.CUSTOMER_R) {

                userQuery = userQuery.join(AddressDetails.tableName, `${AddressDetails.tableName}.SRU03_USER_MASTER_D`, `${Users.tableName}.SRU03_USER_MASTER_D`)
                    // .where({ SRU06_ADDRESS_TYPE_D: AddressType.PERMANENT })
                    .groupBy(`${AddressDetails.tableName}.SRU03_USER_MASTER_D`);

                columnList = [...columnList, ...userAddressColumns];
            }

            userQuery = await userQuery.select(columnList).page(page - 1, chunk);

            const pageMetaData = {
                chunk: chunk,
                total: userQuery.total,
                page: page,
                totalPages: Math.ceil(userQuery.total / chunk)
            };

            const result = {
                list: userQuery.results,
                pageMetaData
            };

            return this.success(req, res, this.status.HTTP_OK, result, this.messageTypes.successMessages.getAll);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
     * @DESC : Send email notification.
     * @return array/json
     * @param req
     * @param res
     */
    sendTripStatusNotication = async (req, res) => {
        try {
            const userId = req.body.userData.userId;
            const tripDetails = req.body.tripDetails;
            let user = await Users.query()
                .select(userEmailDetails)
                .where("SRU03_USER_MASTER_D", userId);

            if (!tripDetails.noMatchFound) {
                mailer.notifyBusOwner(
                    user[0],
                    tripDetails
                );
            } else {
                mailer.busOwnerEmail(
                    user[0],
                    tripDetails,
                    EmailContents.TRIP_NO_MATCH
                );
                mailer.superAdminEmail(tripDetails, EmailContents.TRIP_NO_MATCH);
            }
            return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.mailSent);

        } catch (error) {
            return this.internalServerError(req, res, error);
        }
    }

    /**
    * @DESC : Send email notification.
    * @return array/json
    * @param req
    * @param res
    */
    sendTripPendingNotication = async (req, res) => {
        try {
            const tripDetails = req.body.busOwnerTripDetails;

            const userIds = tripDetails.map(userId => userId.busownerId);

            let userDetail = await Users.query()
                .select(userEmailDetails)
                .whereIn("SRU03_USER_MASTER_D", userIds);

            for (const trip of tripDetails) {
                const user = userDetail.filter(matchUser => matchUser.userId == trip.busownerId);

                const tripDetail = {
                    companyName: trip.companyName,
                    tripCode: trip.tripCode,
                    type: trip.tripTypeId == booleanType.YES ? tripTypes.CHARTER_TRIP : tripTypes.SCHOOL_TRIP,
                    startDate: trip.scheduleDetails[0].startDate,
                    endDate: trip.scheduleDetails[0].endDate,
                    startTime: trip.scheduleDetails[0].startTime
                }

                await mailer.busOwnerEmail(user[0], tripDetail, EmailContents.TRIP_PENDING);

                await mailer.superAdminEmail(tripDetails, EmailContents.TRIP_PENDING);
            }

            return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.mailSent);

        } catch (error) {
            return this.internalServerError(req, res, error);
        }
    }

    /**
     * @DESC : For other services
     * @return array/json
     * @param req
     * @param res
     */
    getUserList = async (req, res) => {
        try {
            const userIds = req.body.userIds || [];
            const page = parseInt(req.body.page || 1);
            const chunk = parseInt(req.body.chunk || 10);
            const search = req.body.search;
            let query = Users.query().whereIn(`${Users.tableName}.SRU03_USER_MASTER_D`, userIds).leftJoin('SRU04_USER_DETAIL as userDetails', 'SRU03_USER_MASTER.SRU03_USER_MASTER_D', '=', 'userDetails.SRU03_USER_MASTER_D');
            if (!!search) {
                query = query.where(builder => {
                    builder.orWhere("SRU03_FIRST_N", "LIKE", `%${search}%`)
                        .orWhere("SRU03_LAST_N", "LIKE", `%${search}%`)
                        .orWhere("userDetails.SRU04_PHONE_N", "LIKE", `%${search}%`)
                        .orWhereRaw(`CONCAT(SRU03_FIRST_N, ' ', SRU03_LAST_N) LIKE ?`, `%${search}%`);
                });
            }
            const result = await query.select([`${Users.tableName}.SRU03_USER_MASTER_D as userId`, `${Users.tableName}.SRU03_FIRST_N as firstName`, `${Users.tableName}.SRU03_LAST_N as lastName`, 'userDetails.SRU04_PHONE_N as phoneNo']).
                orderBy('firstName', 'asc').
                page(page - 1, chunk);
            return this.success(req, res, this.status.HTTP_OK, result, this.messageTypes.successMessages.getAll);
        } catch (error) {
            console.log(error);
            return this.internalServerError(req, res, error);
        }
    }

    /**
     * @DESC : For other services - Get single User Result.
     * @return array/json
     * @param req
     * @param res
     */
    getuserById = async (req, res) => {
        try {
            const userId = req.body.userId;

            let result = await Users.query()
                .select([`${Users.tableName}.SRU03_USER_MASTER_D as userId`, `${Users.tableName}.SRU03_FIRST_N as firstName`, `${Users.tableName}.SRU03_LAST_N as lastName`, 'userDetails.SRU04_PHONE_N as phoneNo'])
                .where(`${Users.tableName}.SRU03_USER_MASTER_D`, userId)
                .leftJoin('SRU04_USER_DETAIL as userDetails', 'SRU03_USER_MASTER.SRU03_USER_MASTER_D', '=', 'userDetails.SRU03_USER_MASTER_D');

            return this.success(req, res, this.status.HTTP_OK, result[0], this.messageTypes.successMessages.getAll);

        } catch (error) {
            return this.internalServerError(req, res, error);
        }
    }

    /**
     * @DESC : Sign in / Login
     * @return array/json
     * @param req
     * @param res
     */
    loginUser = async (req, res) => {
        try {
            let result = await this._getVerificationStatus(req, res, false);

            if (result) {
                let resultType = result.typeId;
                let verifyType = true;

                // Verify the user type for Driver and Customer
                // if (resultType === UserRole.CUSTOMER_R || resultType === UserRole.DRIVER_R) {
                //     verifyType = parseInt(req.headers['user-type']) === resultType;
                // }

                // if (resultType === UserRole.DRIVER_R) {
                //     verifyType = parseInt(req.headers['user-type']) === resultType;
                // }

                if (parseInt(req.headers['user-type']) === resultType) {
                    if (verifyType) {

                        // Password check
                        let compareResult = await bcrypt.compare(req.body.password, result.password);
                        if (compareResult) {

                            // Generate JWT token
                            const token = jwt.sign({
                                userId: result.userId,
                                type: 'login'
                            }, process.env.JWT_SECRET
                                // , { expiresIn: 86400 }
                            );

                            result.token = `Bearer ${token}`;

                            // delete result.userDetails;
                            delete result.password;
                            return this.success(req, res, this.status.HTTP_OK, result, this.messageTypes.authMessages.userLoggedIn);
                        } else {
                            return this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.exceptions.invalidLogin(req, {
                                message: this.messageTypes.authMessages.userInvalidCredentials
                            }));
                        }
                    }
                } else {
                    return this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.exceptions.invalidLogin(req, {
                        message: this.messageTypes.authMessages.userNotFound
                    }));
                }

            } else {
                return this.errors(req, res, this.status.HTTP_FORBIDDEN, this.exceptions.unauthorizedErr(req, {
                    message: this.messageTypes.authMessages.userSuspended
                }));
            }

            return this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.exceptions.invalidLogin(req, {
                message: this.messageTypes.authMessages.userNotFound
            }));

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };


    /**y
     * @DESC : Forget password
     * @return array/json
     * @param req
     * @param res
     */
    forgetPassword = async (req, res) => {
        try {
            let result = await this._getVerificationStatus(req, res);

            if (result) {
                // TODO: Send email with link and token:
                let resetToken = this.createResetPasswordToken({
                    emailId: result.emailId,
                    userId: result.userId
                });

                let resetLink;
                if (result.typeId == UserRole.CUSTOMER_R) {

                    resetLink = `${process.env.END_USER_RESET_PASSWORD_LINK}?token=${resetToken}`;
                } else {

                    resetLink = `${process.env.RESET_PASSWORD_LINK}?token=${resetToken}`;
                }

                // let resetLink = `${process.env.RESET_PASSWORD_LINK}?token=${resetToken}`;

                delete result.userDetails;
                delete result.password;
                this.success(req, res, this.status.HTTP_OK, { resetLink }, this.messageTypes.successMessages.forgetPassword);

                // TODO: Send mail
                return await mailer.forgetPassword({
                    firstName: result.firstName,
                    emailId: result.emailId
                }, resetLink)
            }

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Verify users email address
     * @return array/json
     * @param req
     * @param res
     */
    verifyUser = async (req, res) => {
        try {
            const token = req.query.token;

            if (token) {
                let decrypted = decrypt(token);
                if (decrypted) {
                    let payload = JSON.parse(decrypted);

                    let result = await Users.query().where({
                        SRU03_USER_MASTER_D: payload.userId,
                        SRU03_EMAIL_N: payload.emailId,
                    }).eager('userDetails').modifyEager('userDetails', builder => {
                        builder.select(userDetailsColumns)
                    }).select(columns).limit(1);

                    if (result.length) {
                        result = result[0];
                        // Active status check
                        if (result.status === UserStatus.ACTIVE) {

                            const path = require("path");
                            const indexFile = path.resolve('./public/templates/emails/verified.html');

                            if (result.userDetails.emailStatus === EmailStatus.PENDING) {
                                // await UserDetails.query().patch({
                                //     SRU04_EMAIL_STATUS_D: EmailStatus.FIRST_TIME,
                                // }).where({
                                //     SRU03_USER_MASTER_D: payload.userId
                                // });

                                let notifyData = {
                                    title: this.messageTypes.passMessages.title,
                                    message: this.messageTypes.passMessages.emailVerified,
                                    body: "ShiftR Welcomes You, Email verified Successfully",
                                    type: NotifyType.VERIFY_EMAIL
                                }

                                const token = jwt.sign({
                                    userId: result.userId,
                                    type: 'login'
                                }, process.env.JWT_SECRET, { expiresIn: 86400 });

                                req.headers['authorization'] = `Bearer ${token}`;

                                await NotifyService.sendNotication(req, res, notifyData)
                                await mailer.emailVerified(result);
                            }

                            return res.sendFile(indexFile);
                        } else {
                            //TODO: Suspended account ignored
                        }
                    }
                }
            }

        } catch (e) {
            this.internalServerError(req, res, e);
        }

        return res.status(this.status.HTTP_NOT_FOUND).send();
    };

    /**
     * @DESC : Reset password with JWT & New password
     * @return array/json
     * @param req
     * @param res
     */
    resetPassword = async (req, res) => {
        try {
            let update = {}
            if (req.body.tempPassword) {
                let temp = await Users.query().where({ SRU03_USER_MASTER_D: req.user.userId }).select("SRU03_PASSWORD_N as password")
                let compareResult = await bcrypt.compare(req.body.tempPassword, temp[0].password);
                if (!compareResult) {
                    return this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.exceptions.unauthorizedErr(req, {
                        message: this.messageTypes.authMessages.invalidPassword
                    }));
                }
                update.SRU03_STATUS_D = UserStatus.ACTIVE
            }

            update.SRU03_PASSWORD_N = genHash(req.body.newPassword)

            if (req.user.status === UserStatus.FIRST_TIME) {
                update['SRU03_STATUS_D'] = UserStatus.ACTIVE
            }
            let result = await Users.query().patchAndFetchById(req.user.userId, update);

            result = {
                firstName: result.SRU03_FIRST_N,
                emailId: result.SRU03_EMAIL_N,
                typeId: result.SRU03_TYPE_D
            };

            this.success(req, res, this.status.HTTP_OK, result, this.messageTypes.successMessages.resetPassword);

            //TODO: Send mail
            return await mailer.resetPassword(result);

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Verify the reset password token
     * @return array/json
     * @param req
     * @param res
     */
    verifyResetPasswordToken = async (req, res) => {
        try {
            const token = req.body.token;
            if (token) {
                let decrypted = decrypt(token);
                if (decrypted) {
                    let payload = JSON.parse(decrypted);

                    // Token is not expired?
                    if (moment(payload.createdAt).isAfter(moment().subtract(1, 'hours'))) {

                        req.body = payload;
                        let result = await this._getVerificationStatus(req, res);

                        if (result) {
                            let response = {
                                type: result.userDetails.typeId,
                                jwtToken: jwt.sign({
                                    userId: result.userId,
                                    type: 'resetPassword'
                                }, process.env.JWT_SECRET, {
                                    expiresIn: 3600 // Will expire in next 1 hour
                                })
                            };

                            return this.success(req, res, this.status.HTTP_OK, response,
                                this.messageTypes.authMessages.userValidToken);
                        }

                        return;
                    }
                }
            }

        } catch (e) {
            return this.internalServerError(req, res, e);
        }

        this.userInvalidToken(req, res);
    };

    /**
     * @DESC : Returns the users verification status
     * @return array/json
     * @param req
     * @param res
     * @param sendResponse
     */
    _getVerificationStatus = async (req, res, sendResponse = true) => {
        try {

            const { emailId, userId } = req.body;
            let where = {
                SRU03_EMAIL_N: emailId,
            };

            if (userId) {
                where.SRU03_USER_MASTER_D = userId;
            }

            let result = await Users.query().where(where)
                .eager('userDetails')
                .modifyEager('userDetails', builder => {
                    builder.select(userDetailsColumns)
                }).select(columns).limit(1);

            if (result.length) {
                result = result[0];
                // User status check
                if (result.status === UserStatus.ACTIVE || result.status === UserStatus.FIRST_TIME) {

                    let emailStatus = result.userDetails.emailStatus;
                    if (result.status === UserStatus.FIRST_TIME) {
                        result.changedPassword = false
                    } else {
                        result.changedPassword = true
                    }
                    // First time user?
                    if (emailStatus === EmailStatus.FIRST_TIME) {
                        result.userDetails.emailStatus = EmailStatus.VERIFIED;
                        result.firstTimeLogin = true;
                        emailStatus = EmailStatus.VERIFIED;

                        // Update email status to verified
                        await UserDetails.query().patch({
                            SRU04_EMAIL_STATUS_D: EmailStatus.VERIFIED
                        }).where({
                            SRU03_USER_MASTER_D: result.userId
                        });
                    }

                    if (emailStatus === EmailStatus.VERIFIED) {

                        return new Promise((resolve) => {
                            resolve(result);
                        });
                    } else {
                        if (sendResponse) {
                            this.errors(req, res, this.status.HTTP_FOUND, this.exceptions.unauthorizedErr(req, {
                                message: this.messageTypes.authMessages.userNotVerified
                            }));
                        }
                    }
                } else {
                    if (sendResponse || result.status == UserStatus.INACTIVE) {
                        return false;
                    }
                }
            } else {
                if (sendResponse) {
                    this.userNotFound(req, res);
                } else {
                    this.userNotFound(req, res);
                }
            }

        } catch (e) {
            this.internalServerError(req, res, e);
        }

        return new Promise((resolve) => {
            resolve(false);
        });
    };

    /**
     * @DESC : Creates super user, it should be used only once
     * @return array/json
     * @param req
     * @param res
     */
    createSuperUser = async (req, res) => {
        try {
            let result = await Users.query().where({
                SRU03_TYPE_D: UserRole.SUPER_ADMIN_R,
            }).select(columns).limit(1);

            if (result.length) {
                return this.userIllegalAccess(req, res);
            } else {

                // Create user
                let result = await Users.query().insert({
                    SRU03_FIRST_N: req.body.firstName,
                    SRU03_LAST_N: req.body.lastName,
                    SRU03_EMAIL_N: req.body.emailId,
                    SRU03_TYPE_D: UserRole.SUPER_ADMIN_R,
                    SRU03_STATUS_D: UserStatus.FIRST_TIME,
                    SRU03_PASSWORD_N: genHash(req.body.password),
                });

                let insertResult = {
                    userId: result.SRU03_USER_MASTER_D,
                    firstName: result.SRU03_FIRST_N,
                    lastName: result.SRU03_LAST_N,
                    emailId: result.SRU03_EMAIL_N,
                };

                // Insert user details
                await UserDetails.query().insert({
                    SRU03_USER_MASTER_D: insertResult.userId,
                    SRU04_PHONE_N: req.body.phoneNo,
                    SRU04_EMAIL_STATUS_D: EmailStatus.VERIFIED,
                    SRU04_SIGNUP_STATUS_D: SignUpStatus.COMPLETED,
                });
                let resetToken = this.createResetPasswordToken({
                    emailId: insertResult.emailId,
                    userId: insertResult.userId
                });
                insertResult.setPasswordLink = `${process.env.RESET_PASSWORD_LINK}?token=${resetToken}`;

                this.success(req, res, this.status.HTTP_OK, insertResult, this.messageTypes.passMessages.userCreated);
                await mailer.accountCreated({
                    firstName: result.SRU03_FIRST_N,
                    emailId: result.SRU03_EMAIL_N,
                    password: req.body.password,
                    typeId: result.SRU03_TYPE_D,
                }, insertResult.setPasswordLink);
            }

        } catch (e) {
            this.internalServerError(req, res, e)
        }
    };

    /**
     * @DESC : Activate or deactivate user
     * @return array/json
     * @param req
     * @param res
     * @param status
     * @param successMessage
     */
    _activateDeactivateUser = async (req, res, status, successMessage) => {
        try {
            let userId = req.params.userId;
            let currentUser = req.user;

            let getUser = await Users.query().findOne({
                SRU03_USER_MASTER_D: userId
            }).eager('userDetails').modifyEager('userDetails', builder => {
                builder.select(userDetailsColumns)
            }).select(columns);

            if (getUser) {
                // User should not be able to activate/deactivate high hierarchy user and there own account.

                if ((currentUser.typeId === UserRole.ADMIN_R // Is admin then allow driver and customer only
                    && (getUser.typeId === UserRole.DRIVER_R || getUser.typeId === UserRole.CUSTOMER_R))
                    || // Is super admin then allow all
                    currentUser.typeId === UserRole.SUPER_ADMIN_R
                ) {

                    let result = await Users.query().patchAndFetchById(userId, {
                        SRU03_STATUS_D: status,
                        SRU03_UPDATED_D: currentUser.userId
                    });

                    if (result) {
                        this.success(req, res, this.status.HTTP_OK, null, successMessage);
                        await this._notification(req, res, userId, { status: status })
                        return await mailer.activateDeactivate({
                            firstName: getUser.firstName,
                            emailId: getUser.emailId,
                            status: status
                        });
                    }
                } else {
                    return this.userIllegalAccess(req, res);
                }
            }

            this.userNotFound(req, res);
        } catch (e) {
            this.internalServerError(req, res, e);
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
        if (status.status === UserStatus.INACTIVE) {
            let newdata = {
                title: this.messageTypes.passMessages.title,
                message: this.messageTypes.passMessages.deactivateUser,
                body: this.messageTypes.passMessages.deactivateUser,
                type: NotifyType.DE_ACTIVATE_USER,
            }
            notifyData = {
                ...notifyData, ...newdata
            }
        }
        return await NotifyService.sendNotication(req, res, notifyData);
    }
    /**
     * @DESC : Deactivate user account
     * @return array/json
     * @param req
     * @param res
     */
    deactivateUser = async (req, res) => {
        this._activateDeactivateUser(req, res, UserStatus.INACTIVE, this.messageTypes.passMessages.userDeactivate);
    };

    /**
     * @DESC : Activate user account
     * @return array/json
     * @param req
     * @param res
     */
    activateUser = async (req, res) => {
        this._activateDeactivateUser(req, res, UserStatus.ACTIVE, this.messageTypes.passMessages.userActivate);
    };

    /**
     * @DESC : Get a requested user
     * @return array/json
     * @param req
     * @param res
     * @param typeId
     */
    _getUser = async (req, res, typeId) => {
        try {
            let result = await Users.query().findOne({
                SRU03_USER_MASTER_D: req.params.userId,
                SRU03_TYPE_D: typeId
            }).eager('[userDetails, addressDetails,contactInfoDetails]')
                .modifyEager('userDetails', builder => {
                    builder.select(userDetailsColumns)
                }).modifyEager('addressDetails', (builder) => {
                    builder.select(userAddressColumns)
                }).modifyEager('contactInfoDetails', (builder) => {
                    builder.select(contactInfoColumns)
                }).select(columns);

            if (result) {
                delete result.password;
                return this.success(req, res, this.status.HTTP_OK, result, this.messageTypes.successMessages.successful);
            }

            this.userNotFound(req, res);
        } catch (e) {
            this.internalServerError(req, res, e);
        }

    };

    /**
     * @DESC : Get a requested user
     * @return array/json
     * @param req
     * @param res
     */
    getUser = async (req, res) => {
        this._getUser(req, res, UserRole.CUSTOMER_R);
    };

    /**
     * @DESC : Get a requested admin
     * @return array/json
     * @param req
     * @param res
     */
    getAdmin = async (req, res) => {
        this._getUser(req, res, UserRole.ADMIN_R);
    };

    /**
     * @DESC : Get token validation status
     * @return array/json
     * @param req
     * @param res
     */
    verifyToken = async (req, res) => {

        delete req.user.password;
        if (req.user.status === UserStatus.FIRST_TIME) {
            req.user.changedPassword = false
        } else {
            req.user.changedPassword = true
        }

        const contactinfo = [];
        contactinfo.push(req.user.contactInfoDetails);
        req.user.contactinfo = contactinfo;
        delete req.user.contactInfoDetails;//Delete Existing Contact object

        this.success(req, res, this.status.HTTP_OK, req.user, this.messageTypes.authMessages.userValidToken);
    };

    /**
     * @DESC : Create user from admin panel reusable method
     * @return array/json
     * @param req
     * @param res
     * @param userTpe
     */
    _createUser = async (req, res, userTpe) => {
        try {
            // Create user
            let result = await Users.query().insert({
                SRU03_FIRST_N: req.body.firstName,
                SRU03_LAST_N: req.body.lastName,
                SRU03_EMAIL_N: req.body.emailId,
                SRU03_TYPE_D: userTpe,
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
            await UserDetails.query().insert({
                SRU03_USER_MASTER_D: insertResult.userId,
                SRU04_CREATED_D: req.user.userId,
                SRU04_PHONE_N: req.body.phoneNo,
                SRU04_EMAIL_STATUS_D: EmailStatus.VERIFIED,
                SRU04_SIGNUP_STATUS_D: SignUpStatus.COMPLETED,
            });

            let resetToken = this.createResetPasswordToken({
                emailId: insertResult.emailId,
                userId: insertResult.userId
            });

            insertResult.setPasswordLink = `${process.env.RESET_PASSWORD_LINK}?token=${resetToken}`;

            this.success(req, res, this.status.HTTP_OK, insertResult, this.messageTypes.passMessages.userCreated);

            // TODO: Send email with link and token:
            await mailer.accountCreated({
                firstName: result.SRU03_FIRST_N,
                emailId: result.SRU03_EMAIL_N,
                password: req.body.password,
                typeId: result.SRU03_TYPE_D,
            }, insertResult.setPasswordLink);

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Create customer from admin panel
     * @return array/json
     * @param req
     * @param res
     */
    createCustomer = async (req, res) => {
        req.body.password = "Pa$$word1"; // TODO: This need to be unique every-time...
        this._createUser(req, res, UserRole.CUSTOMER_R);
    };

    /**
     * @DESC : Create admin from admin panel
     * @return array/json
     * @param req
     * @param res
     */
    createAdmin = async (req, res) => {
        this._createUser(req, res, UserRole.ADMIN_R);
    };

    /**
     * @DESC : Get all the users by type
     * @return array/json
     * @param req
     * @param res
     * @param userType
     */
    _getAllUsers = async (req, res, userType) => {
        try {

            const page = parseInt(req.query.page || 1);
            const chunk = parseInt(req.query.chunk || 10);
            const status = req.query.status;
            const search = req.query.search;
            const signUpStatus = req.query.signUpStatus;

            let where = {
                SRU03_TYPE_D: userType
            };

            if (status) {
                where.SRU03_STATUS_D = parseInt(req.query.status)
            }

            if (signUpStatus) {
                where.SRU04_SIGNUP_STATUS_D = parseInt(req.query.signUpStatus)
            }

            let userQuery = Users.query().where(where).join(UserDetails.tableName,
                `${UserDetails.tableName}.SRU03_USER_MASTER_D`,
                `${Users.tableName}.SRU03_USER_MASTER_D`
            );

            let columnList = adminListColumns;

            if (userType === UserRole.DRIVER_R) {
                //To fetch drivers financial details
                userQuery = userQuery.join(SpecialityDetails.tableName, `${SpecialityDetails.tableName}.SRU03_USER_MASTER_D`, `${Users.tableName}.SRU03_USER_MASTER_D`)
                    .groupBy(`${SpecialityDetails.tableName}.SRU03_USER_MASTER_D`);

                userQuery = userQuery.join(ExperienceDetails.tableName, `${ExperienceDetails.tableName}.SRU03_USER_MASTER_D`, `${Users.tableName}.SRU03_USER_MASTER_D`)
                    .groupBy(`${ExperienceDetails.tableName}.SRU03_USER_MASTER_D`);

                userQuery = userQuery.join(Language.tableName, `${Language.tableName}.SRU03_USER_MASTER_D`, `${Users.tableName}.SRU03_USER_MASTER_D`)
                    .groupBy(`${Language.tableName}.SRU03_USER_MASTER_D`);

                columnList = [...columnList, ...driverExperienceColumns, ...driverExpSpecialityColumns, ...driverLanguageColumns];
            }

            if (userType === UserRole.CUSTOMER_R) {
                //To fetch contactInfo details
                userQuery = userQuery.join(ContactInfo.tableName, `${ContactInfo.tableName}.SRU03_USER_MASTER_D`, `${Users.tableName}.SRU03_USER_MASTER_D`)
                    .groupBy(`${ContactInfo.tableName}.SRU03_USER_MASTER_D`);

                userQuery = userQuery.join(AddressDetails.tableName, `${AddressDetails.tableName}.SRU03_USER_MASTER_D`, `${Users.tableName}.SRU03_USER_MASTER_D`);

                // columnList = [...columnList, ...userDetailsColumns, ...contactInfoColumns];
                columnList = [...columnList, ...userDetailsColumns, ...userAddressColumns, ...contactInfoColumns];
            }

            if (search) {
                userQuery = userQuery.where(builder => {
                    builder.where('SRU03_EMAIL_N', "LIKE", `%${search}%`)
                        .orWhere("SRU03_FIRST_N", "LIKE", `%${search}%`)
                        .orWhere("SRU03_LAST_N", "LIKE", `%${search}%`)
                        .orWhereRaw(`CONCAT(SRU03_FIRST_N, ' ', SRU03_LAST_N) LIKE ?`, `%${search}%`);

                });
            }

            userQuery = await userQuery.select(columnList).page(page - 1, chunk);

            const pageMetaData = {
                chunk: chunk,
                total: userQuery.total,
                page: page,
                totalPages: Math.ceil(userQuery.total / chunk)
            };

            const result = {
                list: userQuery.results,
                pageMetaData
            };

            return this.success(req, res, this.status.HTTP_OK, result, this.messageTypes.successMessages.getAll);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Trip -  Driver Details List
     * @return array/json
     * @param req
     * @param res
     * @param userType
     */
    getDriverDetailsList = async (req, res) => {
        this._getDriverDetailsList(req, res);
    };


    /**
     * @DESC : Get all the users by type
     * @return array/json
     * @param req
     * @param res
     * @param userType
     */
    _getAllUsersList = async (req, res) => {
        try {
            const {
                driverDetails,
                driverLicensetype,
                driverIdlist
            } = req.body;

            const userIdlist = await UserDetails.query()
                .where('SRU04_LICENSE_TYPE_R', driverLicensetype)
                .whereIn('SRU03_USER_MASTER_D', driverIdlist)
                .pluck('SRU03_USER_MASTER_D');

            console.log("driverLicensetype", driverLicensetype);

            // const userIdlist = await UserDetails.query()
            // .where('SRU04_LICENSE_TYPE_N', driverDetails[0].licenceType)
            // .whereIn('SRU03_USER_MASTER_D', driverIdlist)
            // .pluck('SRU03_USER_MASTER_D');

            let _where = {};
            let _orWhere = {};

            driverDetails.forEach((data, index) => {
                if (index === 0) {
                    _where["SRU09_DRIVEREXP.SRU09_TYPE_N"] = data.countryType,
                        _where["SRU09_DRIVEREXP.SRU09_TOTALEXP_N"] = data.experience,
                        _where["SRU09_DRIVEREXP.SRU09_CURRENT_N"] = data.province
                } else {
                    _orWhere["SRU09_DRIVEREXP.SRU09_TYPE_N"] = data.countryType,
                        _orWhere["SRU09_DRIVEREXP.SRU09_TOTALEXP_N"] = data.experience,
                        _orWhere["SRU09_DRIVEREXP.SRU09_CURRENT_N"] = data.province
                }
            });

            const _whereSize = Object.keys(_where).length;
            const _orWhereSize = Object.keys(_orWhere).length;
            let specialityQuery = [];

            let dataExist = [];
            if (_whereSize > 0) {
                dataExist = await ExperienceDetails.query()
                    .where(_where)
                    .select("SRU09_DRIVEREXP_D as driverExpId");
            } else if (_orWhereSize > 0) {
                dataExist = await ExperienceDetails.query()
                    .where(_orWhere)
                    .select("SRU09_DRIVEREXP_D as driverExpId");
            }

            //Filter By Driver Details

            if (_whereSize > 0 && _orWhereSize > 0 && dataExist.length > 0 && userIdlist.length > 0) {

                specialityQuery = await Users.query()
                    .whereIn('SRU03_USER_MASTER_D', userIdlist)
                    .eager(`[userDetails, driverspecialityDetails.[specialityExpDetails, SpecialityTrainingDetails]]`)
                    .modifyEager('userDetails', (builder) => {
                        builder.select(tripUserDetailsColumns)
                    })
                    .modifyEager('driverspecialityDetails.[specialityExpDetails]', (builder) => {
                        builder.where((builder) => {
                            builder
                                // .join("SRU12_DRIVER_SPECIALITY", 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N', 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N')
                                .join("SRU09_DRIVEREXP", 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N', 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N')
                                .where(_where)
                                .orWhere(_orWhere)
                        })
                            // (_where).orWhere(_orWhere)
                            .select(driverExperienceColumns)
                    }).modifyEager('driverspecialityDetails.[SpecialityTrainingDetails]', (builder) => {
                        builder.select(driverSpecialityTrainingColumns)
                    })
                    .omit(SpecialityDetails, omitDriverSpecialityColumns)
                    .select(usersColumns);
            } else if (_whereSize > 0 && dataExist.length > 0 && userIdlist.length > 0) {

                specialityQuery = await Users.query()
                    .whereIn('SRU03_USER_MASTER_D', userIdlist)
                    .eager(`[userDetails, driverspecialityDetails.[specialityExpDetails, SpecialityTrainingDetails]]`)
                    .modifyEager('userDetails', (builder) => {
                        builder.select(tripUserDetailsColumns)
                    })
                    .modifyEager('driverspecialityDetails.[specialityExpDetails]', (builder) => {
                        builder.
                            where((builder) => {
                                builder
                                    .join("SRU09_DRIVEREXP", 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N', 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N')
                                    // .join("SRU12_DRIVER_SPECIALITY", 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N', 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N')
                                    .where(_where)
                            })
                            // where(_where)
                            .select(driverExperienceColumns)
                    }).modifyEager('driverspecialityDetails.[SpecialityTrainingDetails]', (builder) => {
                        builder
                            .select(driverSpecialityTrainingColumns)
                    })
                    .omit(SpecialityDetails, omitDriverSpecialityColumns)
                    .select(usersColumns);
            } else if (_orWhereSize > 0 && dataExist.length > 0 && userIdlist.length > 0) {

                specialityQuery = await Users.query()
                    .whereIn('SRU03_USER_MASTER_D', userIdlist)
                    .eager(`[userDetails, driverspecialityDetails.[specialityExpDetails, SpecialityTrainingDetails]]`)
                    .modifyEager('userDetails', (builder) => {
                        builder.select(tripUserDetailsColumns)
                    })
                    .modifyEager('driverspecialityDetails.[specialityExpDetails]', (builder) => {
                        builder.
                            where((builder) => {
                                builder
                                    .join("SRU09_DRIVEREXP", 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N', 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N')
                                    // .join("SRU12_DRIVER_SPECIALITY", 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N', 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N')
                                    .where(_orWhere)
                            })
                            // where(_orWhere)
                            .select(driverExperienceColumns)
                    }).modifyEager('driverspecialityDetails.[SpecialityTrainingDetails]', (builder) => {
                        builder.select(driverSpecialityTrainingColumns)
                    })
                    .omit(SpecialityDetails, omitDriverSpecialityColumns)
                    .select(usersColumns);
            };

            const matchingUserList = specialityQuery;


            let allUserList = [];
            if (userIdlist.length > 0) {
                allUserList = await this._getmatchedUserList(userIdlist);//call back function
            } else if (driverIdlist && driverIdlist.length > 0) {
                allUserList = await this._getpartialmatchedUserList(driverIdlist);//call back function
            }

            if (allUserList && !allUserList.length) {
                allUserList = await this._getunmatchedUserList();//call back function
            }

            let result = {
                matchingUserList,
                allUserList
            };

            return this.success(req, res, this.status.HTTP_OK, result, this.messageTypes.successMessages.getAll);

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Get Driver Details list
     * @return array/json
     * @param req
     * @param res
     * @param userType
     */
    _getDriverDetailsList = async (req, res) => {
        try {
            const {
                userIds
            } = req.body;

            console.log("userIds", userIds)

            const columnList = [...driverExperienceColumns, ...driverExpSpecialityColumns];

            //Filter By Driver Details

            let specialityQuery = await SpecialityDetails.query()
                .join("SRU09_DRIVEREXP", 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N', 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N')
                .whereIn('SRU12_DRIVER_SPECIALITY.SRU03_USER_MASTER_D', userIds)
                .select(columnList);

            let userids = specialityQuery.map((value) => {
                return value.driveruserId
            });

            let where = {
                "SRU03_USER_MASTER.SRU03_TYPE_D": UserRole.DRIVER_R
            };

            let userQuery = await Users.query().where(where).join(UserDetails.tableName,
                `${UserDetails.tableName}.SRU03_USER_MASTER_D`,
                `${Users.tableName}.SRU03_USER_MASTER_D`,
            )
                .whereIn('SRU04_USER_DETAIL.SRU03_USER_MASTER_D', userids)
                .select("SRU04_USER_DETAIL.SRU04_PROFILE_I as userprofile")
                .select(userListColumns);

            const results = await userQuery.map((userValue) => {
                specialityQuery.find((specialityValue) => {
                    if (userValue.userId === specialityValue.driveruserId) {
                        userValue.SpecialityDetails = specialityValue;
                    }
                });
                return userValue;
            });
            console.log(results)

            return this.success(req, res, this.status.HTTP_OK, results, this.messageTypes.successMessages.getAll);

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };


    /**
     * @DESC : Get all the customers
     * @return array/json
     * @param req
     * @param res
     */
    getAllCustomers = async (req, res) => {
        this._getAllUsers(req, res, UserRole.CUSTOMER_R);
    };

    /**
     * @DESC : Get all the driver list
     * @return array/json
     * @param req
     * @param res
     */
    getAllDriverList = async (req, res) => {
        this._getAllUsersList(req, res, UserRole.DRIVER_R);
    };
    /**
     * @DESC : Get all the drivers
     * @return array/json
     * @param req
     * @param res
     */
    getAllDrivers = async (req, res) => {
        this._getAllUsers(req, res, UserRole.DRIVER_R);
    };

    /**
     * @DESC : Get all the admins
     * @return array/json
     * @param req
     * @param res
     */
    getAllAdmins = async (req, res) => {
        this._getAllUsers(req, res, UserRole.ADMIN_R);
    };

    /**
     * @DESC : Update the user {Customer, Admin}
     * @return array/json
     * @param req
     * @param res
     * @param typeId
     */
    _updateUser = async (req, res, typeId) => {
        try {
            let result = await Users.query().patch({
                SRU03_FIRST_N: req.body.firstName,
                SRU03_LAST_N: req.body.lastName,
                SRU03_UPDATED_D: req.user.userId
            }).where({
                SRU03_USER_MASTER_D: req.params.userId,
                SRU03_TYPE_D: typeId
            });

            if (result) {
                await UserDetails.query().patch({
                    SRU04_PHONE_N: req.body.phoneNo,
                    SRU04_UPDATED_D: req.user.userId
                }).where({
                    SRU03_USER_MASTER_D: req.params.userId
                });
                return this.success(req, res, this.status.HTTP_OK, null, this.messageTypes.passMessages.userUpdated);
            }

            this.userNotFound(req, res);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Update the customer
     * @return array/json
     * @param req
     * @param res
     */
    updateCustomer = async (req, res) => {
        this._updateUser(req, res, UserRole.CUSTOMER_R);
    };

    /**
     * @DESC : Update the admin
     * @return array/json
     * @param req
     * @param res
     */
    updateAdmin = async (req, res) => {
        this._updateUser(req, res, UserRole.ADMIN_R);
    };

    /**
     * @DESC : Get user's signup details {Driver}
     * @return array/json
     * @param req
     * @param res
     */
    getSignUpDetails = async (req, res) => {
        if (req.user.typeId === UserRole.DRIVER_R) {
            const userId = req.user.userId;
            const driver = await DriverController._getDriverDetails(req, res, userId);
            let address = { ...driver.addressDetails }
            let radius = { ...driver.radiusDetails }
            delete driver.addressDetails
            delete driver.radiusDetails
            driver.userDetails = { ...driver.userDetails, ...address, ...radius }

            let DriverDetails = []; // New array decalration 
            //Driver - Experienced  structure change
            driver.experienceDetails.forEach((expvalue) => {

                //Driver - Speciality structure change
                driver.driverspecialityDetails.forEach((spcvalue) => {
                    if (expvalue.specialityReferenceNumber == spcvalue.specialityReferenceNumber) {
                        DriverDetails.push({
                            driverExp: {
                                experience: {
                                    driverExperienceId: expvalue.driverExperienceId,
                                    totalexperience: expvalue.totalExp
                                },
                                expInProvince: {
                                    driverExperienceId: expvalue.driverExperienceId,
                                    provinceName: expvalue.currentExp
                                },
                                driverSpeciality: {
                                    specialityTraining: {
                                        specialityId: spcvalue.specialityId,
                                        specialityName: spcvalue.specialityName
                                    },
                                    year: {
                                        specialityId: spcvalue.specialityId,
                                        validYear: spcvalue.validYear
                                    }
                                }
                            },
                            countryType: expvalue.experienceType
                        });
                    }
                });

            });

            // delete driver.experienceDetails;//Remove Existing object
            // delete driver.driverspecialityDetails; // Remove Existing Object

            driver.DriverDetails = DriverDetails;

            return this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.successMessages.successful);
        } else {
            return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.successful);
        }
    }

    /**
     * @DESC : Get user's signup details {Driver}
     * @return array/json
     * @param req
     * @param res
     */
    getDriverSignUpDetails = async (req, res) => {
        if (req.user.typeId === UserRole.DRIVER_R) {
            const userId = req.user.userId;
            const driver = await DriverController._getAllDriverDetails(req, res, userId);
            let addressDetail = driver.allAddress;
            let provinceDetail = { ...driver.addressDetails }
            let radius = { ...driver.radiusDetails };

            let address = {};
            let financialAddress = {};
            let permanentAddress = {};

            if (addressDetail && addressDetail.length) {

                permanentAddress = addressDetail.filter((address) => address.addressType == AddressType.PERMANENT)[0];

                financialAddress = addressDetail.filter((address) => address.addressType == AddressType.FINANCIAL)[0];

                if (addressDetail.length != booleanType.NO && permanentAddress && Object.keys(permanentAddress) != booleanType.NO) {
                    address = {
                        addressId: permanentAddress.addressId,
                        address1: permanentAddress.addressLine1,
                        address2: permanentAddress.addressLine2,
                        userAddress: permanentAddress.userAddress,
                        provinceId: provinceDetail.provinceDetails ? provinceDetail.provinceDetails.SRU16_PROVINCE_D : null,
                        province: provinceDetail.provinceDetails ? provinceDetail.provinceDetails.SRU16_PROVINCE_N : "",
                        city: permanentAddress.city,
                        postalCode: permanentAddress.postalCode,
                        latitude: permanentAddress.latitude,
                        longitude: permanentAddress.longitude
                    };
                }

            }
            driver.financialAddress = financialAddress;

            delete driver.allAddress
            delete driver.addressDetails
            delete driver.radiusDetails
            driver.userDetails = { ...driver.userDetails, ...address, ...radius }

            let DriverDetails = [];

            if (driver.experienceDetails.length > booleanType.NO && driver.driverspecialityDetails.length > booleanType.NO) {
                driver.experienceDetails.forEach((expvalue) => {

                    let driverSpeciality = [];
                    driver.driverspecialityDetails.filter((spcvalue) => {
                        if (expvalue.SRU09_SPECIALITY_REFERENCE_N == spcvalue.specialityReferenceNumber)
                            driverSpeciality.push({
                                specialityTrainingId: spcvalue.specialityTrainingId,
                                specialityTraining: spcvalue.specialityName,
                                year: spcvalue.validYear
                            });
                    });

                    DriverDetails.push({
                        driverExp: {
                            experienceId: expvalue.experienceReferenceDetails.experienceId,
                            experience: expvalue.SRU09_TOTALEXP_N,
                            expInProvinceId: Object.keys(expvalue.experienceReferenceDetails).length != booleanType.NO ? expvalue.experienceReferenceDetails.provinceId : null,
                            expInProvince: expvalue.SRU09_CURRENT_N,
                            driverSpeciality
                        },
                        countryType: expvalue.SRU09_TYPE_N ? parseInt(expvalue.SRU09_TYPE_N) : null
                    });
                });
            }

            delete driver.experienceDetails;//Remove Existing object
            delete driver.driverspecialityDetails; // Remove Existing Object

            driver.driverDetails = DriverDetails;

            return this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.successMessages.successful);
        } else {
            return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.successful);
        }
    }

    /**
     * @DESC : Update self profile
     * @return array/json
     * @param req
     * @param res
     */
    updateProfile = async (req, res) => {
        try {
            let { userId, status } = req.user;

            const {
                firstName,
                lastName,
                phoneNo,
                password
            } = req.body;

            let requestModel = {
                SRU03_FIRST_N: firstName,
                SRU03_LAST_N: lastName,
                SRU03_UPDATED_D: userId
            };

            if (password) {
                requestModel.SRU03_PASSWORD_N = genHash(password);
                if (status === UserStatus.FIRST_TIME) {
                    requestModel.SRU03_STATUS_D = UserStatus.ACTIVE
                }
            }

            let result = await Users.query().patchAndFetchById(userId, requestModel);

            if (result) {

                let requestModel = {
                    SRU04_UPDATED_D: userId
                };

                if (phoneNo) {
                    requestModel.SRU04_PHONE_N = phoneNo;
                }

                await UserDetails.query().patch(requestModel).where({
                    SRU03_USER_MASTER_D: userId
                });

                return this.success(req, res, this.status.HTTP_OK, null, this.messageTypes.passMessages.userUpdated);
            }

            this.userNotFound(req, res);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Update users signup status {Admin, Super-admin}
     * @return array/json
     * @param req
     * @param res
     */
    updateSignUpStatus = async (req, res) => {
        try {
            const userId = req.params.userId;
            const updatedBy = req.user.userId;

            // Get users basic details
            let result = await Users.query().findById(userId).select(columns);

            if (result) {
                const {
                    signUpStatus,
                    reason,
                    license,
                    pcc,
                    insurance,
                    ownership
                } = req.body;

                // Update signup status
                await UserDetails.query().patch({
                    SRU04_SIGNUP_STATUS_D: signUpStatus,
                    SRU04_UPDATED_D: updatedBy,
                }).where({
                    SRU03_USER_MASTER_D: userId
                });

                // Update license status if available
                if (license) {
                    await UserDocument.query().patch({
                        SRU02_STATUS_D: license,
                        SRU05_UPDATED_D: updatedBy,
                    }).where({
                        SRU03_USER_MASTER_D: userId,
                        SRU01_TYPE_D: DocumentType.LICENSE,
                    });
                }

                // Update PCC status if available
                if (pcc) {
                    await UserDocument.query().patch({
                        SRU02_STATUS_D: pcc,
                        SRU05_UPDATED_D: updatedBy,
                    }).where({
                        SRU03_USER_MASTER_D: userId,
                        SRU01_TYPE_D: DocumentType.PCC,
                    });
                }

                // Update Insurance status if available
                if (insurance) {
                    await UserDocument.query().patch({
                        SRU02_STATUS_D: insurance,
                        SRU05_UPDATED_D: updatedBy,
                    }).where({
                        SRU03_USER_MASTER_D: userId,
                        SRU01_TYPE_D: DocumentType.INSURANCE,
                    });
                }

                // Update Ownership status if available
                if (ownership) {
                    await UserDocument.query().patch({
                        SRU02_STATUS_D: insurance,
                        SRU05_UPDATED_D: updatedBy,
                    }).where({
                        SRU03_USER_MASTER_D: userId,
                        SRU01_TYPE_D: DocumentType.OWNERSHIP,
                    });
                }

                this.success(req, res, this.status.HTTP_OK, null, this.messageTypes.passMessages.statusUpdated);

                //TODO: Send the mail
                return await mailer.signUpStatus(result, signUpStatus);
            }

            this.userNotFound(req, res);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }

    };

    /**
     * @DESC : Get user's signup status {Driver pull to refresh}
     * @return array/json
     * @param req
     * @param res
     */
    getSignUpStatus = async (req, res) => {
        if (req.user.typeId === UserRole.DRIVER_R) {
            let driver = await UserDetails.query().findOne({
                SRU03_USER_MASTER_D: req.user.userId
            }).select('SRU04_SIGNUP_STATUS_D as signUpStatus');
            return this.success(req, res, this.status.HTTP_OK, driver, this.messageTypes.successMessages.successful);
        } else {
            return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.successful);
        }
    };

    /**
     * @DESC : Get user's signup status {Driver pull to refresh}
     * @return array/json
     * @param req
     * @param res
     */
    existingEmail = async (req, res) => {
        try {
            let emailId = await Users.query().where({
                SRU03_EMAIL_N: req.params.emailId
            }).count('SRU03_EMAIL_N as id');
            if (emailId[0].id) {
                return this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.exceptions.badRequestErr(req, {
                    message: this.messageTypes.authMessages.existsEmail
                }));
            } else {
                return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.successful)
            };
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };


    /**
     * @DESC : Mobile Number - Exists
     * @return array/json
     * @param req
     * @param res
     */

    existingMobilenumber = async (req, res) => {
        try {
            const { mobileNumber, userId } = req.body;
            let _where;
            if (userId) {
                _where = {
                    SRU03_USER_MASTER_D: userId,
                    SRU19_PHONE_R: mobileNumber
                }
            } else {
                _where = {
                    SRU19_PHONE_R: mobileNumber
                }
            }
            let result = await ContactInfo.query()
                .where(_where)
                .count('SRU19_CONTACT_INFO_D as id');

            // let response = await UserDetails.query()
            // .where(_where)
            // .count('SRU04_DETAIL_D as detailsId');

            // if (result[0].id || response[0].detailsId) {
            if (result[0].id && userId) {
                return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.successful)
            } else if (result[0].id) {
                return this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.exceptions.badRequestErr(req, {
                    message: this.messageTypes.authMessages.existMobilenumber + "[" + mobileNumber + "]"
                }));
            } else {
                return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.successful)
            }

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : Busowner Login Status
     * @return array/json
     * @param req
     * @param res
     */
    busownerLoginStatus = async (req, res) => {
        try {

            //Update Travel[Busowner] -user -Login details
            await UserDetails.query()
                .where('SRU03_USER_MASTER_D', req.user.userId)
                .update({ 'SRU04_TRAVEL_LOGIN_STATUS_F': booleanType.YES });

            return this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.successMessages.successful)

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    /**
     * @DESC : get Matched userList
     * @return array/json
     * @param req
     * @param res
     */

    _getmatchedUserList = async (userIdlist) => {
        try {
            const allUserList = await Users.query()
                .whereIn('SRU03_USER_MASTER_D', userIdlist)
                .eager(`[userDetails, driverspecialityDetails.[specialityExpDetails, SpecialityTrainingDetails]]`)
                .modifyEager('userDetails', (builder) => {
                    builder.select(tripUserDetailsColumns)
                })
                .modifyEager('driverspecialityDetails.[specialityExpDetails]', (builder) => {
                    builder.where((builder) => {
                        builder
                            .join("SRU09_DRIVEREXP", 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N', 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N')
                    })
                        .select(driverExperienceColumns)
                }).modifyEager('driverspecialityDetails.[SpecialityTrainingDetails]', (builder) => {
                    builder.select(driverSpecialityTrainingColumns)
                }).omit(SpecialityDetails, omitDriverSpecialityColumns).select(usersColumns);
            return allUserList;
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
    * @DESC : get partialMatched userList
    * @return array/json
    * @param req
    * @param res
    */
    _getpartialmatchedUserList = async (userIdlist) => {
        try {
            const allUserList = await Users.query()
                .whereIn('SRU03_USER_MASTER_D', userIdlist)
                .eager(`[userDetails, driverspecialityDetails.[specialityExpDetails, SpecialityTrainingDetails]]`)
                .modifyEager('userDetails', (builder) => {
                    builder.select(tripUserDetailsColumns)
                })
                .modifyEager('driverspecialityDetails.[specialityExpDetails]', (builder) => {
                    builder.where((builder) => {
                        builder
                            .join("SRU09_DRIVEREXP", 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N', 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N')
                    })
                        .select(driverExperienceColumns)
                }).modifyEager('driverspecialityDetails.[SpecialityTrainingDetails]', (builder) => {
                    builder.select(driverSpecialityTrainingColumns)
                }).omit(SpecialityDetails, omitDriverSpecialityColumns).select(usersColumns);
            return allUserList;
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
    * @DESC : get UnMatched userList
    * @return array/json
    * @param req
    * @param res
    */
    _getunmatchedUserList = async () => {
        try {
            const allUserList = await Users.query()
                .eager(`[userDetails, driverspecialityDetails.[specialityExpDetails, SpecialityTrainingDetails]]`)
                .where({
                    "SRU03_TYPE_D": UserRole.DRIVER_R
                })
                .modifyEager('userDetails', (builder) => {
                    builder.select(tripUserDetailsColumns)
                })
                .modifyEager('driverspecialityDetails.[specialityExpDetails]', (builder) => {
                    builder.where((builder) => {
                        builder
                            .join("SRU09_DRIVEREXP", 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N', 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N')
                    })
                        .select(driverExperienceColumns)
                }).modifyEager('driverspecialityDetails.[SpecialityTrainingDetails]', (builder) => {
                    builder.select(driverSpecialityTrainingColumns)
                }).omit(SpecialityDetails, omitDriverSpecialityColumns).select(usersColumns);
            return allUserList;
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
    * @DESC : Subscription plan - Transaction
    * @return array/json
    * @param req
    * @param res
    */
    subscriptionplanNotification = async (req, res) => {
        try {

            //Activate- subscription user
            await UserDetails.query().patch({
                SRU04_ACTIVE_SUBSCRIPTION_PLAN_F: subscriptionStatus.ACTIVEUSER
            }).where({
                SRU03_USER_MASTER_D: req.user.userId
            });

            this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.passMessages.successful);

            // TODO: Send the mail
            return await mailer.subscriptionNotification(req.body);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
    * @DESC : Subscription plan - Reminder Notification
    * @return array/json
    * @param req
    * @param res
    */
    sendReminderNotication = async (req, res) => {
        try {
            const { notificationPayload, reminderUserIds } = req.body;
            const alluserDetails = await Users.query()
                .whereIn('SRU03_USER_MASTER_D', reminderUserIds)
                .eager(`[userDetails]`)
                .modifyEager('userDetails', (builder) => {
                    builder.select(tripUserDetailsColumns)
                }).select(usersColumns);

            this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.passMessages.successful);

            //Mail - Queue     
            for (const data of notificationPayload) {
                const index = alluserDetails.findIndex(user => user.userId === data.subscriptionuserId);
                if (-1 !== index) {
                    const userdata = alluserDetails[index];
                    await mailer.subscriptionReminder({
                        useremail: userdata.emailId,
                        username: userdata.firstName,
                        companyName: userdata.userDetails.companyName,
                        startdate: data.startdate,
                        expirydate: data.expirydate,
                        totalTrips: data.totalTrips
                    });
                }
            }

        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
    * @DESC : Subscription plan - Renewals Notification
    * @return array/json
    * @param req
    * @param res
    */
    sendRenewalsNotication = async (req, res) => {
        try {
            const { expiredUserIds, activeplanuserIds, expiredplanUsers,activatedplanUsers} = req.body;            

            if (expiredUserIds.length > booleanType.NO) {
                const expireduserData = await this._subuscriptionrenewaluserList(req, res, expiredUserIds);
                //Mail - Queue     
                for (const data of expiredplanUsers) {
                    const index = expireduserData.findIndex(user => user.userId === data.subscriptionuserId);
                    if (-1 !== index) {
                        const userdata = expireduserData[index];
                        await mailer.subscriptionExpired({
                            useremail: userdata.emailId,
                            username: userdata.firstName,
                            companyName: userdata.userDetails.companyName,
                            startdate: data.startdate,
                            expirydate: data.expirydate,
                            totalTrips: data.totalTrips
                        });
                    }
                }
            }

            if (activeplanuserIds.length > booleanType.NO) {
                const activateduserData = await this._subuscriptionrenewaluserList(req, res, activeplanuserIds);
                //Mail - Queue     
                for (const data of activatedplanUsers) {
                    const index = activateduserData.findIndex(user => user.userId === data.subscriptionuserId);
                    if (-1 !== index) {
                        const userdata = activateduserData[index];
                        await mailer.subscriptionActivated({
                            useremail: userdata.emailId,
                            username: userdata.firstName,
                            companyName: userdata.userDetails.companyName,
                            startdate: data.startdate,
                            expirydate: data.expirydate,
                            totalTrips: data.totalTrips
                        });
                    }
                }
            }
            this.success(req, res, this.status.HTTP_OK, {}, this.messageTypes.passMessages.successful);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    }

    /**
    * @DESC : Subscription plan - Renewals userList
    * @return array/json
    * @param req
    * @param res
    */
    _subuscriptionrenewaluserList = async (req, res, userIds) => {
        try {
            const alluserDetails = await Users.query()
                .whereIn('SRU03_USER_MASTER_D', userIds)
                .eager(`[userDetails]`)
                .modifyEager('userDetails', (builder) => {
                    builder.select(tripUserDetailsColumns)
                }).select(usersColumns);
            return alluserDetails;
        } catch (e) {

        }
    }
}

export default new UserController();