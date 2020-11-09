require("babel-register");
require("babel-polyfill");

require("dotenv").config();

const port = process.env.NODE_ENV === 'local' ? process.env.LOCAL_PORT : process.env.PORT;
const app = require("./app");
const chalk = require("chalk");
const {info, error} = require("./src/utils").logging;

// Graceful shutdown
process.on("SIGINT", () => {
    process.exit(1);
});

process.on("unhandledRejection", (reason, p) =>
    error("Unhandled Rejection at: Promise ", p, reason)
);

process.on('uncaughtException', function (err) {
    console.log("Node NOT Exiting...");
    console.error(err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled rejection at ', promise, `reason: ${reason}`)
    process.exit(1)
})

app.listen(port, () => {
    info(
        chalk.blue(" [ ✓ ] ") +
        `Application - Process ${process.pid} is listening to all incoming requests at: ${port} `
    );
});
