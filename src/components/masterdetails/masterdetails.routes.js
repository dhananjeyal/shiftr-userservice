import AuthController from "../user/auth.controller";
import LocationController from "./location.controller";

function registerRoutes() {
    return (openRouter, apiRouter) => {

        /// Driver verification
        // let verify = AuthController.verifyDriver;

        apiRouter.route("/location/:provinceId/city").get(LocationController.getCity);
    };
}

// Register all the routes here
module.exports = registerRoutes();
