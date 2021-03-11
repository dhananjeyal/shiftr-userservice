import AuthController from "../user/auth.controller";
import {createAdmin, updateAdmin} from "./superAdmin.validators";
import UserController from "../user/user.controller";
import DriverController from "../driver/driver.controller";

function registerRoutes() {
    return (openRouter, apiRouter) => {

        /// Super-admin check
        let verify = AuthController.verifySuperAdmin;

        apiRouter.route("/user/create_admin").post(verify, createAdmin, UserController.createAdmin);
        apiRouter.route("/user/update_admin/:userId").put(verify, updateAdmin, UserController.updateAdmin);
        apiRouter.route("/user/admins").get(verify, UserController.getAllAdmins);
        apiRouter.route("/user/get_admin/:userId").get(verify, UserController.getAdmin);

    };
}

// Register all the routes here
module.exports = registerRoutes();
