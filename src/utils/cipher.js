const crypto = require('crypto');
const cryptLib = require('@skavinvarnan/cryptlib');

const encrypt = (inputString, password = "dummy_password") => {
    try {
        const key = crypto.createCipher('aes-128-cbc', password);
        const encodedString = key.update(inputString, 'utf8', 'hex');
        return encodedString + key.final('hex');
    } catch (e) {
        info("Invalid input string or password.");
        // Ignore invalid input string or password
    }
};

const decrypt = (inputString, password = "dummy_password") => {
    try {
        const key = crypto.createDecipher('aes-128-cbc', password);
        const decodedString = key.update(inputString, 'hex', 'utf8');
        return decodedString + key.final('utf8');
    } catch (e) {
        info("Invalid input string or password.");
        // Ignore invalid input string or password
    }
};

const aesEncrpt = (value, key = process.env.AES_ENCRPT_KEY) => {
    try {
        if (process.env.VAPT && Number(process.env.VAPT))
            return cryptLib.encryptPlainTextWithRandomIV(value, key);
        return value
    } catch (error) {
        console.log(error);
    }
};

const aesDecrpt = (value, key = process.env.AES_ENCRPT_KEY) => {
    try {
        if (process.env.VAPT && Number(process.env.VAPT))
            return cryptLib.decryptCipherTextWithRandomIV(value, key);
        return value
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    decrypt,
    encrypt,
    aesDecrpt,
    aesEncrpt,
};
