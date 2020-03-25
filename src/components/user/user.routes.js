import AuthController from "../user/auth.controller";
import UserController from './user.controller'
import { forgetPassword, loginUser, resetPassword, signUpUser, existingEmail,travelsSignup } from './user.validators'
import { mailer } from "../../utils";

function registerRoutes() {
    return (openRouter, apiRouter) => {

        // User {Driver, Customer, Admin}
        openRouter.route("/api/user/sign_up").post(signUpUser, UserController.signUp);
        openRouter.route("/api/user/travels_Signup").post(UserController.travelsSignup);

        openRouter.route("/api/user/login").post(loginUser, UserController.loginUser);
        openRouter.route("/api/user/forget_password").post(forgetPassword, UserController.forgetPassword);
        openRouter.route("/api/user/verify_reset_token").post(UserController.verifyResetPasswordToken);

        // Email verification
        openRouter.route("/api/user/verify_email").get(UserController.verifyUser);
        
        let verifySuperAdminOrAdmin = AuthController.verifySuperAdminOrAdmin;
        //Existing Email verification
        apiRouter.route("/user/existing_email/:emailId").get(verifySuperAdminOrAdmin, existingEmail, UserController.existingEmail);

        // Create super admin
        openRouter.route("/api/user/create_super_user").post(UserController.createSuperUser);
        apiRouter.route("/user/get_users").post(UserController.getUserList);
        apiRouter.route("/user/get_user").post(UserController.getuserById);

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
