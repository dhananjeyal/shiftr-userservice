import AuthController from "../user/auth.controller";
import DriverController from '../driver/driver.controller'
import UserController from "../user/user.controller";
import { createUpdateUser, updateProfile, updateSignUpStatus, excel } from "../user/user.validators";

function registerRoutes() {
    return (openRouter, apiRouter) => {

        /// Admin or super-admin check
        let verify = AuthController.verifySuperAdminOrAdmin;
        let verifyCustomer = AuthController.verifyCustomer;
        // Create update driver user

        apiRouter.route("/user/drivers").get(verify, UserController.getAllDrivers);




        apiRouter.route("/user/get_driver/:userId").get(verify, DriverController.getDriverDetails);

        // Update user's signup status
        apiRouter.route("/user/update_signup_status/:userId").put(verify, updateSignUpStatus, UserController.updateSignUpStatus);

        // Create update user
        apiRouter.route("/user/create_user").post(verify, createUpdateUser, UserController.createCustomer);
        apiRouter.route("/user/update_user/:userId").put(verify, createUpdateUser, UserController.updateCustomer);
        apiRouter.route("/user/users").get(verify, UserController.getAllCustomers);

        apiRouter.route("/user/driver/list").post(verifyCustomer, UserController.getAllDriverList);


        apiRouter.route("/user/get_user/:userId").get(verify, UserController.getUser);

        // Get user details
        apiRouter.route("/user/:userId/details").get(verify, UserController.getUser);

        // Deactivate and activate {Admin, Driver, Customer}
        apiRouter.route("/user/deactivate_user/:userId").put(verify, UserController.deactivateUser);
        apiRouter.route("/user/activate_user/:userId").put(verify, UserController.activateUser);
        let verifyAny = AuthController.verifyAny;
        // Create update user
        apiRouter.route("/user/update_profile").put(updateProfile, UserController.updateProfile);

        apiRouter.route("/user/driver/report").post(UserController.busDriverDetailsReport);

        apiRouter.route("/user/busowner/report").post(UserController.busOwnerDetailsReport);
        apiRouter.route("/user/generate/excel").post(verify, excel, UserController.generateExcel)
    };
}

// Register all the routes here
module.exports = registerRoutes();
