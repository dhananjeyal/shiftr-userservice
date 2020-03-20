import AuthController from "../user/auth.controller";
import UserController from "../user/user.controller";
import DriverController from "../driver/driver.controller";
import {
    CreateDriverProfile,
    CreateVehicleDetails,
    updateDriverProfile,
    financialDetails,
    UploaddriverDocuments
} from '../driver/driver.validators'

function registerRoutes() {
    return (openRouter, apiRouter) => {

        /// Driver verification
        let verify = AuthController.verifyDriver;

        // Get driver signup details
        apiRouter.route("/user/signup_details").get(verify, UserController.getSignUpDetails);

        // Get driver signup status
        apiRouter.route("/user/signup_status").get(verify, UserController.getSignUpStatus);

        // Signup completion
        apiRouter.route("/driver/driver_profile").post(verify, CreateDriverProfile, DriverController.CreateDriverProfile);
        apiRouter.route("/driver/vehicle_details").post(verify, CreateVehicleDetails, DriverController.CreateVehicleDetails);
        apiRouter.route("/driver/driver_profile").put(verify, updateDriverProfile, DriverController.updateDriverProfile);

        apiRouter.route("/driver/driverDocuments").get(verify, DriverController.driverDocuments)//screening canada

        apiRouter.route("/driver/financial_details").post(verify, financialDetails, DriverController.financialDetails);
        apiRouter.route("/driver/upload_driver_documents").post(verify, UploaddriverDocuments, DriverController.UploaddriverDocuments);
        // apiRouter.route("/driver/driver_profile").get(verify, DriverController.getDriverProfile);
        apiRouter.route("/driver/driver_profile").delete(verify, DriverController.deleteDriverProfile);

        openRouter.route('/driver/sc_redirect_url').get(DriverController.updateSC_Status)//RedirectURL        
    };
}

// Register all the routes here
module.exports = registerRoutes();
