require("dotenv/config");

import express from 'express'
import path from 'path'
import middleware from './src/middleware'
import AuthController from './src/components/user/auth.controller'
import glob from 'glob';

const app = express();

// Custom logger
const appLogger = require("./src/utils/logger");
global.__basedir = __dirname;
app.use(appLogger.requestDetails(appLogger));

app.enable("trust proxy");
middleware(app);

// Open router
const openRouter = express.Router();
app.use("/or1.0/v1", openRouter);

// Close router
let apiRouter = express.Router();
apiRouter.use(AuthController.verifyJWT);
app.use('/api', apiRouter);

app.use("/public", express.static(path.join(__dirname, 'public')));

// Register all routers
glob("./src/components/*", null, (err, items) => {
    items.forEach(component => {
        let routes = require(component).routes;
        if (routes) {
            routes(openRouter, apiRouter);
        }
    });
});

// exporting the app
module.exports = app;
