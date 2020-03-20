import AuthController from "../user/auth.controller";
import DriverController from '../driver/driver.controller'
import UserController from "../user/user.controller";
import {createDriver, updateDriver} from "../driver/driver.validators";
import {createUpdateUser, updateProfile, updateSignUpStatus} from "../user/user.validators";

function registerRoutes() {
    return (openRouter, apiRouter) => {

        /// Admin or super-admin check
        let verify = AuthController.verifySuperAdminOrAdmin;

        // Create update driver user
        //Commented the admin create & update driver api, since its not in use
        // apiRouter.route("/user/create_driver").post(verify, createDriver, DriverController.createDriver);
        // apiRouter.route("/user/update_driver/:userId").put(verify, updateDriver, DriverController.updateDriver);
        // apiRouter.route("/user/drivers").get(verify, UserController.getAllDrivers);
        //For Testing purpose
        apiRouter.route("/user/drivers").get(UserController.getAllDrivers);
        apiRouter.route("/user/get_driver/:userId").get(verify, DriverController.getDriverDetails);

        // Update user's signup status
        apiRouter.route("/user/update_signup_status/:userId").put(verify, updateSignUpStatus, UserController.updateSignUpStatus);

        // Create update user
        apiRouter.route("/user/create_user").post(verify, createUpdateUser, UserController.createCustomer);
        apiRouter.route("/user/update_user/:userId").put(verify, createUpdateUser, UserController.updateCustomer);
        apiRouter.route("/user/users").get(verify, UserController.getAllCustomers);
        apiRouter.route("/user/get_user/:userId").get(verify, UserController.getUser);

        // Get user details
        apiRouter.route("/user/:userId/details").get(verify, UserController.getUser);

        // Deactivate and activate {Admin, Driver, Customer}
        apiRouter.route("/user/deactivate_user/:userId").put(verify, UserController.deactivateUser);
        apiRouter.route("/user/activate_user/:userId").put(verify, UserController.activateUser);

        // Create update user
        apiRouter.route("/user/update_profile").put(verify, updateProfile, UserController.updateProfile);
    };
}

// Register all the routes here
module.exports = registerRoutes();
