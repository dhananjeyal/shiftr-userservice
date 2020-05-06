import customerController from './customer.controller'
import AuthController from "../user/auth.controller";
import {
    CreateDriverProfile,
    CreateVehicleDetails,
    updateDriverProfile
} from './customer.validators'

function registerRoutes() {

    return (openRouter, apiRouter) => {

        //Driver check
        let verify = AuthController.verifyDriver;
       
        apiRouter.route("/customer/category").get(customerController.CategoryDetails);        
    };
}

// Register all the routes here
module.exports = registerRoutes();
