import BaseController from "../baseController";
import Users from '../user/model/user.model'
import jwt from 'jsonwebtoken';
import { columns, userAddressColumns, userDetailsColumns, contactInfoDetailsColumns } from "./model/user.columns";
import { UserRole, booleanType } from '../../constants'
import { s3GetSignedURL } from "../../middleware/multer";
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;


class AuthController extends BaseController {

    constructor() {
        super();
    }

    verifyJWT = (req, res, next) => {
        try {
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (token) {
                if (token.startsWith('Bearer ')) {
                    token = token.slice(7, token.length);
                }

                return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
                    if (err) {
                        return this.userInvalidToken(req, res);
                    } else {
                        const { userId, type } = payload
                        if (type === 'login' || (type === "resetPassword" && req.url === process.env.RESET_PASSWORD_API)) {
                            try {
                                let user = await Users.query().findOne({
                                    SRU03_USER_MASTER_D: userId,
                                }).skipUndefined().eager('[userDetails, addressDetails,contactInfoDetails]')
                                    .modifyEager('userDetails', builder => {
                                        builder.select(userDetailsColumns)
                                    }).modifyEager('addressDetails', (builder) => {
                                        builder.select(userAddressColumns)
                                    }).modifyEager('contactInfoDetails', (builder) => {
                                        builder.where('SRU19_DELETED_F', booleanType.NO)
                                        builder.select(contactInfoDetailsColumns)
                                    }).select(columns);

                                if (user) {
                                    if (AWS_ACCESS_KEY && user.userDetails && user.userDetails.userProfileImage)
                                        user.userDetails = await s3GetSignedURL(user.userDetails.userProfileImage)
                                    req.user = user;
                                    next();
                                } else {
                                    return this.userInvalidToken(req, res);
                                }

                            } catch (e) {
                                return this.internalServerError(req, res, e);
                            }
                        } else {
                            return this.userInvalidToken(req, res);
                        }
                    }
                });
            }

            return this.userInvalidToken(req, res);
        } catch (e) {
            return this.internalServerError(req, res, e);
        }
    };

    _verifyUserType = async (req, res, next, ...userTypes) => {
        try {
            const { typeId } = req.user;
            if (userTypes.includes(typeId)) {
                return next();
            }
            this.userIllegalAccess(req, res)
        } catch (e) {
            this.internalServerError(req, res, e);
        }
    };

    verifySuperAdmin = (req, res, next) => {
        return this._verifyUserType(req, res, next, UserRole.SUPER_ADMIN_R);
    };

    verifyAdmin = (req, res, next) => {
        return this._verifyUserType(req, res, next, UserRole.ADMIN_R);
    };

    verifySuperAdminOrAdmin = (req, res, next) => {
        return this._verifyUserType(req, res, next, UserRole.SUPER_ADMIN_R, UserRole.ADMIN_R);
    };

    verifyAny = (req, res, next) => {
        return this._verifyUserType(req, res, next, UserRole.SUPER_ADMIN_R, UserRole.ADMIN_R, UserRole.DRIVER_R, UserRole.CUSTOMER_R);
    };

    verifyDriver = (req, res, next) => {
        return this._verifyUserType(req, res, next, UserRole.DRIVER_R);
    };

    verifySuperAdminOrAdminOrDriver = (req, res, next) => {
        return this._verifyUserType(req, res, next, UserRole.SUPER_ADMIN_R, UserRole.ADMIN_R, UserRole.DRIVER_R);
    };

    verifyCustomer = (req, res, next) => {
        return this._verifyUserType(req, res, next, UserRole.CUSTOMER_R);
    };
}

export default new AuthController();
