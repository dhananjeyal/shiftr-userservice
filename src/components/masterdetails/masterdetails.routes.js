import AuthController from "../user/auth.controller";
import UserController from "../user/user.controller";
import DriverController from "../driver/driver.controller";
import {
    CreateDriverProfile,    
    updateDriverProfile,
    financialDetails,
    driverDocuments,
    CreateExperienceDetails    
} from '../driver/driver.validators'

function registerRoutes() {
    return (openRouter, apiRouter) => {

        /// Driver verification
        let verify = AuthController.verifyDriver;

        // Get Driver Master
        apiRouter.route("/driver/fetch_master").get(DriverController.getMasterData);
    };
}

// Register all the routes here
module.exports = registerRoutes();
