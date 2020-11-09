const crypto = require('crypto');
const cryptLib = require('@skavinvarnan/cryptlib');

const encrypt = (inputString, password = "dummy_password") => {
    try {
        // Difining algorithm 
        const algorithm = 'aes-256-cbc';
        // Defining key 
        const key = Buffer.from(process.env.ENCRYPT_KEY);
        // Defining iv 
        const iv = Buffer.from(process.env.ENCRYPT_KEY_IV);

        // Creating Cipheriv with its parameter 
        let cipher =
            crypto.createCipheriv(algorithm, Buffer.from(key), iv);

        // Updating text 
        let encrypted = cipher.update(text);

        // Using concatenation 
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        // Returning encrypted data 
        return {
            encryptedData: encrypted.toString('hex')
        };

    } catch (error) {
        console.log(error);
    }
};

const decrypt = (inputString, password = "dummy_password") => {
    try {
        // Difining algorithm 
        const algorithm = 'aes-256-cbc';
        let iv = Buffer.from(process.env.ENCRYPT_KEY_IV);
        const key = Buffer.from(process.env.ENCRYPT_KEY);

        iv = Buffer.from(iv.toString('hex'), 'hex');
        let encryptedText =
            Buffer.from(inputString, 'hex');

        // Creating Decipher 
        let decipher = crypto.createDecipheriv(
            algorithm, Buffer.from(key), iv);

        // Updating encrypted text 
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        // returns data after decryption 
        return decrypted.toString();


    } catch (error) {
        console.log(error);
    }
};

const aesEncrpt = (value, key = process.env.AES_ENCRPT_KEY) => {
    try {
        return cryptLib.encryptPlainTextWithRandomIV(value, key);
    } catch (error) {
        console.log(error);
    }
};

const aesDecrpt = (value, key = process.env.AES_ENCRPT_KEY) => {
    try {
        return cryptLib.decryptCipherTextWithRandomIV(value, key);
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
