const crypto = require('crypto');
const {
    info
} = require('./').logging;

exports.encrypt = (inputString, password = "dummy_password") => {
    try {
        const key = crypto.createCipher('aes-128-cbc', password);
        const encodedString = key.update(inputString, 'utf8', 'hex');
        return encodedString + key.final('hex');
    } catch (e) {
        info("Invalid input string or password.");
        // Ignore invalid input string or password
    }
};

exports.decrypt = (inputString, password = "dummy_password") => {
    try {
        const key = crypto.createDecipher('aes-128-cbc', password);
        const decodedString = key.update(inputString, 'hex', 'utf8');
        return decodedString + key.final('utf8');
    } catch (e) {
        info("Invalid input string or password.");
        // Ignore invalid input string or password
    }
};
