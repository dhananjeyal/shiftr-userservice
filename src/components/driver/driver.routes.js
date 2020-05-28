import AuthController from "../user/auth.controller";
import UserController from "../user/user.controller";
import DriverController from "../driver/driver.controller";
import {
    CreateDriverProfile,    
    updateDriverProfile,
    financialDetails,
    driverDocuments,
    documentUpload,
    CreateExperienceDetails,
    profileUpload,
    deleteDocument    
} from '../driver/driver.validators'

function registerRoutes() {
    return (openRouter, apiRouter) => {

        /// Driver verification
        let verify = AuthController.verifyDriver;        

        // Get driver signup details
        apiRouter.route("/user/signup_details").get(verify, UserController.getSignUpDetails);
        apiRouter.route("/user/driver/signup_details").get(verify, UserController.getDriverSignUpDetails);

        // Get driver signup status
        apiRouter.route("/user/signup_status").get(verify, UserController.getSignUpStatus);

        // Signup completion
        apiRouter.route("/driver/driver_profile").post(verify, CreateDriverProfile, DriverController.CreateDriverProfile);        
       //Driver Update -[SuperAdmin ]
        let verifySuperAdminOrAdmin = AuthController.verifySuperAdminOrAdmin;
        apiRouter.route("/driver/driver_profile").put(verifySuperAdminOrAdmin , updateDriverProfile, DriverController.updateDriverProfile);        
        apiRouter.route("/driver/experience_details").post(verify, CreateExperienceDetails, DriverController.CreateExperienceDetails);
        apiRouter.route("/driver/financial_details").post(verify, financialDetails, DriverController.financialDetails);
        apiRouter.route("/driver/driver_documents").post(verify, driverDocuments, DriverController.driverDocuments);
        apiRouter.route("/driver/documentUpload").post(verify, documentUpload, DriverController.documentUpload);        
        apiRouter.route("/driver/documents").delete(verify, deleteDocument, DriverController.documentDelete);
       
        // apiRouter.route("/driver/driver_profile").get(verify, DriverController.getDriverProfile);
        apiRouter.route("/driver/driver_profile").delete(verify, DriverController.deleteDriverProfile);
                            
        // Get Driver Master
        apiRouter.route("/driver/fetch_master").get(DriverController.getMasterData);

        let verifyAny = AuthController.verifyAny;
        apiRouter.route("/driver/profilepicture").post(verifyAny, profileUpload, DriverController.profileUpload);
        apiRouter.route("/driver/profilepicture").delete(verifyAny,DriverController.profileimageDelete);
    };
}

// Register all the routes here
module.exports = registerRoutes();
