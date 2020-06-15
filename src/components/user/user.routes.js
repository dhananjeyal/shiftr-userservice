import AuthController from "../user/auth.controller";
import UserController from './user.controller'
import { forgetPassword, loginUser, resetPassword, signUpUser, existingEmail, travelsSignup, travelsUpdate, mobilenumberExist } from './user.validators'
import { mailer } from "../../utils";

function registerRoutes() {
    return (openRouter, apiRouter) => {

        // User {Driver, Customer, Admin}
        openRouter.route("/api/user/mobilenumber/unique").post(mobilenumberExist, UserController.existingMobilenumber);
        openRouter.route("/api/user/sign_up").post(signUpUser, UserController.signUp);
        openRouter.route("/api/user/travels_Signup").post(travelsSignup, UserController.travelsSignup);

        openRouter.route("/api/user/login").post(loginUser, UserController.loginUser);
        openRouter.route("/api/user/forget_password").post(forgetPassword, UserController.forgetPassword);
        openRouter.route("/api/user/verify_reset_token").post(UserController.verifyResetPasswordToken);

        // Email verification
        openRouter.route("/api/user/verify_email").get(UserController.verifyUser);
        openRouter.route("/api/user/email/trip_pending").post(UserController.sendTripPendingNotication);
        openRouter.route("/api/user/subscription/reminder").post(UserController.sendReminderNotication);
        openRouter.route("/api/user/subscription/renewals").post(UserController.sendRenewalsNotication);
        openRouter.route("/api/user/subscription/deactive").post(UserController.subscriptionDeactive);

        let verifySuperAdminOrAdmin = AuthController.verifySuperAdminOrAdmin;
        //Existing Email verification
        apiRouter.route("/user/existing_email/:emailId").get(verifySuperAdminOrAdmin, existingEmail, UserController.existingEmail);

        // Create super admin
        openRouter.route("/api/user/create_super_user").post(UserController.createSuperUser);
        apiRouter.route("/user/get_users").post(UserController.getUserList);
        apiRouter.route("/user/get_user").post(UserController.getuserById);
        apiRouter.route("/user/trip/driver/list").post(UserController.getDriverDetailsList);

        //Travels Update - Customer / Busowner
        let verifyCustomer = AuthController.verifyCustomer;
        apiRouter.route("/user/travels").put(verifyCustomer, travelsUpdate, UserController.travelsUpdate);
        apiRouter.route("/user/:contactId/contacts").put(verifyCustomer, UserController.deleteContactInfo);
        apiRouter.route("/user/login/status").get(verifyCustomer, UserController.busownerLoginStatus);
        apiRouter.route("/user/trip_status").post(UserController.sendTripStatusNotication);

        let verifyAny = AuthController.verifyAny;
        apiRouter.route("/user/trip/:userId/contacts").get(verifyAny, UserController.getContactInfo);
        apiRouter.route("/user/subscription/confirmation").post(verifyAny,UserController.subscriptionplanNotification);
        apiRouter.route("/user/trips/accepatnaceratio").post(verifyAny,UserController.tripsAccepatanceRatio);
        apiRouter.route("/user/supportcontact/list").get(verifyAny,UserController.supportContactList);
        apiRouter.route("/user/encryptiontest").get(verifyAny,UserController._dataEncryptDecrypt);

        // Required jwt authentication
        apiRouter.route("/user/reset_password").post(resetPassword, UserController.resetPassword);
        apiRouter.route("/user/verify_token").get(UserController.verifyToken);

        openRouter.route("/test_mail").get((req, res) => {
            mailer.sendMail("karanmandalxyz@gmail.com", "Test mail", "Hello World!").then((response) => {
                res.status(200).send(response);
            });
        });
    };
}

// Register all the routes here
module.exports = registerRoutes();
