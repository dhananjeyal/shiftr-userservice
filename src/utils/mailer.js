import {UserRole, UserStatus} from "../constants";

const nodemailer = require("nodemailer");

export const sendMail = async (to, subject, html) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        secureConnection: false,
        logger: true,
        debug: true,
        port: 465,
        auth: {
            user: "shiftr@joshiinc.com",
            pass: "joshiinc123"
        }
    }, {
        from: 'shiftR <shiftr@joshiinc.com>'
    });

    const mailOptions = {
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html // html body
    };

    return transport.sendMail(mailOptions);
};

export const signUp = (firstName, email, link) => {
    let html = `<b>Hello ${firstName}</b>
                <p>Congratulations.! you have successfully signed up for your account.</p>
                <p>Let's add some more details to verify your account.</p>
                <a href="${link}">Verify your account</a>
                <p>Best regards</p>`;
    return sendMail(email, "Verification Email", html)
};

export const DriversignUpCompleted = (firstName, email) => {
    let html = `<b>Hello ${firstName}</b>
                <p>Thank you for submitting the documents for verification.</p>
                <p><b>Current status :</b>document submitted for verification.</p>
                <p>Once your documents are verified you will be notified.</p>
                <p>Best regards</p>`;
    return sendMail(email, "Signup Confirmation Email", html)
};



export const emailVerified = (user) => {
    let html = `<b>Hello ${user.firstName}</b>
                    <p>You're email is successfully verified. You can now login to continue..</p>
                    <p>Best regards</p>`;

    if (user.typeId === UserRole.DRIVER_R) {
        html = `<b>Hello ${user.firstName}</b>
                    <p>The email verification process is done now you are just a few steps away to use the platform please log in and complete the entire sign up process.</p>
                    <p>Best regards</p>`;
    }
    return sendMail(user.emailId, "Email verified", html)
};

export const accountCreated = (user, link) => {
    let html = `<b>Hello ${user.firstName}</b>
                    <p>ShiftR admin has created an account for you, please download the app "{app-link}" and log in with temporary credentials:</p>
                    <p>Username / email address: ${user.emailId}</p>
                    <p>Temporary password: ${user.password}</p>
                    <hr>
                    <p>OR</p>
                    <p>Set a new password using below shown link:</p>
                    <a href="${link}">Set new password</a>
                    <p>Best regards</p>`;

    if (user.typeId === UserRole.ADMIN_R) {
        html = `<b>Hello ${user.firstName}</b>
                    <p>ShiftR admin has created an account for you, you can log in the admin dashboard using following credential:</p>
                    <p>Username / email address: ${user.emailId}</p>
                    <p>Temporary password: ${user.password}</p>
                    <hr>
                    <p>OR</p>
                    <p>Set a new password using below shown link:</p>
                    <a href="${link}">Set new password</a>
                    <p>Best regards</p>`;
    }

    return sendMail(user.emailId, "Account created", html)
};

export const activateDeactivate = (user) => {
    let html = `<b>Hello ${user.firstName}</b>
                    <p>Your account has been activated please you can now log in to the account.</p>
                    <p>Best regards</p>`;
    let subject = "Account activated";

    if (user.status === UserStatus.INACTIVE) {
        html = `<b>Hello ${user.firstName}</b>
                    <p>Your account has been suspended please contact the admin for further clarification.</p>
                    <p>Best regards</p>`;
        subject = "Account suspended";
    }

    return sendMail(user.emailId, subject, html)
};

export const forgetPassword = (user, link) => {
    let html = `<b>Hi ${user.firstName},</b>
                    <p>You can reset your password by using the below link within 24 hours.</p>
                    <a href="${link}">Reset Password</a>
                    <p>Please ignore this email, if you haven't made this request. You can continue to use your current password.</p>
                    <p>Best regards</p>`;
    return sendMail(user.emailId, "Forget password", html)
};

export const resetPassword = (user) => {
    let html = `<b>Hello ${user.firstName},</b>
                    <p>You have successfully reset your password you can now log in to the app with your new credential.</p>
                    <p>Best regards</p>`;
    return sendMail(user.emailId, "Password reset", html)
};

// <p>Trip start yard:- ${tripDetails.startYard}</p>
export const notifyBusOwner = (user, tripDetails) => {

    let html = `<b>Hello ${user.firstName},</b>
                    <p>Your Trip have been ${tripDetails.tripStatus} by ${tripDetails.driverFirstName}.</p>
                    <p><b>Trip Details:-</b></p>
                    <p>Company name:- ${tripDetails.companyName}</p>
                    <p>Trip code:- ${tripDetails.tripCode}</p>
                    <p>Trip type:- ${tripDetails.type}</p>
                    <p>Trip start date:- ${tripDetails.startDate}</p>
                    <p>Trip end date:- ${tripDetails.endDate}</p>
                    <p>Trip start time:- ${tripDetails.startTime}</p>

                    <p><b>Driver Details:-</b></p>
                    <p>Driver name:- ${tripDetails.driverFirstName} ${tripDetails.driverLastName}</p>
                    <p>Driver contact:- ${tripDetails.driverPhoneNumber}</p>
                    <p>Driver address:- ${tripDetails.driverAddress}</p>
                    <p>Best regards</p>`;
    return sendMail(user.emailId, "Trip - Details", html)
};

export const busOwnerEmail = (user, tripDetails, message) => {

    let html = `<b>Hello ${user.firstName},</b>
                    <p>${message} ${tripDetails.tripCode} .</p>
                    <p><b>Trip Details:-</b></p>
                    <p>Company name:- ${tripDetails.companyName}</p>
                    <p>Trip code:- ${tripDetails.tripCode}</p>
                    <p>Trip type:- ${tripDetails.type}</p>
                    <p>Trip start date:- ${tripDetails.startDate}</p>
                    <p>Trip end date:- ${tripDetails.endDate}</p>
                    <p>Trip start time:- ${tripDetails.startTime}</p>`;
    return sendMail(user.emailId, "Trip - Details", html)
};


export const superAdminEmail = (tripDetails, message) => {

    let html = `<b>Hello shiftr,</b>
                    <p>${message} ${tripDetails.tripCode} .</p>
                    <p><b>Trip Details:-</b></p>
                    <p>Company name:- ${tripDetails.companyName}</p>
                    <p>Trip code:- ${tripDetails.tripCode}</p>
                    <p>Trip type:- ${tripDetails.type}</p>
                    <p>Trip start date:- ${tripDetails.startDate}</p>
                    <p>Trip end date:- ${tripDetails.endDate}</p>
                    <p>Trip start time:- ${tripDetails.startTime}</p>`;
    return sendMail(`shiftr@joshiinc.com`, "Trip - Details", html)
};



export const subscriptionNotification = (payload) => {

    let html = `<b>Hello ${user.firstName},</b>
                    <p>${message} ${tripDetails.tripCode} .</p>
                    <p><b>Trip Details:-</b></p>
                    <p>Company name:- ${tripDetails.companyName}</p>
                    <p>Trip code:- ${tripDetails.tripCode}</p>
                    <p>Trip type:- ${tripDetails.type}</p>
                    <p>Trip start date:- ${tripDetails.startDate}</p>
                    <p>Trip end date:- ${tripDetails.endDate}</p>
                    <p>Trip start time:- ${tripDetails.startTime}</p>`;
    return sendMail(user.emailId, "Trip - Details", html)
};

