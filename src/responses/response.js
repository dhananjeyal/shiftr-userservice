const responseStatus = require("../facades/response");
const messageTypes = require("../responses/types");

// response class
class Response {
  // triggering a success response
  success(req, res, status, data = null, message = "success") {
    if (status == responseStatus.HTTP_OK) {
      req.appLogger.info(
        `URL : ${req.protocol}://${req.get("host")}${req.originalUrl
        }| ${req.method} | Request : ${JSON.stringify(
          req.body ? req.body : {}
        )} | Response :  ${JSON.stringify(data)}`
      );
    } else {
      req.appLogger.error(
        `URL : ${req.protocol}://${req.get("host")}${req.originalUrl
        }| ${req.method} | Request : ${JSON.stringify(
          req.body ? req.body : {}
        )} | Error : ${message}`
      );
    }

    return res.status(status).json({
      status,
      message,
      data
    });
  }
  // triggering a error response
  errors(req, res, status, message) {
    req.appLogger.error(
      `URL : ${req.protocol}://${req.get("host")}${req.originalUrl
      }| ${req.method} | Request : ${JSON.stringify(
        req.body ? req.body : {}
      )} | Error : ${message}`
    );

    return res.status(status).json({
      status,
      message
    });
  }
  // triggering a joi error response
  joierrors(req, res, err, customMessage = false) {
    // console.log(err)
    let message;
    let error = err.details.reduce((prev, curr) => {
      prev[curr.path[0]] = curr.message.replace(/"/g, "");
      return prev;
    }, {});

    if (customMessage) {
      message = messageTypes.errorMessages.invaliddata;
    } else {
      message = messageTypes.errorMessages.badRequest;
    }

    let status = responseStatus.HTTP_UNPROCESSABLE_ENTITY;
    req.appLogger.error(
      `URL : ${req.protocol}://${req.get("host")}${req.originalUrl
      }| ${req.method} | Request : ${JSON.stringify(
        req.body ? req.body : {}
      )} | BadRequestError : ${JSON.stringify(error)}`
    );

    return res.status(status).json({
      status,
      message,
      error
    });
  }
}

// exporting the module
module.exports = new Response();
