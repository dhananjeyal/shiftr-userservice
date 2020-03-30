import AuthController from "../user/auth.controller";
import UserController from "../user/user.controller";
import DriverController from "../driver/driver.controller";
import {
    CreateDriverProfile,    
    updateDriverProfile,
    financialDetails,
    driverDocuments,
    documentUpload,
    CreateExperienceDetails    
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
        apiRouter.route("/driver/driver_profile").put(verify, updateDriverProfile, DriverController.updateDriverProfile);        
        apiRouter.route("/driver/experience_details").post(verify, CreateExperienceDetails, DriverController.CreateExperienceDetails);
        apiRouter.route("/driver/financial_details").post(verify, financialDetails, DriverController.financialDetails);
        apiRouter.route("/driver/driver_documents").post(verify, driverDocuments, DriverController.driverDocuments);
        apiRouter.route("/driver/documentUpload").post(verify, documentUpload, DriverController.documentUpload);
       
        // apiRouter.route("/driver/driver_profile").get(verify, DriverController.getDriverProfile);
        apiRouter.route("/driver/driver_profile").delete(verify, DriverController.deleteDriverProfile);
                            
        // Get Driver Master
        apiRouter.route("/driver/fetch_master").get(DriverController.getMasterData);
    };
}

// Register all the routes here
module.exports = registerRoutes();
